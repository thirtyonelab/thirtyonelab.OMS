import{t as e}from"./building-2-BeJCmLLy.js";import{t}from"./circle-check-hEW59jz2.js";import{t as n}from"./clock-yRrLsVXK.js";import{t as r}from"./pencil-DpNgZCId.js";import{t as i}from"./search-Ad5oQDmS.js";import{C as a,F as o,M as s,O as c,P as l,c as u,h as d,n as f,t as p,u as m,v as h,w as g}from"./index-CwIBf2b2.js";var _=s(`inbox`,[[`polyline`,{points:`22 12 16 12 14 15 10 15 8 12 2 12`,key:`o97t9d`}],[`path`,{d:`M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z`,key:`oot6mr`}]]),v=s(`wrench`,[[`path`,{d:`M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z`,key:`1ngwbx`}]]),y=o(l(),1),b=f();function x({isOpen:e,onClose:t,invoice:n,settings:r}){let{tr:i}=p(),[a,o]=(0,y.useState)(`Kilang Cetak Baju / Tukang Jahit`),[s,c]=(0,y.useState)(1),[l,u]=(0,y.useState)(1),d=(0,y.useRef)(0);(0,y.useEffect)(()=>{let e=()=>{if(window.innerWidth<=768){let e=window.innerWidth-32,t=Math.min(1,e/794);c(t)}else c(1)};return e(),window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[]);let f=()=>{let e=Date.now();e-d.current<300&&u(e=>e>1?1:1.8),d.current=e};if(!e||!n)return null;let m=e=>parseFloat(e||0).toLocaleString(`en-US`,{minimumFractionDigits:2,maximumFractionDigits:2}),_=e=>!e.items||!Array.isArray(e.items)?``:e.items.map((e,t)=>{let n=0;return e.item_type===`banner`?n=parseInt(e.qty||0,10):e.sizes&&(n=Object.values(e.sizes).reduce((e,t)=>e+parseInt(t?.short||0,10)+parseInt(t?.long||0,10)+parseInt(t?.pants||0,10),0)),(0,b.jsxs)(`div`,{style:{padding:`1px 0`},children:[`• `,e.design_name||e.item_type,` (`,n,`)`]},e.id||t)}),v=r?.company_name||`THIRTYONE LAB`,x=r?.company_address||`No 12, Jalan Niaga 1, 43000 Kajang, Selangor`,S=r?.company_phone||`012-3456789`,C=new Date().toLocaleDateString(`en-GB`),w=`PV-${new Date().toISOString().split(`T`)[0]}-K-${n.invoice_no}`,T=s*l;return(0,b.jsxs)(`div`,{className:`modal-overlay print-modal-overlay`,onClick:t,children:[(0,b.jsxs)(`div`,{className:`modal-content A4-modal-container`,onClick:e=>e.stopPropagation(),style:{maxWidth:`800px`},children:[(0,b.jsxs)(`div`,{className:`modal-header print-controls no-print`,style:{padding:`0.75rem 1.25rem`,borderBottom:`1px solid var(--border-color)`,display:`flex`,alignItems:`center`,width:`100%`,boxSizing:`border-box`},children:[(0,b.jsxs)(`div`,{style:{display:`flex`,gap:`0.75rem`,alignItems:`center`,flex:1,minWidth:0},children:[(0,b.jsx)(`h3`,{style:{fontSize:`0.75rem`,fontWeight:800,margin:0,letterSpacing:`0.5px`},children:`BAUCAR KILANG`}),(0,b.jsxs)(`button`,{onClick:()=>window.print(),className:`btn btn-primary btn-sm`,style:{display:`flex`,alignItems:`center`,gap:`0.35rem`,padding:`0.4rem 0.8rem`},children:[(0,b.jsx)(g,{size:13}),` `,i(`print`)]})]}),(0,b.jsx)(`button`,{className:`modal-close`,onClick:t,style:{background:`none`,border:`none`,cursor:`pointer`,color:`var(--text-dark)`,display:`flex`,alignItems:`center`,padding:0},children:(0,b.jsx)(h,{size:20})})]}),(0,b.jsxs)(`div`,{className:`A4-scroll-wrapper`,style:{overflow:`auto`,flex:1,padding:`0.25rem 0 1rem 0`,display:`flex`,flexDirection:`column`,alignItems:`center`,backgroundColor:`#ffffff`},children:[(0,b.jsx)(`div`,{className:`card no-print`,style:{width:`100%`,maxWidth:`210mm`,marginBottom:`1rem`,padding:`1rem`},children:(0,b.jsxs)(`div`,{className:`form-group`,style:{margin:0},children:[(0,b.jsx)(`label`,{className:`form-label`,style:{fontWeight:`bold`},children:`Pay To`}),(0,b.jsx)(`input`,{type:`text`,value:a,onChange:e=>o(e.target.value),className:`form-control`,placeholder:`Contoh: Nama Kilang / Tukang Jahit`})]})}),(0,b.jsx)(`div`,{className:`A4-scale-container`,onTouchEnd:f,onDoubleClick:()=>u(e=>e>1?1:1.8),style:{width:`${794*T}px`,height:`${1122*T}px`,overflow:`visible`,flexShrink:0,cursor:l>1?`zoom-out`:`zoom-in`},children:(0,b.jsxs)(`div`,{className:`A4-sheet`,style:{width:`210mm`,minHeight:`297mm`,padding:`15mm 12mm`,boxSizing:`border-box`,background:`#fff`,border:`none`,overflow:`visible`,margin:`0`,display:`flex`,flexDirection:`column`,justifyContent:`space-between`,transform:`scale(${T})`,transformOrigin:`top left`},children:[(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`div`,{className:`invoice-header`,style:{display:`flex`,justifyContent:`flex-start`,alignItems:`center`},children:(0,b.jsxs)(`div`,{className:`company-info-block`,style:{display:`flex`,gap:`1rem`,alignItems:`center`},children:[r?.company_logo?(0,b.jsx)(`img`,{src:r.company_logo,alt:`Company Logo`,className:`invoice-print-logo`,style:{maxHeight:`50px`}}):(0,b.jsx)(`img`,{src:`/thirtyonelab.OMS/Logo%20Header.webp`,alt:`Company Logo`,className:`invoice-print-logo`,style:{maxHeight:`50px`}}),(0,b.jsxs)(`div`,{className:`company-text`,children:[(0,b.jsx)(`h1`,{className:`company-print-name`,style:{fontSize:`1.25rem`,fontWeight:800,margin:0},children:v.toUpperCase().includes(`LAB`)?(0,b.jsxs)(b.Fragment,{children:[v.toUpperCase().split(`LAB`)[0],(0,b.jsx)(`span`,{style:{color:`var(--primary-red)`},children:`LAB`}),(0,b.jsx)(`sup`,{style:{color:`var(--primary-red)`,fontSize:`0.5em`,fontWeight:`700`},children:`®`}),v.toUpperCase().split(`LAB`)[1]]}):v}),(0,b.jsx)(`p`,{className:`company-print-details address`,style:{margin:`0.2rem 0 0 0`,fontSize:`0.75rem`,color:`#555`},children:x}),(0,b.jsxs)(`p`,{className:`company-print-details`,style:{margin:0,fontSize:`0.75rem`,color:`#555`},children:[`Tel: `,S]})]})]})}),(0,b.jsxs)(`div`,{style:{marginTop:`1.5rem`,display:`flex`,flexDirection:`column`,alignItems:`flex-start`,gap:`0.3rem`},children:[(0,b.jsx)(`h2`,{style:{fontSize:`1.2rem`,fontWeight:800,margin:0},children:`PAYMENT VOUCHER (KILANG)`}),(0,b.jsxs)(`div`,{style:{fontSize:`0.75rem`,textAlign:`left`},children:[(0,b.jsxs)(`div`,{style:{marginBottom:`0.1rem`},children:[(0,b.jsx)(`span`,{style:{color:`#555`},children:`Voucher No: `}),(0,b.jsx)(`span`,{style:{fontWeight:`bold`},children:w})]}),(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`span`,{style:{color:`#555`},children:`Date: `}),(0,b.jsx)(`span`,{children:C})]})]})]}),(0,b.jsx)(`hr`,{style:{border:`none`,borderTop:`2px solid #111`,margin:`1rem 0`}}),(0,b.jsxs)(`div`,{style:{fontSize:`0.85rem`,marginBottom:`1.5rem`,borderBottom:`1px solid #111`,paddingBottom:`0.5rem`,display:`flex`,justifyContent:`space-between`,alignItems:`center`},children:[(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`strong`,{children:`PAY TO:`}),` `,(0,b.jsx)(`span`,{style:{marginLeft:`0.5rem`,fontSize:`0.9rem`},children:a})]}),(0,b.jsxs)(`div`,{style:{fontSize:`0.8rem`,fontWeight:650,color:`#333`},children:[(0,b.jsx)(`strong`,{children:`BAYAR DARI:`}),` `,(0,b.jsx)(`span`,{style:{marginLeft:`0.4rem`,color:`var(--primary-red)`},children:n.factory_payment_bank||`Bank Islam`})]})]}),(0,b.jsx)(`h3`,{style:{fontSize:`0.8rem`,fontWeight:`bold`,margin:`0.5rem 0`},children:`PAYMENT DETAILS (FACTORY COST):`}),(0,b.jsxs)(`table`,{style:{width:`100%`,borderCollapse:`collapse`,marginTop:`0.5rem`},children:[(0,b.jsx)(`thead`,{children:(0,b.jsxs)(`tr`,{style:{borderTop:`1px solid #111`,borderBottom:`1px solid #111`,backgroundColor:`#f8fafc`,fontSize:`0.75rem`,fontWeight:`bold`},children:[(0,b.jsx)(`th`,{style:{width:`40px`,padding:`0.5rem`,textAlign:`center`,borderRight:`1px solid #ddd`},children:`NO`}),(0,b.jsx)(`th`,{style:{padding:`0.5rem`,textAlign:`left`,borderRight:`1px solid #ddd`},children:`ORDER REFERENCE`}),(0,b.jsx)(`th`,{style:{padding:`0.5rem`,textAlign:`left`,borderRight:`1px solid #ddd`},children:`DESCRIPTION`}),(0,b.jsx)(`th`,{style:{width:`120px`,padding:`0.5rem`,textAlign:`right`},children:`AMOUNT`})]})}),(0,b.jsxs)(`tbody`,{children:[(0,b.jsxs)(`tr`,{style:{borderBottom:`1px solid #111`,fontSize:`0.8rem`},children:[(0,b.jsx)(`td`,{style:{padding:`0.5rem`,textAlign:`center`,borderRight:`1px solid #ddd`,verticalAlign:`top`},children:`1`}),(0,b.jsxs)(`td`,{style:{padding:`0.5rem`,borderRight:`1px solid #ddd`,verticalAlign:`top`},children:[(0,b.jsxs)(`div`,{style:{fontWeight:`bold`},children:[`Invoice: #`,n.invoice_no]}),(0,b.jsxs)(`div`,{style:{fontSize:`0.75rem`,color:`#555`,marginTop:`0.2rem`},children:[`Client: `,n.client_name]})]}),(0,b.jsxs)(`td`,{style:{padding:`0.5rem`,borderRight:`1px solid #ddd`,verticalAlign:`top`},children:[(0,b.jsx)(`div`,{children:`Factory Cost / Production`}),(0,b.jsxs)(`div`,{style:{fontSize:`0.75rem`,color:`var(--text-muted)`,marginTop:`0.25rem`},children:[`Items: `,_(n)]})]}),(0,b.jsxs)(`td`,{style:{padding:`0.5rem`,textAlign:`right`,fontWeight:`bold`,verticalAlign:`top`},children:[`RM `,m(n.pengeluaran)]})]}),(0,b.jsxs)(`tr`,{style:{fontSize:`0.85rem`,fontWeight:`bold`},children:[(0,b.jsx)(`td`,{colSpan:`3`,style:{padding:`0.75rem 0.5rem`,textAlign:`right`},children:`TOTAL AMOUNT:`}),(0,b.jsxs)(`td`,{style:{padding:`0.75rem 0.5rem`,textAlign:`right`,fontSize:`0.95rem`},children:[`RM `,m(n.pengeluaran)]})]})]})]})]}),(0,b.jsxs)(`div`,{style:{marginTop:`auto`,paddingTop:`1.5rem`,borderTop:`1px solid #e6e2dc`},children:[(0,b.jsxs)(`div`,{style:{fontSize:`0.7rem`,color:`#555`,marginBottom:`1rem`},children:[(0,b.jsx)(`strong`,{children:`NOTES:`}),(0,b.jsx)(`p`,{style:{margin:`0.1rem 0 0 0`,lineHeight:`1.3`},children:`Official voucher for factory production operating expenses and company financial records.`})]}),(0,b.jsxs)(`div`,{style:{textAlign:`center`,fontSize:`0.68rem`,fontWeight:700,color:`#555`,letterSpacing:`1px`,textTransform:`uppercase`,fontFamily:`var(--font-primary)`},children:[(0,b.jsx)(`p`,{style:{margin:0},children:`THIRTYONE LAB DESIGN - INTERNAL FINANCIAL STATEMENT`}),(0,b.jsx)(`p`,{style:{margin:`0.1rem 0 0 0`,fontStyle:`italic`,textTransform:`none`,fontWeight:500,fontSize:`0.6rem`,color:`#777`,letterSpacing:`0.5px`},children:`Wear With Pride.`})]})]})]})})]})]}),(0,b.jsx)(`style`,{children:`
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
      `})]})}function S(){let{tr:o,language:s}=p(),[l,f]=(0,y.useState)([]),[S,C]=(0,y.useState)(null),[w,T]=(0,y.useState)(``),[E,ee]=(0,y.useState)(`All`),[D,O]=(0,y.useState)(`All`),[te,k]=(0,y.useState)(!1),[A,j]=(0,y.useState)({}),[ne,M]=(0,y.useState)(!1),[N,P]=(0,y.useState)(null),[F,I]=(0,y.useState)(!1),[re,L]=(0,y.useState)(1),[R,z]=(0,y.useState)(1),B=(0,y.useRef)(0),V=[{value:`0`,label:s===`EN`?`January`:`Januari`},{value:`1`,label:s===`EN`?`February`:`Februari`},{value:`2`,label:s===`EN`?`March`:`Mac`},{value:`3`,label:`April`},{value:`4`,label:s===`EN`?`May`:`Mei`},{value:`5`,label:s===`EN`?`June`:`Jun`},{value:`6`,label:s===`EN`?`July`:`Julai`},{value:`7`,label:s===`EN`?`August`:`Ogos`},{value:`8`,label:`September`},{value:`9`,label:s===`EN`?`October`:`Oktober`},{value:`10`,label:`November`},{value:`11`,label:s===`EN`?`December`:`Disember`}];(0,y.useEffect)(()=>{H()},[]),(0,y.useEffect)(()=>{let e=()=>{if(window.innerWidth<=768){let e=window.innerWidth-32,t=Math.min(1,e/794);L(t)}else L(1)};return e(),window.addEventListener(`resize`,e),()=>window.removeEventListener(`resize`,e)},[]);let H=async()=>{k(!0);try{let[e,t]=await Promise.all([u(),m()]),n=[...e].sort((e,t)=>(t.invoice_no||``).localeCompare(e.invoice_no||``));f(n),C(t)}catch(e){console.error(e)}finally{k(!1)}},ie=()=>{let e=Date.now();e-B.current<300&&z(e=>e>1?1:1.8),B.current=e},U=(e,t,n)=>{j(r=>({...r,[e]:{...r[e],[t]:n}}))},ae=async e=>{let t=A[e.id]?.pengeluaran,n=t===void 0?e.pengeluaran||0:parseFloat(t)||0,r=A[e.id]?.order_status===void 0?e.order_status||`BELUM_DRAFT`:A[e.id].order_status,i=A[e.id]?.due_date===void 0?e.due_date||``:A[e.id].due_date,a=A[e.id]?.factory_payment_bank===void 0?e.factory_payment_bank||`Bank Islam`:A[e.id].factory_payment_bank;k(!0);try{await d(e.id,r,n,i,a)?(alert(`Kemaskini berjaya disimpan!`),j(t=>{let n={...t};return delete n[e.id],n}),H()):alert(`Gagal menyimpan kemaskini.`)}catch(e){console.error(e),alert(`Ralat semasa menyimpan kemaskini.`)}finally{k(!1)}},W=l.filter(e=>{let t=e.client_name.toLowerCase().includes(w.toLowerCase())||e.invoice_no.toLowerCase().includes(w.toLowerCase()),n=!0;return E!==`All`&&(n=new Date(e.date).getMonth()===parseInt(E,10)),t&&n}),G=W.filter(e=>D===`All`||(e.order_status||`BELUM_DRAFT`)===D),K=e=>{switch(e){case`Paid`:return`badge-paid`;case`Deposit`:return`badge-deposit`;case`Unpaid`:return`badge-unpaid`;case`Void`:return`badge-void`;default:return``}},q=e=>{switch(e){case`Paid`:return`Paid`;case`Deposit`:return`Deposit`;case`Unpaid`:return`Unpaid`;case`Void`:return`Void`;default:return e}},oe=e=>!e.items||!Array.isArray(e.items)?`-`:e.items.map((e,t)=>{let n=0;e.item_type===`banner`?n=parseInt(e.qty||0,10):e.sizes&&(n=Object.values(e.sizes).reduce((e,t)=>e+parseInt(t?.short||0,10)+parseInt(t?.long||0,10)+parseInt(t?.pants||0,10),0));let r=e.item_type===`banner`?`unit`:`pcs`;return(0,b.jsxs)(`div`,{style:{padding:`2px 0`},children:[`• `,e.design_name||(e.item_type?e.item_type.charAt(0).toUpperCase()+e.item_type.slice(1):`Item`),` (`,n,` `,r,`)`]},e.id||t)}),J=W.filter(e=>e.status!==`Void`),se=J.filter(e=>(e.order_status||`BELUM_DRAFT`)===`BELUM_DRAFT`).length,ce=J.filter(e=>e.order_status===`DRAFT`).length,le=J.filter(e=>e.order_status===`PENDING`).length,ue=J.filter(e=>e.order_status===`PROCESSING`).length,Y=J.filter(e=>e.order_status===`COMPLETED`).length,X=J.filter(e=>e.order_status===`MAINTENANCE`).length,de=J.reduce((e,t)=>e+parseFloat(t.grand_total||0),0),Z=J.reduce((e,t)=>t.status===`Paid`?e+parseFloat(t.grand_total||0):t.status===`Deposit`?e+parseFloat(t.deposit||0):e,0),Q=J.reduce((e,t)=>{let n=A[t.id]?.pengeluaran;return e+(n===void 0?parseFloat(t.pengeluaran||0):parseFloat(n)||0)},0),fe=Z-Q,pe=E===`All`?o(`allMonths`)||`Semua Bulan`:V.find(e=>e.value===E)?.label||``,$=re*R;return(0,b.jsxs)(`div`,{className:`main-content`,style:{padding:`1rem`,maxWidth:`1400px`,margin:`0 auto`},children:[(0,b.jsxs)(`div`,{className:`desktop-only`,style:{display:`flex`,justifyContent:`space-between`,alignItems:`flex-start`,marginBottom:`1rem`,flexWrap:`wrap`,gap:`0.5rem`},children:[(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`span`,{style:{fontSize:`11px`,fontWeight:800,color:`var(--primary-red, #c51b27)`,letterSpacing:`1px`,textTransform:`uppercase`},children:o(`mfgTag`)}),(0,b.jsx)(`h1`,{style:{fontSize:`1.5rem`,fontWeight:900,margin:`2px 0 0 0`,color:`#18181b`,letterSpacing:`-0.5px`},children:o(`mfgTitle`)})]}),(0,b.jsxs)(`button`,{onClick:()=>M(!0),className:`btn btn-secondary btn-sm`,style:{display:`flex`,alignItems:`center`,gap:`6px`,borderRadius:`8px`,fontSize:`0.8rem`,fontWeight:700,padding:`0.5rem 0.9rem`},title:`Cetak Monthly Statement`,children:[(0,b.jsx)(g,{size:14}),` Penyata Bulanan Kilang`]})]}),(0,b.jsx)(`div`,{style:{display:`flex`,gap:`8px`,overflowX:`auto`,paddingBottom:`6px`,marginBottom:`14px`,scrollbarWidth:`none`,WebkitOverflowScrolling:`touch`,flexShrink:0,alignItems:`center`,minHeight:`42px`},children:[{key:`All`,label:`Semua`,count:J.length,Icon:c},{key:`BELUM_DRAFT`,label:o(`belumDraft`)||`Belum Draft`,count:se,Icon:n},{key:`DRAFT`,label:o(`draft`)||`Draft`,count:ce,Icon:r},{key:`PENDING`,label:o(`pending`)||`Pending`,count:le,Icon:_},{key:`PROCESSING`,label:o(`processing`)||`Sedang Diproses`,count:ue,Icon:e},{key:`COMPLETED`,label:o(`completed`)||`Siap`,count:Y,Icon:t},{key:`MAINTENANCE`,label:o(`maintenance`)||`Baik Pulih`,count:X,Icon:v,isAlert:X>0}].map(({key:e,label:t,count:n,Icon:r,isAlert:i})=>{let a=D===e;return(0,b.jsxs)(`button`,{onClick:()=>O(e),style:{display:`inline-flex`,alignItems:`center`,gap:`6px`,padding:`6px 14px`,height:`34px`,minHeight:`34px`,borderRadius:`8px`,fontSize:`12px`,fontWeight:650,cursor:`pointer`,border:a?`1px solid #18181b`:`1px solid var(--border-color)`,backgroundColor:a?`#18181b`:`#ffffff`,color:a?`#ffffff`:i?`var(--primary-red)`:`var(--text-dark)`,transition:`all 0.15s ease`,whiteSpace:`nowrap`,flexShrink:0,boxSizing:`border-box`},children:[(0,b.jsx)(r,{size:14,color:a?`#ffffff`:i?`var(--primary-red)`:`var(--text-muted)`}),(0,b.jsx)(`span`,{children:t}),(0,b.jsx)(`span`,{style:{fontSize:`10.5px`,padding:`1px 6px`,borderRadius:`6px`,backgroundColor:a?`rgba(255,255,255,0.2)`:`#f4f4f5`,color:a?`#ffffff`:i?`var(--primary-red)`:`#71717a`,fontWeight:700},children:n})]},e)})}),(0,b.jsxs)(`div`,{style:{display:`flex`,gap:`8px`,marginBottom:`1.25rem`,alignItems:`center`},children:[(0,b.jsxs)(`div`,{style:{flex:`1`,position:`relative`},children:[(0,b.jsx)(i,{size:15,style:{position:`absolute`,left:`10px`,top:`50%`,transform:`translateY(-50%)`,color:`#a1a1aa`}}),(0,b.jsx)(`input`,{type:`text`,placeholder:o(`searchPlaceholder`),value:w,onChange:e=>T(e.target.value),className:`form-control`,style:{width:`100%`,padding:`7px 10px 7px 32px`,borderRadius:`8px`,border:`1px solid #e4e4e7`,fontSize:`12.5px`,backgroundColor:`#ffffff`}})]}),(0,b.jsxs)(`select`,{value:E,onChange:e=>ee(e.target.value),className:`form-control`,style:{width:`auto`,padding:`7px 10px`,borderRadius:`8px`,border:`1px solid #e4e4e7`,fontSize:`12.5px`,fontWeight:650,backgroundColor:`#ffffff`,cursor:`pointer`,flexShrink:0},children:[(0,b.jsx)(`option`,{value:`All`,children:o(`allMonths`)}),V.map(e=>(0,b.jsx)(`option`,{value:e.value,children:e.label},e.value))]})]}),(0,b.jsxs)(`div`,{children:[(0,b.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,marginBottom:`0.85rem`},children:[(0,b.jsxs)(`span`,{style:{fontSize:`0.78rem`,fontWeight:800,color:`var(--text-muted)`,letterSpacing:`0.5px`,textTransform:`uppercase`},children:[`SENARAI PESANAN KILANG (`,G.length,`)`]}),D!==`All`&&(0,b.jsx)(`button`,{onClick:()=>O(`All`),style:{background:`none`,border:`none`,color:`#b91c1c`,fontSize:`0.78rem`,fontWeight:600,cursor:`pointer`},children:`Reset Tapisan`})]}),te&&l.length===0?(0,b.jsx)(`div`,{className:`loading-state`,style:{padding:`3rem`,textAlign:`center`,color:`var(--text-muted)`,backgroundColor:`#ffffff`,borderRadius:`12px`,border:`1px solid var(--border-color)`},children:o(`loadingData`)}):G.length===0?(0,b.jsx)(`div`,{className:`empty-state`,style:{padding:`3rem`,textAlign:`center`,color:`var(--text-muted)`,backgroundColor:`#ffffff`,borderRadius:`12px`,border:`1px solid var(--border-color)`},children:o(`noData`)}):(0,b.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fill, minmax(min(100%, 340px), 1fr))`,gap:`1rem`},children:G.map(t=>{let n=t.status===`Void`,r=A[t.id]?.pengeluaran===void 0?t.pengeluaran||``:A[t.id].pengeluaran,i=A[t.id]?.order_status===void 0?t.order_status||`BELUM_DRAFT`:A[t.id].order_status,o=A[t.id]?.due_date===void 0?t.due_date||``:A[t.id].due_date,s=A[t.id]?.factory_payment_bank===void 0?t.factory_payment_bank||`Bank Islam`:A[t.id].factory_payment_bank,c=i===`COMPLETED`?`#16a34a`:i===`PROCESSING`?`#2563eb`:i===`PENDING`?`#d97706`:i===`MAINTENANCE`?`#dc2626`:`#71717a`;return(0,b.jsxs)(`div`,{className:`card`,style:{padding:`1.25rem`,borderRadius:`12px`,border:`1px solid var(--border-color)`,backgroundColor:n?`#fafafa`:`#ffffff`,display:`flex`,flexDirection:`column`,gap:`0.85rem`,transition:`border-color 0.15s ease`},children:[(0,b.jsxs)(`div`,{style:{display:`flex`,justifyContent:`space-between`,alignItems:`flex-start`,gap:`10px`},children:[(0,b.jsxs)(`div`,{children:[(0,b.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`6px`},children:[(0,b.jsxs)(`span`,{style:{fontSize:`1.05rem`,fontWeight:900,color:`var(--text-dark)`},children:[`#`,t.invoice_no]}),n&&(0,b.jsx)(`span`,{style:{fontSize:`10px`,fontWeight:800,color:`#dc2626`,background:`#fee2e2`,padding:`1px 6px`,borderRadius:`4px`},children:`VOID`})]}),(0,b.jsx)(`div`,{style:{fontSize:`0.85rem`,fontWeight:650,color:`#52525b`,marginTop:`2px`},children:t.client_name})]}),(0,b.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`flex-end`,gap:`4px`},children:[(0,b.jsxs)(`span`,{style:{fontSize:`11px`,fontWeight:700,color:c,display:`flex`,alignItems:`center`,gap:`4px`,padding:`3px 8px`,background:`${c}15`,borderRadius:`6px`},children:[(0,b.jsx)(`span`,{style:{width:`6px`,height:`6px`,borderRadius:`50%`,background:c}}),i.replace(`_`,` `)]}),(0,b.jsxs)(`span`,{style:{fontSize:`10px`,fontWeight:650,color:`#52525b`,background:`#f4f4f5`,padding:`2px 6px`,borderRadius:`4px`,display:`inline-flex`,alignItems:`center`,gap:`4px`},children:[(0,b.jsx)(e,{size:11,color:`var(--primary-red)`}),s]})]})]}),(0,b.jsx)(`div`,{style:{fontSize:`0.82rem`,color:`#71717a`,lineHeight:1.4,borderTop:`1px dashed var(--border-color)`,paddingTop:`0.65rem`},children:oe(t)}),(0,b.jsxs)(`div`,{style:{display:`grid`,gridTemplateColumns:`1fr 1fr`,gap:`0.65rem`,background:`#f8f7f4`,padding:`0.75rem`,borderRadius:`8px`,border:`1px solid var(--border-color)`},children:[(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`label`,{style:{display:`block`,fontSize:`10.5px`,fontWeight:750,color:`var(--text-muted)`,textTransform:`uppercase`,marginBottom:`3px`},children:`Kos Kilang (RM)`}),(0,b.jsx)(`input`,{type:`number`,step:`0.01`,min:`0`,disabled:n,value:r,onChange:e=>U(t.id,`pengeluaran`,e.target.value),className:`form-control`,style:{width:`100%`,padding:`0.35rem 0.5rem`,fontSize:`0.85rem`,fontWeight:700,borderRadius:`6px`},placeholder:`0.00`})]}),(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`label`,{style:{display:`block`,fontSize:`10.5px`,fontWeight:750,color:`var(--text-muted)`,textTransform:`uppercase`,marginBottom:`3px`},children:`Status Kerja`}),(0,b.jsxs)(`select`,{value:i,onChange:e=>U(t.id,`order_status`,e.target.value),className:`form-control`,style:{width:`100%`,padding:`0.35rem 0.5rem`,fontSize:`0.82rem`,fontWeight:650,borderRadius:`6px`,cursor:`pointer`},children:[(0,b.jsx)(`option`,{value:`BELUM_DRAFT`,children:`Belum Draft`}),(0,b.jsx)(`option`,{value:`DRAFT`,children:`Draft`}),(0,b.jsx)(`option`,{value:`PENDING`,children:`Pending`}),(0,b.jsx)(`option`,{value:`PROCESSING`,children:`Processing`}),(0,b.jsx)(`option`,{value:`COMPLETED`,children:`Completed`}),(0,b.jsx)(`option`,{value:`MAINTENANCE`,children:`Maintenance`})]})]}),(0,b.jsxs)(`div`,{style:{gridColumn:`span 2`},children:[(0,b.jsx)(`label`,{style:{display:`block`,fontSize:`10.5px`,fontWeight:750,color:`var(--text-muted)`,textTransform:`uppercase`,marginBottom:`3px`},children:`Pilihan Bank (Bayar Kos Kilang)`}),(0,b.jsxs)(`select`,{value:s,onChange:e=>U(t.id,`factory_payment_bank`,e.target.value),className:`form-control`,disabled:n,style:{width:`100%`,padding:`0.35rem 0.5rem`,fontSize:`0.82rem`,fontWeight:650,borderRadius:`6px`,cursor:`pointer`},children:[(0,b.jsx)(`option`,{value:`CIMB Bank`,children:`CIMB Bank (Aiman Hambali - 7656497860)`}),(0,b.jsx)(`option`,{value:`Bank Islam`,children:`Bank Islam (Hidayatul Rizman - 05021020449003)`}),(0,b.jsx)(`option`,{value:`Tunai`,children:`Tunai / Cash`})]})]}),i===`PROCESSING`&&(0,b.jsxs)(`div`,{style:{gridColumn:`span 2`},children:[(0,b.jsx)(`label`,{style:{display:`block`,fontSize:`10.5px`,fontWeight:750,color:`var(--text-muted)`,textTransform:`uppercase`,marginBottom:`3px`},children:`Tarikh Siap Dijangka`}),(0,b.jsx)(`input`,{type:`date`,value:o,onChange:e=>U(t.id,`due_date`,e.target.value),className:`form-control`,style:{width:`100%`,padding:`0.35rem 0.5rem`,fontSize:`0.82rem`,borderRadius:`6px`,cursor:`pointer`}})]})]}),(0,b.jsxs)(`div`,{style:{display:`flex`,gap:`0.5rem`,marginTop:`auto`,paddingTop:`0.35rem`},children:[(0,b.jsxs)(`button`,{disabled:n,onClick:()=>ae(t),className:`btn btn-primary`,style:{flex:1,display:`flex`,justifyContent:`center`,alignItems:`center`,gap:`6px`,fontSize:`0.8rem`,fontWeight:700,padding:`0.45rem 0.75rem`,borderRadius:`8px`},children:[(0,b.jsx)(a,{size:14}),` Simpan`]}),(0,b.jsxs)(`button`,{onClick:()=>{P(t),I(!0)},className:`btn btn-secondary`,style:{display:`flex`,alignItems:`center`,gap:`6px`,fontSize:`0.8rem`,fontWeight:650,padding:`0.45rem 0.75rem`,borderRadius:`8px`},title:`Cetak Baucar Kilang`,children:[(0,b.jsx)(g,{size:14}),` Voucher`]})]})]},t.id)})})]}),ne&&S&&(0,b.jsx)(`div`,{className:`modal-overlay print-modal-overlay`,onClick:()=>M(!1),children:(0,b.jsxs)(`div`,{className:`modal-content A4-modal-container`,onClick:e=>e.stopPropagation(),children:[(0,b.jsx)(`div`,{className:`modal-header print-controls no-print`,children:(0,b.jsxs)(`div`,{className:`print-compact-bar`,style:{display:`flex`,justifyContent:`space-between`,alignItems:`center`,width:`100%`,padding:`0.75rem 1.25rem`},children:[(0,b.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`1rem`},children:[(0,b.jsx)(`span`,{style:{fontFamily:`var(--font-primary)`,fontSize:`0.75rem`,fontWeight:800,letterSpacing:`0.5px`,textTransform:`uppercase`,color:`var(--text-dark)`},children:`STATEMENT`}),(0,b.jsxs)(`button`,{onClick:()=>window.print(),className:`btn btn-primary btn-sm`,style:{display:`flex`,alignItems:`center`,gap:`0.35rem`,padding:`0.4rem 0.8rem`},children:[(0,b.jsx)(g,{size:13}),` PRINT`]})]}),(0,b.jsx)(`button`,{className:`modal-close`,onClick:()=>M(!1),style:{background:`none`,border:`none`,cursor:`pointer`,color:`var(--text-dark)`,display:`flex`,alignItems:`center`,padding:0},children:(0,b.jsx)(h,{size:20})})]})}),(0,b.jsx)(`div`,{className:`A4-scroll-wrapper`,style:{overflow:`auto`,flex:1,padding:`0.25rem 0 1rem 0`,display:`flex`,flexDirection:`column`,alignItems:`center`,backgroundColor:`#ffffff`},children:(0,b.jsx)(`div`,{className:`A4-scale-container`,onTouchEnd:ie,onDoubleClick:()=>z(e=>e>1?1:1.8),style:{width:`${794*$}px`,height:`${1122*$}px`,overflow:`visible`,flexShrink:0,cursor:R>1?`zoom-out`:`zoom-in`},children:(0,b.jsx)(`div`,{className:`modal-body A4-sheet`,style:{transform:`scale(${$})`,transformOrigin:`top left`,margin:0,flex:`none`,width:`210mm`,minHeight:`297mm`,overflow:`visible`},children:(0,b.jsxs)(`div`,{className:`invoice-container`,children:[(0,b.jsx)(`div`,{className:`invoice-header print-avoid-break`,children:(0,b.jsxs)(`div`,{className:`company-info-block`,children:[S.company_logo?(0,b.jsx)(`img`,{src:S.company_logo,alt:`Company Logo`,className:`invoice-print-logo`}):(0,b.jsx)(`img`,{src:`/thirtyonelab.OMS/Logo%20Header.webp`,alt:`Company Logo`,className:`invoice-print-logo`}),(0,b.jsxs)(`div`,{className:`company-text`,children:[(0,b.jsx)(`h1`,{className:`company-print-name`,children:S.company_name&&S.company_name.toUpperCase().includes(`LAB`)?(0,b.jsxs)(b.Fragment,{children:[S.company_name.toUpperCase().split(`LAB`)[0],(0,b.jsx)(`span`,{style:{color:`var(--primary-red)`},children:`LAB`}),(0,b.jsx)(`sup`,{style:{color:`var(--primary-red)`,fontSize:`0.5em`,fontWeight:`700`},children:`®`}),S.company_name.toUpperCase().split(`LAB`)[1]]}):S.company_name}),(0,b.jsx)(`p`,{className:`company-print-details address`,children:S.company_address}),(0,b.jsxs)(`p`,{className:`company-print-details`,children:[`Tel: `,S.company_phone]})]})]})}),(0,b.jsxs)(`div`,{className:`document-meta-block print-avoid-break`,children:[(0,b.jsx)(`h2`,{className:`document-type-title`,children:`PAYMENT VOUCHER`}),(0,b.jsxs)(`div`,{className:`meta-details-box`,children:[(0,b.jsxs)(`div`,{className:`meta-row`,children:[(0,b.jsx)(`span`,{className:`meta-lbl`,children:`Voucher No:`}),(0,b.jsxs)(`span`,{className:`meta-val font-bold`,children:[`\xA0PV-`,new Date().getFullYear(),`-`,(new Date().getMonth()+1).toString().padStart(2,`0`)]})]}),(0,b.jsxs)(`div`,{className:`meta-row`,children:[(0,b.jsx)(`span`,{className:`meta-lbl`,children:`Date:`}),(0,b.jsxs)(`span`,{className:`meta-val`,children:[`\xA0`,new Date().toLocaleDateString(`en-GB`)]})]}),(0,b.jsxs)(`div`,{className:`meta-row`,children:[(0,b.jsx)(`span`,{className:`meta-lbl`,children:`Month:`}),(0,b.jsxs)(`span`,{className:`meta-val font-bold`,children:[`\xA0`,pe.toUpperCase()]})]})]})]}),(0,b.jsx)(`hr`,{className:`divider-line print-avoid-break`}),(0,b.jsx)(`div`,{className:`invoice-billing-block print-avoid-break`,style:{marginBottom:`0.2rem`},children:(0,b.jsx)(`span`,{className:`section-title-print`,children:`PRODUCTION & REVENUE DETAILS:`})}),(0,b.jsx)(`div`,{className:`invoice-table-section`,children:(0,b.jsxs)(`table`,{className:`table invoice-print-table`,children:[(0,b.jsx)(`thead`,{children:(0,b.jsxs)(`tr`,{children:[(0,b.jsx)(`th`,{style:{width:`35px`,textAlign:`center`},children:`No`}),(0,b.jsx)(`th`,{style:{textAlign:`left`},children:`No. Invoice`}),(0,b.jsx)(`th`,{style:{textAlign:`left`},children:`Client Name`}),(0,b.jsx)(`th`,{style:{width:`80px`,textAlign:`center`},children:`Status`}),(0,b.jsxs)(`th`,{style:{width:`100px`,textAlign:`center`},children:[`Total Invoice`,(0,b.jsx)(`br`,{}),`(RM)`]}),(0,b.jsxs)(`th`,{style:{width:`100px`,textAlign:`center`},children:[`Production Cost`,(0,b.jsx)(`br`,{}),`(RM)`]}),(0,b.jsxs)(`th`,{style:{width:`100px`,textAlign:`center`},children:[`Profit`,(0,b.jsx)(`br`,{}),`(RM)`]})]})}),(0,b.jsx)(`tbody`,{children:W.length===0?(0,b.jsx)(`tr`,{children:(0,b.jsx)(`td`,{colSpan:`7`,style:{textAlign:`center`,padding:`0.75rem`},children:`No production records for this month.`})}):[...W].sort((e,t)=>(e.invoice_no||``).localeCompare(t.invoice_no||``)).map((e,t)=>{let n=e.status===`Void`,r=parseFloat(e.grand_total||0),i=parseFloat(e.pengeluaran||0),a=n?0:e.status===`Paid`?r:parseFloat(e.deposit||0),o=n?0:a-i;return(0,b.jsxs)(`tr`,{className:`print-avoid-break`,style:n?{opacity:.6}:{},children:[(0,b.jsxs)(`td`,{style:{textAlign:`center`,verticalAlign:`middle`,padding:`0.35rem 0.25rem`},children:[t+1,`.`]}),(0,b.jsx)(`td`,{style:{textAlign:`left`,verticalAlign:`middle`,padding:`0.35rem 0.25rem`},className:`font-bold`,children:e.invoice_no}),(0,b.jsx)(`td`,{style:{textAlign:`left`,verticalAlign:`middle`,padding:`0.35rem 0.25rem`},children:e.client_name}),(0,b.jsx)(`td`,{style:{textAlign:`center`,verticalAlign:`middle`,padding:`0.35rem 0.25rem`},children:(0,b.jsx)(`span`,{className:`badge ${K(e.status)}`,style:{padding:`0.1rem 0.4rem`,fontSize:`0.68rem`},children:q(e.status)})}),(0,b.jsx)(`td`,{style:{textAlign:`center`,verticalAlign:`middle`,padding:`0.35rem 0.25rem`},children:n?(0,b.jsx)(`span`,{style:{textDecoration:`line-through`,color:`#94a3b8`},children:r.toFixed(2)}):r.toFixed(2)}),(0,b.jsx)(`td`,{style:{textAlign:`center`,verticalAlign:`middle`,padding:`0.35rem 0.25rem`,color:n?`#94a3b8`:`var(--primary-red)`},children:n?`-`:i.toFixed(2)}),(0,b.jsx)(`td`,{style:{textAlign:`center`,verticalAlign:`middle`,padding:`0.35rem 0.25rem`,color:n?`#94a3b8`:`#15803D`},className:`font-bold`,children:n?`-`:o.toFixed(2)})]},e.id)})})]})}),(0,b.jsx)(`hr`,{className:`divider-line print-avoid-break`,style:{margin:`0.4rem 0`}}),(0,b.jsxs)(`div`,{className:`invoice-calculations-section print-avoid-break`,style:{justifyContent:`space-between`,display:`flex`,alignItems:`flex-start`,margin:`0.2rem 0`},children:[(0,b.jsxs)(`div`,{style:{flex:1,paddingRight:`2rem`},children:[(0,b.jsx)(`span`,{className:`section-title-print`,style:{marginBottom:`0.3rem`,display:`block`},children:`TOTAL SALES VALUE`}),(0,b.jsxs)(`div`,{className:`summary-print-row`,style:{justifyContent:`space-between`,fontSize:`0.72rem`,color:`#111`},children:[(0,b.jsx)(`span`,{children:`Total Invoice Value:`}),(0,b.jsxs)(`span`,{className:`font-bold`,children:[`RM `,de.toFixed(2)]})]})]}),(0,b.jsxs)(`div`,{className:`calculation-invoice-summary`,style:{width:`340px`},children:[(0,b.jsx)(`span`,{className:`section-title-print`,style:{marginBottom:`0.3rem`,display:`block`,textAlign:`left`},children:`CASHFLOW & PROFIT`}),(0,b.jsxs)(`div`,{className:`summary-print-row`,style:{fontSize:`0.72rem`,display:`flex`,justifyContent:`space-between`,alignItems:`center`},children:[(0,b.jsx)(`span`,{children:`Cash Received (Paid + Deposit):`}),(0,b.jsxs)(`span`,{className:`font-bold`,style:{color:`#111`},children:[`RM `,Z.toFixed(2)]})]}),(0,b.jsxs)(`div`,{className:`summary-print-row`,style:{fontSize:`0.72rem`,color:`var(--primary-red)`,display:`flex`,justifyContent:`space-between`,alignItems:`center`,marginTop:`0.2rem`},children:[(0,b.jsx)(`span`,{children:`Production Cost:`}),(0,b.jsxs)(`span`,{className:`font-bold`,children:[`- RM `,Q.toFixed(2)]})]}),(0,b.jsxs)(`div`,{className:`summary-print-row grand-total-row-print`,style:{borderTop:`1px solid #111`,marginTop:`0.35rem`,paddingTop:`0.35rem`,display:`flex`,justifyContent:`space-between`,alignItems:`center`},children:[(0,b.jsx)(`span`,{style:{fontSize:`0.75rem`,fontWeight:800},children:`NET PROFIT:`}),(0,b.jsxs)(`span`,{style:{color:`#15803D`,fontSize:`0.82rem`,fontWeight:800},children:[`RM `,fe.toFixed(2)]})]})]})]}),(0,b.jsx)(`hr`,{className:`divider-line print-avoid-break`,style:{margin:`0.4rem 0`}}),(0,b.jsx)(`div`,{className:`invoice-bottom-grid print-avoid-break`,style:{marginBottom:0},children:(0,b.jsx)(`div`,{className:`bottom-grid-left`,style:{width:`100%`},children:(0,b.jsxs)(`div`,{className:`terms-container`,children:[(0,b.jsx)(`span`,{className:`section-title-print`,children:`NOTES:`}),(0,b.jsx)(`p`,{style:{fontSize:`0.72rem`,color:`#555`,marginTop:`0.1rem`},children:`This payment voucher is automatically generated for internal production and financial records.`})]})})}),(0,b.jsxs)(`div`,{className:`thank-you-footer print-avoid-break`,style:{marginTop:`auto`,paddingTop:`0.3rem`},children:[(0,b.jsx)(`p`,{style:{margin:0},children:`THIRTYONE LAB DESIGN - INTERNAL FINANCIAL STATEMENT`}),(0,b.jsx)(`p`,{style:{textTransform:`none`,fontWeight:`500`,fontStyle:`italic`,letterSpacing:`0.5px`,marginTop:`0.1rem`,color:`#777`,fontSize:`0.6rem`,margin:0},children:`Wear With Pride.`})]})]})})})})]})}),F&&N&&(0,b.jsx)(x,{isOpen:F,onClose:()=>{I(!1),P(null)},invoice:N,settings:S}),(0,b.jsx)(`style`,{children:`
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
      `})]})}export{S as default};