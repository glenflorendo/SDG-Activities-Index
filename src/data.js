var GoogleSpreadsheet = require("google-spreadsheet");
var cred = require("./client-secret.json");
const { promisify } = require("util");

async function getSpreadsheet() {
  const doc = new GoogleSpreadsheet(
    `1UFYSr59H54aSMYiuGEbqOKUL41ddEhuYbQZplmhG8qs`
  );
  await promisify(doc.useServiceAccountAuth)(cred).catch(err =>
    console.log("Google Sheets Authentication Error")
  );
  const info = await promisify(doc.getInfo)();
  const sheet = info.worksheets[0];
  const rows = await promisify(sheet.getRows)();
  return rows;
}

export { getSpreadsheet };
