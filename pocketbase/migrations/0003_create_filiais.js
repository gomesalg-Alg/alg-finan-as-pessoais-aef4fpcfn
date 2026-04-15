migrate(
  (app) => {
    const collection = new Collection({
      name: 'filiais',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'C_FILI_CODI', type: 'text', required: true },
        { name: 'C_FILI_NOME', type: 'text', required: true },
        {
          name: 'C_FILI_EMPR',
          type: 'relation',
          collectionId: app.findCollectionByNameOrId('empresas').id,
          maxSelect: 1,
        },
        { name: 'C_FILI_CNPJ', type: 'text' },
        { name: 'C_FILI_INSC', type: 'text' },
        { name: 'C_FILI_CCEP', type: 'text' },
        { name: 'C_FILI_ENDE', type: 'text' },
        { name: 'C_FILI_NUME', type: 'text' },
        { name: 'C_FILI_COMP', type: 'text' },
        { name: 'C_FILI_BAIR', type: 'text' },
        { name: 'C_FILI_MUNI', type: 'text' },
        { name: 'C_FILI_UFED', type: 'text' },
        { name: 'C_FILI_FONE', type: 'text' },
        { name: 'C_FILI_MAIL', type: 'text' },
        { name: 'C_FILI_PKID', type: 'text' },
        { name: 'C_FILI_CREA', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'C_FILI_UPDT', type: 'autodate', onCreate: true, onUpdate: true },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(collection)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('filiais')
    app.delete(collection)
  },
)
