import ContactForm from "@/components/contact-form"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-4xl px-6 py-8">
          <h1 className="text-balance text-4xl font-bold text-foreground">Свяжитесь с нами</h1>
          <p className="mt-2 text-lg text-muted-foreground">Отправьте нам сообщение и мы ответим в ближайшее время</p>
        </div>
      </header>

      {/* Main Content */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Left Column */}
          <div>
            <h2 className="mb-6 text-2xl font-bold text-foreground">Имеем вопросы?</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground">Быстрый ответ</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Мы получим ваше сообщение в Telegram и ответим в течение одного часа
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Безопасность</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Все данные защищены и обрабатываются конфиденциально
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Поддержка</h3>
                <p className="mt-2 text-sm text-muted-foreground">Готовы помочь вам в решении любых вопросов</p>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="mx-auto max-w-4xl px-6 text-center text-sm text-muted-foreground">
          <p>© 2025 Все права защищены</p>
        </div>
      </footer>
    </main>
  )
}
