const fs = require('fs');
let code = fs.readFileSync('src/components/InvoiceModal.jsx', 'utf-8');
code = code.split('display: \\\'none\\\'').join('display: \\'none\\'');
fs.writeFileSync('src/components/InvoiceModal.jsx', code);
