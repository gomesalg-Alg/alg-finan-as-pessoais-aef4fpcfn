migrate(
  (app) => {
    const empresas = app.findCollectionByNameOrId('empresas')
    if (!empresas.fields.getByName('C_ACIA_PKID')) {
      empresas.fields.add(new TextField({ name: 'C_ACIA_PKID' }))
      empresas.fields.add(
        new AutodateField({ name: 'C_ACIA_CREA', onCreate: true, onUpdate: false }),
      )
      empresas.fields.add(
        new AutodateField({ name: 'C_ACIA_UPDT', onCreate: true, onUpdate: true }),
      )
      app.save(empresas)

      app
        .db()
        .newQuery(
          `UPDATE empresas SET C_ACIA_PKID = id WHERE C_ACIA_PKID = '' OR C_ACIA_PKID IS NULL`,
        )
        .execute()
    }

    const users = app.findCollectionByNameOrId('_pb_users_auth_')
    if (!users.fields.getByName('C_USER_PKID')) {
      users.fields.add(new TextField({ name: 'C_USER_PKID' }))
      users.fields.add(new AutodateField({ name: 'C_USER_CREA', onCreate: true, onUpdate: false }))
      users.fields.add(new AutodateField({ name: 'C_USER_UPDT', onCreate: true, onUpdate: true }))

      users.fields.add(new TextField({ name: 'C_USER_CODI' }))
      users.fields.add(new TextField({ name: 'C_USER_NOME' }))
      users.fields.add(new TextField({ name: 'C_USER_FANT' }))
      users.fields.add(new TextField({ name: 'C_USER_NCPF' }))
      users.fields.add(new TextField({ name: 'C_USER_MAIL' }))
      users.fields.add(new TextField({ name: 'C_USER_PERF' }))
      users.fields.add(new TextField({ name: 'C_USER_EMPR' }))
      users.fields.add(new TextField({ name: 'C_USER_FILI' }))
      users.fields.add(new TextField({ name: 'C_USER_STAT' }))
      users.fields.add(new TextField({ name: 'C_USER_CCEP' }))
      users.fields.add(new TextField({ name: 'C_USER_ENDE' }))
      users.fields.add(new TextField({ name: 'C_USER_NUME' }))
      users.fields.add(new TextField({ name: 'C_USER_COMP' }))
      users.fields.add(new TextField({ name: 'C_USER_BAIR' }))
      users.fields.add(new TextField({ name: 'C_USER_MUNI' }))
      users.fields.add(new TextField({ name: 'C_USER_UFED' }))
      app.save(users)

      app
        .db()
        .newQuery(`UPDATE users SET C_USER_PKID = id WHERE C_USER_PKID = '' OR C_USER_PKID IS NULL`)
        .execute()
    }
  },
  (app) => {
    // Revert omitted to prevent data loss
  },
)
