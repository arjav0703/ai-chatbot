import { NextResponse } from 'next/server';

const WEBHOOK_URL = 'https://n8n.arjav.hackclub.app/webhook-test/525a65c7-54e6-44b7-b887-f9c5bc3f32f8';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Webhook request failed with status ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Failed to send webhook request' },
      { status: 500 }
    );
  }
} 