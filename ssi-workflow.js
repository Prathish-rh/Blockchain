const { createAgent } = require('./veramo.agent');

async function main() {
  const { agent } = await createAgent();

  // 1️⃣ Create DIDs for University, Student, Employer
  const universityDID = await agent.didManagerCreate({
    provider: 'did:key',
    options: { keyType: 'Ed25519' },
  });

  const studentDID = await agent.didManagerCreate({
    provider: 'did:key',
    options: { keyType: 'Ed25519' },
  });

  const employerDID = await agent.didManagerCreate({
    provider: 'did:key',
    options: { keyType: 'Ed25519' },
  });

  console.log('✅ University DID:', universityDID.did);
  console.log('✅ Student DID:', studentDID.did);
  console.log('✅ Employer DID:', employerDID.did);

  // 2️⃣ Define blockchain hash from Person 1
  const blockchainHash = "0x123abc456..."; // Replace with actual hash

  // 3️⃣ Issue Verifiable Credential (VC) for the student
  const issuedVC = await agent.createVerifiableCredential({
    credential: {
      issuer: { id: universityDID.did },
      credentialSubject: {
        id: studentDID.did,
        degree: "B.Tech in CSE",
        year: "2025",
        university: "XYZ University",
        blockchainHash: blockchainHash
      },
      type: ["VerifiableCredential", "DegreeCredential"],
      "@context": ["https://www.w3.org/2018/credentials/v1"],
    },
    proofFormat: "jwt", // Using JWT proof
  });

  console.log('\n✅ VC Issued:\n', issuedVC);

  // 4️⃣ Verify the VC
  const verified = await agent.verifyCredential({
    credential: issuedVC,
  });

  console.log('\n✅ VC Verification Result:\n', verified);
}

main().catch(console.error);
