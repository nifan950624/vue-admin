const config = require('../vue.config.js')
const chalk = require('chalk')
const exec = require('child_process').exec
const rawArgv = process.argv.slice(2)
const fs = require('fs')
const path = require('path')

const isBuild = fs.existsSync(path.join(__dirname, '..', 'dist'))
const report = rawArgv.includes('--report')
const portReg = /PORT=(\d{1,5})/gi
const portPart = rawArgv.find(item => portReg.test(item))

const option = {
  port: portPart?.split('=')[1] || 10086
}
let args = rawArgv.join(' ')

args = args.replace(portReg, '')

if (isBuild && !args) {
  preview()
} else {
  exec(`vue-cli-service build ${args}`, err => {
    if (err) {
      console.log(chalk.red(err))
      return
    }
    preview()
  })
}

function preview() {
  const port = option.port
  const publicPath = config.publicPath

  var connect = require('connect')
  var serveStatic = require('serve-static')
  const app = connect()

  app.use(
    publicPath,
    serveStatic('./dist', {
      index: ['index.html', '/']
    })
  )

  app.listen(port, function() {
    if (report) {
      console.log(
        chalk.green(
          `> Report at  http://localhost:${port}${publicPath}report.html`
        )
      )
      return
    }

    console.log(
      chalk.green(`> Preview at  http://localhost:${port}${publicPath}`)
    )
  })
}
