import{t as e}from"./pen-Dzn2dKlk.js";import{t}from"./search-Z3_vT8bT.js";import{A as n,D as r,E as i,O as a,S as o,c as s,d as c,g as l,i as u,k as d,n as f,r as p,s as m,t as h,v as g,x as _}from"./index-BCdtWHQY.js";var v=a(`dollar-sign`,[[`line`,{x1:`12`,x2:`12`,y1:`2`,y2:`22`,key:`7eqyqh`}],[`path`,{d:`M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6`,key:`1b0p4s`}]]),y=a(`image`,[[`rect`,{width:`18`,height:`18`,x:`3`,y:`3`,rx:`2`,ry:`2`,key:`1m3agn`}],[`circle`,{cx:`9`,cy:`9`,r:`2`,key:`af1f0g`}],[`path`,{d:`m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21`,key:`1xmnt7`}]]),b=a(`phone`,[[`path`,{d:`M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384`,key:`9njp5v`}]]),x=a(`shopping-bag`,[[`path`,{d:`M16 10a4 4 0 0 1-8 0`,key:`1ltviw`}],[`path`,{d:`M3.103 6.034h17.794`,key:`awc11p`}],[`path`,{d:`M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z`,key:`o988cm`}]]),S=a(`user`,[[`path`,{d:`M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2`,key:`975kel`}],[`circle`,{cx:`12`,cy:`7`,r:`4`,key:`17ys0d`}]]),C=n(d(),1),w=p();function T({onCreateInvoiceForClient:n}){let{tr:a}=f(),[d,p]=(0,C.useState)([]),[T,E]=(0,C.useState)([]),[D,O]=(0,C.useState)(``),[k,A]=(0,C.useState)(null),[j,M]=(0,C.useState)(null),[N,P]=(0,C.useState)(null),[F,I]=(0,C.useState)({name:``,phone:``}),[L,R]=(0,C.useState)(!1);(0,C.useEffect)(()=>{z()},[]);let z=async()=>{R(!0);try{let e=await m(),t=await s();p(e),E(t)}catch(e){console.error(`Error loading CRM data:`,e)}finally{R(!1)}},B=e=>{M(e),I({name:e.name,phone:e.phone})},V=async e=>{if(e.preventDefault(),!(!F.name.trim()||!F.phone.trim()))try{await c({...j,name:F.name,phone:F.phone}),M(null),z()}catch{alert(`Gagal mengemas kini maklumat pelanggan. Kemungkinan nombor telefon sudah wujud.`)}},H=async e=>{let t=T.some(t=>t.client_id===e.id),n=`Adakah anda pasti mahu memadam pelanggan "${e.name}"?`;t&&(n=`Amaran: Pelanggan "${e.name}" mempunyai sejarah invoice. Invoice yang berkaitan tidak akan dipadam tetapi pautan ke pelanggan ini akan dikeluarkan. Teruskan?`),window.confirm(n)&&(await u(e.id),z(),k&&k.id===e.id&&A(null))},U=d.filter(e=>e.name.toLowerCase().includes(D.toLowerCase())||e.phone.includes(D)),W=e=>T.filter(t=>t.client_id===e);return(0,w.jsxs)(`div`,{className:`main-content`,children:[(0,w.jsx)(`div`,{className:`clients-header`,style:{marginBottom:`1.5rem`},children:(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`span`,{className:`section-tag`,children:a(`clientsTag`)}),(0,w.jsx)(`h1`,{style:{fontSize:`1.75rem`,fontWeight:`800`,marginTop:`0.5rem`},children:a(`clientsTitle`)}),(0,w.jsx)(`p`,{style:{color:`var(--text-muted)`,fontSize:`0.9rem`,marginTop:`0.25rem`},children:a(`clientsSubtitle`)})]})}),(0,w.jsx)(`div`,{className:`search-filters-bar card`,style:{padding:`1.25rem`},children:(0,w.jsxs)(`div`,{className:`search-box`,children:[(0,w.jsx)(t,{size:18,className:`search-icon`}),(0,w.jsx)(`input`,{type:`text`,placeholder:a(`searchClientPlaceholder`)||`Cari nama atau nombor telefon pelanggan...`,value:D,onChange:e=>O(e.target.value),className:`form-control search-input`})]})}),(0,w.jsx)(`div`,{className:`card`,style:{padding:0},children:L?(0,w.jsx)(`div`,{className:`loading-state`,children:a(`loadingClient`)}):U.length===0?(0,w.jsx)(`div`,{className:`empty-state`,children:a(`noClient`)}):(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(`div`,{className:`table-container desktop-only`,children:(0,w.jsxs)(`table`,{className:`table`,children:[(0,w.jsx)(`thead`,{children:(0,w.jsxs)(`tr`,{children:[(0,w.jsx)(`th`,{children:a(`clientName`)}),(0,w.jsx)(`th`,{style:{textAlign:`center`},children:a(`phone`)}),(0,w.jsx)(`th`,{style:{textAlign:`center`},children:a(`totalOrder`)}),(0,w.jsx)(`th`,{style:{textAlign:`center`},children:a(`totalSpent`)}),(0,w.jsx)(`th`,{style:{textAlign:`center`},children:a(`actions`)})]})}),(0,w.jsx)(`tbody`,{children:U.map(t=>(0,w.jsxs)(`tr`,{children:[(0,w.jsx)(`td`,{children:(0,w.jsxs)(`div`,{className:`client-name-cell`,children:[(0,w.jsx)(S,{size:16,className:`text-light`}),(0,w.jsx)(`span`,{className:`font-bold`,children:t.name})]})}),(0,w.jsx)(`td`,{style:{textAlign:`center`},children:t.phone}),(0,w.jsxs)(`td`,{style:{textAlign:`center`},children:[t.orders_count||0,` kali`]}),(0,w.jsxs)(`td`,{style:{textAlign:`center`},className:`font-bold`,children:[`RM `,parseFloat(t.total_spent||0).toLocaleString(`en-US`,{minimumFractionDigits:2,maximumFractionDigits:2})]}),(0,w.jsx)(`td`,{style:{textAlign:`center`},children:(0,w.jsxs)(`div`,{className:`actions-cell`,children:[(0,w.jsxs)(`button`,{onClick:()=>A(t),className:`btn btn-secondary btn-sm`,title:`Lihat Sejarah`,children:[(0,w.jsx)(o,{size:12}),` `,a(`view`)]}),(0,w.jsxs)(`button`,{onClick:()=>B(t),className:`btn btn-secondary btn-sm`,title:`Kemaskini Butiran`,children:[(0,w.jsx)(e,{size:12}),` `,a(`edit`)]}),(0,w.jsxs)(`button`,{onClick:()=>H(t),className:`btn btn-secondary btn-sm`,title:`Padam Pelanggan`,style:{borderColor:`#FEE2E2`,color:`#B91C1C`},children:[(0,w.jsx)(g,{size:12}),` `,a(`delete`)]})]})})]},t.id))})]})}),(0,w.jsx)(`div`,{className:`mobile-cards-list mobile-only`,children:U.map(t=>(0,w.jsxs)(`div`,{className:`mobile-card`,children:[(0,w.jsxs)(`div`,{className:`mobile-card-row`,children:[(0,w.jsxs)(`span`,{className:`mobile-card-title`,style:{display:`flex`,alignItems:`center`,gap:`0.4rem`},children:[(0,w.jsx)(S,{size:14,className:`text-red`}),t.name]}),(0,w.jsx)(`span`,{className:`mobile-card-detail`,children:t.phone})]}),(0,w.jsxs)(`div`,{className:`mobile-card-row`,children:[(0,w.jsxs)(`span`,{className:`mobile-card-detail`,children:[`Tempahan: `,(0,w.jsxs)(`span`,{className:`mobile-card-bold`,children:[t.orders_count||0,` kali`]})]}),(0,w.jsxs)(`span`,{className:`mobile-card-detail`,children:[`Jumlah Belanja: `,(0,w.jsxs)(`span`,{className:`mobile-card-bold`,style:{color:`var(--primary-red)`},children:[`RM `,parseFloat(t.total_spent||0).toLocaleString(`en-US`,{minimumFractionDigits:2,maximumFractionDigits:2})]})]})]}),(0,w.jsxs)(`div`,{className:`mobile-card-actions`,children:[(0,w.jsxs)(`button`,{onClick:()=>A(t),className:`btn btn-secondary btn-sm`,children:[(0,w.jsx)(o,{size:12}),` `,a(`view`)]}),(0,w.jsxs)(`button`,{onClick:()=>B(t),className:`btn btn-secondary btn-sm`,children:[(0,w.jsx)(e,{size:12}),` `,a(`edit`)]}),(0,w.jsxs)(`button`,{onClick:()=>H(t),className:`btn btn-secondary btn-sm`,style:{borderColor:`#FEE2E2`,color:`#B91C1C`},children:[(0,w.jsx)(g,{size:12}),` `,a(`delete`)]})]})]},t.id))})]})}),k&&(0,w.jsx)(`div`,{className:`modal-overlay`,onClick:()=>A(null),children:(0,w.jsxs)(`div`,{className:`modal-content`,onClick:e=>e.stopPropagation(),style:{maxWidth:`800px`},children:[(0,w.jsxs)(`div`,{className:`modal-header`,children:[(0,w.jsx)(`h3`,{children:`Profil Pelanggan`}),(0,w.jsx)(`button`,{className:`modal-close`,onClick:()=>A(null),children:(0,w.jsx)(l,{size:20})})]}),(0,w.jsxs)(`div`,{className:`modal-body`,children:[(0,w.jsxs)(`div`,{className:`client-profile-summary`,children:[(0,w.jsxs)(`div`,{className:`summary-info`,children:[(0,w.jsxs)(`div`,{className:`info-item`,children:[(0,w.jsx)(S,{size:18,className:`text-red`}),(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`span`,{className:`info-label`,children:a(`clientName`)}),(0,w.jsx)(`span`,{className:`info-val`,children:k.name})]})]}),(0,w.jsxs)(`div`,{className:`info-item`,children:[(0,w.jsx)(b,{size:18,className:`text-red`}),(0,w.jsxs)(`div`,{children:[(0,w.jsx)(`span`,{className:`info-label`,children:a(`phone`)}),(0,w.jsx)(`span`,{className:`info-val`,children:k.phone})]})]})]}),(0,w.jsxs)(`div`,{className:`summary-metrics`,children:[(0,w.jsxs)(`div`,{className:`metric-box`,children:[(0,w.jsx)(x,{size:20,className:`text-muted`}),(0,w.jsxs)(`div`,{className:`metric-details`,children:[(0,w.jsx)(`span`,{className:`metric-num`,children:k.orders_count||0}),(0,w.jsx)(`span`,{className:`metric-label`,children:`Jumlah Order`})]})]}),(0,w.jsxs)(`div`,{className:`metric-box`,children:[(0,w.jsx)(v,{size:20,className:`text-red`}),(0,w.jsxs)(`div`,{className:`metric-details`,children:[(0,w.jsxs)(`span`,{className:`metric-num`,children:[`RM `,parseFloat(k.total_spent||0).toLocaleString(`en-US`,{minimumFractionDigits:2})]}),(0,w.jsx)(`span`,{className:`metric-label`,children:`Total Belanja`})]})]})]})]}),(0,w.jsxs)(`div`,{className:`history-section`,children:[(0,w.jsxs)(`div`,{className:`history-header`,children:[(0,w.jsx)(`h4`,{children:`Sejarah Invoice & Tempahan`}),(0,w.jsxs)(`button`,{onClick:()=>{A(null),n(k)},className:`btn btn-primary btn-sm`,children:[(0,w.jsx)(_,{size:12}),` Cipta Invoice Baru`]})]}),(0,w.jsx)(`div`,{className:`table-container desktop-only`,style:{maxHeight:`300px`,overflowY:`auto`},children:W(k.id).length===0?(0,w.jsx)(`div`,{className:`empty-history`,children:`Tiada rekod tempahan untuk pelanggan ini.`}):(0,w.jsxs)(`table`,{className:`table`,style:{fontSize:`0.85rem`},children:[(0,w.jsx)(`thead`,{children:(0,w.jsxs)(`tr`,{children:[(0,w.jsx)(`th`,{}),(0,w.jsx)(`th`,{children:`No. Invoice`}),(0,w.jsx)(`th`,{children:`Tarikh`}),(0,w.jsx)(`th`,{children:`Nama Job`}),(0,w.jsx)(`th`,{style:{textAlign:`center`},children:`Jumlah`}),(0,w.jsx)(`th`,{style:{textAlign:`center`},children:`Status`})]})}),(0,w.jsx)(`tbody`,{children:W(k.id).map(e=>(0,w.jsxs)(C.Fragment,{children:[(0,w.jsxs)(`tr`,{onClick:()=>P(N===e.id?null:e.id),style:{cursor:`pointer`,transition:`background 0.2s`},className:N===e.id?`expanded-row-active`:``,children:[(0,w.jsx)(`td`,{style:{width:`30px`,textAlign:`center`,padding:`0.5rem`},children:N===e.id?(0,w.jsx)(i,{size:14,className:`text-muted`}):(0,w.jsx)(r,{size:14,className:`text-muted`})}),(0,w.jsx)(`td`,{className:`font-bold`,children:e.invoice_no}),(0,w.jsx)(`td`,{children:e.date}),(0,w.jsx)(`td`,{children:e.job_name||`-`}),(0,w.jsxs)(`td`,{style:{textAlign:`center`},className:`font-bold`,children:[`RM `,parseFloat(e.grand_total).toFixed(2)]}),(0,w.jsx)(`td`,{style:{textAlign:`center`},children:(0,w.jsx)(`span`,{className:`badge badge-${e.status.toLowerCase()}`,children:e.status})})]}),N===e.id&&(0,w.jsx)(`tr`,{className:`expanded-spec-row`,children:(0,w.jsx)(`td`,{colSpan:6,style:{padding:0,border:`none`},children:(0,w.jsxs)(`div`,{className:`spec-container`,children:[(0,w.jsx)(`div`,{className:`spec-header`,children:(0,w.jsx)(`span`,{children:`HISTORY SPEC PEMBELIAN`})}),e.items&&e.items.length>0?e.items.map((t,n)=>(0,w.jsxs)(`div`,{className:`spec-card`,children:[(0,w.jsx)(`div`,{className:`spec-image`,children:t.design_image?(0,w.jsx)(`img`,{src:t.design_image,alt:t.design_name||`Design`}):(0,w.jsxs)(`div`,{className:`spec-image-placeholder`,children:[(0,w.jsx)(y,{size:28}),(0,w.jsx)(`span`,{children:`Tiada Gambar`})]})}),(0,w.jsx)(`div`,{className:`spec-details`,children:t.item_type===`banner`?(0,w.jsxs)(w.Fragment,{children:[(0,w.jsxs)(`div`,{className:`spec-row`,children:[(0,w.jsx)(`span`,{className:`spec-label`,children:`Item Type`}),(0,w.jsx)(`span`,{className:`spec-value`,children:`: Banner`})]}),(0,w.jsxs)(`div`,{className:`spec-row`,children:[(0,w.jsx)(`span`,{className:`spec-label`,children:`Nama/Code`}),(0,w.jsxs)(`span`,{className:`spec-value`,children:[`: `,t.design_name||`-`]})]}),(0,w.jsxs)(`div`,{className:`spec-row`,children:[(0,w.jsx)(`span`,{className:`spec-label`,children:`Harga Seunit`}),(0,w.jsxs)(`span`,{className:`spec-value`,children:[`: RM `,parseFloat(t.price||0).toFixed(2)]})]}),(0,w.jsxs)(`div`,{className:`spec-row`,children:[(0,w.jsx)(`span`,{className:`spec-label`,children:`Kuantiti`}),(0,w.jsxs)(`span`,{className:`spec-value`,children:[`: `,t.qty,` pcs`]})]}),(0,w.jsxs)(`div`,{className:`spec-row`,style:{marginTop:`0.3rem`,paddingTop:`0.4rem`,borderTop:`1px dashed var(--border-color)`},children:[(0,w.jsx)(`span`,{className:`spec-label`,style:{fontWeight:700,color:`var(--text-dark)`},children:`Subtotal`}),(0,w.jsxs)(`span`,{className:`spec-value`,style:{fontWeight:700,color:`var(--primary-red)`},children:[`: RM `,parseFloat(t.subtotal||0).toFixed(2)]})]})]}):t.item_type===`seluar`?(0,w.jsxs)(w.Fragment,{children:[(0,w.jsxs)(`div`,{className:`spec-row`,children:[(0,w.jsx)(`span`,{className:`spec-label`,children:`Item Type`}),(0,w.jsx)(`span`,{className:`spec-value`,children:`: Seluar`})]}),(0,w.jsxs)(`div`,{className:`spec-row`,children:[(0,w.jsx)(`span`,{className:`spec-label`,children:`Nama/Code`}),(0,w.jsxs)(`span`,{className:`spec-value`,children:[`: `,t.design_name||`-`]})]}),(0,w.jsxs)(`div`,{className:`spec-row`,children:[(0,w.jsx)(`span`,{className:`spec-label`,children:`Kuantiti`}),(0,w.jsxs)(`span`,{className:`spec-value`,children:[`: `,t.qty,` pcs`]})]}),(0,w.jsxs)(`div`,{className:`spec-row`,style:{marginTop:`0.3rem`,paddingTop:`0.4rem`,borderTop:`1px dashed var(--border-color)`},children:[(0,w.jsx)(`span`,{className:`spec-label`,style:{fontWeight:700,color:`var(--text-dark)`},children:`Subtotal`}),(0,w.jsxs)(`span`,{className:`spec-value`,style:{fontWeight:700,color:`var(--primary-red)`},children:[`: RM `,parseFloat(t.subtotal||0).toFixed(2)]})]})]}):(0,w.jsxs)(w.Fragment,{children:[(0,w.jsxs)(`div`,{className:`spec-row`,children:[(0,w.jsx)(`span`,{className:`spec-label`,children:`Nama/Code`}),(0,w.jsxs)(`span`,{className:`spec-value`,children:[`: `,t.design_name||`-`]})]}),(0,w.jsxs)(`div`,{className:`spec-row`,children:[(0,w.jsx)(`span`,{className:`spec-label`,children:`Material`}),(0,w.jsxs)(`span`,{className:`spec-value`,children:[`: `,t.material||`-`]})]}),(0,w.jsxs)(`div`,{className:`spec-row`,children:[(0,w.jsx)(`span`,{className:`spec-label`,children:`Cutting`}),(0,w.jsxs)(`span`,{className:`spec-value`,children:[`: `,t.cutting||`-`]})]}),(0,w.jsxs)(`div`,{className:`spec-row`,children:[(0,w.jsx)(`span`,{className:`spec-label`,children:`Jenis Neck`}),(0,w.jsxs)(`span`,{className:`spec-value`,children:[`: `,t.neck||`-`]})]}),(0,w.jsxs)(`div`,{className:`spec-row`,children:[(0,w.jsx)(`span`,{className:`spec-label`,children:`Name Set`}),(0,w.jsxs)(`span`,{className:`spec-value`,children:[`: `,t.name_set||`-`]})]}),(0,w.jsxs)(`div`,{className:`spec-row`,style:{marginTop:`0.3rem`,paddingTop:`0.4rem`,borderTop:`1px dashed var(--border-color)`},children:[(0,w.jsx)(`span`,{className:`spec-label`,style:{fontWeight:700,color:`var(--text-dark)`},children:`Base Price`}),(0,w.jsxs)(`span`,{className:`spec-value`,style:{fontWeight:700,color:`var(--primary-red)`},children:[`: RM `,(()=>{let t=h(e.items.reduce((e,t)=>t.item_type===`banner`||t.item_type===`seluar`?e:e+(t.qty||0),0)),n=e.discount_type||`per_pcs`,r=e.discount_value===void 0?e.discount_per_pcs||0:e.discount_value;if(n===`bulk`&&r>0)return`${t.toFixed(2)} /pcs (Diskaun Pukal RM${parseFloat(r).toFixed(2)})`;{let e=t-r;return r>0?`${e.toFixed(2)} /pcs (diskaun RM${parseFloat(r).toFixed(2)})`:`${t.toFixed(2)} /pcs`}})()]})]})]})})]},t.id||n)):(0,w.jsx)(`div`,{className:`spec-empty`,children:`Tiada data spec pembelian untuk invoice ini.`})]})})})]},e.id))})]})}),(0,w.jsx)(`div`,{className:`mobile-only`,style:{display:`flex`,flexDirection:`column`,gap:`0.75rem`,maxHeight:`350px`,overflowY:`auto`,marginBottom:`1rem`},children:W(k.id).length===0?(0,w.jsx)(`div`,{className:`empty-history`,children:`Tiada rekod tempahan untuk pelanggan ini.`}):W(k.id).map(e=>(0,w.jsxs)(`div`,{className:`mobile-card`,style:{padding:`1rem`,border:`1px solid var(--border-color)`,gap:`0.5rem`},children:[(0,w.jsxs)(`div`,{className:`mobile-card-row`,onClick:()=>P(N===e.id?null:e.id),style:{cursor:`pointer`},children:[(0,w.jsxs)(`span`,{className:`mobile-card-bold`,style:{display:`flex`,alignItems:`center`,gap:`0.35rem`,fontFamily:`var(--font-primary)`,fontSize:`0.78rem`},children:[N===e.id?(0,w.jsx)(i,{size:14}):(0,w.jsx)(r,{size:14}),e.invoice_no]}),(0,w.jsx)(`span`,{className:`badge badge-${e.status.toLowerCase()}`,children:e.status})]}),(0,w.jsxs)(`div`,{className:`mobile-card-row`,onClick:()=>P(N===e.id?null:e.id),style:{cursor:`pointer`,fontSize:`0.8rem`,color:`var(--text-muted)`},children:[(0,w.jsxs)(`span`,{children:[e.date,` | `,e.job_name||`-`]}),(0,w.jsxs)(`span`,{className:`mobile-card-bold`,style:{color:`var(--text-dark)`},children:[`RM `,parseFloat(e.grand_total).toFixed(2)]})]}),N===e.id&&(0,w.jsxs)(`div`,{className:`spec-container`,style:{marginTop:`0.5rem`,paddingTop:`0.5rem`,borderTop:`1px dashed var(--border-color)`},children:[(0,w.jsx)(`div`,{className:`spec-header`,style:{paddingBottom:`0.5rem`,marginBottom:`0.5rem`},children:(0,w.jsx)(`span`,{children:`HISTORY SPEC PEMBELIAN`})}),e.items&&e.items.length>0?e.items.map((t,n)=>(0,w.jsxs)(`div`,{className:`spec-card`,children:[(0,w.jsx)(`div`,{className:`spec-image`,children:t.design_image?(0,w.jsx)(`img`,{src:t.design_image,alt:t.design_name||`Design`}):(0,w.jsxs)(`div`,{className:`spec-image-placeholder`,children:[(0,w.jsx)(y,{size:28}),(0,w.jsx)(`span`,{children:`Tiada Gambar`})]})}),(0,w.jsx)(`div`,{className:`spec-details`,children:t.item_type===`banner`?(0,w.jsxs)(w.Fragment,{children:[(0,w.jsxs)(`div`,{className:`spec-row`,children:[(0,w.jsx)(`span`,{className:`spec-label`,children:`Item Type`}),(0,w.jsx)(`span`,{className:`spec-value`,children:`: Banner`})]}),(0,w.jsxs)(`div`,{className:`spec-row`,children:[(0,w.jsx)(`span`,{className:`spec-label`,children:`Nama/Code`}),(0,w.jsxs)(`span`,{className:`spec-value`,children:[`: `,t.design_name||`-`]})]}),(0,w.jsxs)(`div`,{className:`spec-row`,children:[(0,w.jsx)(`span`,{className:`spec-label`,children:`Harga Seunit`}),(0,w.jsxs)(`span`,{className:`spec-value`,children:[`: RM `,parseFloat(t.price||0).toFixed(2)]})]}),(0,w.jsxs)(`div`,{className:`spec-row`,children:[(0,w.jsx)(`span`,{className:`spec-label`,children:`Kuantiti`}),(0,w.jsxs)(`span`,{className:`spec-value`,children:[`: `,t.qty,` pcs`]})]}),(0,w.jsxs)(`div`,{className:`spec-row`,style:{marginTop:`0.3rem`,paddingTop:`0.4rem`,borderTop:`1px dashed var(--border-color)`},children:[(0,w.jsx)(`span`,{className:`spec-label`,style:{fontWeight:700,color:`var(--text-dark)`},children:`Subtotal`}),(0,w.jsxs)(`span`,{className:`spec-value`,style:{fontWeight:700,color:`var(--primary-red)`},children:[`: RM `,parseFloat(t.subtotal||0).toFixed(2)]})]})]}):t.item_type===`seluar`?(0,w.jsxs)(w.Fragment,{children:[(0,w.jsxs)(`div`,{className:`spec-row`,children:[(0,w.jsx)(`span`,{className:`spec-label`,children:`Item Type`}),(0,w.jsx)(`span`,{className:`spec-value`,children:`: Seluar`})]}),(0,w.jsxs)(`div`,{className:`spec-row`,children:[(0,w.jsx)(`span`,{className:`spec-label`,children:`Nama/Code`}),(0,w.jsxs)(`span`,{className:`spec-value`,children:[`: `,t.design_name||`-`]})]}),(0,w.jsxs)(`div`,{className:`spec-row`,children:[(0,w.jsx)(`span`,{className:`spec-label`,children:`Kuantiti`}),(0,w.jsxs)(`span`,{className:`spec-value`,children:[`: `,t.qty,` pcs`]})]}),(0,w.jsxs)(`div`,{className:`spec-row`,style:{marginTop:`0.3rem`,paddingTop:`0.4rem`,borderTop:`1px dashed var(--border-color)`},children:[(0,w.jsx)(`span`,{className:`spec-label`,style:{fontWeight:700,color:`var(--text-dark)`},children:`Subtotal`}),(0,w.jsxs)(`span`,{className:`spec-value`,style:{fontWeight:700,color:`var(--primary-red)`},children:[`: RM `,parseFloat(t.subtotal||0).toFixed(2)]})]})]}):(0,w.jsxs)(w.Fragment,{children:[(0,w.jsxs)(`div`,{className:`spec-row`,children:[(0,w.jsx)(`span`,{className:`spec-label`,children:`Nama/Code`}),(0,w.jsxs)(`span`,{className:`spec-value`,children:[`: `,t.design_name||`-`]})]}),(0,w.jsxs)(`div`,{className:`spec-row`,children:[(0,w.jsx)(`span`,{className:`spec-label`,children:`Material`}),(0,w.jsxs)(`span`,{className:`spec-value`,children:[`: `,t.material||`-`]})]}),(0,w.jsxs)(`div`,{className:`spec-row`,children:[(0,w.jsx)(`span`,{className:`spec-label`,children:`Cutting`}),(0,w.jsxs)(`span`,{className:`spec-value`,children:[`: `,t.cutting||`-`]})]}),(0,w.jsxs)(`div`,{className:`spec-row`,children:[(0,w.jsx)(`span`,{className:`spec-label`,children:`Jenis Neck`}),(0,w.jsxs)(`span`,{className:`spec-value`,children:[`: `,t.neck||`-`]})]}),(0,w.jsxs)(`div`,{className:`spec-row`,children:[(0,w.jsx)(`span`,{className:`spec-label`,children:`Name Set`}),(0,w.jsxs)(`span`,{className:`spec-value`,children:[`: `,t.name_set||`-`]})]}),(0,w.jsxs)(`div`,{className:`spec-row`,style:{marginTop:`0.3rem`,paddingTop:`0.4rem`,borderTop:`1px dashed var(--border-color)`},children:[(0,w.jsx)(`span`,{className:`spec-label`,style:{fontWeight:700,color:`var(--text-dark)`},children:`Base Price`}),(0,w.jsxs)(`span`,{className:`spec-value`,style:{fontWeight:700,color:`var(--primary-red)`},children:[`: RM `,(()=>{let t=h(e.items.reduce((e,t)=>t.item_type===`banner`||t.item_type===`seluar`?e:e+(t.qty||0),0)),n=e.discount_type||`per_pcs`,r=e.discount_value===void 0?e.discount_per_pcs||0:e.discount_value;if(n===`bulk`&&r>0)return`${t.toFixed(2)} /pcs (Diskaun Pukal RM${parseFloat(r).toFixed(2)})`;{let e=t-r;return r>0?`${e.toFixed(2)} /pcs (diskaun RM${parseFloat(r).toFixed(2)})`:`${t.toFixed(2)} /pcs`}})()]})]})]})})]},t.id||n)):(0,w.jsx)(`div`,{className:`spec-empty`,children:`Tiada data spec pembelian untuk invoice ini.`})]})]},e.id))})]})]}),(0,w.jsxs)(`div`,{className:`modal-footer`,children:[(0,w.jsx)(`button`,{onClick:()=>A(null),className:`btn btn-secondary`,children:a(`close`)}),(0,w.jsxs)(`button`,{onClick:()=>{let e=k;A(null),B(e)},className:`btn btn-primary`,children:[(0,w.jsx)(e,{size:14}),` `,a(`editInfo`)]})]})]})}),j&&(0,w.jsx)(`div`,{className:`modal-overlay`,onClick:()=>M(null),children:(0,w.jsxs)(`div`,{className:`modal-content`,onClick:e=>e.stopPropagation(),style:{maxWidth:`450px`},children:[(0,w.jsxs)(`div`,{className:`modal-header`,children:[(0,w.jsx)(`h3`,{children:`Edit Maklumat Pelanggan`}),(0,w.jsx)(`button`,{className:`modal-close`,onClick:()=>M(null),children:(0,w.jsx)(l,{size:20})})]}),(0,w.jsxs)(`form`,{onSubmit:V,children:[(0,w.jsxs)(`div`,{className:`modal-body`,style:{display:`flex`,flexDirection:`column`,gap:`1.25rem`},children:[(0,w.jsxs)(`div`,{className:`form-group`,children:[(0,w.jsx)(`label`,{className:`form-label`,children:a(`clientName`)}),(0,w.jsx)(`input`,{type:`text`,value:F.name,onChange:e=>I(t=>({...t,name:e.target.value})),className:`form-control`,required:!0})]}),(0,w.jsxs)(`div`,{className:`form-group`,children:[(0,w.jsx)(`label`,{className:`form-label`,children:a(`phone`)}),(0,w.jsx)(`input`,{type:`text`,value:F.phone,onChange:e=>I(t=>({...t,phone:e.target.value})),className:`form-control`,required:!0})]})]}),(0,w.jsxs)(`div`,{className:`modal-footer`,children:[(0,w.jsx)(`button`,{type:`button`,className:`btn btn-secondary`,onClick:()=>M(null),children:a(`cancel`)}),(0,w.jsx)(`button`,{type:`submit`,className:`btn btn-primary`,children:a(`saveChanges`)})]})]})]})}),(0,w.jsx)(`style`,{children:`
        .clients-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .search-filters-bar {
          padding: 1.25rem 2rem;
        }

        .search-box {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          color: var(--text-light);
        }

        .search-input {
          padding-left: 2.75rem;
          width: 100%;
        }

        .client-name-cell {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .font-bold {
          font-weight: 600;
        }

        .text-light {
          color: var(--text-light);
        }

        .text-red {
          color: var(--primary-red);
        }

        .actions-cell {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .loading-state, .empty-state {
          padding: 3rem;
          text-align: center;
          color: var(--text-muted);
          font-family: var(--font-primary);
          font-size: 0.85rem;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        /* Profile Modal Styling */
        .client-profile-summary {
          display: flex;
          justify-content: space-between;
          background-color: var(--off-white-bg);
          border: 1px solid var(--border-color);
          padding: 1.5rem;
          margin-bottom: 2rem;
          gap: 2rem;
        }

        .summary-info {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          flex: 1;
        }

        .info-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }

        .info-label {
          font-family: var(--font-primary);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--text-muted);
          display: block;
          margin-bottom: 0.15rem;
        }

        .info-val {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-dark);
        }

        .summary-metrics {
          display: flex;
          gap: 1.5rem;
        }

        .metric-box {
          background-color: var(--white);
          border: 1px solid var(--border-color);
          padding: 1rem 1.5rem;
          min-width: 140px;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .metric-details {
          display: flex;
          flex-direction: column;
        }

        .metric-num {
          font-family: var(--font-primary);
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--text-dark);
        }

        .metric-label {
          font-size: 0.7rem;
          color: var(--text-muted);
          margin-top: 0.1rem;
        }

        /* History Section */
        .history-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .history-header h4 {
          font-family: var(--font-primary);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .empty-history {
          padding: 2.5rem;
          text-align: center;
          color: var(--text-light);
          border: 1px dashed var(--border-color);
          font-size: 0.9rem;
        }

        /* Expandable Spec Row Styles */
        tr.expanded-row-active {
          background-color: var(--off-white-bg) !important;
        }

        tr.expanded-row-active td {
          border-bottom: none !important;
        }

        .expanded-spec-row td {
          background-color: var(--off-white-bg);
        }

        .spec-container {
          padding: 0.75rem 1rem 1rem 1rem;
          border-top: 1px dashed var(--border-color);
        }

        .spec-header {
          font-family: var(--font-primary);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--text-muted);
          padding-bottom: 0.6rem;
          margin-bottom: 0.6rem;
          border-bottom: 1px solid var(--border-color);
        }

        .spec-card {
          display: flex;
          gap: 1.25rem;
          padding: 0.85rem 0;
          border-bottom: 1px solid var(--border-color);
          align-items: flex-start;
        }

        .spec-card:last-child {
          border-bottom: none;
        }

        .spec-image {
          width: 100px;
          height: 100px;
          min-width: 100px;
          border-radius: 6px;
          overflow: hidden;
          border: 1px solid var(--border-color);
          background: var(--white);
        }

        .spec-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .spec-image-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: var(--text-light);
          gap: 0.25rem;
          background: #f8f8f8;
        }

        .spec-image-placeholder span {
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .spec-details {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          padding-top: 0.1rem;
        }

        .spec-row {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
          font-size: 0.82rem;
          line-height: 1.5;
        }

        .spec-label {
          font-weight: 600;
          color: var(--text-muted);
          min-width: 85px;
          font-size: 0.78rem;
        }

        .spec-value {
          color: var(--text-dark);
          font-weight: 500;
        }

        .spec-empty {
          padding: 1.5rem;
          text-align: center;
          color: var(--text-light);
          font-size: 0.82rem;
          font-style: italic;
        }

        @media (max-width: 768px) {
          .client-profile-summary {
            flex-direction: column;
            gap: 1.5rem;
          }
          
          .summary-metrics {
            grid-template-columns: 1fr 1fr;
            width: 100%;
          }
          
          .metric-box {
            flex: 1;
          }

          .spec-card {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .spec-label {
            min-width: auto;
          }
        }
      `})]})}export{T as default};