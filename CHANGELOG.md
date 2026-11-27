# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Fixed — production audit (2026-11-28)

#### Typing text variety & engine correctness
- **Every test opened with the same text**: `pickText()` cycled all pools from index 0, so repeated runs were identical. Each cycle now starts at a random pool index — verified live across consecutive runs.
- **Unicode normalisation**: the engine now NFC-normalises text before comparing. Decomposed য/ড/ঢ+nukta (what our pools store) vs precomposed য়/ড়/ঢ় (what some IMEs emit) previously scored wrong despite looking identical; 40 decomposed sequences existed in the pools.
- **Custom duration was exploitable/unstable**: `-5` finished a test in 0.2 s and saved `durationSec: -300`; `0.01` gave a 0.6 s test; `999` generated ~220 k characters and froze the tab (O(n²) text building + 220 k rendered spans). The value is now clamped in app logic to 1–60 integer minutes, and text building is O(n).
- **Paste-to-win**: pasting the full target text instantly finished the test and saved a ~56 000 CPM result. Paste is now blocked in the typing-test input (practice stays paste-friendly since nothing is saved there).
- **Beginner mode ignored duration**: it always produced the same ~90-character target, ending long tests in seconds; it now scales like the other modes.
- **Practice "New drill" lied**: the Shuffle button deterministically cycled back after 4 clicks (beginner) / 10 clicks (sentence). It now picks a true random item (never the same twice in a row).
- 8 more Bangla + 3 more English paragraphs, 8 sentences and 4 advanced texts added for genuine variety (now 13 bn / 10 en paragraphs).

#### Honesty & content consistency
- FAQ/About still claimed "no account or server" after accounts + cloud sync shipped. FAQ now explains guest-local vs signed-in-cloud storage and what creating an account does; About's "accounts are future work" framing corrected; dashboard subtitle updated.
- Dashboard metric renamed **"Total practice time" → "Total test time"** (it only ever summed test history).
- **Contact form no longer fakes success**: submitting opens the visitor's email client with the message pre-filled (mailto) — honest about what happens; direct email address shown.
- Practice page now states the OS-IME requirement for Bangla input (previously only on the test page).

#### Performance & SEO
- **Main bundle cut 535 KB → 318 KB (153 → 98 KB gzip)**: `@supabase/supabase-js` was statically imported into the entry chunk; it now lazy-loads in its own async chunk that guests (and deployments without env vars) never download.
- Tests are now hard-isolated from the developer's real `.env.local` — no test can reach the live Supabase project.
- Added the missing `public/sitemap.xml` (robots.txt pointed at a 404), per-route canonical URLs, `og:url`, and corrected `twitter:card` to `summary` (no OG image exists).
- Avro engine integration investigated (jQuery-free port `nodejs-avro-phonetic`: unmaintained, Node-only, unknown bundle cost) — documented in README; the simplified converter remains, clearly labelled.
- Contact form labels now use `htmlFor`/ids for screen readers.
- 11 new tests: text variety, length scaling, beginner duration scaling, custom-duration clamping (negative/decimal/huge), NFC decomposition equality. **84 tests total, all passing.**

### Added — accounts & cloud sync (Supabase)
- **Optional accounts**: email/password sign-up with full name, email confirmation, sign-in with show/hide password, Google OAuth (application flow implemented; provider configuration is a dashboard task), password recovery + update flow, account page with display-name editing and sign-out. Auth pages: `/login`, `/register`, `/forgot-password`, `/update-password`, `/auth/callback`, `/account` (guarded).
- **Central AuthContext** with session restore, `onAuthStateChange` listener, lazy profile creation (covers users created before the migration) and stable bilingual error codes.
- **Database**: `supabase/migrations/0001_init.sql` — `profiles`, `typing_results` (mirrors `TestResult`; `legacy_id` unique index for dedup), `lesson_progress` (unique per user+lesson), auto-profile trigger on `auth.users`, `updated_at` trigger, indexes, and **Row Level Security on every table** (select/insert/update/delete all restricted to `auth.uid()`).
- **Cloud sync** (`src/lib/cloudSync.ts`): migration of localStorage progress to the cloud, deduplicated by `legacy_id` / `(user_id, lesson_id)` and idempotent on re-runs; local data is never deleted; failed cloud writes stay local and can be retried from Account → Sync local progress.
- **Unified data hook** (`useUserData`): signed-in dashboards/history show cloud records merged over local-only ones; guests keep the localStorage stores unchanged.
- **Guest-first**: with no Supabase env vars the app is 100% guest mode (auth UI hidden) — no crashes, no behaviour change.
- Navbar avatar menu (profile, sign out) and sign-in/sign-up actions; dashboard guest invitation card.
- `.env.example`; README Supabase/Google-OAuth setup checklist + troubleshooting guide.
- 17 new tests (mocked Supabase client): auth state transitions, session restore, lazy profile creation, sign-in/sign-out, error-code mapping, registration validation, cloud-sync dedup/idempotency/error paths, guest invariance, callback error branch (73 total).

