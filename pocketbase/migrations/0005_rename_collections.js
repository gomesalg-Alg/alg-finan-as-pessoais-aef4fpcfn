migrate(
  (app) => {
    // Rename users to C_USER
    try {
      const users = app.findCollectionByNameOrId('_pb_users_auth_')
      users.name = 'C' + '_USER'
      app.save(users)
    } catch (e) {
      console.log('Error renaming users:', e)
    }

    // Rename empresas to C_EMPR and fix C_ACIA prefixes
    try {
      const empresas = app.findCollectionByNameOrId('empresas')
      empresas.name = 'C' + '_EMPR'

      const dtab = empresas.fields.getByName('C_ACIA_DTAB')
      if (dtab) {
        dtab.name = 'C_EMPR_DTAB'
        empresas.fields.add(dtab)
      }
      const pkid = empresas.fields.getByName('C_ACIA_PKID')
      if (pkid) {
        pkid.name = 'C_EMPR_PKID'
        empresas.fields.add(pkid)
      }
      const crea = empresas.fields.getByName('C_ACIA_CREA')
      if (crea) {
        crea.name = 'C_EMPR_CREA'
        empresas.fields.add(crea)
      }
      const updt = empresas.fields.getByName('C_ACIA_UPDT')
      if (updt) {
        updt.name = 'C_EMPR_UPDT'
        empresas.fields.add(updt)
      }

      app.save(empresas)
    } catch (e) {
      console.log('Error renaming empresas:', e)
    }

    // Rename filiais to C_FILI
    try {
      const filiais = app.findCollectionByNameOrId('filiais')
      filiais.name = 'C' + '_FILI'
      app.save(filiais)
    } catch (e) {
      console.log('Error renaming filiais:', e)
    }
  },
  (app) => {
    // Revert C_USER to users
    try {
      const users = app.findCollectionByNameOrId('_pb_users_auth_')
      users.name = 'users'
      app.save(users)
    } catch (e) {}

    // Revert C_EMPR to empresas
    try {
      const nameEmpr = 'C' + '_EMPR'
      const empresas = app.findCollectionByNameOrId(nameEmpr)
      empresas.name = 'empresas'
      app.save(empresas)
    } catch (e) {}

    // Revert C_FILI to filiais
    try {
      const nameFili = 'C' + '_FILI'
      const filiais = app.findCollectionByNameOrId(nameFili)
      filiais.name = 'filiais'
      app.save(filiais)
    } catch (e) {}
  },
)
