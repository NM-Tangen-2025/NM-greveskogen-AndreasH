# This is a [Next.js](https://nextjs.org) project template made with [Bootstrap](https://getbootstrap.com/) and mysql2

This page can be viewed at [Vercel](https://tall-ship-races.vercel.app/)

## Getting Started

I recommend using pnpm as it is the package manager i am using

First, install all packages:

```bash
pnpm install
# or
npm install
```

Then add this to your .env file:

```bash
CMS_API_KEY=1330d7d0a7e52fbcf4779861a6948373dff5f06b8bbce4cc0d08025276bb45ce3114590200d5b3cb7d0a856325f55c71e170fc2f2e4508102712e4730fbfb075c745056641f618bee2e54bf7ccdb1a56c6c4e89d60ef7c25f728198bde97d7e4cfbb773f63336580c64084350f57ffba8a15e289b1016cbe4df256bc2928bd50
CMS_API_URL=https://fortunate-bear-715099df12.strapiapp.com
STRAPI_MEDIA_URL=https://fortunate-bear-715099df12.media.strapiapp.com
```

Those env variables are for communicating with the external api's

Then run the development server:

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## .env file structure

The **.env** file located in the root directory should have these variables defined like this, most of these are not used in this repo as of yet - unused env variables will be removed from this document before the task is over

### Database

```ts
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
```

### Supabase env variables

```ts
PUBLIC_SUPABASE_URL=
PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SECRET_KEY=
```

### Internal API key - this is needed for athentication between middleware and so API's

```ts
INT_API_KEY=
```

### Full env file can be copied from here

```ts
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
INT_API_KEY=
PUBLIC_SUPABASE_URL=
PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SECRET_KEY=
```
