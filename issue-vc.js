// issue-vc.js
const fs = require('fs')
const { createAgent } = require('./veramo.agent')

;(async () => {
  const { agent } = await createAgent()
  const dids = JSON.parse(fs.readFileSync('./dids/dids.json', 'utf8'))

  const universityDid = dids.university
  const studentDid = dids.student

  // Replace with actual blockchain hash from Person 1
  const blockchainHash = "0x23C94fE9C0c1204B91622d65054332F0b99255F6"; 
  const contractAddress = "0x09b2e6e321d6DfBf2227120A94A5BE5e46012f34";

  const credential = await agent.createVerifiableCredential({
    credential: {
      issuer: { id: universityDid },
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiableCredential', 'UniversityDegreeCredential'],
      issuanceDate: new Date().toISOString(),
      credentialSubject: {
        id: studentDid,
        degree: "B.Tech in CSE",
        year: "2025",
        university: "XYZ University",
        blockchain: {
          contract: contractAddress,
          hash: blockchainHash
        }
      }
    },
    proofFormat: 'jwt',
  })

  fs.mkdirSync('./credentials', { recursive: true })
  fs.writeFileSync('./credentials/studentVC.json', JSON.stringify(credential, null, 2))

  console.log('VC issued and saved to ./credentials/studentVC.json')
  process.exit(0)
})()
