let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
});

export const getInstallPrompt = () => deferredPrompt;
export const clearInstallPrompt = () => { deferredPrompt = null; };
