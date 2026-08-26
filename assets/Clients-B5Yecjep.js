import{t as e}from"./eye-CMPetNY2.js";import{t}from"./pen-CAfLEVC-.js";import{t as n}from"./search-C-3eKe5T.js";import{C as r,E as i,S as a,T as o,c as s,d as c,g as l,i as u,n as d,r as f,s as p,t as m,v as h,w as g,x as _}from"./index-LmE3YOs8.js";var v=g(`dollar-sign`,[[`line`,{x1:`12`,x2:`12`,y1:`2`,y2:`22`,key:`7eqyqh`}],[`path`,{d:`M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6`,key:`1b0p4s`}]]),y=g(`image`,[[`rect`,{width:`18`,height:`18`,x:`3`,y:`3`,rx:`2`,ry:`2`,key:`1m3agn`}],[`circle`,{cx:`9`,cy:`9`,r:`2`,key:`af1f0g`}],[`path`,{d:`m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21`,key:`1xmnt7`}]]),b=g(`phone`,[[`path`,{d:`M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384`,key:`9njp5v`}]]),x=g(`shopping-bag`,[[`path`,{d:`M16 10a4 4 0 0 1-8 0`,key:`1ltviw`}],[`path`,{d:`M3.103 6.034h17.794`,key:`awc11p`}],[`path`,{d:`M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z`,key:`o988cm`}]]),S=g(`user`,[[`path`,{d:`M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2`,key:`975kel`}],[`circle`,{cx:`12`,cy:`7`,r:`4`,key:`17ys0d`}]]),C=i(o(),1),w=f(),T=`C:/Users/User/Documents/GitHub/thirtyonelab.OMS/src/pages/Clients.jsx`;function E({onCreateInvoiceForClient:i}){let{tr:o}=d(),[f,g]=(0,C.useState)([]),[E,D]=(0,C.useState)([]),[O,k]=(0,C.useState)(``),[A,j]=(0,C.useState)(null),[M,N]=(0,C.useState)(null),[P,F]=(0,C.useState)(null),[I,L]=(0,C.useState)({name:``,phone:``}),[R,z]=(0,C.useState)(!1);(0,C.useEffect)(()=>{B()},[]);let B=async()=>{z(!0);try{let e=await p(),t=await s();g(e),D(t)}catch(e){console.error(`Error loading CRM data:`,e)}finally{z(!1)}},V=e=>{N(e),L({name:e.name,phone:e.phone})},H=async e=>{if(e.preventDefault(),!(!I.name.trim()||!I.phone.trim()))try{await c({...M,name:I.name,phone:I.phone}),N(null),B()}catch{alert(`Gagal mengemas kini maklumat pelanggan. Kemungkinan nombor telefon sudah wujud.`)}},U=async e=>{let t=E.some(t=>t.client_id===e.id),n=`Adakah anda pasti mahu memadam pelanggan "${e.name}"?`;t&&(n=`Amaran: Pelanggan "${e.name}" mempunyai sejarah invoice. Invoice yang berkaitan tidak akan dipadam tetapi pautan ke pelanggan ini akan dikeluarkan. Teruskan?`),window.confirm(n)&&(await u(e.id),B(),A&&A.id===e.id&&j(null))},W=f.filter(e=>e.name.toLowerCase().includes(O.toLowerCase())||e.phone.includes(O)),G=e=>E.filter(t=>t.client_id===e);return(0,w.jsxDEV)(`div`,{className:`main-content`,children:[(0,w.jsxDEV)(`div`,{className:`clients-header`,style:{marginBottom:`1.5rem`},children:(0,w.jsxDEV)(`div`,{children:[(0,w.jsxDEV)(`span`,{className:`section-tag`,children:o(`clientsTag`)},void 0,!1,{fileName:T,lineNumber:93,columnNumber:11},this),(0,w.jsxDEV)(`h1`,{style:{fontSize:`1.75rem`,fontWeight:`800`,marginTop:`0.5rem`},children:o(`clientsTitle`)},void 0,!1,{fileName:T,lineNumber:94,columnNumber:11},this),(0,w.jsxDEV)(`p`,{style:{color:`var(--text-muted)`,fontSize:`0.9rem`,marginTop:`0.25rem`},children:o(`clientsSubtitle`)},void 0,!1,{fileName:T,lineNumber:95,columnNumber:11},this)]},void 0,!0,{fileName:T,lineNumber:92,columnNumber:9},this)},void 0,!1,{fileName:T,lineNumber:91,columnNumber:7},this),(0,w.jsxDEV)(`div`,{className:`search-filters-bar card`,style:{padding:`1.25rem`},children:(0,w.jsxDEV)(`div`,{className:`search-box`,children:[(0,w.jsxDEV)(n,{size:18,className:`search-icon`},void 0,!1,{fileName:T,lineNumber:104,columnNumber:11},this),(0,w.jsxDEV)(`input`,{type:`text`,placeholder:o(`searchClientPlaceholder`)||`Cari nama atau nombor telefon pelanggan...`,value:O,onChange:e=>k(e.target.value),className:`form-control search-input`},void 0,!1,{fileName:T,lineNumber:105,columnNumber:11},this)]},void 0,!0,{fileName:T,lineNumber:103,columnNumber:9},this)},void 0,!1,{fileName:T,lineNumber:102,columnNumber:7},this),(0,w.jsxDEV)(`div`,{className:`card`,style:{padding:0},children:R?(0,w.jsxDEV)(`div`,{className:`loading-state`,children:o(`loadingClient`)},void 0,!1,{fileName:T,lineNumber:118,columnNumber:11},this):W.length===0?(0,w.jsxDEV)(`div`,{className:`empty-state`,children:o(`noClient`)},void 0,!1,{fileName:T,lineNumber:120,columnNumber:11},this):(0,w.jsxDEV)(w.Fragment,{children:[(0,w.jsxDEV)(`div`,{className:`table-container desktop-only`,children:(0,w.jsxDEV)(`table`,{className:`table`,children:[(0,w.jsxDEV)(`thead`,{children:(0,w.jsxDEV)(`tr`,{children:[(0,w.jsxDEV)(`th`,{children:o(`clientName`)},void 0,!1,{fileName:T,lineNumber:127,columnNumber:21},this),(0,w.jsxDEV)(`th`,{style:{textAlign:`center`},children:o(`phone`)},void 0,!1,{fileName:T,lineNumber:128,columnNumber:21},this),(0,w.jsxDEV)(`th`,{style:{textAlign:`center`},children:o(`totalOrder`)},void 0,!1,{fileName:T,lineNumber:129,columnNumber:21},this),(0,w.jsxDEV)(`th`,{style:{textAlign:`center`},children:o(`totalSpent`)},void 0,!1,{fileName:T,lineNumber:130,columnNumber:21},this),(0,w.jsxDEV)(`th`,{style:{textAlign:`center`},children:o(`actions`)},void 0,!1,{fileName:T,lineNumber:131,columnNumber:21},this)]},void 0,!0,{fileName:T,lineNumber:126,columnNumber:19},this)},void 0,!1,{fileName:T,lineNumber:125,columnNumber:17},this),(0,w.jsxDEV)(`tbody`,{children:W.map(n=>(0,w.jsxDEV)(`tr`,{children:[(0,w.jsxDEV)(`td`,{children:(0,w.jsxDEV)(`div`,{className:`client-name-cell`,children:[(0,w.jsxDEV)(S,{size:16,className:`text-light`},void 0,!1,{fileName:T,lineNumber:139,columnNumber:27},this),(0,w.jsxDEV)(`span`,{className:`font-bold`,children:n.name},void 0,!1,{fileName:T,lineNumber:140,columnNumber:27},this)]},void 0,!0,{fileName:T,lineNumber:138,columnNumber:25},this)},void 0,!1,{fileName:T,lineNumber:137,columnNumber:23},this),(0,w.jsxDEV)(`td`,{style:{textAlign:`center`},children:n.phone},void 0,!1,{fileName:T,lineNumber:143,columnNumber:23},this),(0,w.jsxDEV)(`td`,{style:{textAlign:`center`},children:[n.orders_count||0,` kali`]},void 0,!0,{fileName:T,lineNumber:144,columnNumber:23},this),(0,w.jsxDEV)(`td`,{style:{textAlign:`center`},className:`font-bold`,children:[`RM `,parseFloat(n.total_spent||0).toLocaleString(`en-US`,{minimumFractionDigits:2,maximumFractionDigits:2})]},void 0,!0,{fileName:T,lineNumber:145,columnNumber:23},this),(0,w.jsxDEV)(`td`,{style:{textAlign:`center`},children:(0,w.jsxDEV)(`div`,{className:`actions-cell`,children:[(0,w.jsxDEV)(`button`,{onClick:()=>j(n),className:`btn btn-secondary btn-sm`,title:`Lihat Sejarah`,children:[(0,w.jsxDEV)(e,{size:12},void 0,!1,{fileName:T,lineNumber:155,columnNumber:29},this),` `,o(`view`)]},void 0,!0,{fileName:T,lineNumber:150,columnNumber:27},this),(0,w.jsxDEV)(`button`,{onClick:()=>V(n),className:`btn btn-secondary btn-sm`,title:`Kemaskini Butiran`,children:[(0,w.jsxDEV)(t,{size:12},void 0,!1,{fileName:T,lineNumber:162,columnNumber:29},this),` `,o(`edit`)]},void 0,!0,{fileName:T,lineNumber:157,columnNumber:27},this),(0,w.jsxDEV)(`button`,{onClick:()=>U(n),className:`btn btn-secondary btn-sm`,title:`Padam Pelanggan`,style:{borderColor:`#FEE2E2`,color:`#B91C1C`},children:[(0,w.jsxDEV)(h,{size:12},void 0,!1,{fileName:T,lineNumber:170,columnNumber:29},this),` `,o(`delete`)]},void 0,!0,{fileName:T,lineNumber:164,columnNumber:27},this)]},void 0,!0,{fileName:T,lineNumber:149,columnNumber:25},this)},void 0,!1,{fileName:T,lineNumber:148,columnNumber:23},this)]},n.id,!0,{fileName:T,lineNumber:136,columnNumber:21},this))},void 0,!1,{fileName:T,lineNumber:134,columnNumber:17},this)]},void 0,!0,{fileName:T,lineNumber:124,columnNumber:15},this)},void 0,!1,{fileName:T,lineNumber:123,columnNumber:13},this),(0,w.jsxDEV)(`div`,{className:`mobile-cards-list mobile-only`,children:W.map(n=>(0,w.jsxDEV)(`div`,{className:`mobile-card`,children:[(0,w.jsxDEV)(`div`,{className:`mobile-card-row`,children:[(0,w.jsxDEV)(`span`,{className:`mobile-card-title`,style:{display:`flex`,alignItems:`center`,gap:`0.4rem`},children:[(0,w.jsxDEV)(S,{size:14,className:`text-red`},void 0,!1,{fileName:T,lineNumber:185,columnNumber:23},this),n.name]},void 0,!0,{fileName:T,lineNumber:184,columnNumber:21},this),(0,w.jsxDEV)(`span`,{className:`mobile-card-detail`,children:n.phone},void 0,!1,{fileName:T,lineNumber:188,columnNumber:21},this)]},void 0,!0,{fileName:T,lineNumber:183,columnNumber:19},this),(0,w.jsxDEV)(`div`,{className:`mobile-card-row`,children:[(0,w.jsxDEV)(`span`,{className:`mobile-card-detail`,children:[`Tempahan: `,(0,w.jsxDEV)(`span`,{className:`mobile-card-bold`,children:[n.orders_count||0,` kali`]},void 0,!0,{fileName:T,lineNumber:191,columnNumber:68},this)]},void 0,!0,{fileName:T,lineNumber:191,columnNumber:21},this),(0,w.jsxDEV)(`span`,{className:`mobile-card-detail`,children:[`Jumlah Belanja: `,(0,w.jsxDEV)(`span`,{className:`mobile-card-bold`,style:{color:`var(--primary-red)`},children:[`RM `,parseFloat(n.total_spent||0).toLocaleString(`en-US`,{minimumFractionDigits:2,maximumFractionDigits:2})]},void 0,!0,{fileName:T,lineNumber:192,columnNumber:74},this)]},void 0,!0,{fileName:T,lineNumber:192,columnNumber:21},this)]},void 0,!0,{fileName:T,lineNumber:190,columnNumber:19},this),(0,w.jsxDEV)(`div`,{className:`mobile-card-actions`,children:[(0,w.jsxDEV)(`button`,{onClick:()=>j(n),className:`btn btn-secondary btn-sm`,children:[(0,w.jsxDEV)(e,{size:12},void 0,!1,{fileName:T,lineNumber:199,columnNumber:23},this),` `,o(`view`)]},void 0,!0,{fileName:T,lineNumber:195,columnNumber:21},this),(0,w.jsxDEV)(`button`,{onClick:()=>V(n),className:`btn btn-secondary btn-sm`,children:[(0,w.jsxDEV)(t,{size:12},void 0,!1,{fileName:T,lineNumber:205,columnNumber:23},this),` `,o(`edit`)]},void 0,!0,{fileName:T,lineNumber:201,columnNumber:21},this),(0,w.jsxDEV)(`button`,{onClick:()=>U(n),className:`btn btn-secondary btn-sm`,style:{borderColor:`#FEE2E2`,color:`#B91C1C`},children:[(0,w.jsxDEV)(h,{size:12},void 0,!1,{fileName:T,lineNumber:212,columnNumber:23},this),` `,o(`delete`)]},void 0,!0,{fileName:T,lineNumber:207,columnNumber:21},this)]},void 0,!0,{fileName:T,lineNumber:194,columnNumber:19},this)]},n.id,!0,{fileName:T,lineNumber:182,columnNumber:17},this))},void 0,!1,{fileName:T,lineNumber:180,columnNumber:13},this)]},void 0,!0,{fileName:T,lineNumber:122,columnNumber:11},this)},void 0,!1,{fileName:T,lineNumber:116,columnNumber:7},this),A&&(0,w.jsxDEV)(`div`,{className:`modal-overlay`,onClick:()=>j(null),children:(0,w.jsxDEV)(`div`,{className:`modal-content`,onClick:e=>e.stopPropagation(),style:{maxWidth:`800px`},children:[(0,w.jsxDEV)(`div`,{className:`modal-header`,children:[(0,w.jsxDEV)(`h3`,{children:`Profil Pelanggan`},void 0,!1,{fileName:T,lineNumber:227,columnNumber:15},this),(0,w.jsxDEV)(`button`,{className:`modal-close`,onClick:()=>j(null),children:(0,w.jsxDEV)(l,{size:20},void 0,!1,{fileName:T,lineNumber:229,columnNumber:17},this)},void 0,!1,{fileName:T,lineNumber:228,columnNumber:15},this)]},void 0,!0,{fileName:T,lineNumber:226,columnNumber:13},this),(0,w.jsxDEV)(`div`,{className:`modal-body`,children:[(0,w.jsxDEV)(`div`,{className:`client-profile-summary`,children:[(0,w.jsxDEV)(`div`,{className:`summary-info`,children:[(0,w.jsxDEV)(`div`,{className:`info-item`,children:[(0,w.jsxDEV)(S,{size:18,className:`text-red`},void 0,!1,{fileName:T,lineNumber:238,columnNumber:21},this),(0,w.jsxDEV)(`div`,{children:[(0,w.jsxDEV)(`span`,{className:`info-label`,children:o(`clientName`)},void 0,!1,{fileName:T,lineNumber:240,columnNumber:23},this),(0,w.jsxDEV)(`span`,{className:`info-val`,children:A.name},void 0,!1,{fileName:T,lineNumber:241,columnNumber:23},this)]},void 0,!0,{fileName:T,lineNumber:239,columnNumber:21},this)]},void 0,!0,{fileName:T,lineNumber:237,columnNumber:19},this),(0,w.jsxDEV)(`div`,{className:`info-item`,children:[(0,w.jsxDEV)(b,{size:18,className:`text-red`},void 0,!1,{fileName:T,lineNumber:245,columnNumber:21},this),(0,w.jsxDEV)(`div`,{children:[(0,w.jsxDEV)(`span`,{className:`info-label`,children:o(`phone`)},void 0,!1,{fileName:T,lineNumber:247,columnNumber:23},this),(0,w.jsxDEV)(`span`,{className:`info-val`,children:A.phone},void 0,!1,{fileName:T,lineNumber:248,columnNumber:23},this)]},void 0,!0,{fileName:T,lineNumber:246,columnNumber:21},this)]},void 0,!0,{fileName:T,lineNumber:244,columnNumber:19},this)]},void 0,!0,{fileName:T,lineNumber:236,columnNumber:17},this),(0,w.jsxDEV)(`div`,{className:`summary-metrics`,children:[(0,w.jsxDEV)(`div`,{className:`metric-box`,children:[(0,w.jsxDEV)(x,{size:20,className:`text-muted`},void 0,!1,{fileName:T,lineNumber:255,columnNumber:21},this),(0,w.jsxDEV)(`div`,{className:`metric-details`,children:[(0,w.jsxDEV)(`span`,{className:`metric-num`,children:A.orders_count||0},void 0,!1,{fileName:T,lineNumber:257,columnNumber:23},this),(0,w.jsxDEV)(`span`,{className:`metric-label`,children:`Jumlah Order`},void 0,!1,{fileName:T,lineNumber:258,columnNumber:23},this)]},void 0,!0,{fileName:T,lineNumber:256,columnNumber:21},this)]},void 0,!0,{fileName:T,lineNumber:254,columnNumber:19},this),(0,w.jsxDEV)(`div`,{className:`metric-box`,children:[(0,w.jsxDEV)(v,{size:20,className:`text-red`},void 0,!1,{fileName:T,lineNumber:262,columnNumber:21},this),(0,w.jsxDEV)(`div`,{className:`metric-details`,children:[(0,w.jsxDEV)(`span`,{className:`metric-num`,children:[`RM `,parseFloat(A.total_spent||0).toLocaleString(`en-US`,{minimumFractionDigits:2})]},void 0,!0,{fileName:T,lineNumber:264,columnNumber:23},this),(0,w.jsxDEV)(`span`,{className:`metric-label`,children:`Total Belanja`},void 0,!1,{fileName:T,lineNumber:267,columnNumber:23},this)]},void 0,!0,{fileName:T,lineNumber:263,columnNumber:21},this)]},void 0,!0,{fileName:T,lineNumber:261,columnNumber:19},this)]},void 0,!0,{fileName:T,lineNumber:253,columnNumber:17},this)]},void 0,!0,{fileName:T,lineNumber:235,columnNumber:15},this),(0,w.jsxDEV)(`div`,{className:`history-section`,children:[(0,w.jsxDEV)(`div`,{className:`history-header`,children:[(0,w.jsxDEV)(`h4`,{children:`Sejarah Invoice & Tempahan`},void 0,!1,{fileName:T,lineNumber:276,columnNumber:19},this),(0,w.jsxDEV)(`button`,{onClick:()=>{j(null),i(A)},className:`btn btn-primary btn-sm`,children:[(0,w.jsxDEV)(_,{size:12},void 0,!1,{fileName:T,lineNumber:284,columnNumber:21},this),` Cipta Invoice Baru`]},void 0,!0,{fileName:T,lineNumber:277,columnNumber:19},this)]},void 0,!0,{fileName:T,lineNumber:275,columnNumber:17},this),(0,w.jsxDEV)(`div`,{className:`table-container desktop-only`,style:{maxHeight:`300px`,overflowY:`auto`},children:G(A.id).length===0?(0,w.jsxDEV)(`div`,{className:`empty-history`,children:`Tiada rekod tempahan untuk pelanggan ini.`},void 0,!1,{fileName:T,lineNumber:290,columnNumber:21},this):(0,w.jsxDEV)(`table`,{className:`table`,style:{fontSize:`0.85rem`},children:[(0,w.jsxDEV)(`thead`,{children:(0,w.jsxDEV)(`tr`,{children:[(0,w.jsxDEV)(`th`,{},void 0,!1,{fileName:T,lineNumber:295,columnNumber:27},this),(0,w.jsxDEV)(`th`,{children:`No. Invoice`},void 0,!1,{fileName:T,lineNumber:296,columnNumber:27},this),(0,w.jsxDEV)(`th`,{children:`Tarikh`},void 0,!1,{fileName:T,lineNumber:297,columnNumber:27},this),(0,w.jsxDEV)(`th`,{children:`Nama Job`},void 0,!1,{fileName:T,lineNumber:298,columnNumber:27},this),(0,w.jsxDEV)(`th`,{style:{textAlign:`center`},children:`Jumlah`},void 0,!1,{fileName:T,lineNumber:299,columnNumber:27},this),(0,w.jsxDEV)(`th`,{style:{textAlign:`center`},children:`Status`},void 0,!1,{fileName:T,lineNumber:300,columnNumber:27},this)]},void 0,!0,{fileName:T,lineNumber:294,columnNumber:25},this)},void 0,!1,{fileName:T,lineNumber:293,columnNumber:23},this),(0,w.jsxDEV)(`tbody`,{children:G(A.id).map(e=>(0,w.jsxDEV)(C.Fragment,{children:[(0,w.jsxDEV)(`tr`,{onClick:()=>F(P===e.id?null:e.id),style:{cursor:`pointer`,transition:`background 0.2s`},className:P===e.id?`expanded-row-active`:``,children:[(0,w.jsxDEV)(`td`,{style:{width:`30px`,textAlign:`center`,padding:`0.5rem`},children:P===e.id?(0,w.jsxDEV)(a,{size:14,className:`text-muted`},void 0,!1,{fileName:T,lineNumber:313,columnNumber:37},this):(0,w.jsxDEV)(r,{size:14,className:`text-muted`},void 0,!1,{fileName:T,lineNumber:314,columnNumber:37},this)},void 0,!1,{fileName:T,lineNumber:311,columnNumber:31},this),(0,w.jsxDEV)(`td`,{className:`font-bold`,children:e.invoice_no},void 0,!1,{fileName:T,lineNumber:317,columnNumber:31},this),(0,w.jsxDEV)(`td`,{children:e.date},void 0,!1,{fileName:T,lineNumber:318,columnNumber:31},this),(0,w.jsxDEV)(`td`,{children:e.job_name||`-`},void 0,!1,{fileName:T,lineNumber:319,columnNumber:31},this),(0,w.jsxDEV)(`td`,{style:{textAlign:`center`},className:`font-bold`,children:[`RM `,parseFloat(e.grand_total).toFixed(2)]},void 0,!0,{fileName:T,lineNumber:320,columnNumber:31},this),(0,w.jsxDEV)(`td`,{style:{textAlign:`center`},children:(0,w.jsxDEV)(`span`,{className:`badge badge-${e.status.toLowerCase()}`,children:e.status},void 0,!1,{fileName:T,lineNumber:324,columnNumber:33},this)},void 0,!1,{fileName:T,lineNumber:323,columnNumber:31},this)]},void 0,!0,{fileName:T,lineNumber:306,columnNumber:29},this),P===e.id&&(0,w.jsxDEV)(`tr`,{className:`expanded-spec-row`,children:(0,w.jsxDEV)(`td`,{colSpan:6,style:{padding:0,border:`none`},children:(0,w.jsxDEV)(`div`,{className:`spec-container`,children:[(0,w.jsxDEV)(`div`,{className:`spec-header`,children:(0,w.jsxDEV)(`span`,{children:`HISTORY SPEC PEMBELIAN`},void 0,!1,{fileName:T,lineNumber:334,columnNumber:39},this)},void 0,!1,{fileName:T,lineNumber:333,columnNumber:37},this),e.items&&e.items.length>0?e.items.map((t,n)=>(0,w.jsxDEV)(`div`,{className:`spec-card`,children:[(0,w.jsxDEV)(`div`,{className:`spec-image`,children:t.design_image?(0,w.jsxDEV)(`img`,{src:t.design_image,alt:t.design_name||`Design`},void 0,!1,{fileName:T,lineNumber:341,columnNumber:47},this):(0,w.jsxDEV)(`div`,{className:`spec-image-placeholder`,children:[(0,w.jsxDEV)(y,{size:28},void 0,!1,{fileName:T,lineNumber:344,columnNumber:49},this),(0,w.jsxDEV)(`span`,{children:`Tiada Gambar`},void 0,!1,{fileName:T,lineNumber:345,columnNumber:49},this)]},void 0,!0,{fileName:T,lineNumber:343,columnNumber:47},this)},void 0,!1,{fileName:T,lineNumber:339,columnNumber:43},this),(0,w.jsxDEV)(`div`,{className:`spec-details`,children:t.item_type===`banner`?(0,w.jsxDEV)(w.Fragment,{children:[(0,w.jsxDEV)(`div`,{className:`spec-row`,children:[(0,w.jsxDEV)(`span`,{className:`spec-label`,children:`Item Type`},void 0,!1,{fileName:T,lineNumber:353,columnNumber:51},this),(0,w.jsxDEV)(`span`,{className:`spec-value`,children:`: Banner`},void 0,!1,{fileName:T,lineNumber:354,columnNumber:51},this)]},void 0,!0,{fileName:T,lineNumber:352,columnNumber:49},this),(0,w.jsxDEV)(`div`,{className:`spec-row`,children:[(0,w.jsxDEV)(`span`,{className:`spec-label`,children:`Nama/Code`},void 0,!1,{fileName:T,lineNumber:357,columnNumber:51},this),(0,w.jsxDEV)(`span`,{className:`spec-value`,children:[`: `,t.design_name||`-`]},void 0,!0,{fileName:T,lineNumber:358,columnNumber:51},this)]},void 0,!0,{fileName:T,lineNumber:356,columnNumber:49},this),(0,w.jsxDEV)(`div`,{className:`spec-row`,children:[(0,w.jsxDEV)(`span`,{className:`spec-label`,children:`Harga Seunit`},void 0,!1,{fileName:T,lineNumber:361,columnNumber:51},this),(0,w.jsxDEV)(`span`,{className:`spec-value`,children:[`: RM `,parseFloat(t.price||0).toFixed(2)]},void 0,!0,{fileName:T,lineNumber:362,columnNumber:51},this)]},void 0,!0,{fileName:T,lineNumber:360,columnNumber:49},this),(0,w.jsxDEV)(`div`,{className:`spec-row`,children:[(0,w.jsxDEV)(`span`,{className:`spec-label`,children:`Kuantiti`},void 0,!1,{fileName:T,lineNumber:365,columnNumber:51},this),(0,w.jsxDEV)(`span`,{className:`spec-value`,children:[`: `,t.qty,` pcs`]},void 0,!0,{fileName:T,lineNumber:366,columnNumber:51},this)]},void 0,!0,{fileName:T,lineNumber:364,columnNumber:49},this),(0,w.jsxDEV)(`div`,{className:`spec-row`,style:{marginTop:`0.3rem`,paddingTop:`0.4rem`,borderTop:`1px dashed var(--border-color)`},children:[(0,w.jsxDEV)(`span`,{className:`spec-label`,style:{fontWeight:700,color:`var(--text-dark)`},children:`Subtotal`},void 0,!1,{fileName:T,lineNumber:369,columnNumber:51},this),(0,w.jsxDEV)(`span`,{className:`spec-value`,style:{fontWeight:700,color:`var(--primary-red)`},children:[`: RM `,parseFloat(t.subtotal||0).toFixed(2)]},void 0,!0,{fileName:T,lineNumber:370,columnNumber:51},this)]},void 0,!0,{fileName:T,lineNumber:368,columnNumber:49},this)]},void 0,!0,{fileName:T,lineNumber:351,columnNumber:47},this):(0,w.jsxDEV)(w.Fragment,{children:[(0,w.jsxDEV)(`div`,{className:`spec-row`,children:[(0,w.jsxDEV)(`span`,{className:`spec-label`,children:`Nama/Code`},void 0,!1,{fileName:T,lineNumber:376,columnNumber:51},this),(0,w.jsxDEV)(`span`,{className:`spec-value`,children:[`: `,t.design_name||`-`]},void 0,!0,{fileName:T,lineNumber:377,columnNumber:51},this)]},void 0,!0,{fileName:T,lineNumber:375,columnNumber:49},this),(0,w.jsxDEV)(`div`,{className:`spec-row`,children:[(0,w.jsxDEV)(`span`,{className:`spec-label`,children:`Material`},void 0,!1,{fileName:T,lineNumber:380,columnNumber:51},this),(0,w.jsxDEV)(`span`,{className:`spec-value`,children:[`: `,t.material||`-`]},void 0,!0,{fileName:T,lineNumber:381,columnNumber:51},this)]},void 0,!0,{fileName:T,lineNumber:379,columnNumber:49},this),(0,w.jsxDEV)(`div`,{className:`spec-row`,children:[(0,w.jsxDEV)(`span`,{className:`spec-label`,children:`Cutting`},void 0,!1,{fileName:T,lineNumber:384,columnNumber:51},this),(0,w.jsxDEV)(`span`,{className:`spec-value`,children:[`: `,t.cutting||`-`]},void 0,!0,{fileName:T,lineNumber:385,columnNumber:51},this)]},void 0,!0,{fileName:T,lineNumber:383,columnNumber:49},this),(0,w.jsxDEV)(`div`,{className:`spec-row`,children:[(0,w.jsxDEV)(`span`,{className:`spec-label`,children:`Jenis Neck`},void 0,!1,{fileName:T,lineNumber:388,columnNumber:51},this),(0,w.jsxDEV)(`span`,{className:`spec-value`,children:[`: `,t.neck||`-`]},void 0,!0,{fileName:T,lineNumber:389,columnNumber:51},this)]},void 0,!0,{fileName:T,lineNumber:387,columnNumber:49},this),(0,w.jsxDEV)(`div`,{className:`spec-row`,children:[(0,w.jsxDEV)(`span`,{className:`spec-label`,children:`Name Set`},void 0,!1,{fileName:T,lineNumber:392,columnNumber:51},this),(0,w.jsxDEV)(`span`,{className:`spec-value`,children:[`: `,t.name_set||`-`]},void 0,!0,{fileName:T,lineNumber:393,columnNumber:51},this)]},void 0,!0,{fileName:T,lineNumber:391,columnNumber:49},this),(0,w.jsxDEV)(`div`,{className:`spec-row`,style:{marginTop:`0.3rem`,paddingTop:`0.4rem`,borderTop:`1px dashed var(--border-color)`},children:[(0,w.jsxDEV)(`span`,{className:`spec-label`,style:{fontWeight:700,color:`var(--text-dark)`},children:`Base Price`},void 0,!1,{fileName:T,lineNumber:396,columnNumber:51},this),(0,w.jsxDEV)(`span`,{className:`spec-value`,style:{fontWeight:700,color:`var(--primary-red)`},children:[`: RM `,(()=>{let t=m(e.items.reduce((e,t)=>e+(t.qty||0),0)),n=e.discount_type||`per_pcs`,r=e.discount_value===void 0?e.discount_per_pcs||0:e.discount_value;if(n===`bulk`&&r>0)return`${t.toFixed(2)} /pcs (Diskaun Pukal RM${parseFloat(r).toFixed(2)})`;{let e=t-r;return r>0?`${e.toFixed(2)} /pcs (diskaun RM${parseFloat(r).toFixed(2)})`:`${t.toFixed(2)} /pcs`}})()]},void 0,!0,{fileName:T,lineNumber:397,columnNumber:51},this)]},void 0,!0,{fileName:T,lineNumber:395,columnNumber:49},this)]},void 0,!0,{fileName:T,lineNumber:374,columnNumber:47},this)},void 0,!1,{fileName:T,lineNumber:349,columnNumber:43},this)]},t.id||n,!0,{fileName:T,lineNumber:338,columnNumber:41},this)):(0,w.jsxDEV)(`div`,{className:`spec-empty`,children:`Tiada data spec pembelian untuk invoice ini.`},void 0,!1,{fileName:T,lineNumber:419,columnNumber:39},this)]},void 0,!0,{fileName:T,lineNumber:332,columnNumber:35},this)},void 0,!1,{fileName:T,lineNumber:331,columnNumber:33},this)},void 0,!1,{fileName:T,lineNumber:330,columnNumber:31},this)]},e.id,!0,{fileName:T,lineNumber:305,columnNumber:27},this))},void 0,!1,{fileName:T,lineNumber:303,columnNumber:23},this)]},void 0,!0,{fileName:T,lineNumber:292,columnNumber:21},this)},void 0,!1,{fileName:T,lineNumber:288,columnNumber:17},this),(0,w.jsxDEV)(`div`,{className:`mobile-only`,style:{display:`flex`,flexDirection:`column`,gap:`0.75rem`,maxHeight:`350px`,overflowY:`auto`,marginBottom:`1rem`},children:G(A.id).length===0?(0,w.jsxDEV)(`div`,{className:`empty-history`,children:`Tiada rekod tempahan untuk pelanggan ini.`},void 0,!1,{fileName:T,lineNumber:434,columnNumber:21},this):G(A.id).map(e=>(0,w.jsxDEV)(`div`,{className:`mobile-card`,style:{padding:`1rem`,border:`1px solid var(--border-color)`,gap:`0.5rem`},children:[(0,w.jsxDEV)(`div`,{className:`mobile-card-row`,onClick:()=>F(P===e.id?null:e.id),style:{cursor:`pointer`},children:[(0,w.jsxDEV)(`span`,{className:`mobile-card-bold`,style:{display:`flex`,alignItems:`center`,gap:`0.35rem`,fontFamily:`var(--font-primary)`,fontSize:`0.78rem`},children:[P===e.id?(0,w.jsxDEV)(a,{size:14},void 0,!1,{fileName:T,lineNumber:440,columnNumber:61},this):(0,w.jsxDEV)(r,{size:14},void 0,!1,{fileName:T,lineNumber:440,columnNumber:87},this),e.invoice_no]},void 0,!0,{fileName:T,lineNumber:439,columnNumber:27},this),(0,w.jsxDEV)(`span`,{className:`badge badge-${e.status.toLowerCase()}`,children:e.status},void 0,!1,{fileName:T,lineNumber:443,columnNumber:27},this)]},void 0,!0,{fileName:T,lineNumber:438,columnNumber:25},this),(0,w.jsxDEV)(`div`,{className:`mobile-card-row`,onClick:()=>F(P===e.id?null:e.id),style:{cursor:`pointer`,fontSize:`0.8rem`,color:`var(--text-muted)`},children:[(0,w.jsxDEV)(`span`,{children:[e.date,` | `,e.job_name||`-`]},void 0,!0,{fileName:T,lineNumber:446,columnNumber:27},this),(0,w.jsxDEV)(`span`,{className:`mobile-card-bold`,style:{color:`var(--text-dark)`},children:[`RM `,parseFloat(e.grand_total).toFixed(2)]},void 0,!0,{fileName:T,lineNumber:447,columnNumber:27},this)]},void 0,!0,{fileName:T,lineNumber:445,columnNumber:25},this),P===e.id&&(0,w.jsxDEV)(`div`,{className:`spec-container`,style:{marginTop:`0.5rem`,paddingTop:`0.5rem`,borderTop:`1px dashed var(--border-color)`},children:[(0,w.jsxDEV)(`div`,{className:`spec-header`,style:{paddingBottom:`0.5rem`,marginBottom:`0.5rem`},children:(0,w.jsxDEV)(`span`,{children:`HISTORY SPEC PEMBELIAN`},void 0,!1,{fileName:T,lineNumber:452,columnNumber:31},this)},void 0,!1,{fileName:T,lineNumber:451,columnNumber:29},this),e.items&&e.items.length>0?e.items.map((t,n)=>(0,w.jsxDEV)(`div`,{className:`spec-card`,children:[(0,w.jsxDEV)(`div`,{className:`spec-image`,children:t.design_image?(0,w.jsxDEV)(`img`,{src:t.design_image,alt:t.design_name||`Design`},void 0,!1,{fileName:T,lineNumber:459,columnNumber:39},this):(0,w.jsxDEV)(`div`,{className:`spec-image-placeholder`,children:[(0,w.jsxDEV)(y,{size:28},void 0,!1,{fileName:T,lineNumber:462,columnNumber:41},this),(0,w.jsxDEV)(`span`,{children:`Tiada Gambar`},void 0,!1,{fileName:T,lineNumber:463,columnNumber:41},this)]},void 0,!0,{fileName:T,lineNumber:461,columnNumber:39},this)},void 0,!1,{fileName:T,lineNumber:457,columnNumber:35},this),(0,w.jsxDEV)(`div`,{className:`spec-details`,children:t.item_type===`banner`?(0,w.jsxDEV)(w.Fragment,{children:[(0,w.jsxDEV)(`div`,{className:`spec-row`,children:[(0,w.jsxDEV)(`span`,{className:`spec-label`,children:`Item Type`},void 0,!1,{fileName:T,lineNumber:471,columnNumber:43},this),(0,w.jsxDEV)(`span`,{className:`spec-value`,children:`: Banner`},void 0,!1,{fileName:T,lineNumber:472,columnNumber:43},this)]},void 0,!0,{fileName:T,lineNumber:470,columnNumber:41},this),(0,w.jsxDEV)(`div`,{className:`spec-row`,children:[(0,w.jsxDEV)(`span`,{className:`spec-label`,children:`Nama/Code`},void 0,!1,{fileName:T,lineNumber:475,columnNumber:43},this),(0,w.jsxDEV)(`span`,{className:`spec-value`,children:[`: `,t.design_name||`-`]},void 0,!0,{fileName:T,lineNumber:476,columnNumber:43},this)]},void 0,!0,{fileName:T,lineNumber:474,columnNumber:41},this),(0,w.jsxDEV)(`div`,{className:`spec-row`,children:[(0,w.jsxDEV)(`span`,{className:`spec-label`,children:`Harga Seunit`},void 0,!1,{fileName:T,lineNumber:479,columnNumber:43},this),(0,w.jsxDEV)(`span`,{className:`spec-value`,children:[`: RM `,parseFloat(t.price||0).toFixed(2)]},void 0,!0,{fileName:T,lineNumber:480,columnNumber:43},this)]},void 0,!0,{fileName:T,lineNumber:478,columnNumber:41},this),(0,w.jsxDEV)(`div`,{className:`spec-row`,children:[(0,w.jsxDEV)(`span`,{className:`spec-label`,children:`Kuantiti`},void 0,!1,{fileName:T,lineNumber:483,columnNumber:43},this),(0,w.jsxDEV)(`span`,{className:`spec-value`,children:[`: `,t.qty,` pcs`]},void 0,!0,{fileName:T,lineNumber:484,columnNumber:43},this)]},void 0,!0,{fileName:T,lineNumber:482,columnNumber:41},this),(0,w.jsxDEV)(`div`,{className:`spec-row`,style:{marginTop:`0.3rem`,paddingTop:`0.4rem`,borderTop:`1px dashed var(--border-color)`},children:[(0,w.jsxDEV)(`span`,{className:`spec-label`,style:{fontWeight:700,color:`var(--text-dark)`},children:`Subtotal`},void 0,!1,{fileName:T,lineNumber:487,columnNumber:43},this),(0,w.jsxDEV)(`span`,{className:`spec-value`,style:{fontWeight:700,color:`var(--primary-red)`},children:[`: RM `,parseFloat(t.subtotal||0).toFixed(2)]},void 0,!0,{fileName:T,lineNumber:488,columnNumber:43},this)]},void 0,!0,{fileName:T,lineNumber:486,columnNumber:41},this)]},void 0,!0,{fileName:T,lineNumber:469,columnNumber:39},this):(0,w.jsxDEV)(w.Fragment,{children:[(0,w.jsxDEV)(`div`,{className:`spec-row`,children:[(0,w.jsxDEV)(`span`,{className:`spec-label`,children:`Nama/Code`},void 0,!1,{fileName:T,lineNumber:494,columnNumber:43},this),(0,w.jsxDEV)(`span`,{className:`spec-value`,children:[`: `,t.design_name||`-`]},void 0,!0,{fileName:T,lineNumber:495,columnNumber:43},this)]},void 0,!0,{fileName:T,lineNumber:493,columnNumber:41},this),(0,w.jsxDEV)(`div`,{className:`spec-row`,children:[(0,w.jsxDEV)(`span`,{className:`spec-label`,children:`Material`},void 0,!1,{fileName:T,lineNumber:498,columnNumber:43},this),(0,w.jsxDEV)(`span`,{className:`spec-value`,children:[`: `,t.material||`-`]},void 0,!0,{fileName:T,lineNumber:499,columnNumber:43},this)]},void 0,!0,{fileName:T,lineNumber:497,columnNumber:41},this),(0,w.jsxDEV)(`div`,{className:`spec-row`,children:[(0,w.jsxDEV)(`span`,{className:`spec-label`,children:`Cutting`},void 0,!1,{fileName:T,lineNumber:502,columnNumber:43},this),(0,w.jsxDEV)(`span`,{className:`spec-value`,children:[`: `,t.cutting||`-`]},void 0,!0,{fileName:T,lineNumber:503,columnNumber:43},this)]},void 0,!0,{fileName:T,lineNumber:501,columnNumber:41},this),(0,w.jsxDEV)(`div`,{className:`spec-row`,children:[(0,w.jsxDEV)(`span`,{className:`spec-label`,children:`Jenis Neck`},void 0,!1,{fileName:T,lineNumber:506,columnNumber:43},this),(0,w.jsxDEV)(`span`,{className:`spec-value`,children:[`: `,t.neck||`-`]},void 0,!0,{fileName:T,lineNumber:507,columnNumber:43},this)]},void 0,!0,{fileName:T,lineNumber:505,columnNumber:41},this),(0,w.jsxDEV)(`div`,{className:`spec-row`,children:[(0,w.jsxDEV)(`span`,{className:`spec-label`,children:`Name Set`},void 0,!1,{fileName:T,lineNumber:510,columnNumber:43},this),(0,w.jsxDEV)(`span`,{className:`spec-value`,children:[`: `,t.name_set||`-`]},void 0,!0,{fileName:T,lineNumber:511,columnNumber:43},this)]},void 0,!0,{fileName:T,lineNumber:509,columnNumber:41},this),(0,w.jsxDEV)(`div`,{className:`spec-row`,style:{marginTop:`0.3rem`,paddingTop:`0.4rem`,borderTop:`1px dashed var(--border-color)`},children:[(0,w.jsxDEV)(`span`,{className:`spec-label`,style:{fontWeight:700,color:`var(--text-dark)`},children:`Base Price`},void 0,!1,{fileName:T,lineNumber:514,columnNumber:39},this),(0,w.jsxDEV)(`span`,{className:`spec-value`,style:{fontWeight:700,color:`var(--primary-red)`},children:[`: RM `,(()=>{let t=m(e.items.reduce((e,t)=>e+(t.qty||0),0)),n=e.discount_type||`per_pcs`,r=e.discount_value===void 0?e.discount_per_pcs||0:e.discount_value;if(n===`bulk`&&r>0)return`${t.toFixed(2)} /pcs (Diskaun Pukal RM${parseFloat(r).toFixed(2)})`;{let e=t-r;return r>0?`${e.toFixed(2)} /pcs (diskaun RM${parseFloat(r).toFixed(2)})`:`${t.toFixed(2)} /pcs`}})()]},void 0,!0,{fileName:T,lineNumber:515,columnNumber:39},this)]},void 0,!0,{fileName:T,lineNumber:513,columnNumber:37},this)]},void 0,!0,{fileName:T,lineNumber:492,columnNumber:39},this)},void 0,!1,{fileName:T,lineNumber:467,columnNumber:35},this)]},t.id||n,!0,{fileName:T,lineNumber:456,columnNumber:33},this)):(0,w.jsxDEV)(`div`,{className:`spec-empty`,children:`Tiada data spec pembelian untuk invoice ini.`},void 0,!1,{fileName:T,lineNumber:537,columnNumber:31},this)]},void 0,!0,{fileName:T,lineNumber:450,columnNumber:27},this)]},e.id,!0,{fileName:T,lineNumber:437,columnNumber:23},this))},void 0,!1,{fileName:T,lineNumber:432,columnNumber:17},this)]},void 0,!0,{fileName:T,lineNumber:274,columnNumber:15},this)]},void 0,!0,{fileName:T,lineNumber:233,columnNumber:13},this),(0,w.jsxDEV)(`div`,{className:`modal-footer`,children:[(0,w.jsxDEV)(`button`,{onClick:()=>j(null),className:`btn btn-secondary`,children:o(`close`)},void 0,!1,{fileName:T,lineNumber:549,columnNumber:15},this),(0,w.jsxDEV)(`button`,{onClick:()=>{let e=A;j(null),V(e)},className:`btn btn-primary`,children:[(0,w.jsxDEV)(t,{size:14},void 0,!1,{fileName:T,lineNumber:560,columnNumber:17},this),` `,o(`editInfo`)]},void 0,!0,{fileName:T,lineNumber:552,columnNumber:15},this)]},void 0,!0,{fileName:T,lineNumber:548,columnNumber:13},this)]},void 0,!0,{fileName:T,lineNumber:225,columnNumber:11},this)},void 0,!1,{fileName:T,lineNumber:224,columnNumber:9},this),M&&(0,w.jsxDEV)(`div`,{className:`modal-overlay`,onClick:()=>N(null),children:(0,w.jsxDEV)(`div`,{className:`modal-content`,onClick:e=>e.stopPropagation(),style:{maxWidth:`450px`},children:[(0,w.jsxDEV)(`div`,{className:`modal-header`,children:[(0,w.jsxDEV)(`h3`,{children:`Edit Maklumat Pelanggan`},void 0,!1,{fileName:T,lineNumber:572,columnNumber:15},this),(0,w.jsxDEV)(`button`,{className:`modal-close`,onClick:()=>N(null),children:(0,w.jsxDEV)(l,{size:20},void 0,!1,{fileName:T,lineNumber:574,columnNumber:17},this)},void 0,!1,{fileName:T,lineNumber:573,columnNumber:15},this)]},void 0,!0,{fileName:T,lineNumber:571,columnNumber:13},this),(0,w.jsxDEV)(`form`,{onSubmit:H,children:[(0,w.jsxDEV)(`div`,{className:`modal-body`,style:{display:`flex`,flexDirection:`column`,gap:`1.25rem`},children:[(0,w.jsxDEV)(`div`,{className:`form-group`,children:[(0,w.jsxDEV)(`label`,{className:`form-label`,children:o(`clientName`)},void 0,!1,{fileName:T,lineNumber:581,columnNumber:19},this),(0,w.jsxDEV)(`input`,{type:`text`,value:I.name,onChange:e=>L(t=>({...t,name:e.target.value})),className:`form-control`,required:!0},void 0,!1,{fileName:T,lineNumber:582,columnNumber:19},this)]},void 0,!0,{fileName:T,lineNumber:580,columnNumber:17},this),(0,w.jsxDEV)(`div`,{className:`form-group`,children:[(0,w.jsxDEV)(`label`,{className:`form-label`,children:o(`phone`)},void 0,!1,{fileName:T,lineNumber:591,columnNumber:19},this),(0,w.jsxDEV)(`input`,{type:`text`,value:I.phone,onChange:e=>L(t=>({...t,phone:e.target.value})),className:`form-control`,required:!0},void 0,!1,{fileName:T,lineNumber:592,columnNumber:19},this)]},void 0,!0,{fileName:T,lineNumber:590,columnNumber:17},this)]},void 0,!0,{fileName:T,lineNumber:579,columnNumber:15},this),(0,w.jsxDEV)(`div`,{className:`modal-footer`,children:[(0,w.jsxDEV)(`button`,{type:`button`,className:`btn btn-secondary`,onClick:()=>N(null),children:o(`cancel`)},void 0,!1,{fileName:T,lineNumber:603,columnNumber:17},this),(0,w.jsxDEV)(`button`,{type:`submit`,className:`btn btn-primary`,children:o(`saveChanges`)},void 0,!1,{fileName:T,lineNumber:606,columnNumber:17},this)]},void 0,!0,{fileName:T,lineNumber:602,columnNumber:15},this)]},void 0,!0,{fileName:T,lineNumber:578,columnNumber:13},this)]},void 0,!0,{fileName:T,lineNumber:570,columnNumber:11},this)},void 0,!1,{fileName:T,lineNumber:569,columnNumber:9},this),(0,w.jsxDEV)(`style`,{children:`
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
      `},void 0,!1,{fileName:T,lineNumber:615,columnNumber:7},this)]},void 0,!0,{fileName:T,lineNumber:89,columnNumber:5},this)}export{E as default};