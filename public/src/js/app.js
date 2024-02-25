var deferredPrompt

if (!window.Promise) {
  window.Promise = Promise
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(() => {
    console.log('Service Worker registered!')
  })
}

window.addEventListener('beforeinstallprompt', event => {
  console.log('Before install prompt fired')
  event.preventDefault()
  deferredPrompt = event
  return false
})
