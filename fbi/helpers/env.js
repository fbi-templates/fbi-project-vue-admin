function getEnvs (data) {
  const tmp = []
  return Object.keys(data || {}).map(k => {
    const a = k.slice(0, 1)
    if (!tmp.includes(a)) {
      tmp.push(a)
      return {
        name: k,
        alias: a
      }
    }
    return {
      name: k,
      alias: ''
    }
  })
}

function getEnvsData (envName, dataObj) {
  const data = Object.assign({}, dataObj.all || {}, dataObj[envName])

  if (data && typeof data === 'object' && Object.keys(data).length > 0) {
    const copy = JSON.parse(JSON.stringify(data))
    copy.ENV = envName
    copy.PRODUCTION = envName !== 'dev'
    return copy
  }

  return {}
}

module.exports = (task, def, quiet) => {
  const envs = getEnvs(ctx.options.data)
  const taskParams = ctx.task.getParams(task)
  const params = {}

  let envName = def || 'dev'
  Object.keys(taskParams).map(p => {
    let found
    for (let i = 0, len = envs.length; i < len; i++) {
      if (envs[i].name === p || envs[i].alias === p) {
        found = envs[i].name
        break
      }
    }

    if (found) {
      envName = found
    } else {
      params[p] = taskParams[p]
    }
  })

  if (!quiet) {
    ctx.logger.log('Environment:', ctx.utils.style.yellow(envName))
  }

  return {
    name: envName,
    data: getEnvsData(envName, ctx.options.data),
    params
  }
}
