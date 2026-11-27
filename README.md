# লিপি — Lipi Typing Academy

A free, open-source, bilingual (Bangla + English) typing learning platform.
Bangla is the default interface language. **The whole site works without an
account** — progress is stored locally in your browser. An optional free
account (email/password or Google) adds cross-device cloud sync via Supabase.

**Live:** https://lipi-typing.vercel.app

## Features

- **Avro Phonetic course** — 6 lessons on phonetic Bangla typing (English letters → Bangla), with a simplified live converter for practice.
- **Bijoy keyboard course** — 6 lessons on the Unicode Bijoy mapping (Bangladesh's national layout, BDS 1738:2018), with an interactive visual keyboard.
- **Bijoy Bayanno guide** — install, Unicode/ANSI modes and troubleshooting, following official sources only.
- **English typing course** — 6 lessons on QWERTY, home row, finger placement and touch typing.
- **Interactive keyboard** — visual QWERTY + Bijoy layouts with finger colours, shift toggle and live key-press highlight.
- **Typing test** — language / method / mode / duration selectors, live CPM, WPM and accuracy, share & copy result.
- **Practice mode** — casual drills and free typing with instant per-character feedback; nothing is saved.
- **Dashboard & history** — lesson progress, best speed, average accuracy, inline-SVG charts, recommended next lesson.
- **Optional accounts (Supabase)** — email/password + Google sign-in, email verification, password recovery, and automatic migration of your existing local progress to the cloud. Guests keep full functionality.
- **Bilingual UI** — Bangla (default) + English via a lightweight i18n context; dark/light theme; fully responsive.

## Honest implementation notes

- The built-in Avro converter (`avroConvert` in `src/data/avroLayout.ts`) is a
  **simplified learning tool** — a longest-match approximation, **not** the full
  Avro engine. For real phonetic typing, install [Avro Keyboard](https://omicronlab.com/avro-keyboard.html)
  (OmicronLab) or an IME that bundles the Avro Phonetic engine.
  We evaluated integrating a full engine: the only jQuery-free port
  ([nodejs-avro-phonetic](https://github.com/wahidsadik/nodejs-avro-phonetic), MPL-1.1)
  is ~a decade old, unmaintained, Node-targeted with unverified browser support
  and an unknown dictionary bundle size — so Lipi ships the honest simplified
  converter instead, and the browser still needs an OS-level IME for real
  Bangla input.
- Lipi does **not** bundle, mirror or redistribute Bijoy software or its
  proprietary fonts. Bijoy / Bijoy Bayanno are products of Ananda Computers —
  see the [official site](https://www.bijoyekushe.net.bd/) and the in-app
  [References page](https://lipi-typing.vercel.app/references).
- Typing speed is measured **per grapheme cluster** (`Intl.Segmenter`), so Bangla
  conjuncts (যুক্তাক্ষর) and vowel signs count as one character. **CPM is the
  primary metric for Bangla** — WPM is shown too, but a Bangla "word" is
  ambiguous, so CPM is the reliable number.

## Screenshots

| Home | Typing Test | Interactive Keyboard |
| --- | --- | --- |
| ![Home page — Bangla UI with course cards](docs/screenshots/home.png) | ![Typing test config — language, method, mode, duration](docs/screenshots/typing-test.png) | ![Interactive keyboard with finger colour guide](docs/screenshots/keyboard.png) |

## Tech stack

React 19 · TypeScript (strict) · Vite 8 · Tailwind CSS 3 · React Router 6 ·
lucide-react · Supabase (optional auth + Postgres) · Vitest + jsdom. No
tracking, no analytics.

The bundle is kept small for low-end PCs: routes are code-split with `lazy()`,
icon imports are tree-shaken, and there are no heavy UI libraries. Without
Supabase env vars the app degrades gracefully to 100% guest mode.

## How accounts & cloud sync work

- **Guest mode is the default.** Everything is saved in `localStorage` under
  the `lipi:` namespace (`lipi:test-history`, `lipi:lesson-completions`).
- **Signing in never deletes local data.** Local storage remains the offline
  cache; the cloud copy is written alongside it.
- On first sync, existing local progress is uploaded and **deduplicated** by
  the client-side record id (`legacy_id`) and by `(user_id, lesson_id)` —
  running the sync again is always safe.
- Signed-in dashboards show cloud records merged over local-only ones;
  failed cloud writes fall back to local storage and can be retried from
  **Account → Sync local progress**.

## Supabase setup

The app reads two **browser-safe** variables (publishable key only — never the
service-role/secret key):

```
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
```

Local development: copy `.env.example` to `.env.local`, fill the values from
your Supabase project (Dashboard → Project Settings → API), and restart the
dev server. `.env.local` is gitignored.

Vercel: add the same two names for Production, Preview and Development
(Project → Settings → Environment Variables), then redeploy.

### Database migrations

Apply [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql)
— it creates `profiles`, `typing_results`, `lesson_progress`, the
`updated_at` trigger, the auto-profile trigger on `auth.users`, indexes and
**Row Level Security policies for every table** (each user can only read /
insert / update / delete their own rows; `auth.uid()` is evaluated
server-side, so a spoofed `user_id` is rejected).

Two ways to apply it:

1. **Supabase dashboard** → SQL Editor → paste the file → Run.
2. **Supabase CLI** (if linked): `supabase db push`.

### Email auth

Supabase Auth → Providers → Email is on by default. Configure the sender/SMTP
or use the built-in one. In **Authentication → URL Configuration** set:

- Site URL: `https://lipi-typing.vercel.app`
- Redirect URLs:
  - `https://lipi-typing.vercel.app/auth/callback`
  - `http://localhost:5173/auth/callback`

### Google OAuth setup checklist

Google sign-in needs your own Google Cloud credentials (none are bundled):

1. [Google Cloud Console](https://console.cloud.google.com/) → create an OAuth **Web** client.
2. **Authorized JavaScript origins**: `https://lipi-typing.vercel.app` and `http://localhost:5173`.
3. **Authorized redirect URI**: copy the exact callback URL shown in Supabase
   (Authentication → Providers → Google), it looks like
   `https://<your-project-ref>.supabase.co/auth/v1/callback`.
4. Paste the Client ID + Client Secret into Supabase → Authentication →
   Providers → Google → Save.
5. Verify the URL Configuration redirects above.
6. The app-side flow is implemented (`supabase.auth.signInWithOAuth` +
   `/auth/callback` PKCE exchange) — mark it as working only after a real
   sign-in test.

## Troubleshooting

- **Sign-up says "check your email"** — email confirmation is enabled in
  Supabase; follow the link, then sign in.
- **Reset link expired / "invalid link"** — request a new one from the
  forgot-password page; links are single-use and time-limited.
- **"Invalid API credentials" / auth buttons hidden** — the `VITE_SUPABASE_*`
  env vars are missing; add them and redeploy (the site still works as guest).
- **"User already registered"** — that email has an account; sign in instead.
- **Too many requests** — Supabase rate limiting; wait a minute.
- **Data not syncing** — check Account → Sync local progress; it shows what
  was uploaded and any errors. Local data is never deleted on failure.
- **RLS errors in the console** — a query tried to touch another user's row;
  all client queries go through the current `auth.uid()`, so this should not
  happen in normal use.

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # type-check + production build
npm test          # Vitest unit tests
npm run lint      # oxlint
```

## Project structure

```
src/
  components/   # Layout, Navbar, Footer, TypingTest, VirtualKeyboard, LessonView, charts, auth shell
  contexts/     # AuthContext (Supabase session, profile, auth actions)
  data/         # keyboard layouts, lesson data, test texts, FAQ, references
  i18n/         # bn.ts + en.ts dictionaries, I18nContext
  lib/          # typing engine, progress store (reactive), supabase client, cloudSync
  pages/        # 15 content pages + auth pages + 404
  theme/        # dark/light ThemeContext
supabase/
  migrations/   # SQL schema + RLS policies (apply via dashboard or CLI)
```

## Keyboard implementation notes

- **QWERTY** layout: standard ANSI physical layout, matched by `KeyboardEvent.code`.
- **Bijoy layout**: the community/m17n **Unicode** Bijoy mapping
  (`bn-bijoyUnicode.mim`, BijoyLinux), cross-validated against published
  references. Legacy "Bijoy Classic" ANSI/font encoding is documented — not
  emulated — on the Bijoy Bayanno guide page.

## Sources & references

Every mapping, lesson and guide is verified against public sources, listed on
the [References page](src/data/references.ts) and in-app. Key ones:

- [Avro Keyboard — OmicronLab](https://omicronlab.com/avro-keyboard.html) (MPL-1.1)
- [jsAvroPhonetic](https://github.com/dipu-bd/jsAvroPhonetic) (mapping verification)
- [OpenBangla Keyboard](https://github.com/OpenBangla/OpenBangla-Keyboard) (GPL-3.0)
- [m17n bn-bijoyUnicode.mim (BijoyLinux)](https://github.com/asikdial-tech/BijoyLinux)
- [Bijoy Ekushe — Ananda Computers](https://www.bijoyekushe.net.bd/)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Bug reports and PRs are welcome —
please keep the honesty rules: no fake features, no bundled proprietary
software, bilingual UI for every string.

## License

[MIT](LICENSE) · Bijoy and Bijoy Bayanno remain proprietary software of
Ananda Computers; the Avro Phonetic scheme is by OmicronLab (MPL-1.1).
