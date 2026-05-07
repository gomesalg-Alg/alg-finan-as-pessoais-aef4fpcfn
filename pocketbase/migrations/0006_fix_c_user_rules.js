migrate(
  (app) => {
    const cUser = app.findCollectionByNameOrId('C_USER')

    // Update C_USER access rules to allow users to see and manage the user list inside the ERP
    cUser.listRule = "@request.auth.id != ''"
    cUser.viewRule = "@request.auth.id != ''"
    cUser.updateRule = "@request.auth.id != ''"
    cUser.deleteRule = "@request.auth.id != ''"

    app.save(cUser)
  },
  (app) => {
    const cUser = app.findCollectionByNameOrId('C_USER')

    cUser.listRule = 'id = @request.auth.id'
    cUser.viewRule = 'id = @request.auth.id'
    cUser.updateRule = 'id = @request.auth.id'
    cUser.deleteRule = 'id = @request.auth.id'

    app.save(cUser)
  },
)
