# This is a [Next.js](https://nextjs.org) project template made with [Bootstrap](https://getbootstrap.com/) and mysql2

## Getting Started

First, run the development server:

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
