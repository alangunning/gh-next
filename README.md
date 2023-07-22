# A clone of github\* in Next.JS

<small>
*  only some features are implemented : issues CRUD & notifications 
</small>

## ⚠️ THIS PROJECT IS IN ACTIVE DEVELOPMENT !!

## Roadmap

- [x] Login/Logout
- [x] HomePage (README content)
- [x] Responsive Layout
- [x] Settings page for toggling theme
- [ ] See Profile informations
  - [ ] Delete account and all the issues openned
- [ ] Issues List page
  - [ ] Search & filter issues by author, label, assignee, closed/open, title, mentions, etc. (Inspiration: https://github.com/openstatusHQ/openstatus, https://docs.github.com/en/issues/tracking-your-work-with-issues/filtering-and-searching-issues-and-pull-requests)
- [ ] New issue page
  - [ ] Issue CRUD (by the author only)
  - [ ] Comments CRUD
  - [ ] Mentions
  - [ ] Issue Popovers (for previewing issues)
  - [ ] Linking between issues
  - [ ] Assign & self assign issues
- [ ] Labels CRUD (can only add or update labels, no deleting)
- [ ] Notifications page
  - [ ] Notifications badge (Inspiration: https://gist.github.com/Fredkiss3/ab918aee3977d681f0508537a44838c0, https://github.com/Fredkiss3/bunrest)
  - [ ] Notifications for issues subscriptions
  - [ ] Notifications for mentions
  - [ ] Notifications for issue statuses
  - [ ] Filter notifications by status, title, closed, etc.
  - [ ] Mark as done, unsubscribe

# Stack

- [Next App Router](https://nextjs.org/docs/app)
- [drizzle](https://orm.drizzle.team/) + [turso](https://turso.tech/)
- [cloudfare](https://cloudfare.com) for the hosting
- [tailwindCSS](https://tailwindcss.com/) for the styling

- [bun](https://bun.sh/) + [honojs](https://hono.dev/) for replacing a local instance of [cloudfare KV](https://developers.cloudflare.com/workers/runtime-apis/kv), used for sessions and caching of data

# Requirements

- Node >= v16.6.2
- [PNPM](https://pnpm.io/installation) >= v6.22.2
- A [turso](https://turso.tech/) database
- A registered [github app](https://docs.github.com/en/apps/creating-github-apps/registering-a-github-app/registering-a-github-app) for authenticating users

## 🚀 How to work on the project ?

1. First you have to clone the repository

   ```bash
   git clone https://github.com/Fredkiss3/gh-next.git
   ```

2. **Install the dependencies on the bun server and launch it :**

   ```bash
   cd server
   bun install
   bun run dev
   ```

   the server will be open at http://127.0.0.1:3001

3. **Move to the `www` folder :**

4. **Then, Install the dependencies :**

   ```bash
   pnpm install
   ```

5. Rename `.env.example` to `.env.local` And change the file to your needs,

6. **And launch the project :**

   ```bash
   pnpm run dev
   ```

   The app will show at [http://localhost:3000](http://localhost:3000).

7. **Open the source code and start rocking ! 😎**

## 🧐 Project structure

A quick look at the top-level files and directories you will see in this project.

    .
    ├── server/
    └── www/
         ├── src/
         │    ├── app/
         │    │   ├── (actions)
         │    │   ├── (components)
         │    │   ├── (models)
         │    │   └── (routes)
         │    └──lib/
         │        ├── db/schema
         │        └── hooks
         ├── .prettierrc
         ├── pnpm-lock.yaml
         └── tsconfig.json

1. **`server/`**: this folder contains the source code to a local server implemented in bun used for replacing the Key/Value Store on cloudfare, since we use edge runtime for our projet we couldn't have just done it in our next app as it store keys in files and we don't have access to FILE I/O on edge runtime.

1. **`www/src/app/`**: this folder contains the source code to our app :

   1. **`(actions)`** : this folder contains all the logic of our app.

   2. **`(components)`** : this folder contains all the components of our app.

   3. **`(models)`** : this folder contains all the DB models of our app.

   4. **`(routes)`** : this folder contains all the routes & pages of our app.

1. **`www/src/lib/`**: this folder contains utils & helpers used throughout our app :

   1. **`db/schema`** : this folder contains all the drizzle sqlite schema for our DB.

   2. **`hooks`** : this folder contains all the react custom hooks used in the app.

1. **`www/.prettierrc`**: this file contains the configuration for prettier to enable autoformatting.

1. **`www/pnpm-lock.yaml`**: this file contains the dependencies lock for the repo.

1. **`www/tsconfig.json`**: this file contains the configuration for typescript, that are used by the all the underlying packages

## 🍳 ENV VARIABLES USED

| Nom                   | role                                                                          |
| :-------------------- | :---------------------------------------------------------------------------- |
| `SESSION_SECRET`      | random 32 chars length string used to encode the session id                   |
| `TURSO_DB_TOKEN`      | DB token used to authenticate to turso                                        |
| `TURSO_DB_URL`        | DB url of the turso DB                                                        |
| `KV_REST_URL`         | LOCAL file server URL for storing key values                                  |
| `GITHUB_CLIENT_ID`    | github client id stored for our app used for authenticating users with github |
| `GITHUB_REDIRECT_URI` | URL to redirect when a user has been authenticated                            |
| `GITHUB_SECRET`       | github secret stored for our app                                              |
