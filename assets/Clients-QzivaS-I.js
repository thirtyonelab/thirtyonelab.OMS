import{t as e}from"./pen-DePblWup.js";import{t}from"./search-k0oxtZlT.js";import{t as n}from"./user-BKaUS32H.js";import{n as r}from"./mobileOrders-C52WLd22.js";import{C as i,E as a,F as o,I as s,M as c,N as l,O as u,a as d,c as f,j as p,l as m,n as h,p as g,r as _,t as v,y}from"./index-BVFH0xBx.js";var b=l(`dollar-sign`,[[`line`,{x1:`12`,x2:`12`,y1:`2`,y2:`22`,key:`7eqyqh`}],[`path`,{d:`M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6`,key:`1b0p4s`}]]),x=l(`image`,[[`rect`,{width:`18`,height:`18`,x:`3`,y:`3`,rx:`2`,ry:`2`,key:`1m3agn`}],[`circle`,{cx:`9`,cy:`9`,r:`2`,key:`af1f0g`}],[`path`,{d:`m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21`,key:`1xmnt7`}]]),S=l(`phone`,[[`path`,{d:`M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384`,key:`9njp5v`}]]),C=l(`shopping-bag`,[[`path`,{d:`M16 10a4 4 0 0 1-8 0`,key:`1ltviw`}],[`path`,{d:`M3.103 6.034h17.794`,key:`awc11p`}],[`path`,{d:`M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z`,key:`o988cm`}]]),w=s(o(),1),T=h();function E({onCreateInvoiceForClient:o}){let{tr:s}=v(),[l,h]=(0,w.useState)([]),[E,D]=(0,w.useState)([]),[O,k]=(0,w.useState)(``),[A,j]=(0,w.useState)(null),[M,N]=(0,w.useState)(null),[P,F]=(0,w.useState)(null),[I,L]=(0,w.useState)({name:``,phone:``}),[R,z]=(0,w.useState)(!1);(0,w.useEffect)(()=>{B()},[]);let B=async()=>{z(!0);try{let e=await f(),t=await m();h(e),D(t)}catch(e){console.error(`Error loading CRM data:`,e)}finally{z(!1)}},V=e=>{N(e),L({name:e.name,phone:e.phone})},H=async e=>{if(e.preventDefault(),!(!I.name.trim()||!I.phone.trim()))try{await g({...M,name:I.name.trim(),phone:I.phone.trim()},M),A&&A.id===M.id&&j(e=>({...e,name:I.name.trim(),phone:I.phone.trim()})),N(null),await B()}catch{alert(`Gagal mengemas kini maklumat pelanggan. Kemungkinan nombor telefon sudah wujud.`)}},U=async e=>{let t=E.some(t=>t.client_id===e.id),n=`Adakah anda pasti mahu memadam pelanggan "${e.name}"?`;t&&(n=`Amaran: Pelanggan "${e.name}" mempunyai sejarah invoice. Invoice yang berkaitan tidak akan dipadam tetapi pautan ke pelanggan ini akan dikeluarkan. Teruskan?`),window.confirm(n)&&(await d(e.id),B(),A&&A.id===e.id&&j(null))},W=l.filter(e=>e.name.toLowerCase().includes(O.toLowerCase())||e.phone.includes(O)),G=e=>E.filter(t=>t.client_id===e);return(0,T.jsxs)(`div`,{className:`main-content`,children:[(0,T.jsx)(`div`,{className:`clients-header desktop-only`,style:{marginBottom:`1.5rem`},children:(0,T.jsxs)(`div`,{children:[(0,T.jsx)(`span`,{className:`section-tag`,children:s(`clientsTag`)}),(0,T.jsx)(`h1`,{style:{fontSize:`1.75rem`,fontWeight:`800`,marginTop:`0.5rem`},children:s(`clientsTitle`)}),(0,T.jsx)(`p`,{style:{color:`var(--text-muted)`,fontSize:`0.9rem`,marginTop:`0.25rem`},children:s(`clientsSubtitle`)})]})}),(0,T.jsx)(`div`,{style:{display:`flex`,gap:`8px`,marginBottom:`16px`,alignItems:`center`},children:(0,T.jsxs)(`div`,{style:{flex:`1`,position:`relative`},children:[(0,T.jsx)(t,{size:15,style:{position:`absolute`,left:`11px`,top:`50%`,transform:`translateY(-50%)`,color:`#a1a1aa`}}),(0,T.jsx)(`input`,{type:`text`,placeholder:s(`searchClientPlaceholder`)||`Cari nama atau nombor telefon pelanggan...`,value:O,onChange:e=>k(e.target.value),className:`form-control`,style:{width:`100%`,padding:`7px 32px 7px 34px`,borderRadius:`8px`,border:`1px solid #e4e4e7`,fontSize:`12.5px`,backgroundColor:`#ffffff`,height:`36px`,boxSizing:`border-box`}}),O&&(0,T.jsx)(`button`,{onClick:()=>k(``),style:{position:`absolute`,right:`8px`,top:`50%`,transform:`translateY(-50%)`,background:`none`,border:0,cursor:`pointer`,color:`#a1a1aa`,padding:`2px 4px`,display:`flex`,alignItems:`center`},title:`Padam carian`,children:(0,T.jsx)(y,{size:14})})]})}),(0,T.jsxs)(`div`,{children:[(0,T.jsx)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,marginBottom:`0.85rem`},children:(0,T.jsxs)(`span`,{style:{fontSize:`0.78rem`,fontWeight:800,color:`var(--text-muted)`,letterSpacing:`0.5px`,textTransform:`uppercase`},children:[`DIREKTORI PELANGGAN (`,W.length,`)`]})}),R?(0,T.jsx)(`div`,{className:`loading-state`,style:{padding:`3rem`,textAlign:`center`,color:`var(--text-muted)`,backgroundColor:`#ffffff`,borderRadius:`12px`,border:`1px solid var(--border-color)`},children:s(`loadingClient`)}):W.length===0?(0,T.jsx)(`div`,{className:`empty-state`,style:{padding:`3rem`,textAlign:`center`,color:`var(--text-muted)`,backgroundColor:`#ffffff`,borderRadius:`12px`,border:`1px solid var(--border-color)`},children:s(`noClient`)}):(0,T.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fill, minmax(320px, 1fr))`,gap:`1rem`},children:W.map(t=>{let n=(t.phone||``).replace(/\D/g,``),r=n.startsWith(`60`)?n:n.startsWith(`0`)?`6${n}`:n;return(0,T.jsxs)(`div`,{className:`card`,style:{padding:`1.25rem`,borderRadius:`12px`,border:`1px solid var(--border-color)`,backgroundColor:`#ffffff`,display:`flex`,flexDirection:`column`,gap:`0.85rem`,transition:`border-color 0.15s ease`},children:[(0,T.jsxs)(`div`,{style:{display:`flex`,alignItems:`flex-start`,justifyContent:`space-between`,gap:`10px`},children:[(0,T.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`10px`},children:[(0,T.jsx)(`div`,{style:{width:`38px`,height:`38px`,borderRadius:`50%`,backgroundColor:`#18181b`,color:`#ffffff`,display:`flex`,alignItems:`center`,justifyContent:`center`,fontSize:`0.9rem`,fontWeight:800,flexShrink:0},children:(t.name||`P`).charAt(0).toUpperCase()}),(0,T.jsxs)(`div`,{children:[(0,T.jsx)(`div`,{style:{fontSize:`0.95rem`,fontWeight:800,color:`var(--text-dark)`,lineHeight:1.2},children:t.name}),(0,T.jsx)(`div`,{style:{fontSize:`0.78rem`,color:`var(--text-muted)`,marginTop:`2px`},children:t.phone||`-`})]})]}),r&&(0,T.jsx)(`a`,{href:`https://wa.me/${r}`,target:`_blank`,rel:`noreferrer`,style:{display:`inline-flex`,alignItems:`center`,gap:`4px`,fontSize:`11px`,fontWeight:700,color:`#16a34a`,backgroundColor:`#f0fdf4`,border:`1px solid #bbf7d0`,padding:`3px 8px`,borderRadius:`6px`,textDecoration:`none`},children:`WhatsApp`})]}),(0,T.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`1fr 1fr`,gap:`0.5rem`,background:`#f8f7f4`,padding:`0.65rem 0.75rem`,borderRadius:`8px`,border:`1px solid var(--border-color)`},children:[(0,T.jsxs)(`div`,{children:[(0,T.jsx)(`div`,{style:{fontSize:`10px`,fontWeight:750,color:`var(--text-muted)`,textTransform:`uppercase`},children:`Kekerapan Order`}),(0,T.jsxs)(`div`,{style:{fontSize:`0.92rem`,fontWeight:800,color:`var(--text-dark)`,marginTop:`1px`},children:[t.orders_count||0,` kali`]})]}),(0,T.jsxs)(`div`,{children:[(0,T.jsx)(`div`,{style:{fontSize:`10px`,fontWeight:750,color:`var(--text-muted)`,textTransform:`uppercase`},children:`Jumlah Belanja`}),(0,T.jsxs)(`div`,{style:{fontSize:`0.92rem`,fontWeight:900,color:`var(--primary-red)`,marginTop:`1px`},children:[`RM `,parseFloat(t.total_spent||0).toLocaleString(`en-US`,{minimumFractionDigits:2,maximumFractionDigits:2})]})]})]}),(0,T.jsxs)(`div`,{style:{display:`flex`,gap:`0.4rem`,marginTop:`auto`,paddingTop:`0.35rem`},children:[(0,T.jsxs)(`button`,{onClick:()=>j(t),className:`btn btn-primary btn-sm`,style:{flex:1,display:`flex`,alignItems:`center`,justifyContent:`center`,gap:`4px`,borderRadius:`8px`,fontWeight:650,fontSize:`0.78rem`},children:[(0,T.jsx)(u,{size:13}),` `,s(`view`),` Sejarah`]}),(0,T.jsxs)(`button`,{onClick:()=>V(t),className:`btn btn-secondary btn-sm`,style:{display:`flex`,alignItems:`center`,justifyContent:`center`,gap:`4px`,borderRadius:`8px`,fontWeight:650,fontSize:`0.78rem`},children:[(0,T.jsx)(e,{size:13}),` `,s(`edit`)]}),(0,T.jsx)(`button`,{onClick:()=>U(t),className:`btn btn-secondary btn-sm`,style:{display:`flex`,alignItems:`center`,justifyContent:`center`,borderRadius:`8px`,color:`#dc2626`,borderColor:`#fecaca`,padding:`0 8px`},title:`Padam Pelanggan`,children:(0,T.jsx)(i,{size:13})})]})]},t.id)})})]}),A&&(0,T.jsx)(`div`,{className:`modal-overlay`,onClick:()=>j(null),children:(0,T.jsxs)(`div`,{className:`modal-content`,onClick:e=>e.stopPropagation(),style:{maxWidth:`800px`},children:[(0,T.jsxs)(`div`,{className:`modal-header`,children:[(0,T.jsx)(`h3`,{children:`Profil Pelanggan`}),(0,T.jsx)(`button`,{className:`modal-close`,onClick:()=>j(null),children:(0,T.jsx)(y,{size:20})})]}),(0,T.jsxs)(`div`,{className:`modal-body`,children:[(0,T.jsxs)(`div`,{className:`client-profile-summary`,children:[(0,T.jsxs)(`div`,{className:`summary-info`,children:[(0,T.jsxs)(`div`,{className:`info-item`,children:[(0,T.jsx)(n,{size:18,className:`text-red`}),(0,T.jsxs)(`div`,{children:[(0,T.jsx)(`span`,{className:`info-label`,children:s(`clientName`)}),(0,T.jsx)(`span`,{className:`info-val`,children:A.name})]})]}),(0,T.jsxs)(`div`,{className:`info-item`,children:[(0,T.jsx)(S,{size:18,className:`text-red`}),(0,T.jsxs)(`div`,{children:[(0,T.jsx)(`span`,{className:`info-label`,children:s(`phone`)}),(0,T.jsx)(`span`,{className:`info-val`,children:A.phone})]})]})]}),(0,T.jsxs)(`div`,{className:`summary-metrics`,children:[(0,T.jsxs)(`div`,{className:`metric-box`,children:[(0,T.jsx)(C,{size:20,className:`text-muted`}),(0,T.jsxs)(`div`,{className:`metric-details`,children:[(0,T.jsx)(`span`,{className:`metric-num`,children:A.orders_count||0}),(0,T.jsx)(`span`,{className:`metric-label`,children:`Jumlah Order`})]})]}),(0,T.jsxs)(`div`,{className:`metric-box`,children:[(0,T.jsx)(b,{size:20,className:`text-red`}),(0,T.jsxs)(`div`,{className:`metric-details`,children:[(0,T.jsxs)(`span`,{className:`metric-num`,children:[`RM `,parseFloat(A.total_spent||0).toLocaleString(`en-US`,{minimumFractionDigits:2})]}),(0,T.jsx)(`span`,{className:`metric-label`,children:`Total Belanja`})]})]})]})]}),(0,T.jsxs)(`div`,{className:`history-section`,children:[(0,T.jsxs)(`div`,{className:`history-header`,children:[(0,T.jsx)(`h4`,{children:`Sejarah Invoice & Tempahan`}),(0,T.jsxs)(`button`,{onClick:()=>{j(null),o(A)},className:`btn btn-primary btn-sm`,children:[(0,T.jsx)(a,{size:12}),` Cipta Invoice Baru`]})]}),(0,T.jsx)(`div`,{className:`table-container desktop-only`,style:{maxHeight:`300px`,overflowY:`auto`},children:G(A.id).length===0?(0,T.jsx)(`div`,{className:`empty-history`,children:`Tiada rekod tempahan untuk pelanggan ini.`}):(0,T.jsxs)(`table`,{className:`table`,style:{fontSize:`0.85rem`},children:[(0,T.jsx)(`thead`,{children:(0,T.jsxs)(`tr`,{children:[(0,T.jsx)(`th`,{}),(0,T.jsx)(`th`,{children:`No. Invoice`}),(0,T.jsx)(`th`,{children:`Tarikh`}),(0,T.jsx)(`th`,{children:`Nama Job`}),(0,T.jsx)(`th`,{style:{textAlign:`center`},children:`Jumlah`}),(0,T.jsx)(`th`,{style:{textAlign:`center`},children:`Status`})]})}),(0,T.jsx)(`tbody`,{children:G(A.id).map(e=>(0,T.jsxs)(w.Fragment,{children:[(0,T.jsxs)(`tr`,{onClick:()=>F(P===e.id?null:e.id),style:{cursor:`pointer`,transition:`background 0.2s`},className:P===e.id?`expanded-row-active`:``,children:[(0,T.jsx)(`td`,{style:{width:`30px`,textAlign:`center`,padding:`0.5rem`},children:P===e.id?(0,T.jsx)(p,{size:14,className:`text-muted`}):(0,T.jsx)(c,{size:14,className:`text-muted`})}),(0,T.jsx)(`td`,{className:`font-bold`,children:e.invoice_no}),(0,T.jsx)(`td`,{children:e.date}),(0,T.jsx)(`td`,{children:e.job_name||r(e)}),(0,T.jsxs)(`td`,{style:{textAlign:`center`},className:`font-bold`,children:[`RM `,parseFloat(e.grand_total).toFixed(2)]}),(0,T.jsx)(`td`,{style:{textAlign:`center`},children:(0,T.jsx)(`span`,{className:`badge badge-${e.status.toLowerCase()}`,children:e.status})})]}),P===e.id&&(0,T.jsx)(`tr`,{className:`expanded-spec-row`,children:(0,T.jsx)(`td`,{colSpan:6,style:{padding:0,border:`none`},children:(0,T.jsxs)(`div`,{className:`spec-container`,children:[(0,T.jsx)(`div`,{className:`spec-header`,children:(0,T.jsx)(`span`,{children:`HISTORY SPEC PEMBELIAN`})}),e.items&&e.items.length>0?e.items.map((t,n)=>(0,T.jsxs)(`div`,{className:`spec-card`,children:[(0,T.jsx)(`div`,{className:`spec-image`,children:t.design_image?(0,T.jsx)(`img`,{src:t.design_image,alt:t.design_name||`Design`}):(0,T.jsxs)(`div`,{className:`spec-image-placeholder`,children:[(0,T.jsx)(x,{size:28}),(0,T.jsx)(`span`,{children:`Tiada Gambar`})]})}),(0,T.jsx)(`div`,{className:`spec-details`,children:t.item_type===`banner`?(0,T.jsxs)(T.Fragment,{children:[(0,T.jsxs)(`div`,{className:`spec-row`,children:[(0,T.jsx)(`span`,{className:`spec-label`,children:`Item Type`}),(0,T.jsx)(`span`,{className:`spec-value`,children:`: Banner`})]}),(0,T.jsxs)(`div`,{className:`spec-row`,children:[(0,T.jsx)(`span`,{className:`spec-label`,children:`Nama/Code`}),(0,T.jsxs)(`span`,{className:`spec-value`,children:[`: `,t.design_name||`-`]})]}),(0,T.jsxs)(`div`,{className:`spec-row`,children:[(0,T.jsx)(`span`,{className:`spec-label`,children:`Harga Seunit`}),(0,T.jsxs)(`span`,{className:`spec-value`,children:[`: RM `,parseFloat(t.price||0).toFixed(2)]})]}),(0,T.jsxs)(`div`,{className:`spec-row`,children:[(0,T.jsx)(`span`,{className:`spec-label`,children:`Kuantiti`}),(0,T.jsxs)(`span`,{className:`spec-value`,children:[`: `,t.qty,` pcs`]})]}),(0,T.jsxs)(`div`,{className:`spec-row`,style:{marginTop:`0.3rem`,paddingTop:`0.4rem`,borderTop:`1px dashed var(--border-color)`},children:[(0,T.jsx)(`span`,{className:`spec-label`,style:{fontWeight:700,color:`var(--text-dark)`},children:`Subtotal`}),(0,T.jsxs)(`span`,{className:`spec-value`,style:{fontWeight:700,color:`var(--primary-red)`},children:[`: RM `,parseFloat(t.subtotal||0).toFixed(2)]})]})]}):t.item_type===`seluar`?(0,T.jsxs)(T.Fragment,{children:[(0,T.jsxs)(`div`,{className:`spec-row`,children:[(0,T.jsx)(`span`,{className:`spec-label`,children:`Item Type`}),(0,T.jsx)(`span`,{className:`spec-value`,children:`: Seluar`})]}),(0,T.jsxs)(`div`,{className:`spec-row`,children:[(0,T.jsx)(`span`,{className:`spec-label`,children:`Nama/Code`}),(0,T.jsxs)(`span`,{className:`spec-value`,children:[`: `,t.design_name||`-`]})]}),(0,T.jsxs)(`div`,{className:`spec-row`,children:[(0,T.jsx)(`span`,{className:`spec-label`,children:`Kuantiti`}),(0,T.jsxs)(`span`,{className:`spec-value`,children:[`: `,t.qty,` pcs`]})]}),(0,T.jsxs)(`div`,{className:`spec-row`,style:{marginTop:`0.3rem`,paddingTop:`0.4rem`,borderTop:`1px dashed var(--border-color)`},children:[(0,T.jsx)(`span`,{className:`spec-label`,style:{fontWeight:700,color:`var(--text-dark)`},children:`Subtotal`}),(0,T.jsxs)(`span`,{className:`spec-value`,style:{fontWeight:700,color:`var(--primary-red)`},children:[`: RM `,parseFloat(t.subtotal||0).toFixed(2)]})]})]}):(0,T.jsxs)(T.Fragment,{children:[(0,T.jsxs)(`div`,{className:`spec-row`,children:[(0,T.jsx)(`span`,{className:`spec-label`,children:`Nama/Code`}),(0,T.jsxs)(`span`,{className:`spec-value`,children:[`: `,t.design_name||`-`]})]}),(0,T.jsxs)(`div`,{className:`spec-row`,children:[(0,T.jsx)(`span`,{className:`spec-label`,children:`Material`}),(0,T.jsxs)(`span`,{className:`spec-value`,children:[`: `,t.material||`-`]})]}),(0,T.jsxs)(`div`,{className:`spec-row`,children:[(0,T.jsx)(`span`,{className:`spec-label`,children:`Cutting`}),(0,T.jsxs)(`span`,{className:`spec-value`,children:[`: `,t.cutting||`-`]})]}),(0,T.jsxs)(`div`,{className:`spec-row`,children:[(0,T.jsx)(`span`,{className:`spec-label`,children:`Jenis Neck`}),(0,T.jsxs)(`span`,{className:`spec-value`,children:[`: `,t.neck||`-`]})]}),(0,T.jsxs)(`div`,{className:`spec-row`,children:[(0,T.jsx)(`span`,{className:`spec-label`,children:`Name Set`}),(0,T.jsxs)(`span`,{className:`spec-value`,children:[`: `,t.name_set||`-`]})]}),(0,T.jsxs)(`div`,{className:`spec-row`,style:{marginTop:`0.3rem`,paddingTop:`0.4rem`,borderTop:`1px dashed var(--border-color)`},children:[(0,T.jsx)(`span`,{className:`spec-label`,style:{fontWeight:700,color:`var(--text-dark)`},children:`Base Price`}),(0,T.jsxs)(`span`,{className:`spec-value`,style:{fontWeight:700,color:`var(--primary-red)`},children:[`: RM `,(()=>{let t=_(e.items.reduce((e,t)=>t.item_type===`banner`||t.item_type===`seluar`?e:e+(t.qty||0),0)),n=e.discount_type||`per_pcs`,r=e.discount_value===void 0?e.discount_per_pcs||0:e.discount_value;if(n===`bulk`&&r>0)return`${t.toFixed(2)} /pcs (Diskaun Pukal RM${parseFloat(r).toFixed(2)})`;{let e=t-r;return r>0?`${e.toFixed(2)} /pcs (diskaun RM${parseFloat(r).toFixed(2)})`:`${t.toFixed(2)} /pcs`}})()]})]})]})})]},t.id||n)):(0,T.jsx)(`div`,{className:`spec-empty`,children:`Tiada data spec pembelian untuk invoice ini.`})]})})})]},e.id))})]})}),(0,T.jsx)(`div`,{className:`mobile-only`,style:{display:`flex`,flexDirection:`column`,gap:`0.75rem`,maxHeight:`350px`,overflowY:`auto`,marginBottom:`1rem`},children:G(A.id).length===0?(0,T.jsx)(`div`,{className:`empty-history`,children:`Tiada rekod tempahan untuk pelanggan ini.`}):G(A.id).map(e=>(0,T.jsxs)(`div`,{className:`mobile-card`,style:{padding:`1rem`,border:`1px solid var(--border-color)`,gap:`0.5rem`},children:[(0,T.jsxs)(`div`,{className:`mobile-card-row`,onClick:()=>F(P===e.id?null:e.id),style:{cursor:`pointer`},children:[(0,T.jsxs)(`span`,{className:`mobile-card-bold`,style:{display:`flex`,alignItems:`center`,gap:`0.35rem`,fontFamily:`var(--font-primary)`,fontSize:`0.78rem`},children:[P===e.id?(0,T.jsx)(p,{size:14}):(0,T.jsx)(c,{size:14}),e.invoice_no]}),(0,T.jsx)(`span`,{className:`badge badge-${e.status.toLowerCase()}`,children:e.status})]}),(0,T.jsxs)(`div`,{className:`mobile-card-row`,onClick:()=>F(P===e.id?null:e.id),style:{cursor:`pointer`,fontSize:`0.8rem`,color:`var(--text-muted)`},children:[(0,T.jsxs)(`span`,{children:[e.date,` | `,e.job_name||r(e)]}),(0,T.jsxs)(`span`,{className:`mobile-card-bold`,style:{color:`var(--text-dark)`},children:[`RM `,parseFloat(e.grand_total).toFixed(2)]})]}),P===e.id&&(0,T.jsxs)(`div`,{className:`spec-container`,style:{marginTop:`0.5rem`,paddingTop:`0.5rem`,borderTop:`1px dashed var(--border-color)`},children:[(0,T.jsx)(`div`,{className:`spec-header`,style:{paddingBottom:`0.5rem`,marginBottom:`0.5rem`},children:(0,T.jsx)(`span`,{children:`HISTORY SPEC PEMBELIAN`})}),e.items&&e.items.length>0?e.items.map((t,n)=>(0,T.jsxs)(`div`,{className:`spec-card`,children:[(0,T.jsx)(`div`,{className:`spec-image`,children:t.design_image?(0,T.jsx)(`img`,{src:t.design_image,alt:t.design_name||`Design`}):(0,T.jsxs)(`div`,{className:`spec-image-placeholder`,children:[(0,T.jsx)(x,{size:28}),(0,T.jsx)(`span`,{children:`Tiada Gambar`})]})}),(0,T.jsx)(`div`,{className:`spec-details`,children:t.item_type===`banner`?(0,T.jsxs)(T.Fragment,{children:[(0,T.jsxs)(`div`,{className:`spec-row`,children:[(0,T.jsx)(`span`,{className:`spec-label`,children:`Item Type`}),(0,T.jsx)(`span`,{className:`spec-value`,children:`: Banner`})]}),(0,T.jsxs)(`div`,{className:`spec-row`,children:[(0,T.jsx)(`span`,{className:`spec-label`,children:`Nama/Code`}),(0,T.jsxs)(`span`,{className:`spec-value`,children:[`: `,t.design_name||`-`]})]}),(0,T.jsxs)(`div`,{className:`spec-row`,children:[(0,T.jsx)(`span`,{className:`spec-label`,children:`Harga Seunit`}),(0,T.jsxs)(`span`,{className:`spec-value`,children:[`: RM `,parseFloat(t.price||0).toFixed(2)]})]}),(0,T.jsxs)(`div`,{className:`spec-row`,children:[(0,T.jsx)(`span`,{className:`spec-label`,children:`Kuantiti`}),(0,T.jsxs)(`span`,{className:`spec-value`,children:[`: `,t.qty,` pcs`]})]}),(0,T.jsxs)(`div`,{className:`spec-row`,style:{marginTop:`0.3rem`,paddingTop:`0.4rem`,borderTop:`1px dashed var(--border-color)`},children:[(0,T.jsx)(`span`,{className:`spec-label`,style:{fontWeight:700,color:`var(--text-dark)`},children:`Subtotal`}),(0,T.jsxs)(`span`,{className:`spec-value`,style:{fontWeight:700,color:`var(--primary-red)`},children:[`: RM `,parseFloat(t.subtotal||0).toFixed(2)]})]})]}):t.item_type===`seluar`?(0,T.jsxs)(T.Fragment,{children:[(0,T.jsxs)(`div`,{className:`spec-row`,children:[(0,T.jsx)(`span`,{className:`spec-label`,children:`Item Type`}),(0,T.jsx)(`span`,{className:`spec-value`,children:`: Seluar`})]}),(0,T.jsxs)(`div`,{className:`spec-row`,children:[(0,T.jsx)(`span`,{className:`spec-label`,children:`Nama/Code`}),(0,T.jsxs)(`span`,{className:`spec-value`,children:[`: `,t.design_name||`-`]})]}),(0,T.jsxs)(`div`,{className:`spec-row`,children:[(0,T.jsx)(`span`,{className:`spec-label`,children:`Kuantiti`}),(0,T.jsxs)(`span`,{className:`spec-value`,children:[`: `,t.qty,` pcs`]})]}),(0,T.jsxs)(`div`,{className:`spec-row`,style:{marginTop:`0.3rem`,paddingTop:`0.4rem`,borderTop:`1px dashed var(--border-color)`},children:[(0,T.jsx)(`span`,{className:`spec-label`,style:{fontWeight:700,color:`var(--text-dark)`},children:`Subtotal`}),(0,T.jsxs)(`span`,{className:`spec-value`,style:{fontWeight:700,color:`var(--primary-red)`},children:[`: RM `,parseFloat(t.subtotal||0).toFixed(2)]})]})]}):(0,T.jsxs)(T.Fragment,{children:[(0,T.jsxs)(`div`,{className:`spec-row`,children:[(0,T.jsx)(`span`,{className:`spec-label`,children:`Nama/Code`}),(0,T.jsxs)(`span`,{className:`spec-value`,children:[`: `,t.design_name||`-`]})]}),(0,T.jsxs)(`div`,{className:`spec-row`,children:[(0,T.jsx)(`span`,{className:`spec-label`,children:`Material`}),(0,T.jsxs)(`span`,{className:`spec-value`,children:[`: `,t.material||`-`]})]}),(0,T.jsxs)(`div`,{className:`spec-row`,children:[(0,T.jsx)(`span`,{className:`spec-label`,children:`Cutting`}),(0,T.jsxs)(`span`,{className:`spec-value`,children:[`: `,t.cutting||`-`]})]}),(0,T.jsxs)(`div`,{className:`spec-row`,children:[(0,T.jsx)(`span`,{className:`spec-label`,children:`Jenis Neck`}),(0,T.jsxs)(`span`,{className:`spec-value`,children:[`: `,t.neck||`-`]})]}),(0,T.jsxs)(`div`,{className:`spec-row`,children:[(0,T.jsx)(`span`,{className:`spec-label`,children:`Name Set`}),(0,T.jsxs)(`span`,{className:`spec-value`,children:[`: `,t.name_set||`-`]})]}),(0,T.jsxs)(`div`,{className:`spec-row`,style:{marginTop:`0.3rem`,paddingTop:`0.4rem`,borderTop:`1px dashed var(--border-color)`},children:[(0,T.jsx)(`span`,{className:`spec-label`,style:{fontWeight:700,color:`var(--text-dark)`},children:`Base Price`}),(0,T.jsxs)(`span`,{className:`spec-value`,style:{fontWeight:700,color:`var(--primary-red)`},children:[`: RM `,(()=>{let t=_(e.items.reduce((e,t)=>t.item_type===`banner`||t.item_type===`seluar`?e:e+(t.qty||0),0)),n=e.discount_type||`per_pcs`,r=e.discount_value===void 0?e.discount_per_pcs||0:e.discount_value;if(n===`bulk`&&r>0)return`${t.toFixed(2)} /pcs (Diskaun Pukal RM${parseFloat(r).toFixed(2)})`;{let e=t-r;return r>0?`${e.toFixed(2)} /pcs (diskaun RM${parseFloat(r).toFixed(2)})`:`${t.toFixed(2)} /pcs`}})()]})]})]})})]},t.id||n)):(0,T.jsx)(`div`,{className:`spec-empty`,children:`Tiada data spec pembelian untuk invoice ini.`})]})]},e.id))})]})]}),(0,T.jsxs)(`div`,{className:`modal-footer`,children:[(0,T.jsx)(`button`,{onClick:()=>j(null),className:`btn btn-secondary`,children:s(`close`)}),(0,T.jsxs)(`button`,{onClick:()=>{let e=A;j(null),V(e)},className:`btn btn-primary`,children:[(0,T.jsx)(e,{size:14}),` `,s(`editInfo`)]})]})]})}),M&&(0,T.jsx)(`div`,{className:`modal-overlay`,onClick:()=>N(null),children:(0,T.jsxs)(`div`,{className:`modal-content`,onClick:e=>e.stopPropagation(),style:{maxWidth:`450px`},children:[(0,T.jsxs)(`div`,{className:`modal-header`,children:[(0,T.jsx)(`h3`,{children:`Edit Maklumat Pelanggan`}),(0,T.jsx)(`button`,{className:`modal-close`,onClick:()=>N(null),children:(0,T.jsx)(y,{size:20})})]}),(0,T.jsxs)(`form`,{onSubmit:H,children:[(0,T.jsxs)(`div`,{className:`modal-body`,style:{display:`flex`,flexDirection:`column`,gap:`1.25rem`},children:[(0,T.jsxs)(`div`,{className:`form-group`,children:[(0,T.jsx)(`label`,{className:`form-label`,children:s(`clientName`)}),(0,T.jsx)(`input`,{type:`text`,value:I.name,onChange:e=>L(t=>({...t,name:e.target.value})),className:`form-control`,required:!0})]}),(0,T.jsxs)(`div`,{className:`form-group`,children:[(0,T.jsx)(`label`,{className:`form-label`,children:s(`phone`)}),(0,T.jsx)(`input`,{type:`text`,value:I.phone,onChange:e=>L(t=>({...t,phone:e.target.value})),className:`form-control`,required:!0})]})]}),(0,T.jsxs)(`div`,{className:`modal-footer`,children:[(0,T.jsx)(`button`,{type:`button`,className:`btn btn-secondary`,onClick:()=>N(null),children:s(`cancel`)}),(0,T.jsx)(`button`,{type:`submit`,className:`btn btn-primary`,children:s(`saveChanges`)})]})]})]})}),(0,T.jsx)(`style`,{children:`
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
      `})]})}export{E as default};