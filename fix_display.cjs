const fs = require('fs');
let code = fs.readFileSync('src/components/InvoiceModal.jsx', 'utf-8');

// The file has items.map and seluarItems.map
const parts = code.split('{seluarItems.map((item, index) => {');

// We only want to hide in the FIRST part (items.map)
// So we restore the second part to NOT have display: 'none'
parts[1] = parts[1].replace(/display: 'none', /g, '');

code = parts.join('{seluarItems.map((item, index) => {');
fs.writeFileSync('src/components/InvoiceModal.jsx', code);
