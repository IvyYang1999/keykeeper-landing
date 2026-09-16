---
title: Provider templates
description: What KeyKeeper knows about each service — where the key is made, what to pick, what the key looks like, and how it is verified.
---

{{COUNTS}} A template is what an agent needs to get a key the user does not have yet, without ever
seeing its value. `keykeeper providers` lists them; `keykeeper providers show <id>` prints one
as JSON. The agent opens the official page for you, says what to choose, and once you have
copied the key it saves it with `keykeeper save --provider <id>`.

Every template records:

- **Where** the key is created, and the steps only a person can do there (login, 2FA, billing, choosing a project).
- **What to choose** for the smallest useful permission.
- **What the key looks like** — a wrong paste is refused before anything is written.
- **How KeyKeeper verifies it** after saving, with a read-only request the agent never sees the value of.
- **Rotation and expiry**, and the date the template was last checked against the provider's own pages.

Templates are checked against official documentation, not memory. If a provider changes its
console, [open an issue](https://github.com/IvyYang1999/KeyKeeper/issues).
