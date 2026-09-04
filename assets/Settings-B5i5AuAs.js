import{t as e}from"./circle-alert-Br89bVcQ.js";import{t}from"./circle-check-DC208TgR.js";import{t as n}from"./refresh-cw-mFOen_3Q.js";import{C as r,D as i,E as a,O as o,_ as s,h as c,n as l,p as u,r as d,u as f,y as p}from"./index-dktfkuEU.js";var m=a(`file-spreadsheet`,[[`path`,{d:`M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z`,key:`1oefj6`}],[`path`,{d:`M14 2v5a1 1 0 0 0 1 1h5`,key:`wfsgrz`}],[`path`,{d:`M8 13h2`,key:`yr2amv`}],[`path`,{d:`M14 13h2`,key:`un5t4a`}],[`path`,{d:`M8 17h2`,key:`2yhykz`}],[`path`,{d:`M14 17h2`,key:`10kma7`}]]),h=o(i(),1),g=d(),_=`C:/Users/User/Documents/GitHub/thirtyonelab.OMS/src/pages/Settings.jsx`;function v(){let{tr:i}=l(),[a,o]=(0,h.useState)({company_name:``,company_address:``,company_phone:``,company_logo:``,invoice_prefix:``,bank_name:``,bank_account:``,qr_code:``,terms:``}),[d,v]=(0,h.useState)(localStorage.getItem(`supabase_url`)||`https://jcwvhpreptjfucrhbzcy.supabase.co`),[y,b]=(0,h.useState)(localStorage.getItem(`supabase_anon_key`)||`sb_publishable_tR03lALW-SHxK625ZoYpWA_n6cVQZqA`),[x,S]=(0,h.useState)(``),[C,w]=(0,h.useState)(``),[T,E]=(0,h.useState)(!1),[D,O]=(0,h.useState)(null),[k,A]=(0,h.useState)(``),[j,M]=(0,h.useState)(null);(0,h.useEffect)(()=>{P()},[]);let N=e=>{if(!e)return{number:``,name:``};let t=e.match(/^(.*?)\s*\((.*?)\)\s*$/);return t?{number:t[1].trim(),name:t[2].trim()}:{number:e.trim(),name:``}},P=async()=>{E(!0);try{let e=await f();o(e);let t=N(e.bank_account);S(t.number),w(t.name)}catch(e){console.error(`Error loading settings:`,e)}finally{E(!1)}},F=e=>{let{name:t,value:n}=e.target;o(e=>({...e,[t]:n}))},I=e=>{let t=e.target.value;S(t),o(e=>({...e,bank_account:C?`${t} (${C})`:t}))},L=e=>{let t=e.target.value;w(t),o(e=>({...e,bank_account:t?`${x} (${t})`:x}))},R=(e,t)=>{let n=e.target.files[0];if(!n)return;if(n.size>500*1024){alert(`Had saiz fail adalah 500KB. Sila kecilkan saiz imej anda.`);return}let r=new FileReader;r.onloadend=()=>{o(e=>({...e,[t]:r.result}))},r.readAsDataURL(n)};return(0,g.jsxDEV)(`div`,{className:`main-content`,children:[(0,g.jsxDEV)(`div`,{children:[(0,g.jsxDEV)(`span`,{className:`section-tag`,children:i(`sysConfig`)},void 0,!1,{fileName:_,lineNumber:231,columnNumber:9},this),(0,g.jsxDEV)(`h1`,{children:i(`settingsTitle`)},void 0,!1,{fileName:_,lineNumber:232,columnNumber:9},this)]},void 0,!0,{fileName:_,lineNumber:230,columnNumber:7},this),(0,g.jsxDEV)(`form`,{onSubmit:async e=>{e.preventDefault(),E(!0),M(null);try{await u(a),d.trim()&&y.trim()?(localStorage.setItem(`supabase_url`,d.trim()),localStorage.setItem(`supabase_anon_key`,y.trim())):(localStorage.removeItem(`supabase_url`),localStorage.removeItem(`supabase_anon_key`)),M(`success`),setTimeout(()=>M(null),3e3),window.dispatchEvent(new Event(`supabase-connection-changed`)),P()}catch(e){console.error(`Failed to save settings:`,e),M(`error`)}finally{E(!1)}},className:`settings-form`,children:[(0,g.jsxDEV)(`section`,{className:`settings-section card`,children:[(0,g.jsxDEV)(`h3`,{className:`section-title`,children:i(`compInfo`)},void 0,!1,{fileName:_,lineNumber:238,columnNumber:11},this),(0,g.jsxDEV)(`div`,{className:`grid-2`,children:[(0,g.jsxDEV)(`div`,{className:`form-group`,children:[(0,g.jsxDEV)(`label`,{className:`form-label`,children:i(`compName`)},void 0,!1,{fileName:_,lineNumber:242,columnNumber:15},this),(0,g.jsxDEV)(`input`,{type:`text`,name:`company_name`,value:a.company_name,onChange:F,className:`form-control`,required:!0},void 0,!1,{fileName:_,lineNumber:243,columnNumber:15},this)]},void 0,!0,{fileName:_,lineNumber:241,columnNumber:13},this),(0,g.jsxDEV)(`div`,{className:`form-group`,children:[(0,g.jsxDEV)(`label`,{className:`form-label`,children:i(`phoneNo`)},void 0,!1,{fileName:_,lineNumber:253,columnNumber:15},this),(0,g.jsxDEV)(`input`,{type:`text`,name:`company_phone`,value:a.company_phone,onChange:F,className:`form-control`,required:!0},void 0,!1,{fileName:_,lineNumber:254,columnNumber:15},this)]},void 0,!0,{fileName:_,lineNumber:252,columnNumber:13},this)]},void 0,!0,{fileName:_,lineNumber:240,columnNumber:11},this),(0,g.jsxDEV)(`div`,{className:`form-group`,children:[(0,g.jsxDEV)(`label`,{className:`form-label`,children:i(`storeAddress`)},void 0,!1,{fileName:_,lineNumber:266,columnNumber:13},this),(0,g.jsxDEV)(`textarea`,{name:`company_address`,value:a.company_address,onChange:F,rows:`3`,className:`form-control`,style:{resize:`none`},required:!0},void 0,!1,{fileName:_,lineNumber:267,columnNumber:13},this)]},void 0,!0,{fileName:_,lineNumber:265,columnNumber:11},this),(0,g.jsxDEV)(`div`,{className:`grid-2`,children:[(0,g.jsxDEV)(`div`,{className:`form-group`,children:[(0,g.jsxDEV)(`label`,{className:`form-label`,children:i(`compLogo`)},void 0,!1,{fileName:_,lineNumber:280,columnNumber:15},this),(0,g.jsxDEV)(`div`,{className:`file-upload-wrapper`,children:[(0,g.jsxDEV)(`input`,{type:`file`,id:`company_logo_input`,accept:`image/*`,onChange:e=>R(e,`company_logo`),className:`file-input-hidden`},void 0,!1,{fileName:_,lineNumber:282,columnNumber:17},this),(0,g.jsxDEV)(`label`,{htmlFor:`company_logo_input`,className:`btn btn-secondary btn-sm`,children:[(0,g.jsxDEV)(s,{size:14},void 0,!1,{fileName:_,lineNumber:290,columnNumber:19},this),` `,i(`uploadLogo`)]},void 0,!0,{fileName:_,lineNumber:289,columnNumber:17},this),a.company_logo&&(0,g.jsxDEV)(`div`,{className:`preview-container`,children:[(0,g.jsxDEV)(`img`,{src:a.company_logo,alt:`Company Logo Preview`,className:`logo-preview`},void 0,!1,{fileName:_,lineNumber:294,columnNumber:21},this),(0,g.jsxDEV)(`button`,{type:`button`,onClick:()=>o(e=>({...e,company_logo:``})),className:`btn-text btn-delete-img`,children:i(`delete`)},void 0,!1,{fileName:_,lineNumber:295,columnNumber:21},this)]},void 0,!0,{fileName:_,lineNumber:293,columnNumber:19},this)]},void 0,!0,{fileName:_,lineNumber:281,columnNumber:15},this)]},void 0,!0,{fileName:_,lineNumber:279,columnNumber:13},this),(0,g.jsxDEV)(`div`,{className:`form-group`,children:[(0,g.jsxDEV)(`label`,{className:`form-label`,children:i(`invoicePrefix`)},void 0,!1,{fileName:_,lineNumber:308,columnNumber:15},this),(0,g.jsxDEV)(`input`,{type:`text`,name:`invoice_prefix`,value:a.invoice_prefix,onChange:F,className:`form-control`,placeholder:`Contoh: NO.`,required:!0},void 0,!1,{fileName:_,lineNumber:309,columnNumber:15},this),(0,g.jsxDEV)(`span`,{className:`helper-text`,children:i(`invoicePrefixHelp`)},void 0,!1,{fileName:_,lineNumber:318,columnNumber:15},this)]},void 0,!0,{fileName:_,lineNumber:307,columnNumber:13},this)]},void 0,!0,{fileName:_,lineNumber:278,columnNumber:11},this)]},void 0,!0,{fileName:_,lineNumber:237,columnNumber:9},this),(0,g.jsxDEV)(`section`,{className:`settings-section card`,children:[(0,g.jsxDEV)(`h3`,{className:`section-title`,children:i(`paymentInfo`)},void 0,!1,{fileName:_,lineNumber:325,columnNumber:11},this),(0,g.jsxDEV)(`div`,{className:`grid-3`,children:[(0,g.jsxDEV)(`div`,{className:`form-group`,children:[(0,g.jsxDEV)(`label`,{className:`form-label`,children:i(`bankName`)},void 0,!1,{fileName:_,lineNumber:329,columnNumber:15},this),(0,g.jsxDEV)(`input`,{type:`text`,name:`bank_name`,value:a.bank_name,onChange:F,placeholder:`Contoh: Maybank`,className:`form-control`},void 0,!1,{fileName:_,lineNumber:330,columnNumber:15},this)]},void 0,!0,{fileName:_,lineNumber:328,columnNumber:13},this),(0,g.jsxDEV)(`div`,{className:`form-group`,children:[(0,g.jsxDEV)(`label`,{className:`form-label`,children:i(`bankAccNo`)},void 0,!1,{fileName:_,lineNumber:340,columnNumber:15},this),(0,g.jsxDEV)(`input`,{type:`text`,name:`bank_account_no`,value:x,onChange:I,placeholder:`Contoh: 112233445566`,className:`form-control`},void 0,!1,{fileName:_,lineNumber:341,columnNumber:15},this)]},void 0,!0,{fileName:_,lineNumber:339,columnNumber:13},this),(0,g.jsxDEV)(`div`,{className:`form-group`,children:[(0,g.jsxDEV)(`label`,{className:`form-label`,children:i(`accName`)},void 0,!1,{fileName:_,lineNumber:351,columnNumber:15},this),(0,g.jsxDEV)(`input`,{type:`text`,name:`bank_account_name`,value:C,onChange:L,placeholder:`Contoh: THIRTYONE LAB`,className:`form-control`},void 0,!1,{fileName:_,lineNumber:352,columnNumber:15},this)]},void 0,!0,{fileName:_,lineNumber:350,columnNumber:13},this)]},void 0,!0,{fileName:_,lineNumber:327,columnNumber:11},this),(0,g.jsxDEV)(`div`,{className:`form-group`,children:[(0,g.jsxDEV)(`label`,{className:`form-label`,children:i(`qrCode`)},void 0,!1,{fileName:_,lineNumber:364,columnNumber:13},this),(0,g.jsxDEV)(`div`,{className:`file-upload-wrapper`,children:[(0,g.jsxDEV)(`input`,{type:`file`,id:`qr_code_input`,accept:`image/*`,onChange:e=>R(e,`qr_code`),className:`file-input-hidden`},void 0,!1,{fileName:_,lineNumber:366,columnNumber:15},this),(0,g.jsxDEV)(`label`,{htmlFor:`qr_code_input`,className:`btn btn-secondary btn-sm`,children:[(0,g.jsxDEV)(s,{size:14},void 0,!1,{fileName:_,lineNumber:374,columnNumber:17},this),` `,i(`uploadQR`)]},void 0,!0,{fileName:_,lineNumber:373,columnNumber:15},this),a.qr_code&&(0,g.jsxDEV)(`div`,{className:`preview-container`,children:[(0,g.jsxDEV)(`img`,{src:a.qr_code,alt:`DuitNow QR Preview`,className:`qr-preview`},void 0,!1,{fileName:_,lineNumber:378,columnNumber:19},this),(0,g.jsxDEV)(`button`,{type:`button`,onClick:()=>o(e=>({...e,qr_code:``})),className:`btn-text btn-delete-img`,children:i(`delete`)},void 0,!1,{fileName:_,lineNumber:379,columnNumber:19},this)]},void 0,!0,{fileName:_,lineNumber:377,columnNumber:17},this)]},void 0,!0,{fileName:_,lineNumber:365,columnNumber:13},this)]},void 0,!0,{fileName:_,lineNumber:363,columnNumber:11},this)]},void 0,!0,{fileName:_,lineNumber:324,columnNumber:9},this),(0,g.jsxDEV)(`section`,{className:`settings-section card`,children:[(0,g.jsxDEV)(`h3`,{className:`section-title`,children:i(`termsTitle`)},void 0,!1,{fileName:_,lineNumber:394,columnNumber:11},this),(0,g.jsxDEV)(`div`,{className:`form-group`,children:[(0,g.jsxDEV)(`label`,{className:`form-label`,children:i(`termsLabel`)},void 0,!1,{fileName:_,lineNumber:396,columnNumber:13},this),(0,g.jsxDEV)(`textarea`,{name:`terms`,value:a.terms,onChange:F,rows:`4`,placeholder:`Masukkan terma dan syarat perniagaan yang akan dicetak di bahagian bawah invoice...`,className:`form-control`,style:{resize:`none`}},void 0,!1,{fileName:_,lineNumber:397,columnNumber:13},this),(0,g.jsxDEV)(`span`,{className:`helper-text`,children:i(`termsHelp`)},void 0,!1,{fileName:_,lineNumber:406,columnNumber:13},this)]},void 0,!0,{fileName:_,lineNumber:395,columnNumber:11},this)]},void 0,!0,{fileName:_,lineNumber:393,columnNumber:9},this),(0,g.jsxDEV)(`section`,{className:`settings-section card`,children:[(0,g.jsxDEV)(`h3`,{className:`section-title`,children:i(`dbTitle`)},void 0,!1,{fileName:_,lineNumber:412,columnNumber:11},this),(0,g.jsxDEV)(`p`,{className:`section-desc`,children:i(`dbDesc`)},void 0,!1,{fileName:_,lineNumber:413,columnNumber:11},this),(0,g.jsxDEV)(`div`,{className:`form-group`,children:[(0,g.jsxDEV)(`label`,{className:`form-label`,children:`Supabase Project URL`},void 0,!1,{fileName:_,lineNumber:418,columnNumber:13},this),(0,g.jsxDEV)(`input`,{type:`url`,value:d,onChange:e=>{v(e.target.value),O(null)},placeholder:`https://your-project-id.supabase.co`,className:`form-control`},void 0,!1,{fileName:_,lineNumber:419,columnNumber:13},this)]},void 0,!0,{fileName:_,lineNumber:417,columnNumber:11},this),(0,g.jsxDEV)(`div`,{className:`form-group`,children:[(0,g.jsxDEV)(`label`,{className:`form-label`,children:`Supabase Anon Key`},void 0,!1,{fileName:_,lineNumber:432,columnNumber:13},this),(0,g.jsxDEV)(`input`,{type:`password`,value:y,onChange:e=>{b(e.target.value),O(null)},placeholder:`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`,className:`form-control`},void 0,!1,{fileName:_,lineNumber:433,columnNumber:13},this)]},void 0,!0,{fileName:_,lineNumber:431,columnNumber:11},this),(0,g.jsxDEV)(`div`,{className:`supabase-actions-container`,children:[(0,g.jsxDEV)(`button`,{type:`button`,onClick:async()=>{if(!d||!y){O(`error`),A(`Sila masukkan URL dan Anon Key Supabase.`);return}O(`testing`),A(``);try{let{data:e,error:t}=await c(d,y).from(`settings`).select(`*`).limit(1);if(t)if(t.code===`PGRST116`||t.message.includes(`relation "settings" does not exist`))O(`error`),A(`Berjaya bersambung ke Supabase, tetapi jadual "settings" tidak ditemui. Sila jalankan SQL DDL terlebih dahulu.`);else throw t;else O(`success`)}catch(e){console.error(`Supabase test failed:`,e),O(`error`),A(e.message||`Gagal bersambung ke Supabase. Sila semak URL & Key.`)}},className:`btn btn-secondary`,children:i(`testConnection`)},void 0,!1,{fileName:_,lineNumber:446,columnNumber:13},this),D===`testing`&&(0,g.jsxDEV)(`span`,{className:`status-msg testing`,children:[(0,g.jsxDEV)(n,{className:`spinner`,size:16},void 0,!1,{fileName:_,lineNumber:456,columnNumber:17},this),` `,i(`testingDb`)]},void 0,!0,{fileName:_,lineNumber:455,columnNumber:15},this),D===`success`&&(0,g.jsxDEV)(`span`,{className:`status-msg success`,children:[(0,g.jsxDEV)(t,{size:16},void 0,!1,{fileName:_,lineNumber:462,columnNumber:17},this),` Sambungan Berjaya! Database sedia untuk digunakan.`]},void 0,!0,{fileName:_,lineNumber:461,columnNumber:15},this),D===`error`&&(0,g.jsxDEV)(`span`,{className:`status-msg error`,children:[(0,g.jsxDEV)(e,{size:16},void 0,!1,{fileName:_,lineNumber:468,columnNumber:17},this),` `,k]},void 0,!0,{fileName:_,lineNumber:467,columnNumber:15},this)]},void 0,!0,{fileName:_,lineNumber:445,columnNumber:11},this)]},void 0,!0,{fileName:_,lineNumber:411,columnNumber:9},this),(0,g.jsxDEV)(`section`,{className:`settings-section card`,children:[(0,g.jsxDEV)(`h3`,{className:`section-title`,children:i(`backupTitle`)},void 0,!1,{fileName:_,lineNumber:476,columnNumber:11},this),(0,g.jsxDEV)(`p`,{className:`section-desc`,children:i(`backupDesc`)},void 0,!1,{fileName:_,lineNumber:477,columnNumber:11},this),(0,g.jsxDEV)(`div`,{className:`backup-actions`,children:[(0,g.jsxDEV)(`button`,{type:`button`,onClick:()=>{try{let e={invoices:JSON.parse(localStorage.getItem(`31lab_invoices`)||`[]`),clients:JSON.parse(localStorage.getItem(`31lab_clients`)||`[]`),settings:JSON.parse(localStorage.getItem(`31lab_settings`)||`{}`)},t=`data:text/json;charset=utf-8,`+encodeURIComponent(JSON.stringify(e,null,2)),n=document.createElement(`a`);n.setAttribute(`href`,t),n.setAttribute(`download`,`31lab_invoice_backup_${new Date().toISOString().split(`T`)[0]}.json`),document.body.appendChild(n),n.click(),n.remove()}catch{alert(`Gagal membuat sandaran data.`)}},className:`btn btn-secondary`,children:[(0,g.jsxDEV)(r,{size:14},void 0,!1,{fileName:_,lineNumber:482,columnNumber:15},this),` `,i(`downloadBackup`)]},void 0,!0,{fileName:_,lineNumber:481,columnNumber:13},this),(0,g.jsxDEV)(`div`,{className:`restore-wrapper`,children:[(0,g.jsxDEV)(`input`,{type:`file`,id:`restore_input`,accept:`.json`,onChange:e=>{let t=e.target.files[0];if(!t)return;let n=new FileReader;n.onload=e=>{try{let t=JSON.parse(e.target.result);t.invoices||t.clients||t.settings?confirm(`Amaran: Ini akan menggantikan data tempatan semasa anda. Teruskan?`)&&(t.invoices&&localStorage.setItem(`31lab_invoices`,JSON.stringify(t.invoices)),t.clients&&localStorage.setItem(`31lab_clients`,JSON.stringify(t.clients)),t.settings&&localStorage.setItem(`31lab_settings`,JSON.stringify(t.settings)),alert(`Pemulihan data berjaya! Sila segar semula aplikasi.`),window.location.reload()):alert(`Format fail sandaran tidak sah.`)}catch{alert(`Gagal membaca fail JSON.`)}},n.readAsText(t)},className:`file-input-hidden`},void 0,!1,{fileName:_,lineNumber:486,columnNumber:15},this),(0,g.jsxDEV)(`label`,{htmlFor:`restore_input`,className:`btn btn-secondary`,children:[(0,g.jsxDEV)(m,{size:14},void 0,!1,{fileName:_,lineNumber:494,columnNumber:17},this),` `,i(`uploadRestore`)]},void 0,!0,{fileName:_,lineNumber:493,columnNumber:15},this)]},void 0,!0,{fileName:_,lineNumber:485,columnNumber:13},this)]},void 0,!0,{fileName:_,lineNumber:480,columnNumber:11},this)]},void 0,!0,{fileName:_,lineNumber:475,columnNumber:9},this),(0,g.jsxDEV)(`div`,{className:`form-actions`,children:[(0,g.jsxDEV)(`button`,{type:`submit`,className:`btn btn-primary`,disabled:T,children:[(0,g.jsxDEV)(p,{size:16},void 0,!1,{fileName:_,lineNumber:503,columnNumber:13},this),` `,T?`Menyimpan...`:i(`saveSettings`)]},void 0,!0,{fileName:_,lineNumber:502,columnNumber:11},this),j===`success`&&(0,g.jsxDEV)(`span`,{className:`save-status-msg success`,children:[(0,g.jsxDEV)(t,{size:16},void 0,!1,{fileName:_,lineNumber:508,columnNumber:15},this),` `,i(`settingsSaved`)]},void 0,!0,{fileName:_,lineNumber:507,columnNumber:13},this)]},void 0,!0,{fileName:_,lineNumber:501,columnNumber:9},this)]},void 0,!0,{fileName:_,lineNumber:235,columnNumber:7},this),(0,g.jsxDEV)(`style`,{children:`
        .settings-form {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          margin-bottom: 4rem;
        }

        .section-title {
          font-family: var(--font-primary);
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 0.75rem;
          margin-bottom: 0.5rem;
        }

        .section-desc {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        .helper-text {
          font-size: 0.75rem;
          color: var(--text-light);
          margin-top: -0.25rem;
        }

        .file-upload-wrapper {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-top: 0.25rem;
        }

        .file-input-hidden {
          display: none;
        }

        .preview-container {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .logo-preview {
          height: 50px;
          object-fit: contain;
          border: 1px solid var(--border-color);
          padding: 4px;
          background: #fff;
        }

        .qr-preview {
          height: 100px;
          width: 100px;
          object-fit: contain;
          border: 1px solid var(--border-color);
          padding: 4px;
          background: #fff;
        }

        .btn-delete-img {
          font-size: 0.75rem;
          font-weight: 600;
        }

        .supabase-actions-container {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-top: 0.5rem;
          flex-wrap: wrap;
        }

        .status-msg {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .status-msg.testing {
          color: var(--text-muted);
        }

        .status-msg.success {
          color: #15803D;
        }

        .status-msg.error {
          color: #B91C1C;
        }

        .spinner {
          animation: spin 1s linear infinite;
        }

        .backup-actions {
          display: flex;
          gap: 1rem;
          margin-top: 0.5rem;
          flex-wrap: wrap;
        }

        .restore-wrapper {
          position: relative;
        }

        .form-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          border-top: 1px solid var(--border-color);
          padding-top: 2rem;
        }

        .save-status-msg.success {
          color: #15803D;
          font-weight: 600;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `},void 0,!1,{fileName:_,lineNumber:514,columnNumber:7},this)]},void 0,!0,{fileName:_,lineNumber:229,columnNumber:5},this)}export{v as default};