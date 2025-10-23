const { createAgent } = require('@veramo/core')
const { KeyManager } = require('@veramo/key-manager')
const { DIDManager } = require('@veramo/did-manager')
const { KeyDIDProvider, getDidKeyResolver } = require('@veramo/did-provider-key')
const { KeyStore, DIDStore, PrivateKeyStore, Entities, migrations } = require('@veramo/data-store')
const { DataStore, DataStoreORM } = require('@veramo/data-store')
const { KeyManagementSystem, SecretBox } = require('@veramo/kms-local')
const { CredentialPlugin } = require('@veramo/credential-w3c')
const { DIDResolverPlugin } = require('@veramo/did-resolver')
const { Resolver } = require('did-resolver')
const { createConnection } = require('typeorm')

module.exports.createAgent = async () => {
  const connection = await createConnection({
    type: 'sqlite',
    database: './veramo.sqlite',
    synchronize: true,
    logging: false,
    entities: Entities,
    migrations: migrations,
  })

  const agent = createAgent({
    plugins: [
      new KeyManager({
        store: new KeyStore(connection, new SecretBox('veramo_secret_key')),
        kms: { local: new KeyManagementSystem(new PrivateKeyStore(connection)) },
      }),
      new DIDManager({
        store: new DIDStore(connection),
        defaultProvider: 'did:key',
        providers: {
          'did:key': new KeyDIDProvider({ defaultKms: 'local' }),
        },
      }),
      new DataStore(connection),
      new DataStoreORM(connection),
      new DIDResolverPlugin({
        resolver: new Resolver(getDidKeyResolver()), // ✅ wrapped
      }),
      new CredentialPlugin(),
    ],
  })

  return { agent, connection }
}

