# EDM Template

HTML email template with Mailpit for local testing.

## Setup

```sh
npm install
docker compose up -d
```

## Commands

| Command | Action |
|---|---|
| `npm run build` | Generate `template.html` |
| `npm run send` | Send via Mailpit (localhost:1025) |
| `npm run dev` | Build + send |
| `npm run all` | Build + send |

Open [http://localhost:8025](http://localhost:8025) to preview.

## Project Structure

```
├── cmd/
│   ├── build-email.js     # component functions → template.html
│   └── send-email.js      # sends template.html via nodemailer
├── template.html          # generated (do not edit)
├── docker-compose.yml     # Mailpit
└── package.json
```

## Editing

Edit `cmd/build-email.js`. Design tokens at the top:

```js
const RED = "#C41E3A";
const FONT = "font-family:'Inter', ...";
```

Rebuild with `npm run dev`.

## Notes

- `[Unsubscribe_Link]` in footer — replace with your ESP merge tag
- `sender@example.com` / `recipient@example.com` in `cmd/send-email.js` — update as needed
- Inter font via `<link>` ignored by Gmail/Outlook/Yahoo; falls back to system sans-serif
