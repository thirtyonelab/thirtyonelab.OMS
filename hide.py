import re
with open('src/components/InvoiceModal.jsx', 'r', encoding='utf-8') as f:
    code = f.read()

pattern = re.compile(r'(\{\/\*\s*(?:Desktop Adult Pants Section|Desktop Kid Pants Section|Mobile Adult Pants Section|Mobile Kid Pants Section)\s*\*\/\}\s*<div style=\{\{)\s*(border: \'1px solid)')

code = pattern.sub(r'\g<1> display: \"none\", \g<2>', code)

with open('src/components/InvoiceModal.jsx', 'w', encoding='utf-8') as f:
    f.write(code)
print('Done!')
