// create-dids.js
const fs = require('fs')
const { createAgent } = require('./veramo.agent')

;(async () => {
  const { agent } = await createAgent()

  const university = await agent.didManagerCreate()
  const student = await agent.didManagerCreate()
  const employer = await agent.didManagerCreate()

  const dids = {
    university: university.did,
    student: student.did,
    employer: employer.did,
  }

  fs.mkdirSync('./dids', { recursive: true })
  fs.writeFileSync('./dids/dids.json', JSON.stringify(dids, null, 2))

  console.log('DIDs created:', dids)
  process.exit(0)
})()
