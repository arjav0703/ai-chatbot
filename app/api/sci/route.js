// For the nerds who are curious why i did not use Typescript in this particiular file: See, TSC is great and all, but I really don't want to mess this code up and this is just a temporary solution because I am too lazy to deploy the backend in Python and I didnt want to bother with TSC for this particular reason

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

// const systemMsg =
//   "System: You are Chemi, an AI agent created by Arjav who answers questions related to science. Always answer in detail. Always prefer knowledge from the Science database over any other source. If the answer cannot be found in the Science Database, tell the user to select other subject through the dropdown menu.";

export const POST = async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { GOOGLE_API_KEY, PINECONE_API_KEY, AUTH_SECRET } = process.env;

  const {
    message,
    sessionId,
    authToken,
    subject = "science",
  } = await req.json();

  // Subject handling
  const config = subjectConfig[subject];
  if (!config) {
    return new Response(JSON.stringify({ error: "Invalid subject" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // err handling
  if (!message || !sessionId) {
    return new Response(
      JSON.stringify({ error: "Missing message or sessionId" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  // auth
  if (authToken !== AUTH_SECRET) {
    return new Response(
      JSON.stringify({ error: "Back off, you ain't authenticated" }),
      {
        status: 401,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  try {
    // === Pinecone Setup ===
    const pinecone = new Pinecone({ apiKey: PINECONE_API_KEY });
    const pineconeIndex = pinecone.Index(config.pineconeIndex);

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
        name: `${subject} database`,
        description: "Retrieve information to answer user queries.",
        async func(query) {
          const results = await vectorStore.similaritySearch(query, 6);
          return results.map((r) => r.pageContent).join("\n\n---\n");
        },
      },
    ];

    // === Model ===
    const model = new ChatGoogleGenerativeAI({
      model: "gemini-2.0-flash",
      apiKey: GOOGLE_API_KEY,
    });

    // === Agent Executor ===
    const executor = await initializeAgentExecutorWithOptions(tools, model, {
      agentType: "chat-zero-shot-react-description",
      agentArgs: {
        prefix: config.systemMessage,
      },
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
      .from(config.supabaseTable)
      .select("role, content")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: false })
      .limit(5);

    if (fetchError) throw new Error(fetchError.message);

    const formattedHistory = formatHistory(history.reverse());

    const finalInput = formattedHistory
      ? `\n${formattedHistory}\nUser: ${message}`
      : `\nUser: ${message}`;

    // === Run the Agent ===
    const result = await executor.invoke({ input: finalInput });

    // === Save to Supabase ===
    const { error: insertError } = await supabase
      .from(config.supabaseTable)
      .insert([
        { session_id: sessionId, role: "user", content: message },
        { session_id: sessionId, role: "assistant", content: result.output },
      ]);

    if (insertError) throw new Error(insertError.message);

    return new Response(
      JSON.stringify({
        success: true,
        response: result.output,
        sessionId,
        timestamp: Date.now(),
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    console.error("❌ Error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

const subjectConfig = {
  science: {
    systemMessage:
      "System: You are Chemi, an AI agent created by Arjav who answers questions related to science. Always answer in detail. Always prefer knowledge from the Science database over any other source. If the answer cannot be found in the Science Database, tell the user to select other subject through the dropdown menu.",
    pineconeIndex: "science-9",
    supabaseTable: "sci-messages",
  },
  english: {
    systemMessage:
      "System: You are an AI agent created by Arjav who answers questions related to English. Always answer in detail unless specified not to. Always prefer knowledge from the English database over any other source. If the answer cannot be found in the English Database, tell the user to select other subject through the dropdown menu.",
    pineconeIndex: "english",
    supabaseTable: "eng-messages",
  },
  english: {
    systemMessage:
      "System: System: You are an AI agent created by arjav who answers questions related to history, geography, political science and economics. Always answer in detail and in the format of bullet points unless specified not to. Always use the SST database to answer user queries. If the answer cannot be found in the SST Database, tell the user to select other subject through the dropdown menu.",
    pineconeIndex: "sst",
    supabaseTable: "sst-messages",
  },
};
