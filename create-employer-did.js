const { createAgent } = require('./veramo.agent');

async function main() {
  const { agent } = await createAgent();

  // Create a DID for the employer (verifier)
  const employerDID = await agent.didManagerCreate({
    provider: 'did:key',
    options: {
      keyType: 'Ed25519',
    },
  });

  console.log('✅ Employer DID created:');
  console.log(employerDID);
}

main().catch(console.error);
