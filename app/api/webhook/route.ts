import { NextResponse } from 'next/server';

const WEBHOOK_URL = 'https://n8n.arjav.hackclub.app/webhook-test/525a65c7-54e6-44b7-b887-f9c5bc3f32f8';

export async function POST(request: Request) {
  console.log('Webhook request received');
  
  try {
    const body = await request.json();
    console.log('Request body:', body);

    // Generate a session ID if not provided
    const sessionId = body.sessionId || `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    // Simplified webhook data with only chatInput and sessionId
    const webhookData = {
      sessionId: sessionId,
      chatInput: body.message
    };

    console.log('Sending webhook request to:', WEBHOOK_URL);
    console.log('Webhook data:', webhookData);

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(webhookData),
    });

    console.log('Webhook response status:', response.status);
    console.log('Webhook response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Webhook error response:', errorText);
      throw new Error(`Webhook request failed with status ${response.status}: ${errorText}`);
    }

    // Try to parse the response as JSON, but handle non-JSON responses
    let responseData;
    const rawResponse = await response.text();
    console.log('Raw response:', rawResponse);

    try {
      responseData = rawResponse ? JSON.parse(rawResponse) : {};
    } catch (e) {
      console.log('Response is not JSON, using as plain text');
      responseData = { message: rawResponse };
    }

    // Extract the response text from the n8n webhook response
    let finalResponse = '';
    if (typeof responseData === 'object') {
      // If data is an object, try to find a text response in common fields
      finalResponse = responseData.response || responseData.message || responseData.text || responseData.content || JSON.stringify(responseData);
    } else {
      finalResponse = String(responseData);
    }
    
    return NextResponse.json({
      success: true,
      response: finalResponse,
      sessionId: sessionId,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to send webhook request',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 