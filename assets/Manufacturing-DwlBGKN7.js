import{t as e}from"./search-BmX0hEq4.js";import{E as t,T as n,b as r,c as i,g as a,m as o,n as s,r as c,u as l,y as u}from"./index-BZLaVKnI.js";var d=t(n(),1),f=c(),p=`C:/Users/User/Documents/GitHub/thirtyonelab.OMS/src/components/KilangVoucherModal.jsx`;function m({isOpen:e,onClose:t,invoice:n,settings:i}){let{tr:o}=s(),[c,l]=(0,d.useState)(`Kilang Cetak Baju / Tukang Jahit`),[u,m]=(0,d.useState)(1),[h,g]=(0,d.useState)(1),_=(0,d.useRef)(0);(0,d.useEffect)(()=>{let e=()=>{if(window.innerWidth<=768){let e=window.innerWidth-32,t=Math.min(1,e/794);m(t)}else m(1)};return e(),window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[]);let v=()=>{let e=Date.now();e-_.current<300&&g(e=>e>1?1:1.8),_.current=e};if(!e||!n)return null;let y=e=>parseFloat(e||0).toLocaleString(`en-US`,{minimumFractionDigits:2,maximumFractionDigits:2}),b=e=>!e.items||!Array.isArray(e.items)?``:e.items.map((e,t)=>{let n=0;return e.item_type===`banner`?n=parseInt(e.qty||0,10):e.sizes&&(n=Object.values(e.sizes).reduce((e,t)=>e+parseInt(t?.short||0,10)+parseInt(t?.long||0,10)+parseInt(t?.pants||0,10),0)),(0,f.jsxDEV)(`div`,{style:{padding:`1px 0`},children:[`• `,e.design_name||e.item_type,` (`,n,`)`]},e.id||t,!0,{fileName:p,lineNumber:55,columnNumber:9},this)}),x=i?.company_name||`THIRTYONE LAB`,S=i?.company_address||`No 12, Jalan Niaga 1, 43000 Kajang, Selangor`,C=i?.company_phone||`012-3456789`,w=new Date().toLocaleDateString(`en-GB`),T=`PV-${new Date().toISOString().split(`T`)[0]}-K-${n.invoice_no}`,E=u*h;return(0,f.jsxDEV)(`div`,{className:`modal-overlay print-modal-overlay`,onClick:t,children:[(0,f.jsxDEV)(`div`,{className:`modal-content A4-modal-container`,onClick:e=>e.stopPropagation(),style:{maxWidth:`800px`},children:[(0,f.jsxDEV)(`div`,{className:`modal-header print-controls no-print`,style:{padding:`0.75rem 1.25rem`,borderBottom:`1px solid var(--border-color)`,display:`flex`,alignItems:`center`,width:`100%`,boxSizing:`border-box`},children:[(0,f.jsxDEV)(`div`,{style:{display:`flex`,gap:`0.75rem`,alignItems:`center`,flex:1,minWidth:0},children:[(0,f.jsxDEV)(`h3`,{style:{fontSize:`0.75rem`,fontWeight:800,margin:0,letterSpacing:`0.5px`},children:`BAUCAR KILANG`},void 0,!1,{fileName:p,lineNumber:81,columnNumber:13},this),(0,f.jsxDEV)(`button`,{onClick:()=>window.print(),className:`btn btn-primary btn-sm`,style:{display:`flex`,alignItems:`center`,gap:`0.35rem`,padding:`0.4rem 0.8rem`},children:[(0,f.jsxDEV)(r,{size:13},void 0,!1,{fileName:p,lineNumber:83,columnNumber:15},this),` `,o(`print`)]},void 0,!0,{fileName:p,lineNumber:82,columnNumber:13},this)]},void 0,!0,{fileName:p,lineNumber:80,columnNumber:11},this),(0,f.jsxDEV)(`button`,{className:`modal-close`,onClick:t,style:{background:`none`,border:`none`,cursor:`pointer`,color:`var(--text-dark)`,display:`flex`,alignItems:`center`,padding:0},children:(0,f.jsxDEV)(a,{size:20},void 0,!1,{fileName:p,lineNumber:87,columnNumber:13},this)},void 0,!1,{fileName:p,lineNumber:86,columnNumber:11},this)]},void 0,!0,{fileName:p,lineNumber:79,columnNumber:9},this),(0,f.jsxDEV)(`div`,{className:`A4-scroll-wrapper`,style:{overflow:`auto`,flex:1,padding:`0.25rem 0 1rem 0`,display:`flex`,flexDirection:`column`,alignItems:`center`,backgroundColor:`#ffffff`},children:[(0,f.jsxDEV)(`div`,{className:`card no-print`,style:{width:`100%`,maxWidth:`210mm`,marginBottom:`1rem`,padding:`1rem`},children:(0,f.jsxDEV)(`div`,{className:`form-group`,style:{margin:0},children:[(0,f.jsxDEV)(`label`,{className:`form-label`,style:{fontWeight:`bold`},children:`Pay To`},void 0,!1,{fileName:p,lineNumber:97,columnNumber:15},this),(0,f.jsxDEV)(`input`,{type:`text`,value:c,onChange:e=>l(e.target.value),className:`form-control`,placeholder:`Contoh: Nama Kilang / Tukang Jahit`},void 0,!1,{fileName:p,lineNumber:98,columnNumber:15},this)]},void 0,!0,{fileName:p,lineNumber:96,columnNumber:13},this)},void 0,!1,{fileName:p,lineNumber:95,columnNumber:11},this),(0,f.jsxDEV)(`div`,{className:`A4-scale-container`,onTouchEnd:v,onDoubleClick:()=>g(e=>e>1?1:1.8),style:{width:`${794*E}px`,height:`${1122*E}px`,overflow:`visible`,flexShrink:0,cursor:h>1?`zoom-out`:`zoom-in`},children:(0,f.jsxDEV)(`div`,{className:`A4-sheet`,style:{width:`210mm`,minHeight:`297mm`,padding:`15mm 12mm`,boxSizing:`border-box`,background:`#fff`,border:`none`,overflow:`visible`,margin:`0`,display:`flex`,flexDirection:`column`,justifyContent:`space-between`,transform:`scale(${E})`,transformOrigin:`top left`},children:[(0,f.jsxDEV)(`div`,{children:[(0,f.jsxDEV)(`div`,{className:`invoice-header`,style:{display:`flex`,justifyContent:`flex-start`,alignItems:`center`},children:(0,f.jsxDEV)(`div`,{className:`company-info-block`,style:{display:`flex`,gap:`1rem`,alignItems:`center`},children:[i?.company_logo?(0,f.jsxDEV)(`img`,{src:i.company_logo,alt:`Company Logo`,className:`invoice-print-logo`,style:{maxHeight:`50px`}},void 0,!1,{fileName:p,lineNumber:140,columnNumber:21},this):(0,f.jsxDEV)(`img`,{src:`/thirtyonelab.OMS/Logo%20Header.webp`,alt:`Company Logo`,className:`invoice-print-logo`,style:{maxHeight:`50px`}},void 0,!1,{fileName:p,lineNumber:142,columnNumber:21},this),(0,f.jsxDEV)(`div`,{className:`company-text`,children:[(0,f.jsxDEV)(`h1`,{className:`company-print-name`,style:{fontSize:`1.25rem`,fontWeight:800,margin:0},children:x.toUpperCase().includes(`LAB`)?(0,f.jsxDEV)(f.Fragment,{children:[x.toUpperCase().split(`LAB`)[0],(0,f.jsxDEV)(`span`,{style:{color:`var(--primary-red)`},children:`LAB`},void 0,!1,{fileName:p,lineNumber:149,columnNumber:27},this),(0,f.jsxDEV)(`sup`,{style:{color:`var(--primary-red)`,fontSize:`0.5em`,fontWeight:`700`},children:`®`},void 0,!1,{fileName:p,lineNumber:150,columnNumber:27},this),x.toUpperCase().split(`LAB`)[1]]},void 0,!0,{fileName:p,lineNumber:147,columnNumber:25},this):x},void 0,!1,{fileName:p,lineNumber:145,columnNumber:21},this),(0,f.jsxDEV)(`p`,{className:`company-print-details address`,style:{margin:`0.2rem 0 0 0`,fontSize:`0.75rem`,color:`#555`},children:S},void 0,!1,{fileName:p,lineNumber:157,columnNumber:21},this),(0,f.jsxDEV)(`p`,{className:`company-print-details`,style:{margin:0,fontSize:`0.75rem`,color:`#555`},children:[`Tel: `,C]},void 0,!0,{fileName:p,lineNumber:158,columnNumber:21},this)]},void 0,!0,{fileName:p,lineNumber:144,columnNumber:19},this)]},void 0,!0,{fileName:p,lineNumber:138,columnNumber:17},this)},void 0,!1,{fileName:p,lineNumber:137,columnNumber:15},this),(0,f.jsxDEV)(`div`,{style:{marginTop:`1.5rem`,display:`flex`,flexDirection:`column`,alignItems:`flex-start`,gap:`0.3rem`},children:[(0,f.jsxDEV)(`h2`,{style:{fontSize:`1.2rem`,fontWeight:800,margin:0},children:`PAYMENT VOUCHER (KILANG)`},void 0,!1,{fileName:p,lineNumber:165,columnNumber:17},this),(0,f.jsxDEV)(`div`,{style:{fontSize:`0.75rem`,textAlign:`left`},children:[(0,f.jsxDEV)(`div`,{style:{marginBottom:`0.1rem`},children:[(0,f.jsxDEV)(`span`,{style:{color:`#555`},children:`Voucher No: `},void 0,!1,{fileName:p,lineNumber:168,columnNumber:21},this),(0,f.jsxDEV)(`span`,{style:{fontWeight:`bold`},children:T},void 0,!1,{fileName:p,lineNumber:169,columnNumber:21},this)]},void 0,!0,{fileName:p,lineNumber:167,columnNumber:19},this),(0,f.jsxDEV)(`div`,{children:[(0,f.jsxDEV)(`span`,{style:{color:`#555`},children:`Date: `},void 0,!1,{fileName:p,lineNumber:172,columnNumber:21},this),(0,f.jsxDEV)(`span`,{children:w},void 0,!1,{fileName:p,lineNumber:173,columnNumber:21},this)]},void 0,!0,{fileName:p,lineNumber:171,columnNumber:19},this)]},void 0,!0,{fileName:p,lineNumber:166,columnNumber:17},this)]},void 0,!0,{fileName:p,lineNumber:164,columnNumber:15},this),(0,f.jsxDEV)(`hr`,{style:{border:`none`,borderTop:`2px solid #111`,margin:`1rem 0`}},void 0,!1,{fileName:p,lineNumber:178,columnNumber:15},this),(0,f.jsxDEV)(`div`,{style:{fontSize:`0.85rem`,marginBottom:`1.5rem`,borderBottom:`1px solid #111`,paddingBottom:`0.5rem`},children:[(0,f.jsxDEV)(`strong`,{children:`PAY TO:`},void 0,!1,{fileName:p,lineNumber:182,columnNumber:17},this),` `,(0,f.jsxDEV)(`span`,{style:{marginLeft:`0.5rem`,fontSize:`0.9rem`},children:c},void 0,!1,{fileName:p,lineNumber:182,columnNumber:42},this)]},void 0,!0,{fileName:p,lineNumber:181,columnNumber:15},this),(0,f.jsxDEV)(`h3`,{style:{fontSize:`0.8rem`,fontWeight:`bold`,margin:`0.5rem 0`},children:`PAYMENT DETAILS (FACTORY COST):`},void 0,!1,{fileName:p,lineNumber:186,columnNumber:15},this),(0,f.jsxDEV)(`table`,{style:{width:`100%`,borderCollapse:`collapse`,marginTop:`0.5rem`},children:[(0,f.jsxDEV)(`thead`,{children:(0,f.jsxDEV)(`tr`,{style:{borderTop:`1px solid #111`,borderBottom:`1px solid #111`,backgroundColor:`#f8fafc`,fontSize:`0.75rem`,fontWeight:`bold`},children:[(0,f.jsxDEV)(`th`,{style:{width:`40px`,padding:`0.5rem`,textAlign:`center`,borderRight:`1px solid #ddd`},children:`NO`},void 0,!1,{fileName:p,lineNumber:192,columnNumber:21},this),(0,f.jsxDEV)(`th`,{style:{padding:`0.5rem`,textAlign:`left`,borderRight:`1px solid #ddd`},children:`ORDER REFERENCE`},void 0,!1,{fileName:p,lineNumber:193,columnNumber:21},this),(0,f.jsxDEV)(`th`,{style:{padding:`0.5rem`,textAlign:`left`,borderRight:`1px solid #ddd`},children:`DESCRIPTION`},void 0,!1,{fileName:p,lineNumber:194,columnNumber:21},this),(0,f.jsxDEV)(`th`,{style:{width:`120px`,padding:`0.5rem`,textAlign:`right`},children:`AMOUNT`},void 0,!1,{fileName:p,lineNumber:195,columnNumber:21},this)]},void 0,!0,{fileName:p,lineNumber:191,columnNumber:19},this)},void 0,!1,{fileName:p,lineNumber:190,columnNumber:17},this),(0,f.jsxDEV)(`tbody`,{children:[(0,f.jsxDEV)(`tr`,{style:{borderBottom:`1px solid #111`,fontSize:`0.8rem`},children:[(0,f.jsxDEV)(`td`,{style:{padding:`0.5rem`,textAlign:`center`,borderRight:`1px solid #ddd`,verticalAlign:`top`},children:`1`},void 0,!1,{fileName:p,lineNumber:200,columnNumber:21},this),(0,f.jsxDEV)(`td`,{style:{padding:`0.5rem`,borderRight:`1px solid #ddd`,verticalAlign:`top`},children:[(0,f.jsxDEV)(`div`,{style:{fontWeight:`bold`},children:[`Invoice: #`,n.invoice_no]},void 0,!0,{fileName:p,lineNumber:202,columnNumber:23},this),(0,f.jsxDEV)(`div`,{style:{fontSize:`0.75rem`,color:`#555`,marginTop:`0.2rem`},children:[`Client: `,n.client_name]},void 0,!0,{fileName:p,lineNumber:203,columnNumber:23},this)]},void 0,!0,{fileName:p,lineNumber:201,columnNumber:21},this),(0,f.jsxDEV)(`td`,{style:{padding:`0.5rem`,borderRight:`1px solid #ddd`,verticalAlign:`top`},children:[(0,f.jsxDEV)(`div`,{children:`Factory Cost / Production`},void 0,!1,{fileName:p,lineNumber:206,columnNumber:23},this),(0,f.jsxDEV)(`div`,{style:{fontSize:`0.75rem`,color:`var(--text-muted)`,marginTop:`0.25rem`},children:[`Items: `,b(n)]},void 0,!0,{fileName:p,lineNumber:207,columnNumber:23},this)]},void 0,!0,{fileName:p,lineNumber:205,columnNumber:21},this),(0,f.jsxDEV)(`td`,{style:{padding:`0.5rem`,textAlign:`right`,fontWeight:`bold`,verticalAlign:`top`},children:[`RM `,y(n.pengeluaran)]},void 0,!0,{fileName:p,lineNumber:211,columnNumber:21},this)]},void 0,!0,{fileName:p,lineNumber:199,columnNumber:19},this),(0,f.jsxDEV)(`tr`,{style:{fontSize:`0.85rem`,fontWeight:`bold`},children:[(0,f.jsxDEV)(`td`,{colSpan:`3`,style:{padding:`0.75rem 0.5rem`,textAlign:`right`},children:`TOTAL AMOUNT:`},void 0,!1,{fileName:p,lineNumber:214,columnNumber:21},this),(0,f.jsxDEV)(`td`,{style:{padding:`0.75rem 0.5rem`,textAlign:`right`,fontSize:`0.95rem`},children:[`RM `,y(n.pengeluaran)]},void 0,!0,{fileName:p,lineNumber:215,columnNumber:21},this)]},void 0,!0,{fileName:p,lineNumber:213,columnNumber:19},this)]},void 0,!0,{fileName:p,lineNumber:198,columnNumber:17},this)]},void 0,!0,{fileName:p,lineNumber:189,columnNumber:15},this)]},void 0,!0,{fileName:p,lineNumber:135,columnNumber:13},this),(0,f.jsxDEV)(`div`,{style:{marginTop:`auto`,paddingTop:`1.5rem`,borderTop:`1px solid #e6e2dc`},children:[(0,f.jsxDEV)(`div`,{style:{fontSize:`0.7rem`,color:`#555`,marginBottom:`1rem`},children:[(0,f.jsxDEV)(`strong`,{children:`NOTES:`},void 0,!1,{fileName:p,lineNumber:224,columnNumber:17},this),(0,f.jsxDEV)(`p`,{style:{margin:`0.1rem 0 0 0`,lineHeight:`1.3`},children:`Official voucher for factory production operating expenses and company financial records.`},void 0,!1,{fileName:p,lineNumber:225,columnNumber:17},this)]},void 0,!0,{fileName:p,lineNumber:223,columnNumber:15},this),(0,f.jsxDEV)(`div`,{style:{textAlign:`center`,fontSize:`0.68rem`,fontWeight:700,color:`#555`,letterSpacing:`1px`,textTransform:`uppercase`,fontFamily:`var(--font-primary)`},children:[(0,f.jsxDEV)(`p`,{style:{margin:0},children:`THIRTYONE LAB DESIGN - INTERNAL FINANCIAL STATEMENT`},void 0,!1,{fileName:p,lineNumber:230,columnNumber:17},this),(0,f.jsxDEV)(`p`,{style:{margin:`0.1rem 0 0 0`,fontStyle:`italic`,textTransform:`none`,fontWeight:500,fontSize:`0.6rem`,color:`#777`,letterSpacing:`0.5px`},children:`Wear With Pride.`},void 0,!1,{fileName:p,lineNumber:231,columnNumber:17},this)]},void 0,!0,{fileName:p,lineNumber:229,columnNumber:15},this)]},void 0,!0,{fileName:p,lineNumber:222,columnNumber:13},this)]},void 0,!0,{fileName:p,lineNumber:120,columnNumber:13},this)},void 0,!1,{fileName:p,lineNumber:108,columnNumber:11},this)]},void 0,!0,{fileName:p,lineNumber:92,columnNumber:9},this)]},void 0,!0,{fileName:p,lineNumber:77,columnNumber:7},this),(0,f.jsxDEV)(`style`,{children:`
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
      `},void 0,!1,{fileName:p,lineNumber:240,columnNumber:7},this)]},void 0,!0,{fileName:p,lineNumber:76,columnNumber:5},this)}var h=`C:/Users/User/Documents/GitHub/thirtyonelab.OMS/src/pages/Manufacturing.jsx`;function g(){let{tr:t,language:n}=s(),[c,p]=(0,d.useState)([]),[g,_]=(0,d.useState)(null),[v,y]=(0,d.useState)(``),[b,x]=(0,d.useState)(`All`),[S,C]=(0,d.useState)(!1),[w,T]=(0,d.useState)({}),[E,D]=(0,d.useState)(!1),[O,k]=(0,d.useState)(null),[A,j]=(0,d.useState)(!1),[M,N]=(0,d.useState)(1),[P,F]=(0,d.useState)(1),I=(0,d.useRef)(0),L=[{value:`0`,label:n===`EN`?`January`:`Januari`},{value:`1`,label:n===`EN`?`February`:`Februari`},{value:`2`,label:n===`EN`?`March`:`Mac`},{value:`3`,label:`April`},{value:`4`,label:n===`EN`?`May`:`Mei`},{value:`5`,label:n===`EN`?`June`:`Jun`},{value:`6`,label:n===`EN`?`July`:`Julai`},{value:`7`,label:n===`EN`?`August`:`Ogos`},{value:`8`,label:`September`},{value:`9`,label:n===`EN`?`October`:`Oktober`},{value:`10`,label:`November`},{value:`11`,label:n===`EN`?`December`:`Disember`}];(0,d.useEffect)(()=>{R()},[]),(0,d.useEffect)(()=>{let e=()=>{if(window.innerWidth<=768){let e=window.innerWidth-32,t=Math.min(1,e/794);N(t)}else N(1)};return e(),window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[]);let R=async()=>{C(!0);try{let e=await i(),t=await l(),n=e.sort((e,t)=>t.invoice_no.localeCompare(e.invoice_no));p(n),_(t)}catch(e){console.error(`Error loading data in manufacturing:`,e)}finally{C(!1)}},z=()=>{let e=Date.now();e-I.current<300&&F(e=>e>1?1:1.8),I.current=e},B=(e,t,n)=>{T(r=>({...r,[e]:{...r[e],[t]:n}}))},V=async e=>{let t=w[e.id]?.pengeluaran,n=t===void 0?e.pengeluaran||0:parseFloat(t)||0,r=w[e.id]?.order_status===void 0?e.order_status||`BELUM_DRAFT`:w[e.id].order_status;C(!0);try{await o(e.id,r,n)?(alert(`Kemaskini berjaya disimpan!`),T(t=>{let n={...t};return delete n[e.id],n}),R()):alert(`Gagal menyimpan kemaskini.`)}catch(e){console.error(e),alert(`Ralat semasa menyimpan kemaskini.`)}finally{C(!1)}},H=c.filter(e=>{let t=e.client_name.toLowerCase().includes(v.toLowerCase())||e.invoice_no.toLowerCase().includes(v.toLowerCase()),n=!0;return b!==`All`&&(n=new Date(e.date).getMonth()===parseInt(b,10)),t&&n}),U=e=>{switch(e){case`Paid`:return`badge-paid`;case`Deposit`:return`badge-deposit`;case`Unpaid`:return`badge-unpaid`;default:return``}},W=e=>{switch(e){case`Paid`:return`Paid`;case`Deposit`:return`Deposit`;case`Unpaid`:return`Unpaid`;default:return e}},G=e=>!e.items||!Array.isArray(e.items)?`-`:e.items.map((e,t)=>{let n=0;e.item_type===`banner`?n=parseInt(e.qty||0,10):e.sizes&&(n=Object.values(e.sizes).reduce((e,t)=>e+parseInt(t?.short||0,10)+parseInt(t?.long||0,10)+parseInt(t?.pants||0,10),0));let r=e.item_type===`banner`?`unit`:`pcs`;return(0,f.jsxDEV)(`div`,{style:{padding:`2px 0`},children:[`• `,e.design_name||(e.item_type?e.item_type.charAt(0).toUpperCase()+e.item_type.slice(1):`Item`),` (`,n,` `,r,`)`]},e.id||t,!0,{fileName:h,lineNumber:172,columnNumber:9},this)}),K=H.filter(e=>(e.order_status||`BELUM_DRAFT`)===`BELUM_DRAFT`).length,q=H.filter(e=>e.order_status===`DRAFT`).length,J=H.filter(e=>e.order_status===`PENDING`).length,Y=H.filter(e=>e.order_status===`PROCESSING`).length,X=H.filter(e=>e.order_status===`COMPLETED`).length,ee=H.filter(e=>e.order_status===`MAINTENANCE`).length,te=H.reduce((e,t)=>e+parseFloat(t.grand_total||0),0),Z=H.reduce((e,t)=>t.status===`Paid`?e+parseFloat(t.grand_total||0):t.status===`Deposit`?e+parseFloat(t.deposit||0):e,0),Q=H.reduce((e,t)=>{let n=w[t.id]?.pengeluaran;return e+(n===void 0?parseFloat(t.pengeluaran||0):parseFloat(n)||0)},0),ne=Z-Q,re=b===`All`?`Semua Bulan`:L.find(e=>e.value===b)?.label||``,$=M*P;return(0,f.jsxDEV)(`div`,{className:`main-content`,children:[(0,f.jsxDEV)(`div`,{className:`dashboard-header`,style:{marginBottom:`2rem`},children:(0,f.jsxDEV)(`div`,{children:[(0,f.jsxDEV)(`span`,{className:`section-tag`,children:t(`mfgTag`)},void 0,!1,{fileName:h,lineNumber:211,columnNumber:11},this),(0,f.jsxDEV)(`h1`,{style:{fontSize:`1.75rem`,fontWeight:`800`,marginTop:`0.5rem`},children:t(`mfgTitle`)},void 0,!1,{fileName:h,lineNumber:212,columnNumber:11},this),(0,f.jsxDEV)(`p`,{style:{color:`var(--text-muted)`,fontSize:`0.9rem`,marginTop:`0.25rem`,letterSpacing:`0.5px`},children:t(`mfgSubtitle`)},void 0,!1,{fileName:h,lineNumber:213,columnNumber:11},this)]},void 0,!0,{fileName:h,lineNumber:210,columnNumber:9},this)},void 0,!1,{fileName:h,lineNumber:209,columnNumber:7},this),(0,f.jsxDEV)(`div`,{className:`mfg-summary-row`,style:{display:`grid`,gridTemplateColumns:`repeat(6, 1fr)`,gap:`1rem`,marginBottom:`1.5rem`},children:[(0,f.jsxDEV)(`div`,{className:`card`,style:{padding:`1rem`,borderLeft:`4px solid #64748B`},children:[(0,f.jsxDEV)(`h3`,{className:`section-title`,style:{fontSize:`0.65rem`,fontWeight:`800`,letterSpacing:`1px`,textTransform:`uppercase`,color:`var(--text-muted)`,marginBottom:`0.5rem`},children:`📥 Belum Draft`},void 0,!1,{fileName:h,lineNumber:222,columnNumber:11},this),(0,f.jsxDEV)(`span`,{className:`summary-val`,style:{fontSize:`1.2rem`,fontWeight:`900`,lineHeight:`1`,color:`var(--text-dark)`},children:K},void 0,!1,{fileName:h,lineNumber:225,columnNumber:11},this)]},void 0,!0,{fileName:h,lineNumber:221,columnNumber:9},this),(0,f.jsxDEV)(`div`,{className:`card`,style:{padding:`1rem`,borderLeft:`4px solid #94A3B8`},children:[(0,f.jsxDEV)(`h3`,{className:`section-title`,style:{fontSize:`0.65rem`,fontWeight:`800`,letterSpacing:`1px`,textTransform:`uppercase`,color:`var(--text-muted)`,marginBottom:`0.5rem`},children:`✏️ Draft`},void 0,!1,{fileName:h,lineNumber:230,columnNumber:11},this),(0,f.jsxDEV)(`span`,{className:`summary-val`,style:{fontSize:`1.2rem`,fontWeight:`900`,lineHeight:`1`,color:`var(--text-dark)`},children:q},void 0,!1,{fileName:h,lineNumber:233,columnNumber:11},this)]},void 0,!0,{fileName:h,lineNumber:229,columnNumber:9},this),(0,f.jsxDEV)(`div`,{className:`card`,style:{padding:`1rem`,borderLeft:`4px solid var(--primary-red)`},children:[(0,f.jsxDEV)(`h3`,{className:`section-title`,style:{fontSize:`0.65rem`,fontWeight:`800`,letterSpacing:`1px`,textTransform:`uppercase`,color:`var(--text-muted)`,marginBottom:`0.5rem`},children:`⏳ Pending`},void 0,!1,{fileName:h,lineNumber:238,columnNumber:11},this),(0,f.jsxDEV)(`span`,{className:`summary-val`,style:{fontSize:`1.2rem`,fontWeight:`900`,lineHeight:`1`,color:`var(--text-dark)`},children:J},void 0,!1,{fileName:h,lineNumber:241,columnNumber:11},this)]},void 0,!0,{fileName:h,lineNumber:237,columnNumber:9},this),(0,f.jsxDEV)(`div`,{className:`card`,style:{padding:`1rem`,borderLeft:`4px solid #EAB308`},children:[(0,f.jsxDEV)(`h3`,{className:`section-title`,style:{fontSize:`0.65rem`,fontWeight:`800`,letterSpacing:`1px`,textTransform:`uppercase`,color:`var(--text-muted)`,marginBottom:`0.5rem`},children:`⚙️ Processing`},void 0,!1,{fileName:h,lineNumber:246,columnNumber:11},this),(0,f.jsxDEV)(`span`,{className:`summary-val`,style:{fontSize:`1.2rem`,fontWeight:`900`,lineHeight:`1`,color:`var(--text-dark)`},children:Y},void 0,!1,{fileName:h,lineNumber:249,columnNumber:11},this)]},void 0,!0,{fileName:h,lineNumber:245,columnNumber:9},this),(0,f.jsxDEV)(`div`,{className:`card`,style:{padding:`1rem`,borderLeft:`4px solid #15803D`},children:[(0,f.jsxDEV)(`h3`,{className:`section-title`,style:{fontSize:`0.65rem`,fontWeight:`800`,letterSpacing:`1px`,textTransform:`uppercase`,color:`var(--text-muted)`,marginBottom:`0.5rem`},children:`✅ Completed`},void 0,!1,{fileName:h,lineNumber:254,columnNumber:11},this),(0,f.jsxDEV)(`span`,{className:`summary-val`,style:{fontSize:`1.2rem`,fontWeight:`900`,lineHeight:`1`,color:`var(--text-dark)`},children:X},void 0,!1,{fileName:h,lineNumber:257,columnNumber:11},this)]},void 0,!0,{fileName:h,lineNumber:253,columnNumber:9},this),(0,f.jsxDEV)(`div`,{className:`card`,style:{padding:`1rem`,borderLeft:`4px solid #DC2626`},children:[(0,f.jsxDEV)(`h3`,{className:`section-title`,style:{fontSize:`0.65rem`,fontWeight:`800`,letterSpacing:`1px`,textTransform:`uppercase`,color:`var(--text-muted)`,marginBottom:`0.5rem`},children:`🛠️ Maintenance`},void 0,!1,{fileName:h,lineNumber:262,columnNumber:11},this),(0,f.jsxDEV)(`span`,{className:`summary-val`,style:{fontSize:`1.2rem`,fontWeight:`900`,lineHeight:`1`,color:`var(--text-dark)`},children:ee},void 0,!1,{fileName:h,lineNumber:265,columnNumber:11},this)]},void 0,!0,{fileName:h,lineNumber:261,columnNumber:9},this)]},void 0,!0,{fileName:h,lineNumber:220,columnNumber:7},this),(0,f.jsxDEV)(`div`,{className:`search-filters-bar card`,style:{marginBottom:`1.5rem`,padding:`1.25rem`},children:[(0,f.jsxDEV)(`div`,{className:`search-box`,children:[(0,f.jsxDEV)(e,{size:18,className:`search-icon`},void 0,!1,{fileName:h,lineNumber:274,columnNumber:11},this),(0,f.jsxDEV)(`input`,{type:`text`,placeholder:t(`searchPlaceholder`),value:v,onChange:e=>y(e.target.value),className:`form-control search-input`},void 0,!1,{fileName:h,lineNumber:275,columnNumber:11},this)]},void 0,!0,{fileName:h,lineNumber:273,columnNumber:9},this),(0,f.jsxDEV)(`div`,{className:`filter-group-row`,children:[(0,f.jsxDEV)(`div`,{className:`filter-box`,children:[(0,f.jsxDEV)(`span`,{className:`select-label`,children:t(`month`)},void 0,!1,{fileName:h,lineNumber:286,columnNumber:13},this),(0,f.jsxDEV)(`select`,{value:b,onChange:e=>x(e.target.value),className:`form-control filter-select`,children:[(0,f.jsxDEV)(`option`,{value:`All`,children:t(`allMonths`)},void 0,!1,{fileName:h,lineNumber:292,columnNumber:15},this),L.map(e=>(0,f.jsxDEV)(`option`,{value:e.value,children:e.label},e.value,!1,{fileName:h,lineNumber:294,columnNumber:17},this))]},void 0,!0,{fileName:h,lineNumber:287,columnNumber:13},this)]},void 0,!0,{fileName:h,lineNumber:285,columnNumber:11},this),(0,f.jsxDEV)(`button`,{onClick:()=>D(!0),className:`btn btn-primary print-stmt-btn`,title:`Cetak Monthly Statement`,children:[(0,f.jsxDEV)(r,{size:16},void 0,!1,{fileName:h,lineNumber:304,columnNumber:13},this),` Print Statement`]},void 0,!0,{fileName:h,lineNumber:299,columnNumber:11},this)]},void 0,!0,{fileName:h,lineNumber:284,columnNumber:9},this)]},void 0,!0,{fileName:h,lineNumber:272,columnNumber:7},this),(0,f.jsxDEV)(`div`,{className:`card`,style:{padding:0},children:[(0,f.jsxDEV)(`div`,{className:`card-header`,style:{padding:`1rem 1.5rem`,borderBottom:`1px solid var(--border-color)`},children:(0,f.jsxDEV)(`h3`,{className:`card-title`,style:{fontSize:`0.85rem`},children:`SENARAI TEMPAHAN`},void 0,!1,{fileName:h,lineNumber:312,columnNumber:11},this)},void 0,!1,{fileName:h,lineNumber:311,columnNumber:9},this),S&&c.length===0?(0,f.jsxDEV)(`div`,{className:`loading-state`,style:{padding:`3rem`,textAlign:`center`,color:`var(--text-muted)`},children:t(`loadingData`)},void 0,!1,{fileName:h,lineNumber:316,columnNumber:11},this):H.length===0?(0,f.jsxDEV)(`div`,{className:`empty-state`,style:{padding:`3rem`,textAlign:`center`,color:`var(--text-muted)`},children:t(`noData`)},void 0,!1,{fileName:h,lineNumber:318,columnNumber:11},this):(0,f.jsxDEV)(f.Fragment,{children:[(0,f.jsxDEV)(`div`,{className:`table-container desktop-only`,children:(0,f.jsxDEV)(`table`,{className:`table`,children:[(0,f.jsxDEV)(`thead`,{children:(0,f.jsxDEV)(`tr`,{children:[(0,f.jsxDEV)(`th`,{style:{textAlign:`left`},children:[t(`invNo`),` & `,t(`clientName`)]},void 0,!0,{fileName:h,lineNumber:325,columnNumber:21},this),(0,f.jsxDEV)(`th`,{style:{textAlign:`left`},children:t(`items`)},void 0,!1,{fileName:h,lineNumber:326,columnNumber:21},this),(0,f.jsxDEV)(`th`,{style:{textAlign:`center`,width:`160px`},children:t(`kosKilang`)},void 0,!1,{fileName:h,lineNumber:327,columnNumber:21},this),(0,f.jsxDEV)(`th`,{style:{textAlign:`center`,width:`160px`},children:t(`status`)},void 0,!1,{fileName:h,lineNumber:328,columnNumber:21},this),(0,f.jsxDEV)(`th`,{style:{textAlign:`center`,width:`180px`},children:t(`actions`)},void 0,!1,{fileName:h,lineNumber:329,columnNumber:21},this)]},void 0,!0,{fileName:h,lineNumber:324,columnNumber:19},this)},void 0,!1,{fileName:h,lineNumber:323,columnNumber:17},this),(0,f.jsxDEV)(`tbody`,{children:H.map(e=>{let n=w[e.id]?.pengeluaran===void 0?e.pengeluaran||``:w[e.id].pengeluaran,i=w[e.id]?.order_status===void 0?e.order_status||`BELUM_DRAFT`:w[e.id].order_status;return(0,f.jsxDEV)(`tr`,{children:[(0,f.jsxDEV)(`td`,{children:[(0,f.jsxDEV)(`div`,{className:`font-bold`,children:[`#`,e.invoice_no]},void 0,!0,{fileName:h,lineNumber:345,columnNumber:27},this),(0,f.jsxDEV)(`div`,{style:{fontSize:`0.8rem`,color:`var(--text-muted)`},children:e.client_name},void 0,!1,{fileName:h,lineNumber:346,columnNumber:27},this)]},void 0,!0,{fileName:h,lineNumber:344,columnNumber:25},this),(0,f.jsxDEV)(`td`,{children:(0,f.jsxDEV)(`div`,{style:{fontSize:`0.85rem`,whiteSpace:`normal`,maxWidth:`300px`},children:G(e)},void 0,!1,{fileName:h,lineNumber:349,columnNumber:27},this)},void 0,!1,{fileName:h,lineNumber:348,columnNumber:25},this),(0,f.jsxDEV)(`td`,{style:{textAlign:`center`},children:(0,f.jsxDEV)(`div`,{style:{display:`inline-flex`,alignItems:`center`,gap:`0.25rem`},children:[(0,f.jsxDEV)(`span`,{style:{fontSize:`0.85rem`,color:`var(--text-muted)`},children:`RM`},void 0,!1,{fileName:h,lineNumber:355,columnNumber:29},this),(0,f.jsxDEV)(`input`,{type:`number`,step:`0.01`,min:`0`,value:n,onChange:t=>B(e.id,`pengeluaran`,t.target.value),className:`form-control`,style:{width:`90px`,padding:`0.25rem 0.5rem`,textAlign:`right`},placeholder:`0.00`},void 0,!1,{fileName:h,lineNumber:356,columnNumber:29},this)]},void 0,!0,{fileName:h,lineNumber:354,columnNumber:27},this)},void 0,!1,{fileName:h,lineNumber:353,columnNumber:25},this),(0,f.jsxDEV)(`td`,{style:{textAlign:`center`},children:(0,f.jsxDEV)(`select`,{value:i,onChange:t=>B(e.id,`order_status`,t.target.value),className:`form-control`,style:{padding:`0.25rem 0.5rem`,width:`130px`,margin:`0 auto`,fontSize:`0.85rem`},children:[(0,f.jsxDEV)(`option`,{value:`BELUM_DRAFT`,children:`📥 Belum Draft`},void 0,!1,{fileName:h,lineNumber:375,columnNumber:29},this),(0,f.jsxDEV)(`option`,{value:`DRAFT`,children:`✏️ Draft`},void 0,!1,{fileName:h,lineNumber:376,columnNumber:29},this),(0,f.jsxDEV)(`option`,{value:`PENDING`,children:`⏳ Pending`},void 0,!1,{fileName:h,lineNumber:377,columnNumber:29},this),(0,f.jsxDEV)(`option`,{value:`PROCESSING`,children:`⚙️ Processing`},void 0,!1,{fileName:h,lineNumber:378,columnNumber:29},this),(0,f.jsxDEV)(`option`,{value:`COMPLETED`,children:`✅ Completed`},void 0,!1,{fileName:h,lineNumber:379,columnNumber:29},this),(0,f.jsxDEV)(`option`,{value:`MAINTENANCE`,children:`🛠️ Maintenance`},void 0,!1,{fileName:h,lineNumber:380,columnNumber:29},this)]},void 0,!0,{fileName:h,lineNumber:369,columnNumber:27},this)},void 0,!1,{fileName:h,lineNumber:368,columnNumber:25},this),(0,f.jsxDEV)(`td`,{style:{textAlign:`center`},children:(0,f.jsxDEV)(`div`,{style:{display:`flex`,gap:`0.4rem`,justifyContent:`center`},children:[(0,f.jsxDEV)(`button`,{onClick:()=>V(e),className:`btn btn-primary btn-sm font-bold`,style:{fontSize:`0.75rem`,padding:`0.25rem 0.5rem`,display:`flex`,alignItems:`center`,gap:`0.25rem`},children:[(0,f.jsxDEV)(u,{size:12},void 0,!1,{fileName:h,lineNumber:390,columnNumber:31},this),` `,t(`save`)]},void 0,!0,{fileName:h,lineNumber:385,columnNumber:29},this),(0,f.jsxDEV)(`button`,{onClick:()=>{k(e),j(!0)},className:`btn btn-secondary btn-sm font-bold`,style:{fontSize:`0.75rem`,padding:`0.25rem 0.5rem`,display:`flex`,alignItems:`center`,gap:`0.25rem`},children:[(0,f.jsxDEV)(r,{size:12},void 0,!1,{fileName:h,lineNumber:397,columnNumber:31},this),` `,t(`print`)]},void 0,!0,{fileName:h,lineNumber:392,columnNumber:29},this)]},void 0,!0,{fileName:h,lineNumber:384,columnNumber:27},this)},void 0,!1,{fileName:h,lineNumber:383,columnNumber:25},this)]},e.id,!0,{fileName:h,lineNumber:343,columnNumber:23},this)})},void 0,!1,{fileName:h,lineNumber:332,columnNumber:17},this)]},void 0,!0,{fileName:h,lineNumber:322,columnNumber:15},this)},void 0,!1,{fileName:h,lineNumber:321,columnNumber:13},this),(0,f.jsxDEV)(`div`,{className:`mobile-cards-list mobile-only`,children:H.map(e=>{let n=w[e.id]?.pengeluaran===void 0?e.pengeluaran||``:w[e.id].pengeluaran,i=w[e.id]?.order_status===void 0?e.order_status||`BELUM_DRAFT`:w[e.id].order_status;return(0,f.jsxDEV)(`div`,{className:`mobile-card`,children:[(0,f.jsxDEV)(`div`,{className:`mobile-card-row`,style:{borderBottom:`1px solid var(--border-color)`,paddingBottom:`0.5rem`,marginBottom:`0.5rem`},children:(0,f.jsxDEV)(`span`,{className:`mobile-card-title`,children:[`#`,e.invoice_no,` - `,e.client_name]},void 0,!0,{fileName:h,lineNumber:421,columnNumber:23},this)},void 0,!1,{fileName:h,lineNumber:420,columnNumber:21},this),(0,f.jsxDEV)(`div`,{style:{fontSize:`0.85rem`,color:`var(--text-muted)`,marginBottom:`0.75rem`},children:[(0,f.jsxDEV)(`strong`,{children:`Items:`},void 0,!1,{fileName:h,lineNumber:424,columnNumber:23},this),` `,G(e)]},void 0,!0,{fileName:h,lineNumber:423,columnNumber:21},this),(0,f.jsxDEV)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:`0.75rem`},children:[(0,f.jsxDEV)(`div`,{style:{display:`flex`,alignItems:`center`,justifyContent:`space-between`},children:[(0,f.jsxDEV)(`span`,{children:`Kos Kilang:`},void 0,!1,{fileName:h,lineNumber:429,columnNumber:25},this),(0,f.jsxDEV)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`0.25rem`},children:[(0,f.jsxDEV)(`span`,{children:`RM`},void 0,!1,{fileName:h,lineNumber:431,columnNumber:27},this),(0,f.jsxDEV)(`input`,{type:`number`,step:`0.01`,min:`0`,value:n,onChange:t=>B(e.id,`pengeluaran`,t.target.value),className:`form-control`,style:{width:`90px`,padding:`0.25rem 0.5rem`,textAlign:`right`},placeholder:`0.00`},void 0,!1,{fileName:h,lineNumber:432,columnNumber:27},this)]},void 0,!0,{fileName:h,lineNumber:430,columnNumber:25},this)]},void 0,!0,{fileName:h,lineNumber:428,columnNumber:23},this),(0,f.jsxDEV)(`div`,{style:{display:`flex`,alignItems:`center`,justifyContent:`space-between`},children:[(0,f.jsxDEV)(`span`,{children:`Status:`},void 0,!1,{fileName:h,lineNumber:446,columnNumber:25},this),(0,f.jsxDEV)(`select`,{value:i,onChange:t=>B(e.id,`order_status`,t.target.value),className:`form-control`,style:{padding:`0.25rem 0.5rem`,width:`130px`},children:[(0,f.jsxDEV)(`option`,{value:`BELUM_DRAFT`,children:`📥 Belum Draft`},void 0,!1,{fileName:h,lineNumber:453,columnNumber:27},this),(0,f.jsxDEV)(`option`,{value:`DRAFT`,children:`✏️ Draft`},void 0,!1,{fileName:h,lineNumber:454,columnNumber:27},this),(0,f.jsxDEV)(`option`,{value:`PENDING`,children:`⏳ Pending`},void 0,!1,{fileName:h,lineNumber:455,columnNumber:27},this),(0,f.jsxDEV)(`option`,{value:`PROCESSING`,children:`⚙️ Processing`},void 0,!1,{fileName:h,lineNumber:456,columnNumber:27},this),(0,f.jsxDEV)(`option`,{value:`COMPLETED`,children:`✅ Completed`},void 0,!1,{fileName:h,lineNumber:457,columnNumber:27},this),(0,f.jsxDEV)(`option`,{value:`MAINTENANCE`,children:`🛠️ Maintenance`},void 0,!1,{fileName:h,lineNumber:458,columnNumber:27},this)]},void 0,!0,{fileName:h,lineNumber:447,columnNumber:25},this)]},void 0,!0,{fileName:h,lineNumber:445,columnNumber:23},this),(0,f.jsxDEV)(`div`,{style:{display:`flex`,gap:`0.5rem`,marginTop:`0.5rem`},children:[(0,f.jsxDEV)(`button`,{onClick:()=>V(e),className:`btn btn-primary btn-sm font-bold`,style:{flex:1,display:`flex`,justifyContent:`center`,alignItems:`center`,gap:`0.25rem`},children:[(0,f.jsxDEV)(u,{size:12},void 0,!1,{fileName:h,lineNumber:468,columnNumber:27},this),` `,t(`save`)]},void 0,!0,{fileName:h,lineNumber:463,columnNumber:25},this),(0,f.jsxDEV)(`button`,{onClick:()=>{k(e),j(!0)},className:`btn btn-secondary btn-sm font-bold`,style:{flex:1,display:`flex`,justifyContent:`center`,alignItems:`center`,gap:`0.25rem`},children:[(0,f.jsxDEV)(r,{size:12},void 0,!1,{fileName:h,lineNumber:475,columnNumber:27},this),` `,t(`print`)]},void 0,!0,{fileName:h,lineNumber:470,columnNumber:25},this)]},void 0,!0,{fileName:h,lineNumber:462,columnNumber:23},this)]},void 0,!0,{fileName:h,lineNumber:427,columnNumber:21},this)]},e.id,!0,{fileName:h,lineNumber:419,columnNumber:19},this)})},void 0,!1,{fileName:h,lineNumber:408,columnNumber:13},this)]},void 0,!0,{fileName:h,lineNumber:320,columnNumber:11},this)]},void 0,!0,{fileName:h,lineNumber:310,columnNumber:7},this),E&&g&&(0,f.jsxDEV)(`div`,{className:`modal-overlay print-modal-overlay`,onClick:()=>D(!1),children:(0,f.jsxDEV)(`div`,{className:`modal-content A4-modal-container`,onClick:e=>e.stopPropagation(),children:[(0,f.jsxDEV)(`div`,{className:`modal-header print-controls no-print`,children:(0,f.jsxDEV)(`div`,{className:`print-compact-bar`,style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,width:`100%`,padding:`0.75rem 1.25rem`},children:[(0,f.jsxDEV)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`1rem`},children:[(0,f.jsxDEV)(`span`,{style:{fontFamily:`var(--font-primary)`,fontSize:`0.75rem`,fontWeight:800,letterSpacing:`0.5px`,textTransform:`uppercase`,color:`var(--text-dark)`},children:`STATEMENT`},void 0,!1,{fileName:h,lineNumber:494,columnNumber:19},this),(0,f.jsxDEV)(`button`,{onClick:()=>window.print(),className:`btn btn-primary btn-sm`,style:{display:`flex`,alignItems:`center`,gap:`0.35rem`,padding:`0.4rem 0.8rem`},children:[(0,f.jsxDEV)(r,{size:13},void 0,!1,{fileName:h,lineNumber:503,columnNumber:21},this),` PRINT`]},void 0,!0,{fileName:h,lineNumber:498,columnNumber:19},this)]},void 0,!0,{fileName:h,lineNumber:493,columnNumber:17},this),(0,f.jsxDEV)(`button`,{className:`modal-close`,onClick:()=>D(!1),style:{background:`none`,border:`none`,cursor:`pointer`,color:`var(--text-dark)`,display:`flex`,alignItems:`center`,padding:0},children:(0,f.jsxDEV)(a,{size:20},void 0,!1,{fileName:h,lineNumber:508,columnNumber:19},this)},void 0,!1,{fileName:h,lineNumber:507,columnNumber:17},this)]},void 0,!0,{fileName:h,lineNumber:492,columnNumber:15},this)},void 0,!1,{fileName:h,lineNumber:491,columnNumber:13},this),(0,f.jsxDEV)(`div`,{className:`A4-scroll-wrapper`,style:{overflow:`auto`,flex:1,padding:`0.25rem 0 1rem 0`,display:`flex`,flexDirection:`column`,alignItems:`center`,backgroundColor:`#ffffff`},children:(0,f.jsxDEV)(`div`,{className:`A4-scale-container`,onTouchEnd:z,onDoubleClick:()=>F(e=>e>1?1:1.8),style:{width:`${794*$}px`,height:`${1122*$}px`,overflow:`visible`,flexShrink:0,cursor:P>1?`zoom-out`:`zoom-in`},children:(0,f.jsxDEV)(`div`,{className:`modal-body A4-sheet`,style:{transform:`scale(${$})`,transformOrigin:`top left`,margin:0,flex:`none`,width:`210mm`,minHeight:`297mm`,overflow:`visible`},children:(0,f.jsxDEV)(`div`,{className:`invoice-container`,children:[(0,f.jsxDEV)(`div`,{className:`invoice-header print-avoid-break`,children:(0,f.jsxDEV)(`div`,{className:`company-info-block`,children:[g.company_logo?(0,f.jsxDEV)(`img`,{src:g.company_logo,alt:`Company Logo`,className:`invoice-print-logo`},void 0,!1,{fileName:h,lineNumber:542,columnNumber:27},this):(0,f.jsxDEV)(`img`,{src:`/thirtyonelab.OMS/Logo%20Header.webp`,alt:`Company Logo`,className:`invoice-print-logo`},void 0,!1,{fileName:h,lineNumber:544,columnNumber:27},this),(0,f.jsxDEV)(`div`,{className:`company-text`,children:[(0,f.jsxDEV)(`h1`,{className:`company-print-name`,children:g.company_name&&g.company_name.toUpperCase().includes(`LAB`)?(0,f.jsxDEV)(f.Fragment,{children:[g.company_name.toUpperCase().split(`LAB`)[0],(0,f.jsxDEV)(`span`,{style:{color:`var(--primary-red)`},children:`LAB`},void 0,!1,{fileName:h,lineNumber:551,columnNumber:33},this),(0,f.jsxDEV)(`sup`,{style:{color:`var(--primary-red)`,fontSize:`0.5em`,fontWeight:`700`},children:`®`},void 0,!1,{fileName:h,lineNumber:552,columnNumber:33},this),g.company_name.toUpperCase().split(`LAB`)[1]]},void 0,!0,{fileName:h,lineNumber:549,columnNumber:31},this):g.company_name},void 0,!1,{fileName:h,lineNumber:547,columnNumber:27},this),(0,f.jsxDEV)(`p`,{className:`company-print-details address`,children:g.company_address},void 0,!1,{fileName:h,lineNumber:559,columnNumber:27},this),(0,f.jsxDEV)(`p`,{className:`company-print-details`,children:[`Tel: `,g.company_phone]},void 0,!0,{fileName:h,lineNumber:560,columnNumber:27},this)]},void 0,!0,{fileName:h,lineNumber:546,columnNumber:25},this)]},void 0,!0,{fileName:h,lineNumber:540,columnNumber:23},this)},void 0,!1,{fileName:h,lineNumber:539,columnNumber:21},this),(0,f.jsxDEV)(`div`,{className:`document-meta-block print-avoid-break`,children:[(0,f.jsxDEV)(`h2`,{className:`document-type-title`,children:`PAYMENT VOUCHER`},void 0,!1,{fileName:h,lineNumber:566,columnNumber:23},this),(0,f.jsxDEV)(`div`,{className:`meta-details-box`,children:[(0,f.jsxDEV)(`div`,{className:`meta-row`,children:[(0,f.jsxDEV)(`span`,{className:`meta-lbl`,children:`Voucher No:`},void 0,!1,{fileName:h,lineNumber:569,columnNumber:27},this),(0,f.jsxDEV)(`span`,{className:`meta-val font-bold`,children:[`\xA0PV-`,new Date().getFullYear(),`-`,(new Date().getMonth()+1).toString().padStart(2,`0`)]},void 0,!0,{fileName:h,lineNumber:570,columnNumber:27},this)]},void 0,!0,{fileName:h,lineNumber:568,columnNumber:25},this),(0,f.jsxDEV)(`div`,{className:`meta-row`,children:[(0,f.jsxDEV)(`span`,{className:`meta-lbl`,children:`Date:`},void 0,!1,{fileName:h,lineNumber:575,columnNumber:27},this),(0,f.jsxDEV)(`span`,{className:`meta-val`,children:[`\xA0`,new Date().toLocaleDateString(`en-GB`)]},void 0,!0,{fileName:h,lineNumber:576,columnNumber:27},this)]},void 0,!0,{fileName:h,lineNumber:574,columnNumber:25},this),(0,f.jsxDEV)(`div`,{className:`meta-row`,children:[(0,f.jsxDEV)(`span`,{className:`meta-lbl`,children:`Month:`},void 0,!1,{fileName:h,lineNumber:579,columnNumber:27},this),(0,f.jsxDEV)(`span`,{className:`meta-val font-bold`,children:[`\xA0`,re.toUpperCase()]},void 0,!0,{fileName:h,lineNumber:580,columnNumber:27},this)]},void 0,!0,{fileName:h,lineNumber:578,columnNumber:25},this)]},void 0,!0,{fileName:h,lineNumber:567,columnNumber:23},this)]},void 0,!0,{fileName:h,lineNumber:565,columnNumber:21},this),(0,f.jsxDEV)(`hr`,{className:`divider-line print-avoid-break`},void 0,!1,{fileName:h,lineNumber:585,columnNumber:21},this),(0,f.jsxDEV)(`div`,{className:`invoice-billing-block print-avoid-break`,style:{marginBottom:`0.2rem`},children:(0,f.jsxDEV)(`span`,{className:`section-title-print`,children:`PRODUCTION & REVENUE DETAILS:`},void 0,!1,{fileName:h,lineNumber:588,columnNumber:23},this)},void 0,!1,{fileName:h,lineNumber:587,columnNumber:21},this),(0,f.jsxDEV)(`div`,{className:`invoice-table-section`,children:(0,f.jsxDEV)(`table`,{className:`table invoice-print-table`,children:[(0,f.jsxDEV)(`thead`,{children:(0,f.jsxDEV)(`tr`,{children:[(0,f.jsxDEV)(`th`,{style:{width:`35px`,textAlign:`center`},children:`No`},void 0,!1,{fileName:h,lineNumber:595,columnNumber:29},this),(0,f.jsxDEV)(`th`,{style:{textAlign:`left`},children:`No. Invoice`},void 0,!1,{fileName:h,lineNumber:596,columnNumber:29},this),(0,f.jsxDEV)(`th`,{style:{textAlign:`left`},children:`Client Name`},void 0,!1,{fileName:h,lineNumber:597,columnNumber:29},this),(0,f.jsxDEV)(`th`,{style:{width:`80px`,textAlign:`center`},children:`Status`},void 0,!1,{fileName:h,lineNumber:598,columnNumber:29},this),(0,f.jsxDEV)(`th`,{style:{width:`100px`,textAlign:`center`},children:[`Total Invoice`,(0,f.jsxDEV)(`br`,{},void 0,!1,{fileName:h,lineNumber:599,columnNumber:94},this),`(RM)`]},void 0,!0,{fileName:h,lineNumber:599,columnNumber:29},this),(0,f.jsxDEV)(`th`,{style:{width:`100px`,textAlign:`center`},children:[`Production Cost`,(0,f.jsxDEV)(`br`,{},void 0,!1,{fileName:h,lineNumber:600,columnNumber:96},this),`(RM)`]},void 0,!0,{fileName:h,lineNumber:600,columnNumber:29},this),(0,f.jsxDEV)(`th`,{style:{width:`100px`,textAlign:`center`},children:[`Profit`,(0,f.jsxDEV)(`br`,{},void 0,!1,{fileName:h,lineNumber:601,columnNumber:87},this),`(RM)`]},void 0,!0,{fileName:h,lineNumber:601,columnNumber:29},this)]},void 0,!0,{fileName:h,lineNumber:594,columnNumber:27},this)},void 0,!1,{fileName:h,lineNumber:593,columnNumber:25},this),(0,f.jsxDEV)(`tbody`,{children:H.length===0?(0,f.jsxDEV)(`tr`,{children:(0,f.jsxDEV)(`td`,{colSpan:`7`,style:{textAlign:`center`,padding:`0.75rem`},children:`No production records for this month.`},void 0,!1,{fileName:h,lineNumber:607,columnNumber:31},this)},void 0,!1,{fileName:h,lineNumber:606,columnNumber:29},this):H.map((e,t)=>{let n=parseFloat(e.grand_total||0),r=parseFloat(e.pengeluaran||0),i=(e.status===`Paid`?n:parseFloat(e.deposit||0))-r;return(0,f.jsxDEV)(`tr`,{className:`print-avoid-break`,children:[(0,f.jsxDEV)(`td`,{style:{textAlign:`center`,verticalAlign:`middle`,padding:`0.35rem 0.25rem`},children:[t+1,`.`]},void 0,!0,{fileName:h,lineNumber:618,columnNumber:35},this),(0,f.jsxDEV)(`td`,{style:{textAlign:`left`,verticalAlign:`middle`,padding:`0.35rem 0.25rem`},className:`font-bold`,children:e.invoice_no},void 0,!1,{fileName:h,lineNumber:619,columnNumber:35},this),(0,f.jsxDEV)(`td`,{style:{textAlign:`left`,verticalAlign:`middle`,padding:`0.35rem 0.25rem`},children:e.client_name},void 0,!1,{fileName:h,lineNumber:620,columnNumber:35},this),(0,f.jsxDEV)(`td`,{style:{textAlign:`center`,verticalAlign:`middle`,padding:`0.35rem 0.25rem`},children:(0,f.jsxDEV)(`span`,{className:`badge ${U(e.status)}`,style:{padding:`0.1rem 0.4rem`,fontSize:`0.68rem`},children:W(e.status)},void 0,!1,{fileName:h,lineNumber:622,columnNumber:37},this)},void 0,!1,{fileName:h,lineNumber:621,columnNumber:35},this),(0,f.jsxDEV)(`td`,{style:{textAlign:`center`,verticalAlign:`middle`,padding:`0.35rem 0.25rem`},children:n.toFixed(2)},void 0,!1,{fileName:h,lineNumber:626,columnNumber:35},this),(0,f.jsxDEV)(`td`,{style:{textAlign:`center`,verticalAlign:`middle`,padding:`0.35rem 0.25rem`,color:`var(--primary-red)`},children:r.toFixed(2)},void 0,!1,{fileName:h,lineNumber:627,columnNumber:35},this),(0,f.jsxDEV)(`td`,{style:{textAlign:`center`,verticalAlign:`middle`,padding:`0.35rem 0.25rem`,color:`#15803D`},className:`font-bold`,children:i.toFixed(2)},void 0,!1,{fileName:h,lineNumber:628,columnNumber:35},this)]},e.id,!0,{fileName:h,lineNumber:617,columnNumber:33},this)})},void 0,!1,{fileName:h,lineNumber:604,columnNumber:25},this)]},void 0,!0,{fileName:h,lineNumber:592,columnNumber:23},this)},void 0,!1,{fileName:h,lineNumber:591,columnNumber:21},this),(0,f.jsxDEV)(`hr`,{className:`divider-line print-avoid-break`,style:{margin:`0.4rem 0`}},void 0,!1,{fileName:h,lineNumber:637,columnNumber:21},this),(0,f.jsxDEV)(`div`,{className:`invoice-calculations-section print-avoid-break`,style:{justifyContent:`space-between`,display:`flex`,alignItems:`flex-start`,margin:`0.2rem 0`},children:[(0,f.jsxDEV)(`div`,{style:{flex:1,paddingRight:`2rem`},children:[(0,f.jsxDEV)(`span`,{className:`section-title-print`,style:{marginBottom:`0.3rem`,display:`block`},children:`TOTAL SALES VALUE`},void 0,!1,{fileName:h,lineNumber:641,columnNumber:25},this),(0,f.jsxDEV)(`div`,{className:`summary-print-row`,style:{justifyContent:`space-between`,fontSize:`0.72rem`,color:`#111`},children:[(0,f.jsxDEV)(`span`,{children:`Total Invoice Value:`},void 0,!1,{fileName:h,lineNumber:643,columnNumber:27},this),(0,f.jsxDEV)(`span`,{className:`font-bold`,children:[`RM `,te.toFixed(2)]},void 0,!0,{fileName:h,lineNumber:644,columnNumber:27},this)]},void 0,!0,{fileName:h,lineNumber:642,columnNumber:25},this)]},void 0,!0,{fileName:h,lineNumber:640,columnNumber:23},this),(0,f.jsxDEV)(`div`,{className:`calculation-invoice-summary`,style:{width:`340px`},children:[(0,f.jsxDEV)(`span`,{className:`section-title-print`,style:{marginBottom:`0.3rem`,display:`block`,textAlign:`left`},children:`CASHFLOW & PROFIT`},void 0,!1,{fileName:h,lineNumber:649,columnNumber:25},this),(0,f.jsxDEV)(`div`,{className:`summary-print-row`,style:{fontSize:`0.72rem`,display:`flex`,justifyContent:`space-between`,alignItems:`center`},children:[(0,f.jsxDEV)(`span`,{children:`Cash Received (Paid + Deposit):`},void 0,!1,{fileName:h,lineNumber:651,columnNumber:27},this),(0,f.jsxDEV)(`span`,{className:`font-bold`,style:{color:`#111`},children:[`RM `,Z.toFixed(2)]},void 0,!0,{fileName:h,lineNumber:652,columnNumber:27},this)]},void 0,!0,{fileName:h,lineNumber:650,columnNumber:25},this),(0,f.jsxDEV)(`div`,{className:`summary-print-row`,style:{fontSize:`0.72rem`,color:`var(--primary-red)`,display:`flex`,justifyContent:`space-between`,alignItems:`center`,marginTop:`0.2rem`},children:[(0,f.jsxDEV)(`span`,{children:`Production Cost:`},void 0,!1,{fileName:h,lineNumber:655,columnNumber:27},this),(0,f.jsxDEV)(`span`,{className:`font-bold`,children:[`- RM `,Q.toFixed(2)]},void 0,!0,{fileName:h,lineNumber:656,columnNumber:27},this)]},void 0,!0,{fileName:h,lineNumber:654,columnNumber:25},this),(0,f.jsxDEV)(`div`,{className:`summary-print-row grand-total-row-print`,style:{borderTop:`1px solid #111`,marginTop:`0.35rem`,paddingTop:`0.35rem`,display:`flex`,justifyContent:`space-between`,alignItems:`center`},children:[(0,f.jsxDEV)(`span`,{style:{fontSize:`0.75rem`,fontWeight:800},children:`NET PROFIT:`},void 0,!1,{fileName:h,lineNumber:659,columnNumber:27},this),(0,f.jsxDEV)(`span`,{style:{color:`#15803D`,fontSize:`0.82rem`,fontWeight:800},children:[`RM `,ne.toFixed(2)]},void 0,!0,{fileName:h,lineNumber:660,columnNumber:27},this)]},void 0,!0,{fileName:h,lineNumber:658,columnNumber:25},this)]},void 0,!0,{fileName:h,lineNumber:648,columnNumber:23},this)]},void 0,!0,{fileName:h,lineNumber:639,columnNumber:21},this),(0,f.jsxDEV)(`hr`,{className:`divider-line print-avoid-break`,style:{margin:`0.4rem 0`}},void 0,!1,{fileName:h,lineNumber:665,columnNumber:21},this),(0,f.jsxDEV)(`div`,{className:`invoice-bottom-grid print-avoid-break`,style:{marginBottom:0},children:(0,f.jsxDEV)(`div`,{className:`bottom-grid-left`,style:{width:`100%`},children:(0,f.jsxDEV)(`div`,{className:`terms-container`,children:[(0,f.jsxDEV)(`span`,{className:`section-title-print`,children:`NOTES:`},void 0,!1,{fileName:h,lineNumber:670,columnNumber:27},this),(0,f.jsxDEV)(`p`,{style:{fontSize:`0.72rem`,color:`#555`,marginTop:`0.1rem`},children:`This payment voucher is automatically generated for internal production and financial records.`},void 0,!1,{fileName:h,lineNumber:671,columnNumber:27},this)]},void 0,!0,{fileName:h,lineNumber:669,columnNumber:25},this)},void 0,!1,{fileName:h,lineNumber:668,columnNumber:23},this)},void 0,!1,{fileName:h,lineNumber:667,columnNumber:21},this),(0,f.jsxDEV)(`div`,{className:`thank-you-footer print-avoid-break`,style:{marginTop:`auto`,paddingTop:`0.3rem`},children:[(0,f.jsxDEV)(`p`,{style:{margin:0},children:`THIRTYONE LAB DESIGN - INTERNAL FINANCIAL STATEMENT`},void 0,!1,{fileName:h,lineNumber:679,columnNumber:23},this),(0,f.jsxDEV)(`p`,{style:{textTransform:`none`,fontWeight:`500`,fontStyle:`italic`,letterSpacing:`0.5px`,marginTop:`0.1rem`,color:`#777`,fontSize:`0.6rem`,margin:0},children:`Wear With Pride.`},void 0,!1,{fileName:h,lineNumber:680,columnNumber:23},this)]},void 0,!0,{fileName:h,lineNumber:678,columnNumber:21},this)]},void 0,!0,{fileName:h,lineNumber:538,columnNumber:19},this)},void 0,!1,{fileName:h,lineNumber:526,columnNumber:17},this)},void 0,!1,{fileName:h,lineNumber:514,columnNumber:15},this)},void 0,!1,{fileName:h,lineNumber:513,columnNumber:13},this)]},void 0,!0,{fileName:h,lineNumber:490,columnNumber:11},this)},void 0,!1,{fileName:h,lineNumber:489,columnNumber:9},this),A&&O&&(0,f.jsxDEV)(m,{isOpen:A,onClose:()=>{j(!1),k(null)},invoice:O,settings:g},void 0,!1,{fileName:h,lineNumber:692,columnNumber:9},this),(0,f.jsxDEV)(`style`,{children:`
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
          display: flex;
          gap: 1.25rem;
          align-items: flex-end;
        }

        .search-box {
          position: relative;
          display: flex;
          align-items: center;
          flex: 1;
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
          display: flex;
          gap: 1rem;
          align-items: flex-end;
          flex-shrink: 0;
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
            grid-template-columns: 1fr !important;
          }

          .search-filters-bar {
            flex-direction: column;
            align-items: stretch;
            gap: 1rem;
            padding: 1.25rem !important;
          }

          .search-box {
            width: 100%;
          }

          .filter-group-row {
            display: flex;
            flex-direction: column;
            width: 100%;
            gap: 0.75rem;
            align-items: stretch;
          }

          .filter-box {
            width: 100%;
          }

          .print-stmt-btn {
            width: 100%;
            justify-content: center;
            height: 42px;
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
      `},void 0,!1,{fileName:h,lineNumber:703,columnNumber:7},this)]},void 0,!0,{fileName:h,lineNumber:207,columnNumber:5},this)}export{g as default};