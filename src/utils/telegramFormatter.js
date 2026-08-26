export function escapeHtml(unsafe) {
  return (String(unsafe) || '').replace(/&/g, "&amp;")
       .replace(/</g, "&lt;")
       .replace(/>/g, "&gt;")
       .replace(/"/g, "&quot;")
       .replace(/'/g, "&#039;");
}

export function formatTelegramStatus(invoices) {
  // 23:50 MYT is UTC+8
  const mytDateObj = new Date(Date.now() + 8 * 3600 * 1000);
  const mytDateStr = mytDateObj.toISOString().split('T')[0];
  const currentYM = mytDateStr.slice(0, 7);

  const processedInvoices = [];
  
  (invoices || []).forEach(inv => {
    let order_status = inv.order_status;
    if (inv.notes && String(inv.notes).includes('__METADATA__:')) {
      try {
        const metaStr = String(inv.notes).split('__METADATA__:')[1];
        const meta = JSON.parse(metaStr);
        if (!order_status) {
          if (meta.order_status !== undefined) order_status = meta.order_status;
        }
      } catch(e) {}
    }

    if (order_status === 'NOT_SUBMITTED' || !order_status) {
      order_status = 'BELUM_DRAFT';
    }

    const invYM = String(inv.date || '').slice(0, 7);
    const settled = (order_status === 'COMPLETED') && (String(inv.status) === 'Paid');

    let isLM = false;
    let include = false;

    if (!invYM || invYM.length < 7 || invYM === currentYM) {
      include = true;
    } else if (invYM < currentYM && !settled) {
      include = true;
      isLM = true;
    } else {
      include = false;
    }

    if (include) {
      processedInvoices.push({ ...inv, _order_status: order_status, _isLM: isLM });
    }
  });
  
  // Sort invoices by client_name alphabetically A-Z
  processedInvoices.sort((a, b) => {
    const aName = (a.client_name || 'UNKNOWN').toUpperCase();
    const bName = (b.client_name || 'UNKNOWN').toUpperCase();
    return aName.localeCompare(bName);
  });
  
  const statusGroups = {
    'PENDING': [],
    'PROCESSING': [],
    'COMPLETED': []
  };

  processedInvoices.forEach(inv => {
    if (!statusGroups[inv._order_status]) {
      statusGroups[inv._order_status] = [];
    }
    statusGroups[inv._order_status].push(inv);
  });

  const emojis = {
    'BELUM_DRAFT': '📥',
    'DRAFT': '✏️',
    'PENDING': '⏳',
    'PROCESSING': '⚙️',
    'COMPLETED': '✅',
    'MAINTENANCE': '🛠️'
  };

  let statusText = '';
  
  const buildStatusBlock = (statusKey) => {
    const groupInvoices = statusGroups[statusKey] || [];
    const emoji = emojis[statusKey] || '📦';
    const statusLabel = statusKey.replace(/_/g, ' ');
    
    let block = `${emoji} <b>${statusLabel}</b> : ${groupInvoices.length}`;
    groupInvoices.forEach((inv, index) => {
      const clientName = escapeHtml(inv.client_name || 'UNKNOWN');
      const paymentTag = String(inv.status || 'Unpaid').toUpperCase();
      let line = `\n${index + 1}. ${clientName} [${paymentTag}]`;
      if (inv._isLM) {
        line += ' <i>LM</i>';
      }
      block += line;
    });
    return block;
  };

  const coreStatuses = ['BELUM_DRAFT', 'DRAFT', 'PENDING', 'PROCESSING', 'COMPLETED', 'MAINTENANCE'];
  const blocks = [];
  
  for (const status of coreStatuses) {
    blocks.push(buildStatusBlock(status));
  }
  
  const otherStatuses = Object.keys(statusGroups)
    .filter(s => !coreStatuses.includes(s))
    .sort((a, b) => a.localeCompare(b));

  for (const status of otherStatuses) {
    blocks.push(buildStatusBlock(status));
  }

  statusText = blocks.join('\n\n');

  // Calculate totals for processed invoices
  const outstandingBalance = processedInvoices
    .filter(inv => inv.status !== 'Paid')
    .reduce((sum, inv) => sum + Math.max(0, parseFloat(inv.grand_total || 0) - parseFloat(inv.deposit || 0)), 0);

  const totalDeposit = processedInvoices
    .reduce((sum, inv) => sum + parseFloat(inv.deposit || 0), 0);

  const formatRM = (val) => parseFloat(val || 0).toFixed(2);

  const message = `<b>🧾 ThirtyOne Lab Status</b>
Date: ${mytDateStr} (MYT)

<b>💰 Financial Summary</b>
Total Deposit: RM ${formatRM(totalDeposit)}
Outstanding Balance: RM ${formatRM(outstandingBalance)}

<b>📦 Orders by Status</b>

${statusText}`;

  return message;
}
