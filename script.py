import re

with open('src/components/InvoiceModal.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add deleteSeluarItem
if 'addSeluarItem = () =>' in content and 'deleteSeluarItem =' not in content:
    content = content.replace(
        '  const addSeluarItem = () => {\n    setSeluarItems(prev => [...prev, createEmptySeluarItem()]);\n  };',
        '  const addSeluarItem = () => {\n    setSeluarItems(prev => [...prev, createEmptySeluarItem()]);\n  };\n\n  const deleteSeluarItem = (index) => {\n    setSeluarItems(prev => prev.filter((_, i) => i !== index));\n  };'
    )

# 2. Tabs
content = content.replace(
    'Baju\n                    {items.some',
    'Baju & Seluar\n                    {(items.some'
)
content = content.replace(
    '|| parseInt(item.sizes[size]?.pants || 0) > 0)) && (',
    '|| parseInt(item.sizes[size]?.pants || 0) > 0)) || seluarItems.length > 0) && ('
)

# 3. Header
old_header = '''B.1. Butiran Rekaan Baju (Items)</h4>\n                      <button type="button" onClick={addItem} className="btn btn-secondary btn-sm btn-add-design">\n                        <Plus size={14} /> Tambah Design Baru\n                      </button>'''
new_header = '''B.1. Butiran Rekaan Baju & Seluar (Items)</h4>\n                      <div style={{ display: 'flex', gap: '0.5rem' }}>\n                        <button type="button" onClick={addItem} className="btn btn-secondary btn-sm btn-add-design">\n                          <Plus size={14} /> Tambah Baju\n                        </button>\n                        <button type="button" onClick={addSeluarItem} className="btn btn-secondary btn-sm btn-add-design">\n                          <Plus size={14} /> Tambah Seluar\n                        </button>\n                      </div>'''
content = content.replace(old_header, new_header)

# 4. Empty state
old_empty = '''{items.length === 0 ? (\n                      <div style={{ textAlign: 'center', padding: '2rem 1rem', border: '1px dashed var(--border-color)', borderRadius: '8px', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>\n                        Tiada baju untuk ditempah. Klik "Tambah Design Baru" untuk mula.\n                      </div>\n                    ) : (\n                      items.map((item, index) => {'''
new_empty = '''{items.length === 0 && seluarItems.length === 0 ? (\n                      <div style={{ textAlign: 'center', padding: '2rem 1rem', border: '1px dashed var(--border-color)', borderRadius: '8px', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>\n                        Tiada baju atau seluar untuk ditempah. Klik "Tambah Baju" atau "Tambah Seluar" untuk mula.\n                      </div>\n                    ) : (\n                      <>\n                        {items.map((item, index) => {'''
content = content.replace(old_empty, new_empty)

# 5. Syntax fix items.map end
old_syntax1 = '''                      </div>\n                    );\n                  })\n                  )}\n                  \n                  {seluarItems.map((item, index) => {'''
new_syntax1 = '''                      </div>\n                    );\n                  })}\n                  \n                  {seluarItems.map((item, index) => {'''
content = content.replace(old_syntax1, new_syntax1)

# 6. Syntax fix seluarItems.map end
old_syntax2 = '''                      </div>\n                    );\n                  })}\n                </>\n              ) : ('''
new_syntax2 = '''                      </div>\n                    );\n                  })}\n                    </>\n                  )}\n                </>\n              ) : ('''
content = content.replace(old_syntax2, new_syntax2)

with open('src/components/InvoiceModal.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
print('Patch applied')
