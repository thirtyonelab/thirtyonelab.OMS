import{t as e}from"./circle-alert-CqaWkkjO.js";import{t}from"./circle-check-CIvbMRgv.js";import{t as n}from"./refresh-cw-BXHZ2dtz.js";import{C as r,D as i,E as a,O as o,_ as s,h as c,n as l,p as u,r as d,u as f,y as p}from"./index-Bywbu2Tq.js";var m=a(`file-spreadsheet`,[[`path`,{d:`M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z`,key:`1oefj6`}],[`path`,{d:`M14 2v5a1 1 0 0 0 1 1h5`,key:`wfsgrz`}],[`path`,{d:`M8 13h2`,key:`yr2amv`}],[`path`,{d:`M14 13h2`,key:`un5t4a`}],[`path`,{d:`M8 17h2`,key:`2yhykz`}],[`path`,{d:`M14 17h2`,key:`10kma7`}]]),h=o(i(),1),g=d();function _(){let{tr:i}=l(),[a,o]=(0,h.useState)({company_name:``,company_address:``,company_phone:``,company_logo:``,invoice_prefix:``,bank_name:``,bank_account:``,qr_code:``,terms:``}),[d,_]=(0,h.useState)(localStorage.getItem(`supabase_url`)||`https://jcwvhpreptjfucrhbzcy.supabase.co`),[v,y]=(0,h.useState)(localStorage.getItem(`supabase_anon_key`)||`sb_publishable_tR03lALW-SHxK625ZoYpWA_n6cVQZqA`),[b,x]=(0,h.useState)(``),[S,C]=(0,h.useState)(``),[w,T]=(0,h.useState)(!1),[E,D]=(0,h.useState)(null),[O,k]=(0,h.useState)(``),[A,j]=(0,h.useState)(null);(0,h.useEffect)(()=>{N()},[]);let M=e=>{if(!e)return{number:``,name:``};let t=e.match(/^(.*?)\s*\((.*?)\)\s*$/);return t?{number:t[1].trim(),name:t[2].trim()}:{number:e.trim(),name:``}},N=async()=>{T(!0);try{let e=await f();o(e);let t=M(e.bank_account);x(t.number),C(t.name)}catch(e){console.error(`Error loading settings:`,e)}finally{T(!1)}},P=e=>{let{name:t,value:n}=e.target;o(e=>({...e,[t]:n}))},F=e=>{let t=e.target.value;x(t),o(e=>({...e,bank_account:S?`${t} (${S})`:t}))},I=e=>{let t=e.target.value;C(t),o(e=>({...e,bank_account:t?`${b} (${t})`:b}))},L=(e,t)=>{let n=e.target.files[0];if(!n)return;if(n.size>500*1024){alert(`Had saiz fail adalah 500KB. Sila kecilkan saiz imej anda.`);return}let r=new FileReader;r.onloadend=()=>{o(e=>({...e,[t]:r.result}))},r.readAsDataURL(n)};return(0,g.jsxs)(`div`,{className:`main-content`,children:[(0,g.jsxs)(`div`,{children:[(0,g.jsx)(`span`,{className:`section-tag`,children:i(`sysConfig`)}),(0,g.jsx)(`h1`,{children:i(`settingsTitle`)})]}),(0,g.jsxs)(`form`,{onSubmit:async e=>{e.preventDefault(),T(!0),j(null);try{await u(a),d.trim()&&v.trim()?(localStorage.setItem(`supabase_url`,d.trim()),localStorage.setItem(`supabase_anon_key`,v.trim())):(localStorage.removeItem(`supabase_url`),localStorage.removeItem(`supabase_anon_key`)),j(`success`),setTimeout(()=>j(null),3e3),window.dispatchEvent(new Event(`supabase-connection-changed`)),N()}catch(e){console.error(`Failed to save settings:`,e),j(`error`)}finally{T(!1)}},className:`settings-form`,children:[(0,g.jsxs)(`section`,{className:`settings-section card`,children:[(0,g.jsx)(`h3`,{className:`section-title`,children:i(`compInfo`)}),(0,g.jsxs)(`div`,{className:`grid-2`,children:[(0,g.jsxs)(`div`,{className:`form-group`,children:[(0,g.jsx)(`label`,{className:`form-label`,children:i(`compName`)}),(0,g.jsx)(`input`,{type:`text`,name:`company_name`,value:a.company_name,onChange:P,className:`form-control`,required:!0})]}),(0,g.jsxs)(`div`,{className:`form-group`,children:[(0,g.jsx)(`label`,{className:`form-label`,children:i(`phoneNo`)}),(0,g.jsx)(`input`,{type:`text`,name:`company_phone`,value:a.company_phone,onChange:P,className:`form-control`,required:!0})]})]}),(0,g.jsxs)(`div`,{className:`form-group`,children:[(0,g.jsx)(`label`,{className:`form-label`,children:i(`storeAddress`)}),(0,g.jsx)(`textarea`,{name:`company_address`,value:a.company_address,onChange:P,rows:`3`,className:`form-control`,style:{resize:`none`},required:!0})]}),(0,g.jsxs)(`div`,{className:`grid-2`,children:[(0,g.jsxs)(`div`,{className:`form-group`,children:[(0,g.jsx)(`label`,{className:`form-label`,children:i(`compLogo`)}),(0,g.jsxs)(`div`,{className:`file-upload-wrapper`,children:[(0,g.jsx)(`input`,{type:`file`,id:`company_logo_input`,accept:`image/*`,onChange:e=>L(e,`company_logo`),className:`file-input-hidden`}),(0,g.jsxs)(`label`,{htmlFor:`company_logo_input`,className:`btn btn-secondary btn-sm`,children:[(0,g.jsx)(s,{size:14}),` `,i(`uploadLogo`)]}),a.company_logo&&(0,g.jsxs)(`div`,{className:`preview-container`,children:[(0,g.jsx)(`img`,{src:a.company_logo,alt:`Company Logo Preview`,className:`logo-preview`}),(0,g.jsx)(`button`,{type:`button`,onClick:()=>o(e=>({...e,company_logo:``})),className:`btn-text btn-delete-img`,children:i(`delete`)})]})]})]}),(0,g.jsxs)(`div`,{className:`form-group`,children:[(0,g.jsx)(`label`,{className:`form-label`,children:i(`invoicePrefix`)}),(0,g.jsx)(`input`,{type:`text`,name:`invoice_prefix`,value:a.invoice_prefix,onChange:P,className:`form-control`,placeholder:`Contoh: NO.`,required:!0}),(0,g.jsx)(`span`,{className:`helper-text`,children:i(`invoicePrefixHelp`)})]})]})]}),(0,g.jsxs)(`section`,{className:`settings-section card`,children:[(0,g.jsx)(`h3`,{className:`section-title`,children:i(`paymentInfo`)}),(0,g.jsxs)(`div`,{className:`grid-3`,children:[(0,g.jsxs)(`div`,{className:`form-group`,children:[(0,g.jsx)(`label`,{className:`form-label`,children:i(`bankName`)}),(0,g.jsx)(`input`,{type:`text`,name:`bank_name`,value:a.bank_name,onChange:P,placeholder:`Contoh: Maybank`,className:`form-control`})]}),(0,g.jsxs)(`div`,{className:`form-group`,children:[(0,g.jsx)(`label`,{className:`form-label`,children:i(`bankAccNo`)}),(0,g.jsx)(`input`,{type:`text`,name:`bank_account_no`,value:b,onChange:F,placeholder:`Contoh: 112233445566`,className:`form-control`})]}),(0,g.jsxs)(`div`,{className:`form-group`,children:[(0,g.jsx)(`label`,{className:`form-label`,children:i(`accName`)}),(0,g.jsx)(`input`,{type:`text`,name:`bank_account_name`,value:S,onChange:I,placeholder:`Contoh: THIRTYONE LAB`,className:`form-control`})]})]}),(0,g.jsxs)(`div`,{className:`form-group`,children:[(0,g.jsx)(`label`,{className:`form-label`,children:i(`qrCode`)}),(0,g.jsxs)(`div`,{className:`file-upload-wrapper`,children:[(0,g.jsx)(`input`,{type:`file`,id:`qr_code_input`,accept:`image/*`,onChange:e=>L(e,`qr_code`),className:`file-input-hidden`}),(0,g.jsxs)(`label`,{htmlFor:`qr_code_input`,className:`btn btn-secondary btn-sm`,children:[(0,g.jsx)(s,{size:14}),` `,i(`uploadQR`)]}),a.qr_code&&(0,g.jsxs)(`div`,{className:`preview-container`,children:[(0,g.jsx)(`img`,{src:a.qr_code,alt:`DuitNow QR Preview`,className:`qr-preview`}),(0,g.jsx)(`button`,{type:`button`,onClick:()=>o(e=>({...e,qr_code:``})),className:`btn-text btn-delete-img`,children:i(`delete`)})]})]})]})]}),(0,g.jsxs)(`section`,{className:`settings-section card`,children:[(0,g.jsx)(`h3`,{className:`section-title`,children:i(`termsTitle`)}),(0,g.jsxs)(`div`,{className:`form-group`,children:[(0,g.jsx)(`label`,{className:`form-label`,children:i(`termsLabel`)}),(0,g.jsx)(`textarea`,{name:`terms`,value:a.terms,onChange:P,rows:`4`,placeholder:`Masukkan terma dan syarat perniagaan yang akan dicetak di bahagian bawah invoice...`,className:`form-control`,style:{resize:`none`}}),(0,g.jsx)(`span`,{className:`helper-text`,children:i(`termsHelp`)})]})]}),(0,g.jsxs)(`section`,{className:`settings-section card`,children:[(0,g.jsx)(`h3`,{className:`section-title`,children:i(`dbTitle`)}),(0,g.jsx)(`p`,{className:`section-desc`,children:i(`dbDesc`)}),(0,g.jsxs)(`div`,{className:`form-group`,children:[(0,g.jsx)(`label`,{className:`form-label`,children:`Supabase Project URL`}),(0,g.jsx)(`input`,{type:`url`,value:d,onChange:e=>{_(e.target.value),D(null)},placeholder:`https://your-project-id.supabase.co`,className:`form-control`})]}),(0,g.jsxs)(`div`,{className:`form-group`,children:[(0,g.jsx)(`label`,{className:`form-label`,children:`Supabase Anon Key`}),(0,g.jsx)(`input`,{type:`password`,value:v,onChange:e=>{y(e.target.value),D(null)},placeholder:`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`,className:`form-control`})]}),(0,g.jsxs)(`div`,{className:`supabase-actions-container`,children:[(0,g.jsx)(`button`,{type:`button`,onClick:async()=>{if(!d||!v){D(`error`),k(`Sila masukkan URL dan Anon Key Supabase.`);return}D(`testing`),k(``);try{let{data:e,error:t}=await c(d,v).from(`settings`).select(`*`).limit(1);if(t)if(t.code===`PGRST116`||t.message.includes(`relation "settings" does not exist`))D(`error`),k(`Berjaya bersambung ke Supabase, tetapi jadual "settings" tidak ditemui. Sila jalankan SQL DDL terlebih dahulu.`);else throw t;else D(`success`)}catch(e){console.error(`Supabase test failed:`,e),D(`error`),k(e.message||`Gagal bersambung ke Supabase. Sila semak URL & Key.`)}},className:`btn btn-secondary`,children:i(`testConnection`)}),E===`testing`&&(0,g.jsxs)(`span`,{className:`status-msg testing`,children:[(0,g.jsx)(n,{className:`spinner`,size:16}),` `,i(`testingDb`)]}),E===`success`&&(0,g.jsxs)(`span`,{className:`status-msg success`,children:[(0,g.jsx)(t,{size:16}),` Sambungan Berjaya! Database sedia untuk digunakan.`]}),E===`error`&&(0,g.jsxs)(`span`,{className:`status-msg error`,children:[(0,g.jsx)(e,{size:16}),` `,O]})]})]}),(0,g.jsxs)(`section`,{className:`settings-section card`,children:[(0,g.jsx)(`h3`,{className:`section-title`,children:i(`backupTitle`)}),(0,g.jsx)(`p`,{className:`section-desc`,children:i(`backupDesc`)}),(0,g.jsxs)(`div`,{className:`backup-actions`,children:[(0,g.jsxs)(`button`,{type:`button`,onClick:()=>{try{let e={invoices:JSON.parse(localStorage.getItem(`31lab_invoices`)||`[]`),clients:JSON.parse(localStorage.getItem(`31lab_clients`)||`[]`),settings:JSON.parse(localStorage.getItem(`31lab_settings`)||`{}`)},t=`data:text/json;charset=utf-8,`+encodeURIComponent(JSON.stringify(e,null,2)),n=document.createElement(`a`);n.setAttribute(`href`,t),n.setAttribute(`download`,`31lab_invoice_backup_${new Date().toISOString().split(`T`)[0]}.json`),document.body.appendChild(n),n.click(),n.remove()}catch{alert(`Gagal membuat sandaran data.`)}},className:`btn btn-secondary`,children:[(0,g.jsx)(r,{size:14}),` `,i(`downloadBackup`)]}),(0,g.jsxs)(`div`,{className:`restore-wrapper`,children:[(0,g.jsx)(`input`,{type:`file`,id:`restore_input`,accept:`.json`,onChange:e=>{let t=e.target.files[0];if(!t)return;let n=new FileReader;n.onload=e=>{try{let t=JSON.parse(e.target.result);t.invoices||t.clients||t.settings?confirm(`Amaran: Ini akan menggantikan data tempatan semasa anda. Teruskan?`)&&(t.invoices&&localStorage.setItem(`31lab_invoices`,JSON.stringify(t.invoices)),t.clients&&localStorage.setItem(`31lab_clients`,JSON.stringify(t.clients)),t.settings&&localStorage.setItem(`31lab_settings`,JSON.stringify(t.settings)),alert(`Pemulihan data berjaya! Sila segar semula aplikasi.`),window.location.reload()):alert(`Format fail sandaran tidak sah.`)}catch{alert(`Gagal membaca fail JSON.`)}},n.readAsText(t)},className:`file-input-hidden`}),(0,g.jsxs)(`label`,{htmlFor:`restore_input`,className:`btn btn-secondary`,children:[(0,g.jsx)(m,{size:14}),` `,i(`uploadRestore`)]})]})]})]}),(0,g.jsxs)(`div`,{className:`form-actions`,children:[(0,g.jsxs)(`button`,{type:`submit`,className:`btn btn-primary`,disabled:w,children:[(0,g.jsx)(p,{size:16}),` `,w?`Menyimpan...`:i(`saveSettings`)]}),A===`success`&&(0,g.jsxs)(`span`,{className:`save-status-msg success`,children:[(0,g.jsx)(t,{size:16}),` `,i(`settingsSaved`)]})]})]}),(0,g.jsx)(`style`,{children:`
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
      `})]})}export{_ as default};