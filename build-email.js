const fs = require("fs");
const path = require("path");

// ─── Design Tokens (single source of truth) ───────────────
const RED = "#C41E3A";
const DARK = "#1A1A1A";
const BODY_TEXT = "#4A4A4A";
const MUTED = "#666666";
const LIGHT_TEXT = "#999999";
const BORDER = "#E8E8E8";
const BG_WHITE = "#FFFFFF";
const BG_FOOTER = "#FAFAFA";
const FONT = "font-family:'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";
const PADDING_SIDE = "padding:0 48px";

// ─── Helpers ─────────────────────────────────────────────
const spacer = h =>
  `<tr><td style="line-height:1px; font-size:1px;" height="${h}">&nbsp;</td></tr>`;

const divider = () =>
  `<tr><td style="${PADDING_SIDE};">
    <table cellpadding="0" cellspacing="0" width="100%">
      <tr><td style="border-top:1px solid ${BORDER}; line-height:1px; font-size:1px;" height="1">&nbsp;</td></tr>
    </table>
  </td></tr>`;

const sectionTitle = text =>
  `<tr><td style="${PADDING_SIDE}; text-align:center;">
    <h2 style="margin:0; font-size:20px; color:${DARK}; font-weight:600; letter-spacing:-0.3px;">${text}</h2>
  </td></tr>`;

const featureColumn = (num, title, text) =>
  `<td width="33%" style="padding:0 12px; vertical-align:top;">
    <table cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td align="center" style="padding-bottom:16px;">
          <div style="width:56px; height:56px; border:2px solid ${BORDER}; border-radius:50%; display:inline-block; line-height:52px; text-align:center;">
            <span style="font-size:24px; color:${RED}; font-weight:600;">${num}</span>
          </div>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding:0 0 12px 0; font-size:16px; font-weight:600; color:${DARK}; line-height:1.4; ${FONT};">${title}</td>
      </tr>
      <tr>
        <td align="center" style="font-size:14px; color:#5A5A5A; line-height:1.65; ${FONT};">${text}</td>
      </tr>
    </table>
  </td>`;

const moduleCell = (name, width, colSide) =>
  `<td width="${width}" style="padding:8px ${colSide === "right" ? "0" : "8px"} 8px ${colSide === "left" ? "0" : "8px"}; vertical-align:top;">
    <table cellpadding="0" cellspacing="0" width="100%" style="border:1px solid ${BORDER};">
      <tr>
        <td style="padding:16px 20px; font-size:14px; color:#2A2A2A; font-weight:500; text-align:center;">${name}</td>
      </tr>
    </table>
  </td>`;

const ctaButton = text =>
  `<tr><td align="center">
    <table cellpadding="0" cellspacing="0" align="center" role="presentation">
      <tr>
        <td align="center" style="background-color:${RED}; border-radius:2px;">
          <a href="#" style="display:inline-block; padding:15px 42px; font-size:14px; font-weight:600; color:${BG_WHITE}; text-decoration:none; letter-spacing:0.3px; line-height:1; ${FONT};">${text}</a>
        </td>
      </tr>
    </table>
  </td></tr>`;

// ─── Sections ─────────────────────────────────────────────
const header = `<tr>
  <td style="padding:32px 48px; border-bottom:1px solid ${BORDER};">
    <table cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td align="left" style="font-size:20px; font-weight:700; color:${RED}; letter-spacing:-0.3px; ${FONT};">HashMicro</td>
        <td align="right" style="font-size:11px; color:${MUTED}; letter-spacing:1.2px; text-transform:uppercase; font-weight:500; ${FONT};">Enterprise ERP</td>
      </tr>
    </table>
  </td>
</tr>`;

const hero = `<tr>
  <td style="${PADDING_SIDE}; text-align:center;">
    <h1 style="margin:0; font-size:32px; color:${DARK}; font-weight:600; line-height:1.3; letter-spacing:-0.5px; ${FONT};">
      Streamline Operations.<br />Drive Growth.
    </h1>
    <p style="margin:24px auto 0 auto; font-size:16px; color:${BODY_TEXT}; line-height:1.7; max-width:460px; font-weight:400; ${FONT};">
      HashMicro delivers comprehensive Cloud ERP solutions designed to optimize enterprise operations and enhance organizational efficiency.
    </p>
  </td>
</tr>`;

const features = `<tr>
  <td style="${PADDING_SIDE};">
    <table cellpadding="0" cellspacing="0" width="100%">
      <tr>
        ${featureColumn(1, "Operational Visibility", "Centralized data architecture providing real-time insights across all business functions.")}
        ${featureColumn(2, "Process Automation", "Intelligent workflow automation reducing manual intervention and operational overhead.")}
        ${featureColumn(3, "Cost Optimization", "Strategic resource allocation and supply chain optimization to maximize efficiency.")}
      </tr>
    </table>
  </td>
</tr>`;

