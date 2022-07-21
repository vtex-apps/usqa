const qe = require('./node/utils')
const { getConfig } = require('./node/config')
const { vtexCli } = require('./node/cli')
const { report } = require('./node/report')

// Controls test state
const control = {
  start: qe.tick(),
  timing: {},
  specsFailed: [],
  specsSkipped: [],
  specsPassed: [],
  runUrl: null,
}

async function main() {
  // Create logs folder
  if (!qe.storage('logs')) qe.storage('logs', 'mkdir')

  // Welcome message
  qe.msgSection('Cypress Runner - Workspace cleaner edition')

  // Read cy-runner.yml configuration
  let config = await getConfig('cy-runner.yml')

  // Deploy, start in background, and add VTEX CLI to system PATH
  let call = await vtexCli(config)

  process.env.PATH = call.path
  control.timing.vtexCli = call.time

  qe.msgSection('Cleaning workspaces')
  const vtex = config.base.vtex.bin
  const cmd = `${vtex} workspace ls | grep -E [[:digit:]]{7} | awk '{print $1}' | xargs`
  const wrk = qe.exec(cmd, 'pipe').toString().replace(/\r?\n/g, '').split(' ')

  if (wrk.length > 1) {
    for (const w in wrk) {
      // eslint-disable-next-line no-await-in-loop
      const tlb = await qe.toolbelt(vtex, `workspace delete ${wrk[w]}`)
      tlb.success
        ? qe.msg(`${wrk[w]} removed`, 'ok')
        : qe.msg(`${wrk[w]} failed`, 'error')
    }
  } else {
    qe.msg('No dirty workspaces to clean')
  }

  // Final Report
  control.timing.total = qe.tock(control.start)
  await report(control, config)
}

main()
