import { type NextRequest, NextResponse } from "next/server"

// ============================================================================
// TELEGRAM INTEGRATION
// ============================================================================
// Эта функция использует Telegram Bot API для отправки сообщений в чат.
//
// Требуемые переменные окружения:
// - TELEGRAM_BOT_TOKEN: Токен бота от @BotFather (формат: "123456:ABC-DEF...")
// - TELEGRAM_CHAT_ID: ID чата/группы где получать сообщения (может быть отрицательным для групп)
//
// Как это работает:
// 1. Пользователь заполняет форму на сайте (имя, email, сообщение)
// 2. Форма отправляет POST запрос на /api/send-message
// 3. API проверяет данные и форматирует сообщение
// 4. Сообщение отправляется на Telegram Bot API
// 5. Бот отправляет сообщение в указанный чат (chat_id)
// ============================================================================

const TELEGRAM_BOT_TOKEN = "8576828258:AAFN-9Vo0FrGqbp8IDLbPzjf83GDiWiUSeY"
const TELEGRAM_CHAT_ID = "-5058366830"

export async function POST(request: NextRequest) {
  try {
    // Validate environment variables
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error("[v0] Missing Telegram credentials")
      return NextResponse.json({ error: "Telegram credentials not configured" }, { status: 500 })
    }

    // Parse request body
    const body = await request.json()
    const { name, email, message } = body

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Format message for Telegram
    const telegramMessage = `
📬 <b>Новое сообщение с сайта</b>

<b>Имя:</b> ${escapeHTML(name)}
<b>Email:</b> ${escapeHTML(email)}

<b>Сообщение:</b>
${escapeHTML(message)}
    `.trim()

    // Send to Telegram using the official Telegram Bot API
    // Endpoint: https://api.telegram.org/bot{TOKEN}/sendMessage
    // Документация: https://core.telegram.org/bots/api#sendmessage
    const telegramResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID, // Куда отправить сообщение
        text: telegramMessage, // Содержание сообщения
        parse_mode: "HTML", // Форматирование (поддерживает <b>, <i>, и т.д.)
      }),
    })

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.json()
      console.error("[v0] Telegram API error:", errorData)
      return NextResponse.json({ error: "Failed to send message to Telegram" }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: "Message sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("[v0] Error in send-message route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function escapeHTML(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }
  return text.replace(/[&<>"']/g, (char) => map[char])
}
