import{t as e}from"./circle-check-9755HLcx.js";import{i as t,n,r,t as i}from"./wrench-DBzsn9YA.js";import{t as a}from"./search-CvUeSEEA.js";import{E as o,N as s,P as c,S as l,c as u,h as d,n as f,r as p,u as m,v as h,x as g}from"./index-DtbL2qKZ.js";var _=c(s(),1),v=p();function y({isOpen:e,onClose:t,invoice:n,settings:r}){let{tr:i}=f(),[a,o]=(0,_.useState)(`Kilang Cetak Baju / Tukang Jahit`),[s,c]=(0,_.useState)(1),[u,d]=(0,_.useState)(1),p=(0,_.useRef)(0);(0,_.useEffect)(()=>{let e=()=>{if(window.innerWidth<=768){let e=window.innerWidth-32,t=Math.min(1,e/794);c(t)}else c(1)};return e(),window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[]);let m=()=>{let e=Date.now();e-p.current<300&&d(e=>e>1?1:1.8),p.current=e};if(!e||!n)return null;let g=e=>parseFloat(e||0).toLocaleString(`en-US`,{minimumFractionDigits:2,maximumFractionDigits:2}),y=e=>!e.items||!Array.isArray(e.items)?``:e.items.map((e,t)=>{let n=0;return e.item_type===`banner`?n=parseInt(e.qty||0,10):e.sizes&&(n=Object.values(e.sizes).reduce((e,t)=>e+parseInt(t?.short||0,10)+parseInt(t?.long||0,10)+parseInt(t?.pants||0,10),0)),(0,v.jsxs)(`div`,{style:{padding:`1px 0`},children:[`• `,e.design_name||e.item_type,` (`,n,`)`]},e.id||t)}),b=r?.company_name||`THIRTYONE LAB`,x=r?.company_address||`No 12, Jalan Niaga 1, 43000 Kajang, Selangor`,S=r?.company_phone||`012-3456789`,C=new Date().toLocaleDateString(`en-GB`),w=`PV-${new Date().toISOString().split(`T`)[0]}-K-${n.invoice_no}`,T=s*u;return(0,v.jsxs)(`div`,{className:`modal-overlay print-modal-overlay`,onClick:t,children:[(0,v.jsxs)(`div`,{className:`modal-content A4-modal-container`,onClick:e=>e.stopPropagation(),style:{maxWidth:`800px`},children:[(0,v.jsxs)(`div`,{className:`modal-header print-controls no-print`,style:{padding:`0.75rem 1.25rem`,borderBottom:`1px solid var(--border-color)`,display:`flex`,alignItems:`center`,width:`100%`,boxSizing:`border-box`},children:[(0,v.jsxs)(`div`,{style:{display:`flex`,gap:`0.75rem`,alignItems:`center`,flex:1,minWidth:0},children:[(0,v.jsx)(`h3`,{style:{fontSize:`0.75rem`,fontWeight:800,margin:0,letterSpacing:`0.5px`},children:`BAUCAR KILANG`}),(0,v.jsxs)(`button`,{onClick:()=>window.print(),className:`btn btn-primary btn-sm`,style:{display:`flex`,alignItems:`center`,gap:`0.35rem`,padding:`0.4rem 0.8rem`},children:[(0,v.jsx)(l,{size:13}),` `,i(`print`)]})]}),(0,v.jsx)(`button`,{className:`modal-close`,onClick:t,style:{background:`none`,border:`none`,cursor:`pointer`,color:`var(--text-dark)`,display:`flex`,alignItems:`center`,padding:0},children:(0,v.jsx)(h,{size:20})})]}),(0,v.jsxs)(`div`,{className:`A4-scroll-wrapper`,style:{overflow:`auto`,flex:1,padding:`0.25rem 0 1rem 0`,display:`flex`,flexDirection:`column`,alignItems:`center`,backgroundColor:`#ffffff`},children:[(0,v.jsx)(`div`,{className:`card no-print`,style:{width:`100%`,maxWidth:`210mm`,marginBottom:`1rem`,padding:`1rem`},children:(0,v.jsxs)(`div`,{className:`form-group`,style:{margin:0},children:[(0,v.jsx)(`label`,{className:`form-label`,style:{fontWeight:`bold`},children:`Pay To`}),(0,v.jsx)(`input`,{type:`text`,value:a,onChange:e=>o(e.target.value),className:`form-control`,placeholder:`Contoh: Nama Kilang / Tukang Jahit`})]})}),(0,v.jsx)(`div`,{className:`A4-scale-container`,onTouchEnd:m,onDoubleClick:()=>d(e=>e>1?1:1.8),style:{width:`${794*T}px`,height:`${1122*T}px`,overflow:`visible`,flexShrink:0,cursor:u>1?`zoom-out`:`zoom-in`},children:(0,v.jsxs)(`div`,{className:`A4-sheet`,style:{width:`210mm`,minHeight:`297mm`,padding:`15mm 12mm`,boxSizing:`border-box`,background:`#fff`,border:`none`,overflow:`visible`,margin:`0`,display:`flex`,flexDirection:`column`,justifyContent:`space-between`,transform:`scale(${T})`,transformOrigin:`top left`},children:[(0,v.jsxs)(`div`,{children:[(0,v.jsx)(`div`,{className:`invoice-header`,style:{display:`flex`,justifyContent:`flex-start`,alignItems:`center`},children:(0,v.jsxs)(`div`,{className:`company-info-block`,style:{display:`flex`,gap:`1rem`,alignItems:`center`},children:[r?.company_logo?(0,v.jsx)(`img`,{src:r.company_logo,alt:`Company Logo`,className:`invoice-print-logo`,style:{maxHeight:`50px`}}):(0,v.jsx)(`img`,{src:`/thirtyonelab.OMS/Logo%20Header.webp`,alt:`Company Logo`,className:`invoice-print-logo`,style:{maxHeight:`50px`}}),(0,v.jsxs)(`div`,{className:`company-text`,children:[(0,v.jsx)(`h1`,{className:`company-print-name`,style:{fontSize:`1.25rem`,fontWeight:800,margin:0},children:b.toUpperCase().includes(`LAB`)?(0,v.jsxs)(v.Fragment,{children:[b.toUpperCase().split(`LAB`)[0],(0,v.jsx)(`span`,{style:{color:`var(--primary-red)`},children:`LAB`}),(0,v.jsx)(`sup`,{style:{color:`var(--primary-red)`,fontSize:`0.5em`,fontWeight:`700`},children:`®`}),b.toUpperCase().split(`LAB`)[1]]}):b}),(0,v.jsx)(`p`,{className:`company-print-details address`,style:{margin:`0.2rem 0 0 0`,fontSize:`0.75rem`,color:`#555`},children:x}),(0,v.jsxs)(`p`,{className:`company-print-details`,style:{margin:0,fontSize:`0.75rem`,color:`#555`},children:[`Tel: `,S]})]})]})}),(0,v.jsxs)(`div`,{style:{marginTop:`1.5rem`,display:`flex`,flexDirection:`column`,alignItems:`flex-start`,gap:`0.3rem`},children:[(0,v.jsx)(`h2`,{style:{fontSize:`1.2rem`,fontWeight:800,margin:0},children:`PAYMENT VOUCHER (KILANG)`}),(0,v.jsxs)(`div`,{style:{fontSize:`0.75rem`,textAlign:`left`},children:[(0,v.jsxs)(`div`,{style:{marginBottom:`0.1rem`},children:[(0,v.jsx)(`span`,{style:{color:`#555`},children:`Voucher No: `}),(0,v.jsx)(`span`,{style:{fontWeight:`bold`},children:w})]}),(0,v.jsxs)(`div`,{children:[(0,v.jsx)(`span`,{style:{color:`#555`},children:`Date: `}),(0,v.jsx)(`span`,{children:C})]})]})]}),(0,v.jsx)(`hr`,{style:{border:`none`,borderTop:`2px solid #111`,margin:`1rem 0`}}),(0,v.jsxs)(`div`,{style:{fontSize:`0.85rem`,marginBottom:`1.5rem`,borderBottom:`1px solid #111`,paddingBottom:`0.5rem`},children:[(0,v.jsx)(`strong`,{children:`PAY TO:`}),` `,(0,v.jsx)(`span`,{style:{marginLeft:`0.5rem`,fontSize:`0.9rem`},children:a})]}),(0,v.jsx)(`h3`,{style:{fontSize:`0.8rem`,fontWeight:`bold`,margin:`0.5rem 0`},children:`PAYMENT DETAILS (FACTORY COST):`}),(0,v.jsxs)(`table`,{style:{width:`100%`,borderCollapse:`collapse`,marginTop:`0.5rem`},children:[(0,v.jsx)(`thead`,{children:(0,v.jsxs)(`tr`,{style:{borderTop:`1px solid #111`,borderBottom:`1px solid #111`,backgroundColor:`#f8fafc`,fontSize:`0.75rem`,fontWeight:`bold`},children:[(0,v.jsx)(`th`,{style:{width:`40px`,padding:`0.5rem`,textAlign:`center`,borderRight:`1px solid #ddd`},children:`NO`}),(0,v.jsx)(`th`,{style:{padding:`0.5rem`,textAlign:`left`,borderRight:`1px solid #ddd`},children:`ORDER REFERENCE`}),(0,v.jsx)(`th`,{style:{padding:`0.5rem`,textAlign:`left`,borderRight:`1px solid #ddd`},children:`DESCRIPTION`}),(0,v.jsx)(`th`,{style:{width:`120px`,padding:`0.5rem`,textAlign:`right`},children:`AMOUNT`})]})}),(0,v.jsxs)(`tbody`,{children:[(0,v.jsxs)(`tr`,{style:{borderBottom:`1px solid #111`,fontSize:`0.8rem`},children:[(0,v.jsx)(`td`,{style:{padding:`0.5rem`,textAlign:`center`,borderRight:`1px solid #ddd`,verticalAlign:`top`},children:`1`}),(0,v.jsxs)(`td`,{style:{padding:`0.5rem`,borderRight:`1px solid #ddd`,verticalAlign:`top`},children:[(0,v.jsxs)(`div`,{style:{fontWeight:`bold`},children:[`Invoice: #`,n.invoice_no]}),(0,v.jsxs)(`div`,{style:{fontSize:`0.75rem`,color:`#555`,marginTop:`0.2rem`},children:[`Client: `,n.client_name]})]}),(0,v.jsxs)(`td`,{style:{padding:`0.5rem`,borderRight:`1px solid #ddd`,verticalAlign:`top`},children:[(0,v.jsx)(`div`,{children:`Factory Cost / Production`}),(0,v.jsxs)(`div`,{style:{fontSize:`0.75rem`,color:`var(--text-muted)`,marginTop:`0.25rem`},children:[`Items: `,y(n)]})]}),(0,v.jsxs)(`td`,{style:{padding:`0.5rem`,textAlign:`right`,fontWeight:`bold`,verticalAlign:`top`},children:[`RM `,g(n.pengeluaran)]})]}),(0,v.jsxs)(`tr`,{style:{fontSize:`0.85rem`,fontWeight:`bold`},children:[(0,v.jsx)(`td`,{colSpan:`3`,style:{padding:`0.75rem 0.5rem`,textAlign:`right`},children:`TOTAL AMOUNT:`}),(0,v.jsxs)(`td`,{style:{padding:`0.75rem 0.5rem`,textAlign:`right`,fontSize:`0.95rem`},children:[`RM `,g(n.pengeluaran)]})]})]})]})]}),(0,v.jsxs)(`div`,{style:{marginTop:`auto`,paddingTop:`1.5rem`,borderTop:`1px solid #e6e2dc`},children:[(0,v.jsxs)(`div`,{style:{fontSize:`0.7rem`,color:`#555`,marginBottom:`1rem`},children:[(0,v.jsx)(`strong`,{children:`NOTES:`}),(0,v.jsx)(`p`,{style:{margin:`0.1rem 0 0 0`,lineHeight:`1.3`},children:`Official voucher for factory production operating expenses and company financial records.`})]}),(0,v.jsxs)(`div`,{style:{textAlign:`center`,fontSize:`0.68rem`,fontWeight:700,color:`#555`,letterSpacing:`1px`,textTransform:`uppercase`,fontFamily:`var(--font-primary)`},children:[(0,v.jsx)(`p`,{style:{margin:0},children:`THIRTYONE LAB DESIGN - INTERNAL FINANCIAL STATEMENT`}),(0,v.jsx)(`p`,{style:{margin:`0.1rem 0 0 0`,fontStyle:`italic`,textTransform:`none`,fontWeight:500,fontSize:`0.6rem`,color:`#777`,letterSpacing:`0.5px`},children:`Wear With Pride.`})]})]})]})})]})]}),(0,v.jsx)(`style`,{children:`
        @media print {
          body * {
            visibility: hidden;
          }
          .A4-sheet, .A4-sheet * {
            visibility: visible;
          }
          .A4-sheet {
            position: absolute;
            left: 0;
            top: 0;
            width: 210mm !important;
            height: auto !important;
            min-height: 297mm !important;
            border: none !important;
            padding: 15mm 12mm !important;
            margin: 0 !important;
            box-shadow: none !important;
            overflow: visible !important;
          }
          .print-modal-overlay {
            background: none !important;
          }
          .A4-scroll-wrapper {
            background: none !important;
            padding: 0 !important;
          }
        }

        @media (max-width: 768px) {
          .A4-scroll-wrapper {
            align-items: flex-start !important;
            padding-top: 0.25rem !important;
          }
          .A4-scale-container {
            width: 100% !important;
            height: auto !important;
          }
          .A4-sheet {
            width: 100% !important;
            min-height: auto !important;
            transform: none !important;
            padding: 12mm 10mm !important;
          }
          .modal-header.print-controls {
            flex-direction: row !important;
            flex-wrap: nowrap !important;
            gap: 0.75rem !important;
          }
          .modal-header h3 {
            font-size: 0.65rem !important;
          }
          .btn-sm {
            font-size: 0.7rem !important;
            padding: 0.35rem 0.6rem !important;
          }
        }
      `})]})}function b(){let{tr:s,language:c}=f(),[p,b]=(0,_.useState)([]),[x,S]=(0,_.useState)(null),[C,w]=(0,_.useState)(``),[T,E]=(0,_.useState)(`All`),[D,O]=(0,_.useState)(`All`),[k,A]=(0,_.useState)(!1),[j,M]=(0,_.useState)({}),[ee,N]=(0,_.useState)(!1),[P,F]=(0,_.useState)(null),[I,L]=(0,_.useState)(!1),[te,R]=(0,_.useState)(1),[z,B]=(0,_.useState)(1),V=(0,_.useRef)(0),H=[{value:`0`,label:c===`EN`?`January`:`Januari`},{value:`1`,label:c===`EN`?`February`:`Februari`},{value:`2`,label:c===`EN`?`March`:`Mac`},{value:`3`,label:`April`},{value:`4`,label:c===`EN`?`May`:`Mei`},{value:`5`,label:c===`EN`?`June`:`Jun`},{value:`6`,label:c===`EN`?`July`:`Julai`},{value:`7`,label:c===`EN`?`August`:`Ogos`},{value:`8`,label:`September`},{value:`9`,label:c===`EN`?`October`:`Oktober`},{value:`10`,label:`November`},{value:`11`,label:c===`EN`?`December`:`Disember`}];(0,_.useEffect)(()=>{U()},[]),(0,_.useEffect)(()=>{let e=()=>{if(window.innerWidth<=768){let e=window.innerWidth-32,t=Math.min(1,e/794);R(t)}else R(1)};return e(),window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[]);let U=async()=>{A(!0);try{let e=await u(),t=await m(),n=e.sort((e,t)=>t.invoice_no.localeCompare(e.invoice_no));b(n),S(t)}catch(e){console.error(`Error loading data in manufacturing:`,e)}finally{A(!1)}},ne=()=>{let e=Date.now();e-V.current<300&&B(e=>e>1?1:1.8),V.current=e},W=(e,t,n)=>{M(r=>({...r,[e]:{...r[e],[t]:n}}))},G=async e=>{let t=j[e.id]?.pengeluaran,n=t===void 0?e.pengeluaran||0:parseFloat(t)||0,r=j[e.id]?.order_status===void 0?e.order_status||`BELUM_DRAFT`:j[e.id].order_status,i=j[e.id]?.due_date===void 0?e.due_date||``:j[e.id].due_date;A(!0);try{await d(e.id,r,n,i)?(alert(`Kemaskini berjaya disimpan!`),M(t=>{let n={...t};return delete n[e.id],n}),U()):alert(`Gagal menyimpan kemaskini.`)}catch(e){console.error(e),alert(`Ralat semasa menyimpan kemaskini.`)}finally{A(!1)}},K=p.filter(e=>{let t=e.client_name.toLowerCase().includes(C.toLowerCase())||e.invoice_no.toLowerCase().includes(C.toLowerCase()),n=!0;return T!==`All`&&(n=new Date(e.date).getMonth()===parseInt(T,10)),t&&n}),q=K.filter(e=>D===`All`||(e.order_status||`BELUM_DRAFT`)===D),re=e=>{switch(e){case`Paid`:return`badge-paid`;case`Deposit`:return`badge-deposit`;case`Unpaid`:return`badge-unpaid`;case`Void`:return`badge-void`;default:return``}},J=e=>{switch(e){case`Paid`:return`Paid`;case`Deposit`:return`Deposit`;case`Unpaid`:return`Unpaid`;case`Void`:return`Void`;default:return e}},Y=e=>!e.items||!Array.isArray(e.items)?`-`:e.items.map((e,t)=>{let n=0;e.item_type===`banner`?n=parseInt(e.qty||0,10):e.sizes&&(n=Object.values(e.sizes).reduce((e,t)=>e+parseInt(t?.short||0,10)+parseInt(t?.long||0,10)+parseInt(t?.pants||0,10),0));let r=e.item_type===`banner`?`unit`:`pcs`;return(0,v.jsxs)(`div`,{style:{padding:`2px 0`},children:[`• `,e.design_name||(e.item_type?e.item_type.charAt(0).toUpperCase()+e.item_type.slice(1):`Item`),` (`,n,` `,r,`)`]},e.id||t)}),X=K.filter(e=>e.status!==`Void`),ie=X.filter(e=>(e.order_status||`BELUM_DRAFT`)===`BELUM_DRAFT`).length,ae=X.filter(e=>e.order_status===`DRAFT`).length,oe=X.filter(e=>e.order_status===`PENDING`).length,se=X.filter(e=>e.order_status===`PROCESSING`).length,ce=X.filter(e=>e.order_status===`COMPLETED`).length,le=X.filter(e=>e.order_status===`MAINTENANCE`).length,ue=X.reduce((e,t)=>e+parseFloat(t.grand_total||0),0),Z=X.reduce((e,t)=>t.status===`Paid`?e+parseFloat(t.grand_total||0):t.status===`Deposit`?e+parseFloat(t.deposit||0):e,0),Q=X.reduce((e,t)=>{let n=j[t.id]?.pengeluaran;return e+(n===void 0?parseFloat(t.pengeluaran||0):parseFloat(n)||0)},0),de=Z-Q,fe=T===`All`?s(`allMonths`)||`Semua Bulan`:H.find(e=>e.value===T)?.label||``,$=te*z;return(0,v.jsxs)(`div`,{className:`main-content`,children:[(0,v.jsx)(`div`,{className:`dashboard-header`,style:{marginBottom:`2rem`},children:(0,v.jsxs)(`div`,{children:[(0,v.jsx)(`span`,{className:`section-tag`,children:s(`mfgTag`)}),(0,v.jsx)(`h1`,{style:{fontSize:`1.75rem`,fontWeight:`800`,marginTop:`0.5rem`},children:s(`mfgTitle`)}),(0,v.jsx)(`p`,{style:{color:`var(--text-muted)`,fontSize:`0.9rem`,marginTop:`0.25rem`,letterSpacing:`0.5px`},children:s(`mfgSubtitle`)})]})}),(0,v.jsxs)(`div`,{className:`mfg-summary-row`,style:{display:`grid`,gridTemplateColumns:`repeat(6, 1fr)`,gap:`1rem`,marginBottom:`1.5rem`},children:[(0,v.jsxs)(`div`,{className:`card`,onClick:()=>O(e=>e===`BELUM_DRAFT`?`All`:`BELUM_DRAFT`),style:{padding:`1rem`,borderLeft:`4px solid #64748B`,cursor:`pointer`,transition:`all 0.2s ease`,outline:D===`BELUM_DRAFT`?`2px solid #64748B`:`none`,background:D===`BELUM_DRAFT`?`rgba(100, 116, 139, 0.08)`:void 0},title:D===`BELUM_DRAFT`?`Klik untuk set semula (semua)`:`Tapis: Belum Draft`,children:[(0,v.jsxs)(`h3`,{className:`section-title`,style:{fontSize:`0.65rem`,fontWeight:`800`,letterSpacing:`1px`,textTransform:`uppercase`,color:`var(--text-muted)`,marginBottom:`0.5rem`},children:[(0,v.jsx)(r,{size:13,style:{verticalAlign:`-2px`,marginRight:`4px`,color:`var(--text-muted)`}}),` `,s(`belumDraft`)]}),(0,v.jsx)(`span`,{className:`summary-val`,style:{fontSize:`1.2rem`,fontWeight:`900`,lineHeight:`1`,color:`var(--text-dark)`},children:ie})]}),(0,v.jsxs)(`div`,{className:`card`,onClick:()=>O(e=>e===`DRAFT`?`All`:`DRAFT`),style:{padding:`1rem`,borderLeft:`4px solid #94A3B8`,cursor:`pointer`,transition:`all 0.2s ease`,outline:D===`DRAFT`?`2px solid #94A3B8`:`none`,background:D===`DRAFT`?`rgba(148, 163, 184, 0.08)`:void 0},title:D===`DRAFT`?`Klik untuk set semula (semua)`:`Tapis: Draft`,children:[(0,v.jsxs)(`h3`,{className:`section-title`,style:{fontSize:`0.65rem`,fontWeight:`800`,letterSpacing:`1px`,textTransform:`uppercase`,color:`var(--text-muted)`,marginBottom:`0.5rem`},children:[(0,v.jsx)(n,{size:13,style:{verticalAlign:`-2px`,marginRight:`4px`,color:`var(--text-muted)`}}),` `,s(`draft`)]}),(0,v.jsx)(`span`,{className:`summary-val`,style:{fontSize:`1.2rem`,fontWeight:`900`,lineHeight:`1`,color:`var(--text-dark)`},children:ae})]}),(0,v.jsxs)(`div`,{className:`card`,onClick:()=>O(e=>e===`PENDING`?`All`:`PENDING`),style:{padding:`1rem`,borderLeft:`4px solid #D97706`,cursor:`pointer`,transition:`all 0.2s ease`,outline:D===`PENDING`?`2px solid #D97706`:`none`,background:D===`PENDING`?`rgba(217, 119, 6, 0.08)`:void 0},title:D===`PENDING`?`Klik untuk set semula (semua)`:`Tapis: Pending`,children:[(0,v.jsxs)(`h3`,{className:`section-title`,style:{fontSize:`0.65rem`,fontWeight:`800`,letterSpacing:`1px`,textTransform:`uppercase`,color:`var(--text-muted)`,marginBottom:`0.5rem`},children:[(0,v.jsx)(t,{size:13,style:{verticalAlign:`-2px`,marginRight:`4px`,color:`#D97706`}}),` `,s(`pending`)]}),(0,v.jsx)(`span`,{className:`summary-val`,style:{fontSize:`1.2rem`,fontWeight:`900`,lineHeight:`1`,color:`var(--text-dark)`},children:oe})]}),(0,v.jsxs)(`div`,{className:`card`,onClick:()=>O(e=>e===`PROCESSING`?`All`:`PROCESSING`),style:{padding:`1rem`,borderLeft:`4px solid #2563EB`,cursor:`pointer`,transition:`all 0.2s ease`,outline:D===`PROCESSING`?`2px solid #2563EB`:`none`,background:D===`PROCESSING`?`rgba(37, 99, 235, 0.08)`:void 0},title:D===`PROCESSING`?`Klik untuk set semula (semua)`:`Tapis: Processing`,children:[(0,v.jsxs)(`h3`,{className:`section-title`,style:{fontSize:`0.65rem`,fontWeight:`800`,letterSpacing:`1px`,textTransform:`uppercase`,color:`var(--text-muted)`,marginBottom:`0.5rem`},children:[(0,v.jsx)(o,{size:13,style:{verticalAlign:`-2px`,marginRight:`4px`,color:`#2563EB`}}),` `,s(`processing`)]}),(0,v.jsx)(`span`,{className:`summary-val`,style:{fontSize:`1.2rem`,fontWeight:`900`,lineHeight:`1`,color:`var(--text-dark)`},children:se})]}),(0,v.jsxs)(`div`,{className:`card`,onClick:()=>O(e=>e===`COMPLETED`?`All`:`COMPLETED`),style:{padding:`1rem`,borderLeft:`4px solid #15803D`,cursor:`pointer`,transition:`all 0.2s ease`,outline:D===`COMPLETED`?`2px solid #15803D`:`none`,background:D===`COMPLETED`?`rgba(21, 128, 61, 0.08)`:void 0},title:D===`COMPLETED`?`Klik untuk set semula (semua)`:`Tapis: Completed`,children:[(0,v.jsxs)(`h3`,{className:`section-title`,style:{fontSize:`0.65rem`,fontWeight:`800`,letterSpacing:`1px`,textTransform:`uppercase`,color:`var(--text-muted)`,marginBottom:`0.5rem`},children:[(0,v.jsx)(e,{size:13,style:{verticalAlign:`-2px`,marginRight:`4px`,color:`#15803D`}}),` `,s(`completed`)]}),(0,v.jsx)(`span`,{className:`summary-val`,style:{fontSize:`1.2rem`,fontWeight:`900`,lineHeight:`1`,color:`var(--text-dark)`},children:ce})]}),(0,v.jsxs)(`div`,{className:`card`,onClick:()=>O(e=>e===`MAINTENANCE`?`All`:`MAINTENANCE`),style:{padding:`1rem`,borderLeft:`4px solid #DC2626`,cursor:`pointer`,transition:`all 0.2s ease`,outline:D===`MAINTENANCE`?`2px solid #DC2626`:`none`,background:D===`MAINTENANCE`?`rgba(220, 38, 38, 0.08)`:void 0},title:D===`MAINTENANCE`?`Klik untuk set semula (semua)`:`Tapis: Maintenance`,children:[(0,v.jsxs)(`h3`,{className:`section-title`,style:{fontSize:`0.65rem`,fontWeight:`800`,letterSpacing:`1px`,textTransform:`uppercase`,color:`var(--text-muted)`,marginBottom:`0.5rem`},children:[(0,v.jsx)(i,{size:13,style:{verticalAlign:`-2px`,marginRight:`4px`,color:`#DC2626`}}),` `,s(`maintenance`)]}),(0,v.jsx)(`span`,{className:`summary-val`,style:{fontSize:`1.2rem`,fontWeight:`900`,lineHeight:`1`,color:`var(--text-dark)`},children:le})]})]}),(0,v.jsxs)(`div`,{className:`search-filters-bar card`,style:{marginBottom:`1.5rem`,padding:`1.25rem`},children:[(0,v.jsxs)(`div`,{className:`search-box`,children:[(0,v.jsx)(a,{size:18,className:`search-icon`}),(0,v.jsx)(`input`,{type:`text`,placeholder:s(`searchPlaceholder`),value:C,onChange:e=>w(e.target.value),className:`form-control search-input`})]}),(0,v.jsxs)(`div`,{className:`filter-group-row`,children:[(0,v.jsxs)(`div`,{className:`filter-box`,children:[(0,v.jsx)(`span`,{className:`select-label`,children:s(`status`)}),(0,v.jsxs)(`select`,{value:D,onChange:e=>O(e.target.value),className:`form-control filter-select`,children:[(0,v.jsx)(`option`,{value:`All`,children:s(`allStatus`)}),(0,v.jsx)(`option`,{value:`BELUM_DRAFT`,children:s(`belumDraft`)}),(0,v.jsx)(`option`,{value:`DRAFT`,children:s(`draft`)}),(0,v.jsx)(`option`,{value:`PENDING`,children:s(`pending`)}),(0,v.jsx)(`option`,{value:`PROCESSING`,children:s(`processing`)}),(0,v.jsx)(`option`,{value:`COMPLETED`,children:s(`completed`)}),(0,v.jsx)(`option`,{value:`MAINTENANCE`,children:s(`maintenance`)})]})]}),(0,v.jsxs)(`div`,{className:`filter-box`,children:[(0,v.jsx)(`span`,{className:`select-label`,children:s(`month`)}),(0,v.jsxs)(`select`,{value:T,onChange:e=>E(e.target.value),className:`form-control filter-select`,children:[(0,v.jsx)(`option`,{value:`All`,children:s(`allMonths`)}),H.map(e=>(0,v.jsx)(`option`,{value:e.value,children:e.label},e.value))]})]}),(0,v.jsxs)(`button`,{onClick:()=>N(!0),className:`btn btn-primary print-stmt-btn`,title:`Cetak Monthly Statement`,children:[(0,v.jsx)(l,{size:16}),` Print Statement`]})]})]}),(0,v.jsxs)(`div`,{className:`card`,style:{padding:0},children:[(0,v.jsx)(`div`,{className:`card-header`,style:{padding:`1rem 1.5rem`,borderBottom:`1px solid var(--border-color)`},children:(0,v.jsx)(`h3`,{className:`card-title`,style:{fontSize:`0.85rem`},children:`SENARAI TEMPAHAN`})}),k&&p.length===0?(0,v.jsx)(`div`,{className:`loading-state`,style:{padding:`3rem`,textAlign:`center`,color:`var(--text-muted)`},children:s(`loadingData`)}):q.length===0?(0,v.jsx)(`div`,{className:`empty-state`,style:{padding:`3rem`,textAlign:`center`,color:`var(--text-muted)`},children:s(`noData`)}):(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(`div`,{className:`table-container desktop-only`,children:(0,v.jsxs)(`table`,{className:`table`,children:[(0,v.jsx)(`thead`,{children:(0,v.jsxs)(`tr`,{children:[(0,v.jsxs)(`th`,{style:{textAlign:`left`},children:[s(`invNo`),` & `,s(`clientName`)]}),(0,v.jsx)(`th`,{style:{textAlign:`left`},children:s(`items`)}),(0,v.jsx)(`th`,{style:{textAlign:`center`,width:`160px`},children:s(`kosKilang`)}),(0,v.jsx)(`th`,{style:{textAlign:`center`,width:`160px`},children:s(`status`)}),(0,v.jsx)(`th`,{style:{textAlign:`center`,width:`180px`},children:s(`actions`)})]})}),(0,v.jsx)(`tbody`,{children:q.map(e=>{let t=e.status===`Void`,n=j[e.id]?.pengeluaran===void 0?e.pengeluaran||``:j[e.id].pengeluaran,r=j[e.id]?.order_status===void 0?e.order_status||`BELUM_DRAFT`:j[e.id].order_status,i=j[e.id]?.due_date===void 0?e.due_date||``:j[e.id].due_date;return(0,v.jsxs)(`tr`,{style:t?{backgroundColor:`#f8fafc`}:{},children:[(0,v.jsxs)(`td`,{children:[(0,v.jsx)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`0.4rem`},children:(0,v.jsxs)(`span`,{className:`font-bold`,children:[`#`,e.invoice_no]})}),(0,v.jsx)(`div`,{style:{fontSize:`0.8rem`,color:`var(--text-muted)`},children:e.client_name})]}),(0,v.jsx)(`td`,{children:(0,v.jsx)(`div`,{style:{fontSize:`0.85rem`,whiteSpace:`normal`,maxWidth:`300px`,textDecoration:t?`line-through`:`none`},children:Y(e)})}),(0,v.jsx)(`td`,{style:{textAlign:`center`},children:(0,v.jsxs)(`div`,{style:{display:`inline-flex`,alignItems:`center`,gap:`0.25rem`},children:[(0,v.jsx)(`span`,{style:{fontSize:`0.85rem`,color:`var(--text-muted)`},children:`RM`}),(0,v.jsx)(`input`,{type:`number`,step:`0.01`,min:`0`,disabled:t,value:n,onChange:t=>W(e.id,`pengeluaran`,t.target.value),className:`form-control`,style:{width:`90px`,padding:`0.25rem 0.5rem`,textAlign:`right`,cursor:t?`not-allowed`:`text`,backgroundColor:t?`#f1f5f9`:void 0},placeholder:`0.00`})]})}),(0,v.jsx)(`td`,{style:{textAlign:`center`},children:t?(0,v.jsx)(`span`,{className:`badge badge-void`,style:{fontSize:`0.75rem`,padding:`0.35rem 0.8rem`,fontWeight:`700`,letterSpacing:`0.5px`},children:`VOID`}):(0,v.jsxs)(v.Fragment,{children:[(0,v.jsxs)(`select`,{value:r,onChange:t=>W(e.id,`order_status`,t.target.value),className:`form-control`,style:{padding:`0.25rem 0.5rem`,width:`130px`,margin:`0 auto`,fontSize:`0.85rem`,cursor:`pointer`},children:[(0,v.jsx)(`option`,{value:`BELUM_DRAFT`,children:`Belum Draft`}),(0,v.jsx)(`option`,{value:`DRAFT`,children:`Draft`}),(0,v.jsx)(`option`,{value:`PENDING`,children:`Pending`}),(0,v.jsx)(`option`,{value:`PROCESSING`,children:`Processing`}),(0,v.jsx)(`option`,{value:`COMPLETED`,children:`Completed`}),(0,v.jsx)(`option`,{value:`MAINTENANCE`,children:`Maintenance`})]}),r===`PROCESSING`&&(0,v.jsx)(`div`,{style:{marginTop:`0.5rem`},children:(0,v.jsx)(`input`,{type:`date`,value:i,onChange:t=>W(e.id,`due_date`,t.target.value),className:`form-control`,style:{width:`130px`,margin:`0 auto`,padding:`0.1rem 0.25rem`,fontSize:`0.75rem`,cursor:`pointer`}})})]})}),(0,v.jsx)(`td`,{style:{textAlign:`center`},children:(0,v.jsxs)(`div`,{style:{display:`flex`,gap:`0.4rem`,justifyContent:`center`},children:[(0,v.jsxs)(`button`,{disabled:t,onClick:()=>G(e),className:`btn btn-primary btn-sm font-bold`,style:{fontSize:`0.75rem`,padding:`0.25rem 0.5rem`,display:`flex`,alignItems:`center`,gap:`0.25rem`,opacity:t?.4:1,cursor:t?`not-allowed`:`pointer`},title:t?`Invois ini telah dibatalkan (Void)`:s(`save`),children:[(0,v.jsx)(g,{size:12}),` `,s(`save`)]}),(0,v.jsxs)(`button`,{onClick:()=>{F(e),L(!0)},className:`btn btn-secondary btn-sm font-bold`,style:{fontSize:`0.75rem`,padding:`0.25rem 0.5rem`,display:`flex`,alignItems:`center`,gap:`0.25rem`},children:[(0,v.jsx)(l,{size:12}),` `,s(`print`)]})]})})]},e.id)})})]})}),(0,v.jsx)(`div`,{className:`mobile-cards-list mobile-only`,children:q.map(e=>{let t=e.status===`Void`,n=j[e.id]?.pengeluaran===void 0?e.pengeluaran||``:j[e.id].pengeluaran,r=j[e.id]?.order_status===void 0?e.order_status||`BELUM_DRAFT`:j[e.id].order_status,i=j[e.id]?.due_date===void 0?e.due_date||``:j[e.id].due_date;return(0,v.jsxs)(`div`,{className:`mobile-card`,style:t?{backgroundColor:`#f8fafc`}:{},children:[(0,v.jsx)(`div`,{className:`mobile-card-row`,style:{borderBottom:`1px solid var(--border-color)`,paddingBottom:`0.5rem`,marginBottom:`0.5rem`,display:`flex`,justifyContent:`space-between`,alignItems:`center`},children:(0,v.jsxs)(`span`,{className:`mobile-card-title`,children:[`#`,e.invoice_no,` - `,e.client_name]})}),(0,v.jsxs)(`div`,{style:{fontSize:`0.85rem`,color:`var(--text-muted)`,marginBottom:`0.75rem`,textDecoration:t?`line-through`:`none`},children:[(0,v.jsx)(`strong`,{children:`Items:`}),` `,Y(e)]}),(0,v.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`0.75rem`},children:[(0,v.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,justifyContent:`space-between`},children:[(0,v.jsx)(`span`,{children:`Kos Kilang:`}),(0,v.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`0.25rem`},children:[(0,v.jsx)(`span`,{children:`RM`}),(0,v.jsx)(`input`,{type:`number`,step:`0.01`,min:`0`,disabled:t,value:n,onChange:t=>W(e.id,`pengeluaran`,t.target.value),className:`form-control`,style:{width:`90px`,padding:`0.25rem 0.5rem`,textAlign:`right`,cursor:t?`not-allowed`:`text`,backgroundColor:t?`#f1f5f9`:void 0},placeholder:`0.00`})]})]}),(0,v.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,justifyContent:`space-between`},children:[(0,v.jsx)(`span`,{children:`Status:`}),t?(0,v.jsx)(`span`,{className:`badge badge-void`,style:{fontSize:`0.75rem`,padding:`0.35rem 0.8rem`,fontWeight:`700`,letterSpacing:`0.5px`},children:`VOID`}):(0,v.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`flex-end`,gap:`0.5rem`},children:[(0,v.jsxs)(`select`,{value:r,onChange:t=>W(e.id,`order_status`,t.target.value),className:`form-control`,style:{padding:`0.25rem 0.5rem`,width:`130px`,cursor:`pointer`},children:[(0,v.jsx)(`option`,{value:`BELUM_DRAFT`,children:`Belum Draft`}),(0,v.jsx)(`option`,{value:`DRAFT`,children:`Draft`}),(0,v.jsx)(`option`,{value:`PENDING`,children:`Pending`}),(0,v.jsx)(`option`,{value:`PROCESSING`,children:`Processing`}),(0,v.jsx)(`option`,{value:`COMPLETED`,children:`Completed`}),(0,v.jsx)(`option`,{value:`MAINTENANCE`,children:`Maintenance`})]}),r===`PROCESSING`&&(0,v.jsx)(`input`,{type:`date`,value:i,onChange:t=>W(e.id,`due_date`,t.target.value),className:`form-control`,style:{width:`130px`,padding:`0.1rem 0.25rem`,fontSize:`0.75rem`,cursor:`pointer`}})]})]}),(0,v.jsxs)(`div`,{style:{display:`flex`,gap:`0.5rem`,marginTop:`0.5rem`},children:[(0,v.jsxs)(`button`,{disabled:t,onClick:()=>G(e),className:`btn btn-primary btn-sm font-bold`,style:{flex:1,display:`flex`,justifyContent:`center`,alignItems:`center`,gap:`0.25rem`,opacity:t?.4:1,cursor:t?`not-allowed`:`pointer`},title:t?`Invois ini telah dibatalkan (Void)`:s(`save`),children:[(0,v.jsx)(g,{size:12}),` `,s(`save`)]}),(0,v.jsxs)(`button`,{onClick:()=>{F(e),L(!0)},className:`btn btn-secondary btn-sm font-bold`,style:{flex:1,display:`flex`,justifyContent:`center`,alignItems:`center`,gap:`0.25rem`},children:[(0,v.jsx)(l,{size:12}),` `,s(`print`)]})]})]})]},e.id)})})]})]}),ee&&x&&(0,v.jsx)(`div`,{className:`modal-overlay print-modal-overlay`,onClick:()=>N(!1),children:(0,v.jsxs)(`div`,{className:`modal-content A4-modal-container`,onClick:e=>e.stopPropagation(),children:[(0,v.jsx)(`div`,{className:`modal-header print-controls no-print`,children:(0,v.jsxs)(`div`,{className:`print-compact-bar`,style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,width:`100%`,padding:`0.75rem 1.25rem`},children:[(0,v.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`1rem`},children:[(0,v.jsx)(`span`,{style:{fontFamily:`var(--font-primary)`,fontSize:`0.75rem`,fontWeight:800,letterSpacing:`0.5px`,textTransform:`uppercase`,color:`var(--text-dark)`},children:`STATEMENT`}),(0,v.jsxs)(`button`,{onClick:()=>window.print(),className:`btn btn-primary btn-sm`,style:{display:`flex`,alignItems:`center`,gap:`0.35rem`,padding:`0.4rem 0.8rem`},children:[(0,v.jsx)(l,{size:13}),` PRINT`]})]}),(0,v.jsx)(`button`,{className:`modal-close`,onClick:()=>N(!1),style:{background:`none`,border:`none`,cursor:`pointer`,color:`var(--text-dark)`,display:`flex`,alignItems:`center`,padding:0},children:(0,v.jsx)(h,{size:20})})]})}),(0,v.jsx)(`div`,{className:`A4-scroll-wrapper`,style:{overflow:`auto`,flex:1,padding:`0.25rem 0 1rem 0`,display:`flex`,flexDirection:`column`,alignItems:`center`,backgroundColor:`#ffffff`},children:(0,v.jsx)(`div`,{className:`A4-scale-container`,onTouchEnd:ne,onDoubleClick:()=>B(e=>e>1?1:1.8),style:{width:`${794*$}px`,height:`${1122*$}px`,overflow:`visible`,flexShrink:0,cursor:z>1?`zoom-out`:`zoom-in`},children:(0,v.jsx)(`div`,{className:`modal-body A4-sheet`,style:{transform:`scale(${$})`,transformOrigin:`top left`,margin:0,flex:`none`,width:`210mm`,minHeight:`297mm`,overflow:`visible`},children:(0,v.jsxs)(`div`,{className:`invoice-container`,children:[(0,v.jsx)(`div`,{className:`invoice-header print-avoid-break`,children:(0,v.jsxs)(`div`,{className:`company-info-block`,children:[x.company_logo?(0,v.jsx)(`img`,{src:x.company_logo,alt:`Company Logo`,className:`invoice-print-logo`}):(0,v.jsx)(`img`,{src:`/thirtyonelab.OMS/Logo%20Header.webp`,alt:`Company Logo`,className:`invoice-print-logo`}),(0,v.jsxs)(`div`,{className:`company-text`,children:[(0,v.jsx)(`h1`,{className:`company-print-name`,children:x.company_name&&x.company_name.toUpperCase().includes(`LAB`)?(0,v.jsxs)(v.Fragment,{children:[x.company_name.toUpperCase().split(`LAB`)[0],(0,v.jsx)(`span`,{style:{color:`var(--primary-red)`},children:`LAB`}),(0,v.jsx)(`sup`,{style:{color:`var(--primary-red)`,fontSize:`0.5em`,fontWeight:`700`},children:`®`}),x.company_name.toUpperCase().split(`LAB`)[1]]}):x.company_name}),(0,v.jsx)(`p`,{className:`company-print-details address`,children:x.company_address}),(0,v.jsxs)(`p`,{className:`company-print-details`,children:[`Tel: `,x.company_phone]})]})]})}),(0,v.jsxs)(`div`,{className:`document-meta-block print-avoid-break`,children:[(0,v.jsx)(`h2`,{className:`document-type-title`,children:`PAYMENT VOUCHER`}),(0,v.jsxs)(`div`,{className:`meta-details-box`,children:[(0,v.jsxs)(`div`,{className:`meta-row`,children:[(0,v.jsx)(`span`,{className:`meta-lbl`,children:`Voucher No:`}),(0,v.jsxs)(`span`,{className:`meta-val font-bold`,children:[`\xA0PV-`,new Date().getFullYear(),`-`,(new Date().getMonth()+1).toString().padStart(2,`0`)]})]}),(0,v.jsxs)(`div`,{className:`meta-row`,children:[(0,v.jsx)(`span`,{className:`meta-lbl`,children:`Date:`}),(0,v.jsxs)(`span`,{className:`meta-val`,children:[`\xA0`,new Date().toLocaleDateString(`en-GB`)]})]}),(0,v.jsxs)(`div`,{className:`meta-row`,children:[(0,v.jsx)(`span`,{className:`meta-lbl`,children:`Month:`}),(0,v.jsxs)(`span`,{className:`meta-val font-bold`,children:[`\xA0`,fe.toUpperCase()]})]})]})]}),(0,v.jsx)(`hr`,{className:`divider-line print-avoid-break`}),(0,v.jsx)(`div`,{className:`invoice-billing-block print-avoid-break`,style:{marginBottom:`0.2rem`},children:(0,v.jsx)(`span`,{className:`section-title-print`,children:`PRODUCTION & REVENUE DETAILS:`})}),(0,v.jsx)(`div`,{className:`invoice-table-section`,children:(0,v.jsxs)(`table`,{className:`table invoice-print-table`,children:[(0,v.jsx)(`thead`,{children:(0,v.jsxs)(`tr`,{children:[(0,v.jsx)(`th`,{style:{width:`35px`,textAlign:`center`},children:`No`}),(0,v.jsx)(`th`,{style:{textAlign:`left`},children:`No. Invoice`}),(0,v.jsx)(`th`,{style:{textAlign:`left`},children:`Client Name`}),(0,v.jsx)(`th`,{style:{width:`80px`,textAlign:`center`},children:`Status`}),(0,v.jsxs)(`th`,{style:{width:`100px`,textAlign:`center`},children:[`Total Invoice`,(0,v.jsx)(`br`,{}),`(RM)`]}),(0,v.jsxs)(`th`,{style:{width:`100px`,textAlign:`center`},children:[`Production Cost`,(0,v.jsx)(`br`,{}),`(RM)`]}),(0,v.jsxs)(`th`,{style:{width:`100px`,textAlign:`center`},children:[`Profit`,(0,v.jsx)(`br`,{}),`(RM)`]})]})}),(0,v.jsx)(`tbody`,{children:K.length===0?(0,v.jsx)(`tr`,{children:(0,v.jsx)(`td`,{colSpan:`7`,style:{textAlign:`center`,padding:`0.75rem`},children:`No production records for this month.`})}):[...K].sort((e,t)=>(e.invoice_no||``).localeCompare(t.invoice_no||``)).map((e,t)=>{let n=e.status===`Void`,r=parseFloat(e.grand_total||0),i=parseFloat(e.pengeluaran||0),a=n?0:e.status===`Paid`?r:parseFloat(e.deposit||0),o=n?0:a-i;return(0,v.jsxs)(`tr`,{className:`print-avoid-break`,style:n?{opacity:.6}:{},children:[(0,v.jsxs)(`td`,{style:{textAlign:`center`,verticalAlign:`middle`,padding:`0.35rem 0.25rem`},children:[t+1,`.`]}),(0,v.jsx)(`td`,{style:{textAlign:`left`,verticalAlign:`middle`,padding:`0.35rem 0.25rem`},className:`font-bold`,children:e.invoice_no}),(0,v.jsx)(`td`,{style:{textAlign:`left`,verticalAlign:`middle`,padding:`0.35rem 0.25rem`},children:e.client_name}),(0,v.jsx)(`td`,{style:{textAlign:`center`,verticalAlign:`middle`,padding:`0.35rem 0.25rem`},children:(0,v.jsx)(`span`,{className:`badge ${re(e.status)}`,style:{padding:`0.1rem 0.4rem`,fontSize:`0.68rem`},children:J(e.status)})}),(0,v.jsx)(`td`,{style:{textAlign:`center`,verticalAlign:`middle`,padding:`0.35rem 0.25rem`},children:n?(0,v.jsx)(`span`,{style:{textDecoration:`line-through`,color:`#94a3b8`},children:r.toFixed(2)}):r.toFixed(2)}),(0,v.jsx)(`td`,{style:{textAlign:`center`,verticalAlign:`middle`,padding:`0.35rem 0.25rem`,color:n?`#94a3b8`:`var(--primary-red)`},children:n?`-`:i.toFixed(2)}),(0,v.jsx)(`td`,{style:{textAlign:`center`,verticalAlign:`middle`,padding:`0.35rem 0.25rem`,color:n?`#94a3b8`:`#15803D`},className:`font-bold`,children:n?`-`:o.toFixed(2)})]},e.id)})})]})}),(0,v.jsx)(`hr`,{className:`divider-line print-avoid-break`,style:{margin:`0.4rem 0`}}),(0,v.jsxs)(`div`,{className:`invoice-calculations-section print-avoid-break`,style:{justifyContent:`space-between`,display:`flex`,alignItems:`flex-start`,margin:`0.2rem 0`},children:[(0,v.jsxs)(`div`,{style:{flex:1,paddingRight:`2rem`},children:[(0,v.jsx)(`span`,{className:`section-title-print`,style:{marginBottom:`0.3rem`,display:`block`},children:`TOTAL SALES VALUE`}),(0,v.jsxs)(`div`,{className:`summary-print-row`,style:{justifyContent:`space-between`,fontSize:`0.72rem`,color:`#111`},children:[(0,v.jsx)(`span`,{children:`Total Invoice Value:`}),(0,v.jsxs)(`span`,{className:`font-bold`,children:[`RM `,ue.toFixed(2)]})]})]}),(0,v.jsxs)(`div`,{className:`calculation-invoice-summary`,style:{width:`340px`},children:[(0,v.jsx)(`span`,{className:`section-title-print`,style:{marginBottom:`0.3rem`,display:`block`,textAlign:`left`},children:`CASHFLOW & PROFIT`}),(0,v.jsxs)(`div`,{className:`summary-print-row`,style:{fontSize:`0.72rem`,display:`flex`,justifyContent:`space-between`,alignItems:`center`},children:[(0,v.jsx)(`span`,{children:`Cash Received (Paid + Deposit):`}),(0,v.jsxs)(`span`,{className:`font-bold`,style:{color:`#111`},children:[`RM `,Z.toFixed(2)]})]}),(0,v.jsxs)(`div`,{className:`summary-print-row`,style:{fontSize:`0.72rem`,color:`var(--primary-red)`,display:`flex`,justifyContent:`space-between`,alignItems:`center`,marginTop:`0.2rem`},children:[(0,v.jsx)(`span`,{children:`Production Cost:`}),(0,v.jsxs)(`span`,{className:`font-bold`,children:[`- RM `,Q.toFixed(2)]})]}),(0,v.jsxs)(`div`,{className:`summary-print-row grand-total-row-print`,style:{borderTop:`1px solid #111`,marginTop:`0.35rem`,paddingTop:`0.35rem`,display:`flex`,justifyContent:`space-between`,alignItems:`center`},children:[(0,v.jsx)(`span`,{style:{fontSize:`0.75rem`,fontWeight:800},children:`NET PROFIT:`}),(0,v.jsxs)(`span`,{style:{color:`#15803D`,fontSize:`0.82rem`,fontWeight:800},children:[`RM `,de.toFixed(2)]})]})]})]}),(0,v.jsx)(`hr`,{className:`divider-line print-avoid-break`,style:{margin:`0.4rem 0`}}),(0,v.jsx)(`div`,{className:`invoice-bottom-grid print-avoid-break`,style:{marginBottom:0},children:(0,v.jsx)(`div`,{className:`bottom-grid-left`,style:{width:`100%`},children:(0,v.jsxs)(`div`,{className:`terms-container`,children:[(0,v.jsx)(`span`,{className:`section-title-print`,children:`NOTES:`}),(0,v.jsx)(`p`,{style:{fontSize:`0.72rem`,color:`#555`,marginTop:`0.1rem`},children:`This payment voucher is automatically generated for internal production and financial records.`})]})})}),(0,v.jsxs)(`div`,{className:`thank-you-footer print-avoid-break`,style:{marginTop:`auto`,paddingTop:`0.3rem`},children:[(0,v.jsx)(`p`,{style:{margin:0},children:`THIRTYONE LAB DESIGN - INTERNAL FINANCIAL STATEMENT`}),(0,v.jsx)(`p`,{style:{textTransform:`none`,fontWeight:`500`,fontStyle:`italic`,letterSpacing:`0.5px`,marginTop:`0.1rem`,color:`#777`,fontSize:`0.6rem`,margin:0},children:`Wear With Pride.`})]})]})})})})]})}),I&&P&&(0,v.jsx)(y,{isOpen:I,onClose:()=>{L(!1),F(null)},invoice:P,settings:x}),(0,v.jsx)(`style`,{children:`
        /* Common Print Voucher Styles */
        .invoice-header {
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
        }

        .company-info-block {
          display: flex;
          gap: 1rem;
          align-items: center;
          flex: 1;
        }

        .invoice-print-logo {
          height: 52px;
          max-width: 120px;
          object-fit: contain;
        }

        .logo-placeholder {
          height: 44px;
          width: 44px;
          background-color: var(--primary-red);
          color: #fff;
          font-family: var(--font-primary);
          font-weight: 800;
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .company-text {
          display: flex;
          flex-direction: column;
        }

        .company-print-name {
          font-family: var(--font-primary);
          font-size: 1.05rem;
          font-weight: 800;
          letter-spacing: 0.5px;
          margin-bottom: 0.1rem;
          color: #111111;
        }

        .company-print-details {
          font-size: 0.68rem;
          color: #555555;
          line-height: 1.25;
          margin: 0;
        }

        .company-print-details.address {
          max-width: 320px;
        }

        .document-meta-block {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-top: 0.25rem;
        }

        .document-type-title {
          font-family: var(--font-primary);
          font-size: 1.2rem;
          font-weight: 900;
          letter-spacing: 1px;
          color: var(--primary-red);
          margin-bottom: 0.15rem;
        }

        .meta-details-box {
          font-size: 0.72rem;
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
        }

        .meta-row {
          display: flex;
          justify-content: flex-start;
          gap: 0.5rem;
        }

        .A4-sheet {
          width: 210mm;
          min-height: 297mm;
          box-sizing: border-box;
          background: #ffffff;
          padding: 12mm;
          box-shadow: none;
          border: none;
          margin: 0 auto;
          overflow: visible;
        }

        .invoice-container {
          font-family: var(--font-secondary);
          color: #111111;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          height: 100%;
          justify-content: space-between;
        }

        .divider-line {
          border: none;
          border-top: 1px solid #111111;
          margin: 0.15rem 0;
        }

        .section-title-print {
          font-family: var(--font-primary);
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 1px;
          color: #111111;
          text-transform: uppercase;
          margin-bottom: 0.1rem;
        }

        .invoice-print-table {
          width: 100%;
          margin: 0.15rem 0;
        }

        .invoice-print-table th {
          border-bottom: 2px solid #111111 !important;
          color: #111111 !important;
          padding: 0.35rem 0.25rem !important;
          font-size: 0.65rem !important;
          text-transform: uppercase;
        }

        .invoice-print-table td {
          border-bottom: 1px solid #e6e2dc !important;
          padding: 0.5rem 0.25rem !important;
          font-size: 0.72rem !important;
          color: #111111 !important;
        }

        .summary-print-row {
          display: flex;
          justify-content: space-between;
          color: #555555;
        }

        .grand-total-row-print {
          font-family: var(--font-primary);
          font-weight: 800;
          color: #111111;
          font-size: 0.78rem;
          border-top: 1px solid #111111;
          padding-top: 0.3rem;
          margin-top: 0.1rem;
        }

        .thank-you-footer {
          text-align: center;
          font-family: var(--font-primary);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #555555;
          margin-top: 0.5rem;
        }

        .meta-lbl {
          color: #555555;
          min-width: 85px;
          font-weight: 600;
        }

        .meta-val {
          color: #111111;
          font-weight: 700;
        }

        .summary-box {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          padding: 1.25rem;
        }

        .summary-label {
          font-family: var(--font-primary);
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .summary-val {
          font-size: 1.25rem;
          font-weight: 700;
        }

        .search-filters-bar {
          display: flex !important;
          flex-direction: row !important;
          align-items: flex-end !important;
          gap: 1.25rem !important;
          flex-wrap: nowrap !important;
        }

        .search-box {
          position: relative;
          display: flex;
          align-items: center;
          flex: 1;
          min-width: 200px;
          height: 42px;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          color: var(--text-light);
        }

        .search-input {
          padding-left: 2.75rem;
          width: 100%;
          height: 42px;
        }

        .filter-group-row {
          display: flex !important;
          flex-direction: row !important;
          gap: 1rem !important;
          align-items: flex-end !important;
          flex-shrink: 0 !important;
        }

        .filter-box {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .select-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-light);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .filter-select {
          min-width: 140px;
          height: 42px;
        }

        .print-stmt-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          height: 42px;
          align-self: flex-end;
          white-space: nowrap;
        }

        @media (max-width: 768px) {
          .modal-header.print-controls {
            flex-direction: row !important;
            flex-wrap: nowrap !important;
          }
          .mfg-summary-row {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.75rem !important;
          }

          .search-filters-bar {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 1rem !important;
            padding: 1.25rem !important;
          }

          .search-box {
            width: 100% !important;
          }

          .filter-group-row {
            display: flex !important;
            flex-direction: column !important;
            width: 100% !important;
            gap: 0.75rem !important;
            align-items: stretch !important;
          }

          .filter-box {
            width: 100% !important;
          }

          .print-stmt-btn {
            width: 100% !important;
            justify-content: center !important;
            height: 42px !important;
          }
        }

        @media (max-width: 768px) {
          .A4-scroll-wrapper {
            align-items: flex-start !important;
            padding-top: 0.25rem !important;
          }
          .A4-scale-container {
            width: 100% !important;
            height: auto !important;
          }
          .A4-sheet {
            width: 100% !important;
            min-height: auto !important;
            transform: none !important;
            padding: 12mm 10mm !important;
          }
          .modal-header.print-controls {
            flex-direction: row !important;
            flex-wrap: nowrap !important;
          }
        }
      `})]})}export{b as default};