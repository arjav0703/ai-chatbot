"use client";
import { useEffect } from 'react';
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';


export default function App() {
	useEffect(() => {
		createChat({
			webhookUrl: 'https://n8n.arjav.hackclub.app/webhook/0d26c855-4594-4a4b-8f83-e2f062ff051d/chat',
      webhookConfig: {
        method: 'POST',
        headers: {}
      },
      target: '#n8n-chat',
      mode: 'fullscreen',
      chatInputKey: 'chatInput',
      chatSessionKey: 'sessionId',
      metadata: {},
      showWelcomeScreen: false,
      defaultLanguage: 'en',
      initialMessages: [
        'Hi there! 👋',
        'I am Chemi. I am here to help you with your questions.'
      ],
      i18n: {
        en: {
          title: 'Hi there! 👋',
          subtitle: "Start a chat. We're here to help you 24/7.",
          footer: '',
          getStarted: 'New Conversation',
          inputPlaceholder: 'Type your question..',
          closeButtonTooltip: 'Close chat',
        },
      },

		});
	}, []);

	return (
    <div className='justify-end'>
      <div id="n8n-chat" className='w-4/5'/>
    </div>
  );
};