### Fixed (UI/UX audit, 2026-11-27)
- **Lesson completion UI was stale**: marking a lesson complete wrote localStorage but the React UI (sidebar checkmarks, completed badge) only updated after navigating. Progress now flows through a reactive store (`useSyncExternalStore` + change events), so every view updates instantly.
- **Typing-test timer drift**: elapsed time was accumulated from fixed 0.2 s interval ticks, which lagged real time whenever the browser throttled a background tab. Elapsed time is now derived from a wall-clock anchor; results are also guarded against double-saving (interval expiry + target-complete + Finish button race, and React StrictMode's double-invoked updaters).
- **Timed "Another" test ended instantly**: it picked a single short paragraph regardless of the configured duration; it now builds duration-scaled text.
- **Practice box counted UTF-16 units instead of graphemes**, so Bangla conjuncts (e.g. ক্ষ) let the "done" state trigger before the word was fully typed. Character counting is now grapheme-based, consistent with the typing engine.
- **Interactive keyboard page blocked Tab and Space** (`preventDefault`) to highlight pressed keys, breaking keyboard navigation and scrolling. Highlighting is now observation-only, skips text fields, and clears on window blur.
- **Lesson "Back" link went to the homepage** (`to=".."` resolves to `/` on flat routes). It now links to the Learn hub explicitly.
- Homepage stats inflated "30+ lessons"; corrected to the real count (18).

### Changed (UI/UX redesign)
- New visual system: indigo primary + teal accent palettes, layered card shadows, rounded-2xl surfaces, gradient hero/CTA helpers, `prefers-reduced-motion` support, refined dark mode.
- Homepage redesigned: two-column hero with a decorative finger-coloured keyboard preview, three-step "How it works", learning-path cards with **real per-track progress**, honest stats band.
- Navbar: active-route pills, dropdown highlight for active sections, slide-in mobile drawer (backdrop, Escape-to-close, body scroll lock).
- Lesson view: icon-led sections, numbered instructions, quiz with radiogroup semantics, score and retry, practice box with done badge and clear button.
- Typing test: accessible segmented controls, sticky live stats bar, labelled custom-duration input.
- Practice page is now a genuinely different experience: beginner/sentence drills plus free typing with instant per-character feedback — no timers, nothing saved (measurement stays on the Typing Test page).
- Dashboard: inline-SVG charts (CPM sparkline, per-method bars, 14-day activity strip) with no charting dependency; stats computation extracted to a pure function for the upcoming cloud data path.
- History: responsive presentation (cards on mobile, table on desktop) with friendly empty states.
- Every new string is bilingual (bn/en) and guarded by the dictionary parity test; screenshots in the README refreshed.

### Fixed
- **Typing test custom duration**: selecting Custom previously ended a timed test after 0.2 s (the timer compared against the placeholder `0` instead of the chosen minutes).
- **Typing test language/method mismatch**: an English test could be recorded as "Avro (phonetic)", which skewed the dashboard's per-method best speeds. English now selects QWERTY only; Bangla offers Avro/Bijoy, falling back to Avro when switching back from English.
- **Simplified Avro converter**: diphthongs `oi`/`ou` now match before the single-letter `o` rule, so `koi` → কৈ and `kou` → কৌ (previously কোই/কোউ), matching the Avro lesson tables.
- Lesson example `shikkha o projukti` replaced with the converter-verified `shikkha o biggan` (the simplified engine cannot reproduce প্রযুক্তি, which real Avro derives from dictionary rules).

### Added
- Typing-test component tests (7): method/language consistency, custom-duration timing, saved-method checks; pill buttons expose `aria-pressed`.
- Data-integrity tests: i18n bn/en key parity, quiz structural validity, unique lesson ids, a quiz in every lesson, and a guarantee that every roman example in the Avro lessons is reproduced by the simplified converter.
- Quizzes in all 18 lessons (Bijoy and English tracks previously had none), answers verified against the layout data.
- 11 more converter-verified Avro example words (amader, akash, Dhaka, bhalo, …) locked by unit tests.
- 6 more typing-test paragraphs (3 Bangla, 3 English) and 4 more sentences.
- `public/robots.txt`, minimal `public/site.webmanifest` (manifest linked in index.html).
- README with feature list, honest implementation notes and verified sources.
- GitHub Actions CI workflow + committed `package-lock.json`.

## [1.0.0] — 2026-11-26

### Added
- Initial release of **Lipi** — a bilingual (Bangla & English) typing learning platform.
- **Avro Phonetic course** (6 lessons) with verified mapping tables and a simplified live converter.
- **Bijoy keyboard course** (6 lessons) using the Unicode Bijoy mapping (m17n source).
- **Bijoy Bayanno guide** — install, Unicode/ANSI modes, troubleshooting, licensing.
- **English typing course** (6 lessons) — QWERTY, home row, finger placement, touch typing.
- **Interactive visual keyboard** — QWERTY (with finger colours) and Bijoy layouts, shift toggle, live key-press highlight.
- **Typing test engine** — language/method/mode/duration selectors, live grapheme-based WPM/CPM/accuracy, results, share/copy, localStorage history.
- **Learning dashboard** — overall progress, best speed, average accuracy, recent activity, recommended next lesson.
- **15 pages** — Home, Learn Bangla, Avro, Bijoy, Bijoy Bayanno, English, Interactive Keyboard, Practice, Typing Test, Dashboard, History, FAQ, About, References, Contact (+ 404).
- Bilingual UI (Bangla default + English) with an extensible i18n system.
- Light/dark mode, responsive layout, mobile navigation, keyboard accessibility.
- Vitest unit tests for the typing engine and Avro converter (26 tests).
- Vercel deployment config (`vercel.json` with SPA rewrite).
- GitHub Actions CI workflow (lint, test, build).
- Full documentation: README, CONTRIBUTING, LICENSE (MIT), CHANGELOG.

### Notes
- The Avro converter is a **simplified learning tool**, not the full Avro engine (see README "Keyboard implementation notes").
- No proprietary software is distributed.
