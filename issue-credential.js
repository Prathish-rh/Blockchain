const { createAgent } = require('./veramo.agent')

async function main() {
  const { agent } = await createAgent()

  // 🎓 University DID (Issuer)
  const universityDID = 'did:key:z6Mkj38EUNbhjFx81ma3PcRsU1FGs2vXKjP3TSLgnMyhEAPt'

  // 🧑‍🎓 Student DID (Holder)
  const studentDID = 'did:key:z6MkgQmCaL41veSxqUQDCJWcPZ3NcWc96zT1CbSVSZNtRQd5'

  // 🎓 Define the credential data
  const degreeCredential = {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    type: ['VerifiableCredential', 'DegreeCredential'],
    issuer: { id: universityDID },
    issuanceDate: new Date().toISOString(),
    credentialSubject: {
      id: studentDID,
      degree: 'B.Tech in CSE',
      year: '2025',
      university: 'XYZ University',
    },
  }

  // 🧾 Sign the credential
  const verifiableCredential = await agent.createVerifiableCredential({
    credential: degreeCredential,
    proofFormat: 'jwt', // JSON Web Token format
  })

  console.log('✅ Verifiable Credential issued successfully:\n')
  console.log(JSON.stringify(verifiableCredential, null, 2))
}

main().catch(console.error)
