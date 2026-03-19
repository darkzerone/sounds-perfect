import fs from 'fs';

const filePath = 'c:\\SL Tech\\sounds-perfect\\app\\lighthouse_results_after_3.json';
const content = fs.readFileSync(filePath, 'utf-8');

const match = content.match(/window\.__LIGHTHOUSE_JSON__\s*=\s*({[\s\S]*?});/);
if (match) {
  const jsonStr = match[1];
  const report = JSON.parse(jsonStr);
  
  console.log("Failed and warning audits (< 0.9):");
  console.log("Failed and warning audits (< 0.9):");
  for (const [key, audit] of Object.entries(report.audits)) {
    if (audit.score !== null && audit.score < 0.9 && audit.scoreDisplayMode !== 'notApplicable') {
      console.log(`- ${key} (${audit.title}): ${audit.score} - ${audit.displayValue || ''}`);
    }
  }
} else {
  console.log("Could not find __LIGHTHOUSE_JSON__");
}
