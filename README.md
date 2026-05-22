# HashMicro ERP EDM Template

Production-ready HTML email template for HashMicro's B2B prospecting campaign.

## Quick Start

```sh
npm install           # install dependencies
docker compose up -d  # start Mailpit (SMTP :1025, UI :8025)
npm run dev           # build template + send via Mailpit
```

Open [http://localhost:8025](http://localhost:8025) to preview the rendered email.

## Commands

| Command | Action |
|---|---|
| `npm run build` | Generate `template.html` from component source |
| `npm run send` | Send `template.html` via Mailpit |
| `npm run dev` | Build + send (one command) |
| `docker compose up -d` | Start Mailpit |
| `docker compose down` | Stop Mailpit |

## Project Structure

```
├── cmd/
│   ├── build-email.js     # DRY component functions → template.html
│   └── send-email.js      # Sends template.html via nodemailer
├── template.html          # Generated output (do not edit directly)
├── docker-compose.yml     # Mailpit SMTP server
└── package.json
```

## Editing the Template

Edit `cmd/build-email.js` — it defines reusable components (spacers, dividers, feature columns, module cells, etc.) and design tokens at the top:

```js
const RED = "#C41E3A";
const FONT = "font-family:'Inter', ...";
```

Change a token → `npm run dev` → see result in Mailpit.

## Email Client Compatibility

| Client | Inter font | Fallback |
|---|---|---|
| Apple Mail (macOS/iOS) | ✅ | — |
| Outlook for Mac | ✅ | — |
| Samsung Mail | ✅ | — |
| Gmail (all) | ❌ | Arial / Segoe UI |
| Outlook Windows | ❌ | Arial |
| Yahoo | ❌ | Arial |

The `<link>` tag for Inter is ignored by clients that don't support web fonts; the system font stack ensures a clean modern look everywhere.

## Before Production Blast

1. Replace `[Unsubscribe_Link]` with your ESP's unsubscribe merge tag
2. Update `sender@example.com` / `recipient@example.com` in `cmd/send-email.js`
3. Pin dependency versions and test across real email clients
