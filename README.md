# url-shortener

Shorten URLs and track how many times each one is clicked.

Uses a local Express API with PostgreSQL to store the mappings. Short codes are random 6-character strings.

## Setup

```bash
# Requires PostgreSQL
cp .env.example .env  # add DATABASE_URL
npm install
npm run db:push
npm run dev
```

## API

```
POST /api/shorten   { url: https://... }  → { shortCode, shortUrl }
GET  /:code         → redirects to original URL
GET  /api/stats/:code  → { clicks, createdAt }
```
