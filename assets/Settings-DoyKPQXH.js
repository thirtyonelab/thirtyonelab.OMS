import{t as e}from"./circle-check-Dhc6TeA8.js";import{t}from"./refresh-cw-I85yGdBp.js";import{A as n,C as r,F as i,I as a,N as o,d as s,h as c,n as l,t as u,v as d,w as f,x as p}from"./index-C-AK7ckG.js";var m=o(`download`,[[`path`,{d:`M12 15V3`,key:`m9g1x1`}],[`path`,{d:`M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4`,key:`ih7n3h`}],[`path`,{d:`m7 10 5 5 5-5`,key:`brsn70`}]]),h=o(`file-spreadsheet`,[[`path`,{d:`M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z`,key:`1oefj6`}],[`path`,{d:`M14 2v5a1 1 0 0 0 1 1h5`,key:`wfsgrz`}],[`path`,{d:`M8 13h2`,key:`yr2amv`}],[`path`,{d:`M14 13h2`,key:`un5t4a`}],[`path`,{d:`M8 17h2`,key:`2yhykz`}],[`path`,{d:`M14 17h2`,key:`10kma7`}]]),g=a(i(),1),_=l();function v(){let{tr:i}=u(),[a,o]=(0,g.useState)({company_name:``,company_address:``,company_phone:``,company_logo:``,invoice_prefix:``,bank_name:``,bank_account:``,qr_code:``,terms:``}),[l,v]=(0,g.useState)(localStorage.getItem(`supabase_url`)||`https://jcwvhpreptjfucrhbzcy.supabase.co`),[y,b]=(0,g.useState)(localStorage.getItem(`supabase_anon_key`)||`sb_publishable_tR03lALW-SHxK625ZoYpWA_n6cVQZqA`),[x,S]=(0,g.useState)(``),[C,w]=(0,g.useState)(``),[T,E]=(0,g.useState)([]),[D,O]=(0,g.useState)(`profile_1`),[k,A]=(0,g.useState)(!1),[j,M]=(0,g.useState)(null),[N,P]=(0,g.useState)(``),[F,I]=(0,g.useState)(null);(0,g.useEffect)(()=>{R()},[]);let L=e=>{if(!e)return{number:``,name:``};let t=e.match(/^(.*?)\s*\((.*?)\)\s*$/);return t?{number:t[1].trim(),name:t[2].trim()}:{number:e.trim(),name:``}},R=async()=>{A(!0);try{let e=await s();o(e);let t=L(e.bank_account);S(t.number),w(t.name);let n=localStorage.getItem(`31lab_payment_profiles`),r=localStorage.getItem(`31lab_selected_payment_profile`)||`profile_1`,i=[];if(n)try{i=JSON.parse(n)}catch{i=[]}(!Array.isArray(i)||i.length===0)&&(i=[{id:`profile_1`,label:`Akaun 1 (Bank Islam)`,bank_name:e.bank_name||`Bank Islam`,bank_account_no:t.number||`0502 1020 4490 03`,bank_account_name:t.name||`Hidayatul Rizman bin Rafiuddarajat`,qr_code:e.qr_code||``},{id:`profile_2`,label:`Akaun 2 (Pilihan Lain)`,bank_name:``,bank_account_no:``,bank_account_name:``,qr_code:``}],localStorage.setItem(`31lab_payment_profiles`,JSON.stringify(i))),E(i);let a=i.some(e=>e.id===r)?r:i[0].id;O(a)}catch(e){console.error(`Error loading settings:`,e)}finally{A(!1)}},z=e=>{E(t=>{let n=t.map(t=>t.id===D?{...t,...e}:t);return localStorage.setItem(`31lab_payment_profiles`,JSON.stringify(n)),n})},B=e=>{O(e),localStorage.setItem(`31lab_selected_payment_profile`,e);let t=T.find(t=>t.id===e);if(t){let e=t.bank_account_no||``,n=t.bank_account_name||``,r=t.bank_name||``,i=t.qr_code||``;S(e),w(n),o(t=>({...t,bank_name:r,bank_account:n?`${e} (${n})`:e,qr_code:i}))}},V=e=>{let t=e.target.value;z({label:t})},H=()=>{let e=`profile_${Date.now()}`,t={id:e,label:`Akaun ${T.length+1}`,bank_name:``,bank_account_no:``,bank_account_name:``,qr_code:``},n=[...T,t];E(n),localStorage.setItem(`31lab_payment_profiles`,JSON.stringify(n)),O(e),localStorage.setItem(`31lab_selected_payment_profile`,e),S(``),w(``),o(e=>({...e,bank_name:``,bank_account:``,qr_code:``}))},U=e=>{if(T.length<=1){alert(`Sekurang-kurangnya satu profil pembayaran diperlukan.`);return}let t=T.filter(t=>t.id!==e);E(t),localStorage.setItem(`31lab_payment_profiles`,JSON.stringify(t)),D===e&&B(t[0].id)},W=e=>{let{name:t,value:n}=e.target;o(e=>({...e,[t]:n}))},G=e=>{let t=e.target.value;S(t),o(e=>({...e,bank_account:C?`${t} (${C})`:t})),z({bank_account_no:t})},K=e=>{let t=e.target.value;o(e=>({...e,bank_name:t})),z({bank_name:t})},q=e=>{let t=e.target.value;w(t),o(e=>({...e,bank_account:t?`${x} (${t})`:x})),z({bank_account_name:t})},J=()=>{o(e=>({...e,qr_code:``})),z({qr_code:``})},Y=(e,t)=>{let n=e.target.files[0];if(!n)return;if(n.size>500*1024){alert(`Had saiz fail adalah 500KB. Sila kecilkan saiz imej anda.`);return}let r=new FileReader;r.onloadend=()=>{o(e=>({...e,[t]:r.result})),t===`qr_code`&&z({qr_code:r.result})},r.readAsDataURL(n)};return(0,_.jsxs)(`div`,{className:`main-content`,children:[(0,_.jsxs)(`div`,{children:[(0,_.jsx)(`span`,{className:`section-tag`,children:i(`sysConfig`)}),(0,_.jsx)(`h1`,{children:i(`settingsTitle`)})]}),(0,_.jsxs)(`form`,{onSubmit:async e=>{e.preventDefault(),A(!0),I(null);try{await c(a),localStorage.setItem(`31lab_payment_profiles`,JSON.stringify(T)),localStorage.setItem(`31lab_selected_payment_profile`,D),l.trim()&&y.trim()?(localStorage.setItem(`supabase_url`,l.trim()),localStorage.setItem(`supabase_anon_key`,y.trim())):(localStorage.removeItem(`supabase_url`),localStorage.removeItem(`supabase_anon_key`)),I(`success`),setTimeout(()=>I(null),3e3),window.dispatchEvent(new Event(`supabase-connection-changed`)),R()}catch(e){console.error(`Failed to save settings:`,e),I(`error`)}finally{A(!1)}},className:`settings-form`,children:[(0,_.jsxs)(`section`,{className:`settings-section card`,children:[(0,_.jsx)(`h3`,{className:`section-title`,children:i(`compInfo`)}),(0,_.jsxs)(`div`,{className:`grid-2`,children:[(0,_.jsxs)(`div`,{className:`form-group`,children:[(0,_.jsx)(`label`,{className:`form-label`,children:i(`compName`)}),(0,_.jsx)(`input`,{type:`text`,name:`company_name`,value:a.company_name,onChange:W,className:`form-control`,required:!0})]}),(0,_.jsxs)(`div`,{className:`form-group`,children:[(0,_.jsx)(`label`,{className:`form-label`,children:i(`phoneNo`)}),(0,_.jsx)(`input`,{type:`text`,name:`company_phone`,value:a.company_phone,onChange:W,className:`form-control`,required:!0})]})]}),(0,_.jsxs)(`div`,{className:`form-group`,children:[(0,_.jsx)(`label`,{className:`form-label`,children:i(`storeAddress`)}),(0,_.jsx)(`textarea`,{name:`company_address`,value:a.company_address,onChange:W,rows:`3`,className:`form-control`,style:{resize:`none`},required:!0})]}),(0,_.jsxs)(`div`,{className:`grid-2`,children:[(0,_.jsxs)(`div`,{className:`form-group`,children:[(0,_.jsx)(`label`,{className:`form-label`,children:i(`compLogo`)}),(0,_.jsxs)(`div`,{className:`file-upload-wrapper`,children:[(0,_.jsx)(`input`,{type:`file`,id:`company_logo_input`,accept:`image/*`,onChange:e=>Y(e,`company_logo`),className:`file-input-hidden`}),(0,_.jsxs)(`label`,{htmlFor:`company_logo_input`,className:`btn btn-secondary btn-sm`,children:[(0,_.jsx)(p,{size:14}),` `,i(`uploadLogo`)]}),a.company_logo&&(0,_.jsxs)(`div`,{className:`preview-container`,children:[(0,_.jsx)(`img`,{src:a.company_logo,alt:`Company Logo Preview`,className:`logo-preview`}),(0,_.jsx)(`button`,{type:`button`,onClick:()=>o(e=>({...e,company_logo:``})),className:`btn-text btn-delete-img`,children:i(`delete`)})]})]})]}),(0,_.jsxs)(`div`,{className:`form-group`,children:[(0,_.jsx)(`label`,{className:`form-label`,children:i(`invoicePrefix`)}),(0,_.jsx)(`input`,{type:`text`,name:`invoice_prefix`,value:a.invoice_prefix,onChange:W,className:`form-control`,placeholder:`Contoh: NO.`,required:!0}),(0,_.jsx)(`span`,{className:`helper-text`,children:i(`invoicePrefixHelp`)})]})]})]}),(0,_.jsxs)(`section`,{className:`settings-section card`,children:[(0,_.jsx)(`h3`,{className:`section-title`,children:i(`paymentInfo`)}),(0,_.jsxs)(`div`,{className:`grid-2`,children:[(0,_.jsxs)(`div`,{className:`form-group`,children:[(0,_.jsx)(`label`,{className:`form-label`,children:i(`selectProfile`)}),(0,_.jsxs)(`select`,{value:D,onChange:e=>{e.target.value===`__add_new__`?H():B(e.target.value)},className:`form-control`,children:[T.map(e=>(0,_.jsx)(`option`,{value:e.id,children:e.label||(e.bank_name?`${e.bank_name} - ${e.bank_account_name||e.bank_account_no}`:`Profil Tanpa Nama`)},e.id)),(0,_.jsxs)(`option`,{value:`__add_new__`,children:[`+ `,i(`addProfile`)]})]})]}),(0,_.jsxs)(`div`,{className:`form-group`,children:[(0,_.jsx)(`label`,{className:`form-label`,children:i(`profileLabel`)}),(0,_.jsxs)(`div`,{style:{display:`flex`,gap:`8px`},children:[(0,_.jsx)(`input`,{type:`text`,value:T.find(e=>e.id===D)?.label||``,onChange:V,placeholder:`Contoh: Akaun 1 (Bank Islam)`,className:`form-control`,style:{flex:1}}),T.length>1&&(0,_.jsx)(`button`,{type:`button`,onClick:()=>U(D),className:`btn btn-secondary btn-sm`,style:{color:`var(--primary-red)`,borderColor:`var(--border-color)`,padding:`0 12px`},title:i(`deleteProfile`),children:(0,_.jsx)(r,{size:15})})]})]})]}),(0,_.jsxs)(`div`,{className:`grid-3`,style:{marginTop:`1rem`},children:[(0,_.jsxs)(`div`,{className:`form-group`,children:[(0,_.jsx)(`label`,{className:`form-label`,children:i(`bankName`)}),(0,_.jsx)(`input`,{type:`text`,name:`bank_name`,value:a.bank_name,onChange:K,placeholder:`Contoh: Maybank / Bank Islam`,className:`form-control`})]}),(0,_.jsxs)(`div`,{className:`form-group`,children:[(0,_.jsx)(`label`,{className:`form-label`,children:i(`bankAccNo`)}),(0,_.jsx)(`input`,{type:`text`,name:`bank_account_no`,value:x,onChange:G,placeholder:`Contoh: 112233445566`,className:`form-control`})]}),(0,_.jsxs)(`div`,{className:`form-group`,children:[(0,_.jsx)(`label`,{className:`form-label`,children:i(`accName`)}),(0,_.jsx)(`input`,{type:`text`,name:`bank_account_name`,value:C,onChange:q,placeholder:`Contoh: THIRTYONE LAB / NAMA PEMILIK`,className:`form-control`})]})]}),(0,_.jsxs)(`div`,{className:`form-group`,style:{marginTop:`1rem`},children:[(0,_.jsx)(`label`,{className:`form-label`,children:i(`qrCode`)}),(0,_.jsxs)(`div`,{className:`file-upload-wrapper`,children:[(0,_.jsx)(`input`,{type:`file`,id:`qr_code_input`,accept:`image/*`,onChange:e=>Y(e,`qr_code`),className:`file-input-hidden`}),(0,_.jsxs)(`label`,{htmlFor:`qr_code_input`,className:`btn btn-secondary btn-sm`,children:[(0,_.jsx)(p,{size:14}),` `,i(`uploadQR`)]}),a.qr_code&&(0,_.jsxs)(`div`,{className:`preview-container`,children:[(0,_.jsx)(`img`,{src:a.qr_code,alt:`DuitNow QR Preview`,className:`qr-preview`}),(0,_.jsx)(`button`,{type:`button`,onClick:J,className:`btn-text btn-delete-img`,children:i(`delete`)})]})]})]})]}),(0,_.jsxs)(`section`,{className:`settings-section card`,children:[(0,_.jsx)(`h3`,{className:`section-title`,children:i(`termsTitle`)}),(0,_.jsxs)(`div`,{className:`form-group`,children:[(0,_.jsx)(`label`,{className:`form-label`,children:i(`termsLabel`)}),(0,_.jsx)(`textarea`,{name:`terms`,value:a.terms,onChange:W,rows:`4`,placeholder:`Masukkan terma dan syarat perniagaan yang akan dicetak di bahagian bawah invoice...`,className:`form-control`,style:{resize:`none`}}),(0,_.jsx)(`span`,{className:`helper-text`,children:i(`termsHelp`)})]})]}),(0,_.jsxs)(`section`,{className:`settings-section card`,children:[(0,_.jsx)(`h3`,{className:`section-title`,children:i(`dbTitle`)}),(0,_.jsx)(`p`,{className:`section-desc`,children:i(`dbDesc`)}),(0,_.jsxs)(`div`,{className:`form-group`,children:[(0,_.jsx)(`label`,{className:`form-label`,children:`Supabase Project URL`}),(0,_.jsx)(`input`,{type:`url`,value:l,onChange:e=>{v(e.target.value),M(null)},placeholder:`https://your-project-id.supabase.co`,className:`form-control`})]}),(0,_.jsxs)(`div`,{className:`form-group`,children:[(0,_.jsx)(`label`,{className:`form-label`,children:`Supabase Anon Key`}),(0,_.jsx)(`input`,{type:`password`,value:y,onChange:e=>{b(e.target.value),M(null)},placeholder:`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`,className:`form-control`})]}),(0,_.jsxs)(`div`,{className:`supabase-actions-container`,children:[(0,_.jsx)(`button`,{type:`button`,onClick:async()=>{if(!l||!y){M(`error`),P(`Sila masukkan URL dan Anon Key Supabase.`);return}M(`testing`),P(``);try{let{data:e,error:t}=await d(l,y).from(`settings`).select(`*`).limit(1);if(t)if(t.code===`PGRST116`||t.message.includes(`relation "settings" does not exist`))M(`error`),P(`Berjaya bersambung ke Supabase, tetapi jadual "settings" tidak ditemui. Sila jalankan SQL DDL terlebih dahulu.`);else throw t;else M(`success`)}catch(e){console.error(`Supabase test failed:`,e),M(`error`),P(e.message||`Gagal bersambung ke Supabase. Sila semak URL & Key.`)}},className:`btn btn-secondary`,children:i(`testConnection`)}),j===`testing`&&(0,_.jsxs)(`span`,{className:`status-msg testing`,children:[(0,_.jsx)(t,{className:`spinner`,size:16}),` `,i(`testingDb`)]}),j===`success`&&(0,_.jsxs)(`span`,{className:`status-msg success`,children:[(0,_.jsx)(e,{size:16}),` Sambungan Berjaya! Database sedia untuk digunakan.`]}),j===`error`&&(0,_.jsxs)(`span`,{className:`status-msg error`,children:[(0,_.jsx)(n,{size:16}),` `,N]})]})]}),(0,_.jsxs)(`section`,{className:`settings-section card`,children:[(0,_.jsx)(`h3`,{className:`section-title`,children:i(`backupTitle`)}),(0,_.jsx)(`p`,{className:`section-desc`,children:i(`backupDesc`)}),(0,_.jsxs)(`div`,{className:`backup-actions`,children:[(0,_.jsxs)(`button`,{type:`button`,onClick:()=>{try{let e={invoices:JSON.parse(localStorage.getItem(`31lab_invoices`)||`[]`),clients:JSON.parse(localStorage.getItem(`31lab_clients`)||`[]`),settings:JSON.parse(localStorage.getItem(`31lab_settings`)||`{}`),payment_profiles:JSON.parse(localStorage.getItem(`31lab_payment_profiles`)||`[]`),selected_payment_profile:localStorage.getItem(`31lab_selected_payment_profile`)||`profile_1`},t=`data:text/json;charset=utf-8,`+encodeURIComponent(JSON.stringify(e,null,2)),n=document.createElement(`a`);n.setAttribute(`href`,t),n.setAttribute(`download`,`31lab_invoice_backup_${new Date().toISOString().split(`T`)[0]}.json`),document.body.appendChild(n),n.click(),n.remove()}catch{alert(`Gagal membuat sandaran data.`)}},className:`btn btn-secondary`,children:[(0,_.jsx)(m,{size:14}),` `,i(`downloadBackup`)]}),(0,_.jsxs)(`div`,{className:`restore-wrapper`,children:[(0,_.jsx)(`input`,{type:`file`,id:`restore_input`,accept:`.json`,onChange:e=>{let t=e.target.files[0];if(!t)return;let n=new FileReader;n.onload=e=>{try{let t=JSON.parse(e.target.result);t.invoices||t.clients||t.settings||t.payment_profiles?confirm(`Amaran: Ini akan menggantikan data tempatan semasa anda. Teruskan?`)&&(t.invoices&&localStorage.setItem(`31lab_invoices`,JSON.stringify(t.invoices)),t.clients&&localStorage.setItem(`31lab_clients`,JSON.stringify(t.clients)),t.settings&&localStorage.setItem(`31lab_settings`,JSON.stringify(t.settings)),t.payment_profiles&&localStorage.setItem(`31lab_payment_profiles`,JSON.stringify(t.payment_profiles)),t.selected_payment_profile&&localStorage.setItem(`31lab_selected_payment_profile`,t.selected_payment_profile),alert(`Pemulihan data berjaya! Sila segar semula aplikasi.`),window.location.reload()):alert(`Format fail sandaran tidak sah.`)}catch{alert(`Gagal membaca fail JSON.`)}},n.readAsText(t)},className:`file-input-hidden`}),(0,_.jsxs)(`label`,{htmlFor:`restore_input`,className:`btn btn-secondary`,children:[(0,_.jsx)(h,{size:14}),` `,i(`uploadRestore`)]})]})]})]}),(0,_.jsxs)(`div`,{className:`form-actions`,children:[(0,_.jsxs)(`button`,{type:`submit`,className:`btn btn-primary`,disabled:k,children:[(0,_.jsx)(f,{size:16}),` `,k?`Menyimpan...`:i(`saveSettings`)]}),F===`success`&&(0,_.jsxs)(`span`,{className:`save-status-msg success`,children:[(0,_.jsx)(e,{size:16}),` `,i(`settingsSaved`)]})]})]}),(0,_.jsx)(`style`,{children:`
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
      `})]})}export{v as default};