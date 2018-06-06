// unregister service-worker for non main domain
if (location.origin !== 'https://eva-card.egoist.rocks') {
  /* eslint-disable */
  self.addEventListener('install', function(e) {
    self.skipWaiting()
  })

  self.addEventListener('activate', function(e) {
    self.registration
      .unregister()
      .then(function() {
        return self.clients.matchAll()
      })
      .then(function(clients) {
        clients.forEach(client => client.navigate(client.url))
      })
  })
}
