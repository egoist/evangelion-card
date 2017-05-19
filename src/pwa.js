import runtime from 'offline-plugin/runtime'

runtime.install({
  onUpdateReady() {
    console.log('update ready')
    runtime.applyUpdate()
  },

  onUpdated() {
    console.log('updated, reload to use new version')
  }
})
