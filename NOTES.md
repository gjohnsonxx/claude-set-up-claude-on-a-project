# NOTES.md — update-user endpoint

## The plan

The plan was small and mapped directly onto the existing code: add a
`PUT /users/:id` route in `routes/users.js`, add a matching `updateUser(id, data)`
helper in `db/store.js` (mirroring `createUser`), and follow the same
validation pattern the `POST /users` route already uses (`!name || !email`).

The tests for this endpoint (`tests/update-user.test.js`) didn't exist in
this copy of the repo when I started, so writing them was the first step
rather than something to review — I wrote them to match the contract in
the assignment (200 on update, 404 for an unknown id, 400 for a missing
field) and the style of the existing `tests/users.test.js`. The one thing
I decided deliberately, rather than it being handed to me, was the order
of checks in the route: look up the user first and return 404 if it's
missing *before* validating the request body, so an unknown id always
404s regardless of what was sent — a bad body on a nonexistent resource
shouldn't read as a 400.

## Model choice

Used Sonnet 5 (the model this session is running as). The task is a small,
well-scoped CRUD addition to a tiny codebase with a clear existing pattern
to follow (`createUser`/`POST /users`) — well within a mid-sized model's
comfort zone, no need for a heavier reasoning model.

## Commit split

Two commits:

1. `Add tests for the update-user endpoint` — the test file on its own,
   so the "red" state (tests written, feature missing) is a real,
   inspectable point in history, same as if the tests had shipped with
   the starter repo.
2. `Add PUT /users/:id to update an existing user` — the route and store
   changes together, since they're one indivisible unit of behavior; splitting
   the store helper from the route that calls it would leave either commit
   non-functional on its own.

## What review caught

Reviewing the diff before writing this up, I found one thing worth
noting rather than fixing: the route calls `store.getUserById(id)` for
the existence check, then `store.updateUser` calls it again internally
to do the mutation. That's a redundant lookup, but on a tiny in-memory
array it's not worth adding an internal-only variant of `updateUser`
just to shave one `.find()` call — so I left it. I also checked the
non-numeric-id case (`PUT /users/abc`): `Number("abc")` is `NaN`, and
since `NaN === NaN` is false, `getUserById` correctly returns `undefined`
and the route 404s instead of crashing — no fix needed there, just
confirmed it already worked.
