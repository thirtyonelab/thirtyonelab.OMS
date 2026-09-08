import{t as e}from"./eye--HTCZj_Z.js";import{t}from"./pen-vKBcgcd3.js";import{t as n}from"./refresh-cw-BXHZ2dtz.js";import{t as r}from"./search-CddWmPOf.js";import{D as i,O as a,a as o,c as s,n as c,r as l,v as u,x as d}from"./index-Bywbu2Tq.js";var f=a(i(),1),p=l(),m=10;function h({onOpenInvoiceModal:i,onOpenPaymentModal:a,onOpenInvoiceDetail:l}){let{tr:h,language:g}=c(),[_,v]=(0,f.useState)([]),[y,b]=(0,f.useState)(``),[x,S]=(0,f.useState)(`All`),[C,w]=(0,f.useState)(`All`),[T,E]=(0,f.useState)(1),[D,O]=(0,f.useState)(!1),[k,A]=(0,f.useState)({unpaid:0,deposit:0,paid:0,total:0});(0,f.useEffect)(()=>{j()},[]);let j=async()=>{O(!0);try{let e=await s();v(e);let t=0,n=0,r=0,i=0;e.forEach(e=>{e.status===`Unpaid`?t++:e.status===`Deposit`?n++:e.status===`Paid`?r++:e.status===`Void`&&i++}),A({unpaid:t,deposit:n,paid:r,void:i,total:e.length})}catch(e){console.error(`Error loading invoices list:`,e)}finally{O(!1)}},M=async(e,t)=>{window.confirm(`Adakah anda pasti mahu memadam invoice "${t}"?`)&&(await o(e),j())},N=_.filter(e=>{let t=e.client_name.toLowerCase().includes(y.toLowerCase())||e.invoice_no.toLowerCase().includes(y.toLowerCase()),n=x===`All`||e.status===x,r=!0;return C!==`All`&&(r=new Date(e.date).getMonth()===parseInt(C,10)),t&&n&&r});(0,f.useEffect)(()=>{E(1)},[y,x,C]);let P=N.length,F=Math.ceil(P/m),I=(T-1)*m,L=N.slice(I,I+m),R=e=>{switch(e){case`Paid`:return`badge-paid`;case`Deposit`:return`badge-deposit`;case`Unpaid`:return`badge-unpaid`;case`Void`:return`badge-void`;default:return``}},z=[{value:`0`,label:g===`EN`?`January`:`Januari`},{value:`1`,label:g===`EN`?`February`:`Februari`},{value:`2`,label:g===`EN`?`March`:`Mac`},{value:`3`,label:`April`},{value:`4`,label:g===`EN`?`May`:`Mei`},{value:`5`,label:g===`EN`?`June`:`Jun`},{value:`6`,label:g===`EN`?`July`:`Julai`},{value:`7`,label:g===`EN`?`August`:`Ogos`},{value:`8`,label:`September`},{value:`9`,label:g===`EN`?`October`:`Oktober`},{value:`10`,label:`November`},{value:`11`,label:g===`EN`?`December`:`Disember`}];return(0,p.jsxs)(`div`,{className:`main-content`,children:[(0,p.jsxs)(`div`,{className:`invoices-header`,style:{marginBottom:`1.5rem`,display:`flex`,justifyContent:`space-between`,alignItems:`flex-start`},children:[(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`span`,{className:`section-tag`,children:h(`ordersTag`)}),(0,p.jsx)(`h1`,{style:{fontSize:`1.75rem`,fontWeight:`800`,marginTop:`0.5rem`},children:h(`ordersTitle`)})]}),(0,p.jsxs)(`button`,{onClick:()=>i(null),className:`btn btn-primary`,style:{display:`flex`,gap:`0.5rem`,alignItems:`center`},children:[(0,p.jsx)(d,{size:16}),` `,h(`newOrder`)]})]}),(0,p.jsxs)(`div`,{className:`search-filters-bar card`,children:[(0,p.jsxs)(`div`,{className:`search-box`,children:[(0,p.jsx)(r,{size:18,className:`search-icon`}),(0,p.jsx)(`input`,{type:`text`,placeholder:h(`searchPlaceholder`),value:y,onChange:e=>b(e.target.value),className:`form-control search-input`})]}),(0,p.jsxs)(`div`,{className:`filter-group-row`,children:[(0,p.jsxs)(`div`,{className:`filter-box`,children:[(0,p.jsx)(`span`,{className:`select-label`,children:h(`month`)}),(0,p.jsxs)(`select`,{value:C,onChange:e=>w(e.target.value),className:`form-control filter-select`,children:[(0,p.jsx)(`option`,{value:`All`,children:h(`allMonths`)}),z.map(e=>(0,p.jsx)(`option`,{value:e.value,children:e.label},e.value))]})]}),(0,p.jsxs)(`div`,{className:`filter-box`,children:[(0,p.jsx)(`span`,{className:`select-label`,children:h(`status`)}),(0,p.jsxs)(`select`,{value:x,onChange:e=>S(e.target.value),className:`form-control filter-select`,children:[(0,p.jsx)(`option`,{value:`All`,children:h(`allStatus`)}),(0,p.jsx)(`option`,{value:`Paid`,children:h(`paid`)}),(0,p.jsx)(`option`,{value:`Deposit`,children:h(`deposit`)}),(0,p.jsx)(`option`,{value:`Unpaid`,children:h(`unpaid`)}),(0,p.jsx)(`option`,{value:`Void`,children:h(`void`)})]})]})]})]}),(0,p.jsx)(`div`,{className:`card`,style:{padding:0},children:D?(0,p.jsx)(`div`,{className:`loading-state`,children:h(`loadingInvoice`)}):L.length===0?(0,p.jsx)(`div`,{className:`empty-state`,children:h(`noInvoice`)}):(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(`div`,{className:`table-container desktop-only`,children:(0,p.jsxs)(`table`,{className:`table`,children:[(0,p.jsx)(`thead`,{children:(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`th`,{style:{textAlign:`center`},children:h(`invNo`)}),(0,p.jsx)(`th`,{style:{textAlign:`left`},children:h(`clientName`)}),(0,p.jsx)(`th`,{style:{textAlign:`center`},children:h(`date`)}),(0,p.jsx)(`th`,{style:{textAlign:`right`},children:h(`amount`)}),(0,p.jsx)(`th`,{style:{textAlign:`center`},children:h(`status`)}),(0,p.jsx)(`th`,{style:{textAlign:`center`},children:h(`actions`)})]})}),(0,p.jsx)(`tbody`,{children:L.map(r=>(0,p.jsxs)(`tr`,{children:[(0,p.jsx)(`td`,{style:{textAlign:`center`},className:`font-bold`,children:r.invoice_no}),(0,p.jsx)(`td`,{children:(0,p.jsxs)(`div`,{className:`client-cell`,children:[(0,p.jsx)(`span`,{className:`client-name`,children:r.client_name}),(0,p.jsx)(`span`,{className:`client-phone-sub`,children:r.client_phone})]})}),(0,p.jsx)(`td`,{style:{textAlign:`center`},children:r.date}),(0,p.jsxs)(`td`,{style:{textAlign:`right`},className:`font-bold`,children:[parseFloat(r.grand_total).toFixed(2),r.status===`Deposit`&&r.deposit&&(0,p.jsxs)(`span`,{style:{display:`block`,fontSize:`0.65rem`,color:`var(--text-muted)`,fontWeight:`normal`},children:[`D: `,parseFloat(r.deposit).toFixed(2)]})]}),(0,p.jsx)(`td`,{style:{textAlign:`center`},children:(0,p.jsx)(`span`,{className:`badge ${R(r.status)}`,children:r.status})}),(0,p.jsx)(`td`,{style:{textAlign:`center`},children:(0,p.jsxs)(`div`,{className:`actions-cell`,children:[(0,p.jsxs)(`button`,{onClick:()=>l(r),className:`btn btn-secondary btn-sm`,title:`Lihat / Cetak`,children:[(0,p.jsx)(e,{size:12}),` `,h(`view`)]}),(0,p.jsxs)(`button`,{onClick:()=>i(r),className:`btn btn-secondary btn-sm`,title:`Edit Invois`,children:[(0,p.jsx)(t,{size:12}),` `,h(`edit`)]}),(0,p.jsxs)(`button`,{onClick:()=>a(r),className:`btn btn-secondary btn-sm`,style:{color:`#D97706`,borderColor:`#FEF3C7`},title:`Rekod Bayaran`,children:[(0,p.jsx)(n,{size:12}),` `,(h(`deposit`),`Bayar`)]}),(0,p.jsxs)(`button`,{onClick:()=>M(r.id,r.invoice_no),className:`btn btn-secondary btn-sm`,style:{borderColor:`#FEE2E2`,color:`#B91C1C`},title:`Padam Invois`,children:[(0,p.jsx)(u,{size:12}),` `,h(`delete`)]})]})})]},r.id))})]})}),(0,p.jsx)(`div`,{className:`mobile-cards-list mobile-only`,children:L.map(r=>(0,p.jsxs)(`div`,{className:`mobile-card`,children:[(0,p.jsxs)(`div`,{className:`mobile-card-row`,children:[(0,p.jsx)(`span`,{className:`mobile-card-title`,children:r.invoice_no}),(0,p.jsx)(`span`,{className:`badge ${R(r.status)}`,children:r.status})]}),(0,p.jsxs)(`div`,{className:`mobile-card-row`,children:[(0,p.jsxs)(`div`,{className:`mobile-card-detail`,children:[(0,p.jsx)(`div`,{className:`mobile-card-bold`,children:r.client_name}),(0,p.jsxs)(`div`,{children:[`Tel: `,r.client_phone]}),(0,p.jsxs)(`div`,{children:[`Tarikh: `,r.date]})]}),(0,p.jsxs)(`div`,{style:{textAlign:`right`},children:[(0,p.jsxs)(`div`,{className:`mobile-card-detail`,children:[`Jumlah: `,(0,p.jsxs)(`span`,{className:`mobile-card-bold`,children:[`RM `,parseFloat(r.grand_total).toFixed(2)]})]}),r.status===`Deposit`&&r.deposit&&(0,p.jsxs)(`div`,{className:`mobile-card-detail`,style:{color:`#B45309`,fontWeight:`bold`},children:[`Depo: RM `,parseFloat(r.deposit).toFixed(2)]})]})]}),(0,p.jsxs)(`div`,{className:`mobile-card-actions`,style:{flexWrap:`wrap`},children:[(0,p.jsxs)(`button`,{onClick:()=>l(r),className:`btn btn-secondary btn-sm`,children:[(0,p.jsx)(e,{size:12}),` `,h(`view`)]}),(0,p.jsxs)(`button`,{onClick:()=>i(r),className:`btn btn-secondary btn-sm`,children:[(0,p.jsx)(t,{size:12}),` `,h(`edit`)]}),(0,p.jsxs)(`button`,{onClick:()=>a(r),className:`btn btn-secondary btn-sm`,style:{color:`#D97706`,borderColor:`#FEF3C7`},children:[(0,p.jsx)(n,{size:12}),` `,(h(`deposit`),`Bayar`)]}),(0,p.jsxs)(`button`,{onClick:()=>M(r.id,r.invoice_no),className:`btn btn-secondary btn-sm`,style:{borderColor:`#FEE2E2`,color:`#B91C1C`},children:[(0,p.jsx)(u,{size:12}),` `,h(`delete`)]})]})]},r.id))})]})}),F>1&&(0,p.jsxs)(`div`,{className:`pagination-wrapper`,children:[(0,p.jsx)(`button`,{onClick:()=>E(e=>Math.max(1,e-1)),disabled:T===1,className:`btn btn-secondary btn-sm pag-btn`,children:h(`previous`)}),(0,p.jsx)(`div`,{className:`pagination-numbers`,children:Array.from({length:F},(e,t)=>{let n=t+1;return(0,p.jsx)(`button`,{onClick:()=>E(n),className:`btn btn-secondary btn-sm pag-num-btn ${T===n?`active-page`:``}`,children:n},n)})}),(0,p.jsx)(`button`,{onClick:()=>E(e=>Math.min(F,e+1)),disabled:T===F,className:`btn btn-secondary btn-sm pag-btn`,children:h(`next`)})]}),(0,p.jsx)(`style`,{children:`
        .invoices-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .search-filters-bar {
          display: flex !important;
          flex-direction: row !important;
          align-items: flex-end !important;
          gap: 1.5rem !important;
          padding: 1.25rem 2rem !important;
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
          display: flex !important;
          flex-direction: row !important;
          gap: 1rem !important;
          flex-shrink: 0 !important;
          align-items: flex-end !important;
        }

        .filter-box {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .select-label {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 0;
        }

        .filter-select {
          min-width: 150px;
          height: 42px;
          font-size: 0.85rem;
        }

        .client-cell {
          display: flex;
          flex-direction: column;
        }

        .client-name {
          font-weight: 600;
        }

        .client-phone-sub {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .actions-cell {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.35rem 0.4rem;
          width: fit-content;
          margin: 0 auto;
        }

        .actions-cell .btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.25rem;
          padding: 0.3rem 0.55rem;
          font-size: 0.72rem;
          white-space: nowrap;
          min-width: 68px;
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

        .text-red {
          color: var(--primary-red);
        }

        .font-bold {
          font-weight: 600;
        }

        /* Pagination Styles */
        .pagination-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1.5rem;
          margin-bottom: 3rem;
        }

        .pagination-numbers {
          display: flex;
          gap: 0.5rem;
        }

        .pag-btn {
          width: 110px;
        }

        .pag-num-btn {
          min-width: 36px;
          height: 36px;
          padding: 0 !important;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem !important;
        }

        .active-page {
          background-color: var(--primary-red) !important;
          color: var(--white) !important;
          border-color: var(--primary-red) !important;
        }

        @media (max-width: 992px) {
          .search-filters-bar {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 1rem !important;
            padding: 1.25rem !important;
          }
          .filter-group-row {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            width: 100% !important;
            gap: 1rem !important;
          }
          .filter-box {
            display: flex;
            flex-direction: column;
            gap: 0.3rem;
          }
          .filter-select {
            width: 100%;
            min-width: 0 !important;
          }
        }
      `})]})}export{h as default};