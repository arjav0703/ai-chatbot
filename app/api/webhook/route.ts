import { NextResponse } from "next/server";

// Default webhook URL if none is provided
const DEFAULT_WEBHOOK_URL =
  "https://n8n.arjav.hackclub.app/webhook/english-chat";

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
      sessionId: sessionId,
      chatInput: body.message,
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

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Webhook error response:", errorText);
      throw new Error(
        `Webhook request failed with status ${response.status}: ${errorText}`,
      );
    }

    // try to parse the response as JSON
    let responseData;
    const rawResponse = await response.text();
    console.log("Raw response:", rawResponse);

    try {
      responseData = rawResponse ? JSON.parse(rawResponse) : {};
    } catch (e) {
      console.log("Response is not JSON, using as plain text", e);
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
