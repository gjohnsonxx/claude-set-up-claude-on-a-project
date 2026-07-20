const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const request = require("supertest");

const app = require("../server");

test("PUT /users/:id updates an existing user", async () => {
  const created = await request(app)
    .post("/users")
    .send({ name: "Grace Hopper", email: "grace@example.com" });

  const res = await request(app)
    .put(`/users/${created.body.id}`)
    .send({ name: "Grace B. Hopper", email: "grace.hopper@example.com" });

  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.body.name, "Grace B. Hopper");
  assert.strictEqual(res.body.email, "grace.hopper@example.com");
});

test("PUT /users/:id returns 404 for a user that does not exist", async () => {
  const res = await request(app)
    .put("/users/9999")
    .send({ name: "Nobody", email: "nobody@example.com" });

  assert.strictEqual(res.status, 404);
});

test("PUT /users/:id with a missing field returns 400", async () => {
  const created = await request(app)
    .post("/users")
    .send({ name: "Ada Lovelace", email: "ada.l@example.com" });

  const res = await request(app)
    .put(`/users/${created.body.id}`)
    .send({ name: "Ada Lovelace" });

  assert.strictEqual(res.status, 400);
});

test("NOTES.md is present and has real content", () => {
  const notesPath = path.join(__dirname, "..", "NOTES.md");

  assert.ok(fs.existsSync(notesPath), "NOTES.md should exist at the project root");

  const contents = fs.readFileSync(notesPath, "utf8").trim();
  assert.ok(contents.length > 50, "NOTES.md should have real content, not a stub");
});
