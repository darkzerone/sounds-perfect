import fs from 'fs';

const filePath = 'c:\\SL Tech\\sounds-perfect\\app\\lighthouse_results_after.json';
const content = fs.readFileSync(filePath, 'utf-8');

const match = content.match(/window\.__LIGHTHOUSE_JSON__\s*=\s*({[\s\S]*?});/);
if (match) {
  const jsonStr = match[1];
  const report = JSON.parse(jsonStr);
  
  const clsAudit = report.audits['cumulative-layout-shift'];
  if (clsAudit) {
    console.log(`CLS Score: ${clsAudit.score} - ${clsAudit.displayValue}`);
    if (clsAudit.details && clsAudit.details.items) {
      console.log(JSON.stringify(clsAudit.details.items, null, 2));
    }
  }

  const lcpAudit = report.audits['largest-contentful-paint'];
  if (lcpAudit) {
    console.log(`LCP Score: ${lcpAudit.score} - ${lcpAudit.displayValue}`);
  }
} else {
  console.log("Could not find __LIGHTHOUSE_JSON__");
}
