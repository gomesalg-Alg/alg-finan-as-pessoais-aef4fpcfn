migrate(
  (app) => {
    const empresas = app.findCollectionByNameOrId('empresas')
    empresas.name = 'C_EMPR'

    try {
      empresas.fields.removeByName('C_ACIA_CREA')
    } catch (_) {}
    try {
      empresas.fields.removeByName('C_ACIA_UPDT')
    } catch (_) {}

    const aciaDtab = empresas.fields.getByName('C_ACIA_DTAB')
    if (aciaDtab) aciaDtab.name = 'C_EMPR_DTAB'

    const aciaPkid = empresas.fields.getByName('C_ACIA_PKID')
    if (aciaPkid) aciaPkid.name = 'C_EMPR_PKID'

    try {
      empresas.fields.removeByName('created')
    } catch (_) {}
    try {
      empresas.fields.removeByName('updated')
    } catch (_) {}

    if (!empresas.fields.getByName('C_EMPR_CREA')) {
      empresas.fields.add(
        new AutodateField({ name: 'C_EMPR_CREA', onCreate: true, onUpdate: false }),
      )
    }
    if (!empresas.fields.getByName('C_EMPR_UPDT')) {
      empresas.fields.add(
        new AutodateField({ name: 'C_EMPR_UPDT', onCreate: true, onUpdate: true }),
      )
    }

    app.save(empresas)

    const filiais = app.findCollectionByNameOrId('filiais')
    filiais.name = 'C_FILI'

    try {
      filiais.fields.removeByName('created')
    } catch (_) {}
    try {
      filiais.fields.removeByName('updated')
    } catch (_) {}

    if (!filiais.fields.getByName('C_FILI_CREA')) {
      filiais.fields.add(
        new AutodateField({ name: 'C_FILI_CREA', onCreate: true, onUpdate: false }),
      )
    }
    if (!filiais.fields.getByName('C_FILI_UPDT')) {
      filiais.fields.add(new AutodateField({ name: 'C_FILI_UPDT', onCreate: true, onUpdate: true }))
    }

    app.save(filiais)

    const users = app.findCollectionByNameOrId('_pb_users_auth_')
    users.name = 'C_USER'

    try {
      users.fields.removeByName('created')
    } catch (_) {}
    try {
      users.fields.removeByName('updated')
    } catch (_) {}

    if (!users.fields.getByName('C_USER_CREA')) {
      users.fields.add(new AutodateField({ name: 'C_USER_CREA', onCreate: true, onUpdate: false }))
    }
    if (!users.fields.getByName('C_USER_UPDT')) {
      users.fields.add(new AutodateField({ name: 'C_USER_UPDT', onCreate: true, onUpdate: true }))
    }

    app.save(users)
  },
  (app) => {
    const empresas = app.findCollectionByNameOrId('C_EMPR')
    empresas.name = 'empresas'
    app.save(empresas)

    const filiais = app.findCollectionByNameOrId('C_FILI')
    filiais.name = 'filiais'
    app.save(filiais)

    const users = app.findCollectionByNameOrId('_pb_users_auth_')
    users.name = 'users'
    app.save(users)
  },
)
