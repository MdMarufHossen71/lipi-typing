# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

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
