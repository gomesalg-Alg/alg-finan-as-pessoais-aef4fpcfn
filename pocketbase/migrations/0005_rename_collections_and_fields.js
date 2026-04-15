migrate(
  (app) => {
    const empresas = app.findCollectionByNameOrId('empresas')
    const filiais = app.findCollectionByNameOrId('filiais')
    const users = app.findCollectionByNameOrId('_pb_users_auth_')

    // Fix relation fields pointing to these collections BEFORE doing any renames
    // to avoid "referenced collection does not exist" validation errors.
    const fixRelations = (col) => {
      const toUpdate = []
      for (const f of col.fields) {
        if (f.type === 'relation') {
          if (
            f.collectionId === 'empresas' ||
            f.collectionId === 'C_EMPR' ||
            f.name === 'C_USER_EMPR' ||
            f.name === 'C_FILI_EMPR'
          ) {
            f.collectionId = empresas.id
            toUpdate.push(f)
          } else if (
            f.collectionId === 'filiais' ||
            f.collectionId === 'C_FILI' ||
            f.name === 'C_USER_FILI'
          ) {
            f.collectionId = filiais.id
            toUpdate.push(f)
          }
        }
      }
      for (const f of toUpdate) {
        col.fields.add(f)
      }
    }

    fixRelations(empresas)
    fixRelations(filiais)
    fixRelations(users)

    empresas.name = 'C_EMPR'

    try {
      empresas.fields.removeByName('C_ACIA_CREA')
    } catch (_) {}
    try {
      empresas.fields.removeByName('C_ACIA_UPDT')
    } catch (_) {}

    const aciaDtab = empresas.fields.getByName('C_ACIA_DTAB')
    if (aciaDtab) {
      aciaDtab.name = 'C_EMPR_DTAB'
      empresas.fields.add(aciaDtab)
    }

    const aciaPkid = empresas.fields.getByName('C_ACIA_PKID')
    if (aciaPkid) {
      aciaPkid.name = 'C_EMPR_PKID'
      empresas.fields.add(aciaPkid)
    }

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

    filiais.name = 'C_FILI'

    if (!filiais.fields.getByName('C_FILI_CREA')) {
      filiais.fields.add(
        new AutodateField({ name: 'C_FILI_CREA', onCreate: true, onUpdate: false }),
      )
    }
    if (!filiais.fields.getByName('C_FILI_UPDT')) {
      filiais.fields.add(new AutodateField({ name: 'C_FILI_UPDT', onCreate: true, onUpdate: true }))
    }

    app.save(filiais)

    users.name = 'C_USER'

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

    const users = app.findCollectionByNameOrId('C_USER')
    users.name = '_pb_users_auth_'
    app.save(users)
  },
)
