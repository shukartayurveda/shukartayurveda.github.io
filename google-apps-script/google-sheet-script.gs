/**
 * Shukart Ayurveda – consultation form → Google Sheet
 * ----------------------------------------------------
 * Paste this whole file into Extensions > Apps Script of your Google Sheet,
 * then Deploy > New deployment > Web app (Execute as: Me, Who has access: Anyone).
 * Copy the Web App URL (ends in /exec) into CLINIC.sheetUrl in index.html.
 */

const SHEET_NAME = "Consultation requests";
const NOTIFY_EMAIL = "Shukart.Ayurveda@gmail.com"; // set to "" to switch off email alerts

const COLUMNS = [
  ["submittedAt", "Received on"],
  ["name", "Patient name"],
  ["age", "Age"],
  ["gender", "Gender"],
  ["phone", "Phone"],
  ["city", "City"],
  ["mode", "Consultation mode"],
  ["service", "Needs help with"],
  ["concern", "Main health concern"],
  ["meds", "Medicines / reports"],
  ["time", "Best time to call"],
  ["date", "Preferred date"],
  ["consent", "Consent"],
  ["status", "Status (for clinic use)"]
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const data = JSON.parse(e.postData.contents || "{}");
    if (data.website) return reply({ ok: true }); // spam trap

    const sheet = getSheet();
    data.submittedAt = new Date();
    data.status = "New – call patient";
    sheet.appendRow(COLUMNS.map(([key]) => clean(data[key])));

    if (NOTIFY_EMAIL) {
      const lines = COLUMNS.slice(1, -1).map(([k, label]) => label + ": " + (data[k] || "-"));
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        subject: "New consultation request: " + (data.name || "Patient"),
        body: lines.join("\n") + "\n\nOpen the sheet: " + SpreadsheetApp.getActiveSpreadsheet().getUrl()
      });
    }
    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return reply({ ok: true, message: "Shukart Ayurveda form endpoint is running." });
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(COLUMNS.map(([, label]) => label));
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight("bold").setBackground("#34501C").setFontColor("#ffffff");
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(9, 320);
  }
  return sheet;
}

// Stops spreadsheet formula injection (e.g. text starting with "=")
function clean(v) {
  if (v === undefined || v === null) return "";
  if (v instanceof Date) return v;
  const s = String(v).slice(0, 2000);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
