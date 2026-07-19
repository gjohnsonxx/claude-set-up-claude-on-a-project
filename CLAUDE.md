# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A starter Express REST API with an in-memory data store. No database — data resets on every restart.

## Commands

- `npm run dev` — start the API with file watching (http://localhost:3000)
- `npm test` — run all tests (Node built-in test runner)
- `npm run lint` — ESLint check

## Architecture

- `server.js` — Express app entry point; exports `app` without starting the server when imported (so tests can use supertest without opening a port)
- `routes/` — one file per resource (`users.js`, `health.js`), each exports an Express Router
- `db/store.js` — in-memory data store; all data access goes through this module
- `tests/` — tests use `node:test` + `supertest`; they import `app` directly from `server.js`

## Conventions

- CommonJS (`require` / `module.exports`), not ESM
- Node 22 (CI target)
- Config via environment variables; real secrets go in `.env` (git-ignored), see `.env.example` for shape
