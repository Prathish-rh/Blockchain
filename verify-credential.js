const { createAgent } = require('./veramo.agent')

async function main() {
  const { agent } = await createAgent()

  const issuedVC = {
  "@context": ["https://www.w3.org/2018/credentials/v1"],
  type: ["VerifiableCredential", "DegreeCredential"],
  issuer: { id: "did:key:z6Mkj38EUNbhjFx81ma3PcRsU1FGs2vXKjP3TSLgnMyhEAPt" },
  issuanceDate: "2025-10-23T15:16:20.000Z", // ⚠ exact from issuance output
  credentialSubject: {
    id: "did:key:z6MkgQmCaL41veSxqUQDCJWcPZ3NcWc96zT1CbSVSZNtRQd5",
    degree: "B.Tech in CSE",
    year: "2025",
    university: "XYZ University"
  },
  proof: {
    type: "JwtProof2020",
    jwt: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiRGVncmVlQ3JlZGVudGlhbCJdLCJjcmVkZW50aWFsU3ViamVjdCI6eyJkZWdyZWUiOiJCLlRlY2ggaW4gQ1NFIiwieWVhciI6IjIwMjUiLCJ1bml2ZXJzaXR5IjoiWFlaIFVuaXZlcnNpdHkifX0sInN1YiI6ImRpZDprZXk6ejZNa2dRbUNhTDQxdmVTeHFVUURDSldjUFozTmNXYzk2elQxQ2JTVlNaTnRSUWQ1IiwibmJmIjoxNzYxMjMyNTgwLCJpc3MiOiJkaWQ6a2V5Ono2TWtqMzhFVU5iaGpGeDgxbWEzUGNSc1UxRkdzMnZYS2pQM1RTTGduTXloRUFQdCJ9.qgZy6duB583auM-vVVvS7_64nMz61GqXZS06nRcE9nvksRB33YLZD8j9ISejCcfyH2k9V8hCIcA07TJMcQCrCg"
  }
}


  const verified = await agent.verifyCredential({ credential: issuedVC })
  console.log('✅ Credential Verification Result:\n', verified)
}

main().catch(console.error)