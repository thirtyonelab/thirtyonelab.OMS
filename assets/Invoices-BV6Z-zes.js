import{t as e}from"./eye-CMPetNY2.js";import{t}from"./pen-CAfLEVC-.js";import{t as n}from"./refresh-cw-BfauMYvY.js";import{t as r}from"./search-C-3eKe5T.js";import{E as i,T as a,a as o,c as s,n as c,r as l,v as u,x as d}from"./index-LmE3YOs8.js";var f=i(a(),1),p=l(),m=`C:/Users/User/Documents/GitHub/thirtyonelab.OMS/src/pages/Invoices.jsx`,h=10;function g({onOpenInvoiceModal:i,onOpenPaymentModal:a,onOpenInvoiceDetail:l}){let{tr:g,language:_}=c(),[v,y]=(0,f.useState)([]),[b,x]=(0,f.useState)(``),[S,C]=(0,f.useState)(`All`),[w,T]=(0,f.useState)(`All`),[E,D]=(0,f.useState)(1),[O,k]=(0,f.useState)(!1),[A,j]=(0,f.useState)({unpaid:0,deposit:0,paid:0,total:0});(0,f.useEffect)(()=>{M()},[]);let M=async()=>{k(!0);try{let e=await s();y(e);let t=0,n=0,r=0;e.forEach(e=>{e.status===`Unpaid`?t++:e.status===`Deposit`?n++:e.status===`Paid`&&r++}),j({unpaid:t,deposit:n,paid:r,total:e.length})}catch(e){console.error(`Error loading invoices list:`,e)}finally{k(!1)}},N=async(e,t)=>{window.confirm(`Adakah anda pasti mahu memadam invoice "${t}"?`)&&(await o(e),M())},P=v.filter(e=>{let t=e.client_name.toLowerCase().includes(b.toLowerCase())||e.invoice_no.toLowerCase().includes(b.toLowerCase()),n=S===`All`||e.status===S,r=!0;return w!==`All`&&(r=new Date(e.date).getMonth()===parseInt(w,10)),t&&n&&r});(0,f.useEffect)(()=>{D(1)},[b,S,w]);let F=P.length,I=Math.ceil(F/h),L=(E-1)*h,R=P.slice(L,L+h),z=e=>{switch(e){case`Paid`:return`badge-paid`;case`Deposit`:return`badge-deposit`;case`Unpaid`:return`badge-unpaid`;default:return``}},B=[{value:`0`,label:_===`EN`?`January`:`Januari`},{value:`1`,label:_===`EN`?`February`:`Februari`},{value:`2`,label:_===`EN`?`March`:`Mac`},{value:`3`,label:`April`},{value:`4`,label:_===`EN`?`May`:`Mei`},{value:`5`,label:_===`EN`?`June`:`Jun`},{value:`6`,label:_===`EN`?`July`:`Julai`},{value:`7`,label:_===`EN`?`August`:`Ogos`},{value:`8`,label:`September`},{value:`9`,label:_===`EN`?`October`:`Oktober`},{value:`10`,label:`November`},{value:`11`,label:_===`EN`?`December`:`Disember`}];return(0,p.jsxDEV)(`div`,{className:`main-content`,children:[(0,p.jsxDEV)(`div`,{className:`invoices-header`,style:{marginBottom:`1.5rem`},children:[(0,p.jsxDEV)(`div`,{children:[(0,p.jsxDEV)(`span`,{className:`section-tag`,children:g(`ordersTag`)},void 0,!1,{fileName:m,lineNumber:113,columnNumber:11},this),(0,p.jsxDEV)(`h1`,{style:{fontSize:`1.75rem`,fontWeight:`800`,marginTop:`0.5rem`},children:g(`ordersTitle`)},void 0,!1,{fileName:m,lineNumber:114,columnNumber:11},this)]},void 0,!0,{fileName:m,lineNumber:112,columnNumber:9},this),(0,p.jsxDEV)(`button`,{onClick:()=>i(null),className:`btn btn-primary`,style:{display:`flex`,gap:`0.5rem`,alignItems:`center`},children:[(0,p.jsxDEV)(d,{size:16},void 0,!1,{fileName:m,lineNumber:117,columnNumber:11},this),` `,g(`newOrder`)]},void 0,!0,{fileName:m,lineNumber:116,columnNumber:9},this)]},void 0,!0,{fileName:m,lineNumber:111,columnNumber:7},this),(0,p.jsxDEV)(`div`,{className:`search-filters-bar card`,children:[(0,p.jsxDEV)(`div`,{className:`search-box`,children:[(0,p.jsxDEV)(r,{size:18,className:`search-icon`},void 0,!1,{fileName:m,lineNumber:124,columnNumber:11},this),(0,p.jsxDEV)(`input`,{type:`text`,placeholder:g(`searchPlaceholder`),value:b,onChange:e=>x(e.target.value),className:`form-control search-input`},void 0,!1,{fileName:m,lineNumber:125,columnNumber:11},this)]},void 0,!0,{fileName:m,lineNumber:123,columnNumber:9},this),(0,p.jsxDEV)(`div`,{className:`filter-group-row`,children:[(0,p.jsxDEV)(`div`,{className:`filter-box`,children:[(0,p.jsxDEV)(`span`,{className:`select-label`,children:g(`month`)},void 0,!1,{fileName:m,lineNumber:136,columnNumber:13},this),(0,p.jsxDEV)(`select`,{value:w,onChange:e=>T(e.target.value),className:`form-control filter-select`,children:[(0,p.jsxDEV)(`option`,{value:`All`,children:g(`allMonths`)},void 0,!1,{fileName:m,lineNumber:142,columnNumber:15},this),B.map(e=>(0,p.jsxDEV)(`option`,{value:e.value,children:e.label},e.value,!1,{fileName:m,lineNumber:144,columnNumber:17},this))]},void 0,!0,{fileName:m,lineNumber:137,columnNumber:13},this)]},void 0,!0,{fileName:m,lineNumber:135,columnNumber:11},this),(0,p.jsxDEV)(`div`,{className:`filter-box`,children:[(0,p.jsxDEV)(`span`,{className:`select-label`,children:g(`status`)},void 0,!1,{fileName:m,lineNumber:150,columnNumber:13},this),(0,p.jsxDEV)(`select`,{value:S,onChange:e=>C(e.target.value),className:`form-control filter-select`,children:[(0,p.jsxDEV)(`option`,{value:`All`,children:g(`allStatus`)},void 0,!1,{fileName:m,lineNumber:156,columnNumber:15},this),(0,p.jsxDEV)(`option`,{value:`Paid`,children:`Paid`},void 0,!1,{fileName:m,lineNumber:157,columnNumber:15},this),(0,p.jsxDEV)(`option`,{value:`Deposit`,children:g(`deposit`)},void 0,!1,{fileName:m,lineNumber:158,columnNumber:15},this),(0,p.jsxDEV)(`option`,{value:`Unpaid`,children:g(`unpaid`)},void 0,!1,{fileName:m,lineNumber:159,columnNumber:15},this)]},void 0,!0,{fileName:m,lineNumber:151,columnNumber:13},this)]},void 0,!0,{fileName:m,lineNumber:149,columnNumber:11},this)]},void 0,!0,{fileName:m,lineNumber:134,columnNumber:9},this)]},void 0,!0,{fileName:m,lineNumber:122,columnNumber:7},this),(0,p.jsxDEV)(`div`,{className:`card`,style:{padding:0},children:O?(0,p.jsxDEV)(`div`,{className:`loading-state`,children:g(`loadingInvoice`)},void 0,!1,{fileName:m,lineNumber:168,columnNumber:11},this):R.length===0?(0,p.jsxDEV)(`div`,{className:`empty-state`,children:g(`noInvoice`)},void 0,!1,{fileName:m,lineNumber:170,columnNumber:11},this):(0,p.jsxDEV)(p.Fragment,{children:[(0,p.jsxDEV)(`div`,{className:`table-container desktop-only`,children:(0,p.jsxDEV)(`table`,{className:`table`,children:[(0,p.jsxDEV)(`thead`,{children:(0,p.jsxDEV)(`tr`,{children:[(0,p.jsxDEV)(`th`,{style:{textAlign:`center`},children:g(`invNo`)},void 0,!1,{fileName:m,lineNumber:177,columnNumber:21},this),(0,p.jsxDEV)(`th`,{style:{textAlign:`left`},children:g(`clientName`)},void 0,!1,{fileName:m,lineNumber:178,columnNumber:21},this),(0,p.jsxDEV)(`th`,{style:{textAlign:`center`},children:g(`date`)},void 0,!1,{fileName:m,lineNumber:179,columnNumber:21},this),(0,p.jsxDEV)(`th`,{style:{textAlign:`right`},children:g(`amount`)},void 0,!1,{fileName:m,lineNumber:180,columnNumber:21},this),(0,p.jsxDEV)(`th`,{style:{textAlign:`center`},children:g(`status`)},void 0,!1,{fileName:m,lineNumber:181,columnNumber:21},this),(0,p.jsxDEV)(`th`,{style:{textAlign:`center`},children:g(`actions`)},void 0,!1,{fileName:m,lineNumber:182,columnNumber:21},this)]},void 0,!0,{fileName:m,lineNumber:176,columnNumber:19},this)},void 0,!1,{fileName:m,lineNumber:175,columnNumber:17},this),(0,p.jsxDEV)(`tbody`,{children:R.map(r=>(0,p.jsxDEV)(`tr`,{children:[(0,p.jsxDEV)(`td`,{style:{textAlign:`center`},className:`font-bold`,children:r.invoice_no},void 0,!1,{fileName:m,lineNumber:188,columnNumber:23},this),(0,p.jsxDEV)(`td`,{children:(0,p.jsxDEV)(`div`,{className:`client-cell`,children:[(0,p.jsxDEV)(`span`,{className:`client-name`,children:r.client_name},void 0,!1,{fileName:m,lineNumber:191,columnNumber:27},this),(0,p.jsxDEV)(`span`,{className:`client-phone-sub`,children:r.client_phone},void 0,!1,{fileName:m,lineNumber:192,columnNumber:27},this)]},void 0,!0,{fileName:m,lineNumber:190,columnNumber:25},this)},void 0,!1,{fileName:m,lineNumber:189,columnNumber:23},this),(0,p.jsxDEV)(`td`,{style:{textAlign:`center`},children:r.date},void 0,!1,{fileName:m,lineNumber:195,columnNumber:23},this),(0,p.jsxDEV)(`td`,{style:{textAlign:`right`},className:`font-bold`,children:[parseFloat(r.grand_total).toFixed(2),r.status===`Deposit`&&r.deposit&&(0,p.jsxDEV)(`span`,{style:{display:`block`,fontSize:`0.65rem`,color:`var(--text-muted)`,fontWeight:`normal`},children:[`D: `,parseFloat(r.deposit).toFixed(2)]},void 0,!0,{fileName:m,lineNumber:199,columnNumber:27},this)]},void 0,!0,{fileName:m,lineNumber:196,columnNumber:23},this),(0,p.jsxDEV)(`td`,{style:{textAlign:`center`},children:(0,p.jsxDEV)(`span`,{className:`badge ${z(r.status)}`,children:r.status},void 0,!1,{fileName:m,lineNumber:205,columnNumber:25},this)},void 0,!1,{fileName:m,lineNumber:204,columnNumber:23},this),(0,p.jsxDEV)(`td`,{style:{textAlign:`center`},children:(0,p.jsxDEV)(`div`,{className:`actions-cell`,children:[(0,p.jsxDEV)(`button`,{onClick:()=>l(r),className:`btn btn-secondary btn-sm`,title:`Lihat / Cetak`,children:[(0,p.jsxDEV)(e,{size:12},void 0,!1,{fileName:m,lineNumber:216,columnNumber:29},this),` `,g(`view`)]},void 0,!0,{fileName:m,lineNumber:211,columnNumber:27},this),(0,p.jsxDEV)(`button`,{onClick:()=>i(r),className:`btn btn-secondary btn-sm`,title:`Edit Invois`,children:[(0,p.jsxDEV)(t,{size:12},void 0,!1,{fileName:m,lineNumber:223,columnNumber:29},this),` `,g(`edit`)]},void 0,!0,{fileName:m,lineNumber:218,columnNumber:27},this),(0,p.jsxDEV)(`button`,{onClick:()=>a(r),className:`btn btn-secondary btn-sm`,style:{color:`#D97706`,borderColor:`#FEF3C7`},title:`Rekod Bayaran`,children:[(0,p.jsxDEV)(n,{size:12},void 0,!1,{fileName:m,lineNumber:231,columnNumber:29},this),` `,(g(`deposit`),`Bayar`)]},void 0,!0,{fileName:m,lineNumber:225,columnNumber:27},this),(0,p.jsxDEV)(`button`,{onClick:()=>N(r.id,r.invoice_no),className:`btn btn-secondary btn-sm`,style:{borderColor:`#FEE2E2`,color:`#B91C1C`},title:`Padam Invois`,children:[(0,p.jsxDEV)(u,{size:12},void 0,!1,{fileName:m,lineNumber:239,columnNumber:29},this),` `,g(`delete`)]},void 0,!0,{fileName:m,lineNumber:233,columnNumber:27},this)]},void 0,!0,{fileName:m,lineNumber:210,columnNumber:25},this)},void 0,!1,{fileName:m,lineNumber:209,columnNumber:23},this)]},r.id,!0,{fileName:m,lineNumber:187,columnNumber:21},this))},void 0,!1,{fileName:m,lineNumber:185,columnNumber:17},this)]},void 0,!0,{fileName:m,lineNumber:174,columnNumber:15},this)},void 0,!1,{fileName:m,lineNumber:173,columnNumber:13},this),(0,p.jsxDEV)(`div`,{className:`mobile-cards-list mobile-only`,children:R.map(r=>(0,p.jsxDEV)(`div`,{className:`mobile-card`,children:[(0,p.jsxDEV)(`div`,{className:`mobile-card-row`,children:[(0,p.jsxDEV)(`span`,{className:`mobile-card-title`,children:r.invoice_no},void 0,!1,{fileName:m,lineNumber:253,columnNumber:21},this),(0,p.jsxDEV)(`span`,{className:`badge ${z(r.status)}`,children:r.status},void 0,!1,{fileName:m,lineNumber:254,columnNumber:21},this)]},void 0,!0,{fileName:m,lineNumber:252,columnNumber:19},this),(0,p.jsxDEV)(`div`,{className:`mobile-card-row`,children:[(0,p.jsxDEV)(`div`,{className:`mobile-card-detail`,children:[(0,p.jsxDEV)(`div`,{className:`mobile-card-bold`,children:r.client_name},void 0,!1,{fileName:m,lineNumber:260,columnNumber:23},this),(0,p.jsxDEV)(`div`,{children:[`Tel: `,r.client_phone]},void 0,!0,{fileName:m,lineNumber:261,columnNumber:23},this),(0,p.jsxDEV)(`div`,{children:[`Tarikh: `,r.date]},void 0,!0,{fileName:m,lineNumber:262,columnNumber:23},this)]},void 0,!0,{fileName:m,lineNumber:259,columnNumber:21},this),(0,p.jsxDEV)(`div`,{style:{textAlign:`right`},children:[(0,p.jsxDEV)(`div`,{className:`mobile-card-detail`,children:[`Jumlah: `,(0,p.jsxDEV)(`span`,{className:`mobile-card-bold`,children:[`RM `,parseFloat(r.grand_total).toFixed(2)]},void 0,!0,{fileName:m,lineNumber:265,columnNumber:67},this)]},void 0,!0,{fileName:m,lineNumber:265,columnNumber:23},this),r.status===`Deposit`&&r.deposit&&(0,p.jsxDEV)(`div`,{className:`mobile-card-detail`,style:{color:`#B45309`,fontWeight:`bold`},children:[`Depo: RM `,parseFloat(r.deposit).toFixed(2)]},void 0,!0,{fileName:m,lineNumber:267,columnNumber:25},this)]},void 0,!0,{fileName:m,lineNumber:264,columnNumber:21},this)]},void 0,!0,{fileName:m,lineNumber:258,columnNumber:19},this),(0,p.jsxDEV)(`div`,{className:`mobile-card-actions`,style:{flexWrap:`wrap`},children:[(0,p.jsxDEV)(`button`,{onClick:()=>l(r),className:`btn btn-secondary btn-sm`,children:[(0,p.jsxDEV)(e,{size:12},void 0,!1,{fileName:m,lineNumber:276,columnNumber:23},this),` `,g(`view`)]},void 0,!0,{fileName:m,lineNumber:272,columnNumber:21},this),(0,p.jsxDEV)(`button`,{onClick:()=>i(r),className:`btn btn-secondary btn-sm`,children:[(0,p.jsxDEV)(t,{size:12},void 0,!1,{fileName:m,lineNumber:282,columnNumber:23},this),` `,g(`edit`)]},void 0,!0,{fileName:m,lineNumber:278,columnNumber:21},this),(0,p.jsxDEV)(`button`,{onClick:()=>a(r),className:`btn btn-secondary btn-sm`,style:{color:`#D97706`,borderColor:`#FEF3C7`},children:[(0,p.jsxDEV)(n,{size:12},void 0,!1,{fileName:m,lineNumber:289,columnNumber:23},this),` `,(g(`deposit`),`Bayar`)]},void 0,!0,{fileName:m,lineNumber:284,columnNumber:21},this),(0,p.jsxDEV)(`button`,{onClick:()=>N(r.id,r.invoice_no),className:`btn btn-secondary btn-sm`,style:{borderColor:`#FEE2E2`,color:`#B91C1C`},children:[(0,p.jsxDEV)(u,{size:12},void 0,!1,{fileName:m,lineNumber:296,columnNumber:23},this),` `,g(`delete`)]},void 0,!0,{fileName:m,lineNumber:291,columnNumber:21},this)]},void 0,!0,{fileName:m,lineNumber:271,columnNumber:19},this)]},r.id,!0,{fileName:m,lineNumber:251,columnNumber:17},this))},void 0,!1,{fileName:m,lineNumber:249,columnNumber:13},this)]},void 0,!0,{fileName:m,lineNumber:172,columnNumber:11},this)},void 0,!1,{fileName:m,lineNumber:166,columnNumber:7},this),I>1&&(0,p.jsxDEV)(`div`,{className:`pagination-wrapper`,children:[(0,p.jsxDEV)(`button`,{onClick:()=>D(e=>Math.max(1,e-1)),disabled:E===1,className:`btn btn-secondary btn-sm pag-btn`,children:g(`previous`)},void 0,!1,{fileName:m,lineNumber:309,columnNumber:11},this),(0,p.jsxDEV)(`div`,{className:`pagination-numbers`,children:Array.from({length:I},(e,t)=>{let n=t+1;return(0,p.jsxDEV)(`button`,{onClick:()=>D(n),className:`btn btn-secondary btn-sm pag-num-btn ${E===n?`active-page`:``}`,children:n},n,!1,{fileName:m,lineNumber:321,columnNumber:17},this)})},void 0,!1,{fileName:m,lineNumber:317,columnNumber:11},this),(0,p.jsxDEV)(`button`,{onClick:()=>D(e=>Math.min(I,e+1)),disabled:E===I,className:`btn btn-secondary btn-sm pag-btn`,children:g(`next`)},void 0,!1,{fileName:m,lineNumber:332,columnNumber:11},this)]},void 0,!0,{fileName:m,lineNumber:308,columnNumber:9},this),(0,p.jsxDEV)(`style`,{children:`
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
      `},void 0,!1,{fileName:m,lineNumber:342,columnNumber:7},this)]},void 0,!0,{fileName:m,lineNumber:109,columnNumber:5},this)}export{g as default};