const fs = require('fs');
let code = fs.readFileSync('src/components/InvoiceModal.jsx', 'utf-8');

// 1. Add deleteSeluarItem
code = code.replace(
  /  const addItem = \(\) => \{\s*setItems\(prev => \[\.\.\.prev, createEmptyItem\(\)\]\);\s*\};/,
  '  const addItem = () => {\n    setItems(prev => [...prev, createEmptyItem()]);\n  };\n\n  const addSeluarItem = () => {\n    setSeluarItems(prev => [...prev, createEmptySeluarItem()]);\n  };\n\n  const deleteSeluarItem = (index) => {\n    setSeluarItems(prev => prev.filter((_, i) => i !== index));\n  };'
);

// 2. Tab Baju
code = code.replace(
  /Baju\s*\{items\.some\(item => SIZES\.some\(size => parseInt\(item\.sizes\[size\]\?\.short \|\| 0\) > 0 \|\| parseInt\(item\.sizes\[size\]\?\.long \|\| 0\) > 0 \|\| parseInt\(item\.sizes\[size\]\?\.pants \|\| 0\) > 0\)\) && \(/,
  'Baju & Seluar\n                    {Boolean(items.some(item => SIZES.some(size => parseInt(item.sizes[size]?.short || 0) > 0 || parseInt(item.sizes[size]?.long || 0) > 0 || parseInt(item.sizes[size]?.pants || 0) > 0)) || seluarItems.length > 0) && ('
);

// 3. Tab Baju Header
code = code.replace(
  /B\.1\. Butiran Rekaan Baju \(Items\)<\/h4>\s*<button type="button" onClick=\{addItem\} className="btn btn-secondary btn-sm btn-add-design">\s*<Plus size=\{14\} \/> Tambah Design Baru\s*<\/button>/,
  'B.1. Butiran Rekaan Baju & Seluar (Items)</h4>\n                      <div style={{ display: \'flex\', gap: \'0.5rem\' }}>\n                        <button type="button" onClick={addItem} className="btn btn-secondary btn-sm btn-add-design">\n                          <Plus size={14} /> Tambah Baju\n                        </button>\n                        <button type="button" onClick={addSeluarItem} className="btn btn-secondary btn-sm btn-add-design">\n                          <Plus size={14} /> Tambah Seluar\n                        </button>\n                      </div>'
);

// 4. Empty State
code = code.replace(
  /\{items\.length === 0 \? \(\s*<div style=\{\{ textAlign: 'center', padding: '2rem 1rem', border: '1px dashed var\(--border-color\)', borderRadius: '8px', color: 'var\(--text-muted\)', fontSize: '0\.9rem', marginBottom: '1\.5rem' \}\}>\s*Tiada baju untuk ditempah\. Klik "Tambah Design Baru" untuk mula\.\s*<\/div>\s*\) : \(\s*items\.map\(\(item, index\) => \{/,
  '{items.length === 0 && seluarItems.length === 0 ? (\n                      <div style={{ textAlign: \'center\', padding: \'2rem 1rem\', border: \'1px dashed var(--border-color)\', borderRadius: \'8px\', color: \'var(--text-muted)\', fontSize: \'0.9rem\', marginBottom: \'1.5rem\' }}>\n                        Tiada baju atau seluar untuk ditempah. Klik "Tambah Baju" atau "Tambah Seluar" untuk mula.\n                      </div>\n                    ) : (\n                      <>\n                        {items.map((item, index) => {'
);

// 5. End of items.map (Fixing brace)
code = code.replace(
  /                      <\/div>\s*\);\s*\}\)\s*\)\}\s*\{seluarItems\.map\(\(item, index\) => \{/,
  '                      </div>\n                    );\n                  })}\n                  \n                  {seluarItems.map((item, index) => {'
);

// 6. End of seluarItems.map (Closing the <> from empty state)
code = code.replace(
  /                      <\/div>\s*\);\s*\}\)\}\s*<\/>\s*\) : \(/,
  '                      </div>\n                    );\n                  })}\n                    </>\n                  )}\n                </>\n              ) : ('
);

fs.writeFileSync('src/components/InvoiceModal.jsx', code);
console.log('Fixed syntax and UI logic.');
