const fs = require('fs');
let code = fs.readFileSync('src/components/InvoiceModal.jsx', 'utf-8');

const regex = /(\{\/\*\s*(?:Desktop Adult Pants Section|Desktop Kid Pants Section|Mobile Adult Pants Section|Mobile Kid Pants Section)\s*\*\/\}\s*<div style=\{\{)\s*(border: '1px solid)/g;

const matches = code.match(regex);
console.log("Found matches:", matches ? matches.length : 0);

if (matches) {
    code = code.replace(regex, "\ display: 'none', \");
    fs.writeFileSync('src/components/InvoiceModal.jsx', code);
    console.log("File updated successfully!");
}
