migrate(
  (app) => {
    let users
    try {
      users = app.findCollectionByNameOrId('_pb_users_auth_')
    } catch (_) {
      users = new Collection({
        id: '_pb_users_auth_',
        name: 'users',
        type: 'auth',
        listRule: 'id = @request.auth.id',
        viewRule: 'id = @request.auth.id',
        createRule: '',
        updateRule: 'id = @request.auth.id',
        deleteRule: 'id = @request.auth.id',
        fields: [
          {
            name: 'name',
            type: 'text',
          },
          {
            name: 'avatar',
            type: 'file',
            maxSelect: 1,
            maxSize: 5242880,
            mimeTypes: ['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif', 'image/webp'],
          },
        ],
      })
      app.save(users)
    }

    try {
      app.findAuthRecordByEmail('_pb_users_auth_', 'gomesalg@gmail.com')
      return // already seeded
    } catch (_) {}

    const record = new Record(users)
    record.setEmail('gomesalg@gmail.com')
    record.setPassword('Skip@Pass')
    record.setVerified(true)
    record.set('name', 'Admin')
    app.save(record)
  },
  (app) => {
    try {
      const record = app.findAuthRecordByEmail('_pb_users_auth_', 'gomesalg@gmail.com')
      app.delete(record)
    } catch (_) {}
  },
)
