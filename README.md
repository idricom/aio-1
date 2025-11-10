# AIO Chat — Full design + functionality starter

Этот репозиторий — готовый стартовый проект Next.js + Tailwind, соответствующий ТЗ.
Включает:
- Страницу чата с аккуратным дизайном (жидкое стекло), адаптивностью и анимациями.
- Серверный прокси для Hugging Face (чтобы хранить HF token в env).
- Серверные роуты для операций Supabase с service key.
- Инструкции по деплою на Vercel.

## Быстрый старт (локально)
1. Скопируй в репозиторий.
2. Установи зависимости: `npm install`
3. Добавь файл `.env.local` с переменными (пример ниже).
4. `npm run dev`

## Переменные окружения (.env.local)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_KEY=
HUGGINGFACE_API_KEY=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000

## Развёртывание
Подключи репозиторий к Vercel и добавь те же переменные окружения в Settings → Environment Variables.
Service keys (SUPABASE_SERVICE_KEY, HUGGINGFACE_API_KEY, GOOGLE_CLIENT_SECRET) — хранить как секреты.
