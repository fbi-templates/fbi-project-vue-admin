module.exports = function getOptions (optionsPath = 'fbi/options.js') {
  try {
    const options = require(ctx.utils.path.cwd(optionsPath))
    return options || {}
  } catch (err) {
    return ctx.options || {}
  }
}
