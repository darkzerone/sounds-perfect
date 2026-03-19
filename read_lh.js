import fs from 'fs';

const filePath = 'c:\\SL Tech\\sounds-perfect\\app\\lighthouse_results_after.json';
const content = fs.readFileSync(filePath, 'utf-8');

const match = content.match(/window\.__LIGHTHOUSE_JSON__\s*=\s*({[\s\S]*?});/);
if (match) {
  const jsonStr = match[1];
  const report = JSON.parse(jsonStr);
  console.log("Audits and scores:");
  for (const [key, audit] of Object.entries(report.audits)) {
    if (audit.score !== null && audit.score < 0.9 && audit.scoreDisplayMode !== 'notApplicable') {
      console.log(`- ${key} (${audit.title}): ${audit.score} - ${audit.displayValue || ''}`);
      if (audit.details && audit.details.items) {
        console.log(JSON.stringify(audit.details.items, null, 2));
      }
    }
  }
} else {
  console.log("Could not find __LIGHTHOUSE_JSON__");
}
