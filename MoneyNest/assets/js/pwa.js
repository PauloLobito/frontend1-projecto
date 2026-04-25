document.addEventListener('DOMContentLoaded', () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('../sw.js').catch((error) => {
            console.error('[PWA] Service worker registration failed:', error);
        });
    }
});
