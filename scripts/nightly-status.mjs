import fs from 'fs';
import { escapeHtml, formatTelegramStatus } from '../src/utils/telegramFormatter.js';

async function sendTelegramMessage(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error('TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing.');
    return;
  }
  
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: text, parse_mode: 'HTML' })
  });
  if (!res.ok) {
    console.error(`Telegram API error: ${res.status} ${res.statusText}`);
  }
}

async function run() {
  try {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_ANON_KEY;
    if (!url || !key) {
      throw new Error('SUPABASE_URL or SUPABASE_ANON_KEY is missing.');
    }

    const res = await fetch(`${url}/rest/v1/invoices?select=*`, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`
      }
    });

    if (!res.ok) {
      throw new Error(`Supabase fetch failed: ${res.status} ${res.statusText}`);
    }

    const invoices = await res.json();
    
    const message = formatTelegramStatus(invoices);

    await sendTelegramMessage(message);
    console.log("Successfully sent nightly status.");

  } catch (error) {
    console.error("Error occurred:", error);
    await sendTelegramMessage(`⚠️ Nightly status FAILED: ${escapeHtml(error.message)}`);
    process.exit(1);
  }
}

run();
