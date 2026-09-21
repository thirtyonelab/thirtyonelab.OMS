with open('src/components/InvoiceModal.jsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# 1682 is index 1681: {/* Desktop Adult Pants Section */}
# 1805 is index 1804: {/* Mobile Size Breakdown Grid */}
# 1950 is index 1949: {/* Mobile Adult Pants Section */}
# 2058 is index 2057: end of mobile-only div

# Actually let's just delete the exact divs using regex
