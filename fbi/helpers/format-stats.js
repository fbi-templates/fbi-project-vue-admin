const fs = require('fs')
const path = require('path')
const zlib = require('zlib')

module.exports = function formatStats (stats, dir) {
  const json = stats.toJson({
    hash: false,
    modules: false,
    chunks: false
  })

  // console.log(json)

  let assets = json.assets
    ? json.assets
    : json.children.reduce((acc, child) => acc.concat(child.assets), [])

  const seenNames = new Map()
  const isJS = val => /\.js$/.test(val)
  const isCSS = val => /\.css$/.test(val)
  const isMinJS = val => /\.min\.js$/.test(val)
  let nameMaxLen = 0
  assets = assets
    .filter(a => {
      nameMaxLen = Math.max(nameMaxLen, a.name.trim().length)
      if (seenNames.has(a.name)) {
        return false
      }
      seenNames.set(a.name, true)
      return isJS(a.name) || isCSS(a.name)
    })
    .sort((a, b) => {
      if (isJS(a.name) && isCSS(b.name)) return -1
      if (isCSS(a.name) && isJS(b.name)) return 1
      if (isMinJS(a.name) && !isMinJS(b.name)) return -1
      if (!isMinJS(a.name) && isMinJS(b.name)) return 1
      return b.size - a.size
    })

  // console.log(assets, nameMaxLen)

  function formatSize (size) {
    return (size / 1024).toFixed(2) + ' KiB'
  }

  function getGzippedSize (asset) {
    const filepath = path.join(dir, asset.name)
    const buffer = fs.readFileSync(filepath)
    return formatSize(zlib.gzipSync(buffer).length)
  }

  function makeRow (a, b, c) {
    return `  ${a}\t    ${b}\t ${c}`
  }

  return (
    makeRow(
      ctx.utils.style.bold(`File`.padEnd(nameMaxLen, ' ')),
      ctx.utils.style.bold(`Size`),
      ctx.utils.style.bold(`Gzipped`)
    ) +
    `\n` +
    assets
      .map(asset =>
        makeRow(
          /js$/.test(asset.name)
            ? ctx.utils.style.cyan(asset.name.padEnd(nameMaxLen, ' '))
            : ctx.utils.style.blue(asset.name.padEnd(nameMaxLen, ' ')),
          formatSize(asset.size),
          getGzippedSize(asset)
        )
      )
      .join(`\n`)
  )
}
