import {
  ChatGoogleGenerativeAI,
  GoogleGenerativeAIEmbeddings,
} from "@langchain/google-genai";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/community/vectorstores/pinecone";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
);

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { GOOGLE_API_KEY, PINECONE_API_KEY, AUTH_SECRET } = process.env;

  const { message, sessionId, authToken } = req.body;

  if (!message || !sessionId) {
    return res.status(400).json({ error: "Missing message or sessionId" });
  }

  if (authToken !== AUTH_SECRET) {
    return res.status(401).json({ error: "Back off, you ain't authenticated" });
  }

  try {
    // === Pinecone Setup ===
    const pinecone = new Pinecone({ apiKey: PINECONE_API_KEY });
    const pineconeIndex = pinecone.Index("science-9");

    const vectorStore = await PineconeStore.fromExistingIndex(
      new GoogleGenerativeAIEmbeddings({
        model: "text-embedding-004",
        apiKey: GOOGLE_API_KEY,
      }),
      { pineconeIndex },
    );

    // === Tools ===
    const tools = [
      {
        name: "Science database",
        description: "Retrieve information to answer user queries.",
        async func(query) {
          const results = await vectorStore.similaritySearch(query, 5);
          return results.map((r) => r.pageContent).join("\n\n---\n");
        },
      },
    ];

    // === Model ===
    const model = new ChatGoogleGenerativeAI({
      model: "gemini-2.0-flash",
      apiKey: GOOGLE_API_KEY,
      systemInstruction: {
        role: "system",
        content:
          "System: You are Chemi, an AI agent created by arjav who answers questions related to science. Always answer in detail. Always prefer knowledge from the Science database over any other source.",
      },
    });

    const executor = await initializeAgentExecutorWithOptions(tools, model, {
      agentType: "zero-shot-react-description",
      verbose: true,
      returnIntermediateSteps: true,
    });

    // === Fetch History from Supabase ===
    const formatHistory = (history) =>
      history
        .map(
          (msg) =>
            `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`,
        )
        .join("\n");

    const { data: history, error: fetchError } = await supabase
      .from("sci-messages")
      .select("role, content")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: false })
      .limit(5);

    if (fetchError) throw new Error(fetchError.message);

    const formattedHistory = formatHistory(history.reverse());

    const systemMsg =
      "System: You are Chemi, an AI agent created by arjav who answers questions related to science. Always answer in detail. Always prefer knowledge from the Science database over any other source. If the answer cannot be found in the Science Database, tell the user to select other subject through the dropdown menu.";

    const finalInput = formattedHistory
      ? `${systemMsg}\n${formattedHistory}\nUser: ${message}`
      : `${systemMsg}\nUser: ${message}`;

    const result = await executor.invoke({ input: finalInput });

    // === Save to Supabase ===
    const { error: insertError } = await supabase.from("sci-messages").insert([
      { session_id: sessionId, role: "user", content: message },
      { session_id: sessionId, role: "assistant", content: result.output },
    ]);

    if (insertError) throw new Error(insertError.message);

    return res.status(200).json({
      success: true,
      response: result.output,
      sessionId,
      timestamp: Date.now(),
    });
  } catch (err) {
    console.error("❌ Error:", err);
    return res.status(500).json({ error: err.message });
  }
};

export default handler;
