import configs from '@/configs'
  ;(function (win, doc) {
  if (!win.addEventListener) {
    return
  }
  const el = doc.documentElement || doc.body
  const evt = 'orientationchange' in win ? 'orientationchange' : 'resize'
  function setFont () {
    const clientWidth = el.clientWidth
    el.style.fontSize =
      clientWidth <= configs.largeScreenMinWidth
        ? '100px'
        : 100 * (clientWidth / configs.largeScreenMinWidth) + 'px'
  }
  setFont()
  win.addEventListener(evt, setFont, false)
})(window, document)
