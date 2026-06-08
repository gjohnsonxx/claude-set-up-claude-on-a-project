# Notes

## CLAUDE.md
I kept the file to four short sections: a one-line description, the three commands I run most, the conventions that aren't obvious from reading the code, and a short architecture map. I left out anything the code already makes clear, one-off tasks, and anything sensitive — the aim was for every line to save Claude from asking a question, and nothing more.

## Permissions
I allowed `npm test` and `npm run lint` because they're safe and I run them constantly, so approving them each time would just be friction. I set `git push` to ask, so a push never happens without my say-so. I denied reading `.env` and force-pushing: without the `.env` rule Claude could pull secrets into the conversation, and without the force-push rule a stray command could overwrite shared history on the remote.

## Verification
In a fresh session, `/memory` shows this CLAUDE.md as loaded and `/permissions` lists the rules above. Asking "How do I run the tests here?" returns `npm test` from the file without me explaining.
