# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

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