const modules = `<tr>
  <td style="${PADDING_SIDE};">
    <table cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td style="text-align:center;">
          <h2 style="margin:0 0 12px 0; font-size:20px; color:${DARK}; font-weight:600; letter-spacing:-0.3px; ${FONT};">Integrated Modules</h2>
          <p style="margin:0 0 32px 0; font-size:14px; color:#5A5A5A; line-height:1.6; ${FONT};">Comprehensive suite of business management solutions</p>
        </td>
      </tr>
    </table>
    <table cellpadding="0" cellspacing="0" width="100%">
      <tr>${moduleCell("Financial Accounting", "50%", "left")}${moduleCell("Customer Relationship", "50%", "right")}</tr>
      <tr>${moduleCell("Inventory Management", "50%", "left")}${moduleCell("Human Resources", "50%", "right")}</tr>
      <tr>${moduleCell("Procurement Systems", "50%", "left")}${moduleCell("Manufacturing", "50%", "right")}</tr>
      <tr>
        <td colspan="2" style="padding:8px 0;">
          <table cellpadding="0" cellspacing="0" width="100%" style="border:1px solid ${BORDER};">
            <tr>
              <td style="padding:16px 20px; font-size:14px; color:#2A2A2A; font-weight:500; text-align:center; ${FONT};">Supply Chain Management</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </td>
</tr>`;

const trust = `<tr>
  <td style="${PADDING_SIDE}; text-align:center;">
    <p style="margin:0; font-size:13px; color:${MUTED}; line-height:1.6; font-weight:500; ${FONT};">Trusted by over 2,000 enterprises across Southeast Asia</p>
  </td>
</tr>`;

const footer = `<tr>
  <td style="padding:40px 48px; background-color:${BG_FOOTER}; border-top:1px solid ${BORDER};">
    <table cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td align="center">
          <p style="margin:0 0 4px 0; font-size:14px; color:${DARK}; font-weight:600; ${FONT};">HashMicro Pte Ltd</p>
          <p style="margin:0 0 20px 0; font-size:13px; color:${MUTED}; line-height:1.6; ${FONT};">1 Raffles Place, #20-01 One Raffles Place<br />Singapore 048616</p>
          <table cellpadding="0" cellspacing="0" align="center" role="presentation">
            <tr>
              <td style="padding:0 10px; border-right:1px solid #D0D0D0;"><a href="#" style="color:${MUTED}; text-decoration:none; font-size:12px; font-weight:500; ${FONT};">Website</a></td>
              <td style="padding:0 10px; border-right:1px solid #D0D0D0;"><a href="#" style="color:${MUTED}; text-decoration:none; font-size:12px; font-weight:500; ${FONT};">Contact</a></td>
              <td style="padding:0 10px;"><a href="#" style="color:${MUTED}; text-decoration:none; font-size:12px; font-weight:500; ${FONT};">Support</a></td>
            </tr>
          </table>
          <p style="margin:24px 0 0 0; font-size:11px; color:${LIGHT_TEXT}; line-height:1.5; ${FONT};">
            <a href="[Unsubscribe_Link]" style="color:${LIGHT_TEXT}; text-decoration:underline;">Unsubscribe</a>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <a href="#" style="color:${LIGHT_TEXT}; text-decoration:underline;">Email Preferences</a>
          </p>
        </td>
      </tr>
    </table>
  </td>
</tr>`;

// ─── Assemble ──────────────────────────────────────────────
const doc = `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>HashMicro ERP – Enterprise Resource Planning Solutions</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  </style>
  <!--[if mso]>
  <style type="text/css">
    body, table, td {font-family: Arial, Helvetica, sans-serif !important;}
  </style>
  <![endif]-->
</head>

<body
  style="margin:0; padding:0; background-color:${BG_WHITE}; ${FONT}; -webkit-font-smoothing:antialiased;">
  <table align="center" cellpadding="0" cellspacing="0" width="100%" style="background-color:${BG_WHITE};">
    <tr>
      <td align="center" style="padding:0;">
        <table cellpadding="0" cellspacing="0" width="600" style="background-color:${BG_WHITE}; max-width:100%;">

          <!-- HEADER -->
          ${header}

          <!-- SPACER -->
          ${spacer(56)}

          <!-- HERO -->
          ${hero}

          <!-- SPACER -->
          ${spacer(32)}

          <!-- CTA -->
          ${ctaButton("Schedule a Consultation")}

          <!-- SPACER -->
          ${spacer(64)}

          <!-- DIVIDER -->
          ${divider()}

          <!-- SPACER -->
          ${spacer(48)}

          <!-- SECTION TITLE -->
          ${sectionTitle("Core Capabilities")}

          <!-- SPACER -->
          ${spacer(40)}

          <!-- 3 FEATURES -->
          ${features}

          <!-- SPACER -->
          ${spacer(56)}

          <!-- DIVIDER -->
          ${divider()}

          <!-- SPACER -->
          ${spacer(48)}

          <!-- MODULES SECTION -->
          ${modules}

          <!-- SPACER -->
          ${spacer(56)}

          <!-- DIVIDER -->
          ${divider()}

          <!-- SPACER -->
          ${spacer(40)}

          <!-- TRUST STATEMENT -->
          ${trust}

          <!-- SPACER -->
          ${spacer(48)}

          <!-- FOOTER -->
          ${footer}

        </table>
      </td>
    </tr>
  </table>
</body>

</html>
`;

// ─── Write ──────────────────────────────────────────────
fs.writeFileSync(path.join(__dirname, "template.html"), doc, "utf8");
console.log("template.html generated successfully.");
