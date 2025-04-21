import { NextResponse } from "next/server";

// Default webhook URL if none is provided
const DEFAULT_WEBHOOK_URL = "https://science.arjav.hackclub.app/webhook";

export async function POST(request: Request) {
  console.log("Webhook request received");

  try {
    const body = await request.json();
    console.log("Request body:", body);

    // generate a session ID
    const sessionId =
      body.sessionId ||
      `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    // webhook data
    const webhookData = {
      message: body.message,
      sessionId: sessionId,
      authToken: process.env.AUTH_SECRET!,
    };

    // Use the provided webhook URL or fall back to the default
    const webhookUrl = body.webhookUrl || DEFAULT_WEBHOOK_URL;

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
    console.log(
      "Webhook response headers:",
      Object.fromEntries(response.headers.entries()),
    );

    // Stream the response to handle large payloads
    let responseData;
    let rawResponse = "";

    try {
      const reader = response.body?.getReader();
      if (reader) {
        const decoder = new TextDecoder();
        let done = false;

        while (!done) {
          const { value, done: readerDone } = await reader.read();
          done = readerDone;
          if (value) {
            rawResponse += decoder.decode(value, { stream: true });
          }
        }
      } else {
        rawResponse = await response.text();
      }

      console.log("Raw response:", rawResponse);

      const contentType = response.headers.get("Content-Type") || "";
      if (contentType.includes("application/json")) {
        responseData = rawResponse ? JSON.parse(rawResponse) : {};
      } else {
        console.log("Response is not JSON, treating as plain text");
        responseData = { message: rawResponse };
      }
    } catch (e) {
      console.error("Error handling response:", e);
      responseData = { message: rawResponse };
    }

    let finalResponse = "";

    // Handle array response format with output field
    if (Array.isArray(responseData) && responseData.length > 0) {
      finalResponse = responseData[0].output || "";
    } else if (typeof responseData === "object") {
      // Fallback to other common fields if not in array format
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
