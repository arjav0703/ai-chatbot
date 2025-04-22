import { NextResponse } from "next/server";

export async function POST(request: Request) {
  console.log("Webhook request received");

  try {
    const body = await request.json();
    console.log("Request body:", body);

    // Generate a session ID
    const sessionId =
      body.sessionId ||
      `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    // Webhook data
    const webhookData = {
      message: body.message,
      sessionId: sessionId,
      authToken: process.env.AUTH_SECRET!,
    };

    const webhookUrl = body.webhookUrl;

    console.log("Sending webhook request to:", webhookUrl);
    console.log("Webhook data:", webhookData);

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(webhookData),
    });

    console.log("Webhook response status:", response.status);

    // Handle response more robustly
    let responseData;
    let rawResponse = "";

    try {
      // First try to read as stream
      const reader = response.body?.getReader();
      if (reader) {
        const decoder = new TextDecoder();
        let done = false;

        while (!done) {
          const { value, done: readerDone } = await reader.read();
          done = readerDone;
          if (value) {
            rawResponse += decoder.decode(value, { stream: !done });
          }
        }
      } else {
        // Fallback to regular text() if no stream
        rawResponse = await response.text();
      }

      // Trim whitespace which might cause issues
      rawResponse = rawResponse.trim();

      console.log("Raw response length:", rawResponse.length);

      // Only try to parse if there's actual content
      if (rawResponse) {
        try {
          responseData = JSON.parse(rawResponse);
        } catch (parseError) {
          console.warn(
            "Failed to parse as JSON, treating as text:",
            parseError,
          );
          responseData = { message: rawResponse };
        }
      } else {
        responseData = {};
      }
    } catch (e) {
      console.error("Error handling response:", e);
      responseData = { error: "Failed to process response" };
    }

    // Process the response data
    let finalResponse = "";

    if (Array.isArray(responseData) && responseData.length > 0) {
      finalResponse = responseData[0].output || "";
    } else if (typeof responseData === "object" && responseData !== null) {
      finalResponse =
        responseData.output ||
        responseData.response ||
        responseData.message ||
        responseData.text ||
        responseData.content ||
        JSON.stringify(responseData);
    } else {
      finalResponse = String(responseData);
    }

    return NextResponse.json({
      success: true,
      response: finalResponse,
      sessionId: sessionId,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to send webhook request",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
