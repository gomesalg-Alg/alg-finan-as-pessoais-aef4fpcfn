migrate(
  (app) => {
    const emprCollection = app.findCollectionByNameOrId('C_EMPR')

    const collection = new Collection({
      name: 'C_FILI',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'C_FILI_PKID', type: 'text' },
        { name: 'C_FILI_NOME', type: 'text', required: true },
        { name: 'C_FILI_FANT', type: 'text' },
        { name: 'C_FILI_CNPJ', type: 'text' },
        { name: 'C_FILI_CODI', type: 'text' },
        { name: 'C_FILI_INSC', type: 'text' },
        {
          name: 'C_FILI_EMPR',
          type: 'relation',
          required: true,
          maxSelect: 1,
          collectionId: emprCollection.id,
        },
        { name: 'C_FILI_CCEP', type: 'text' },
        { name: 'C_FILI_ENDE', type: 'text' },
        { name: 'C_FILI_NUME', type: 'text' },
        { name: 'C_FILI_COMP', type: 'text' },
        { name: 'C_FILI_BAIR', type: 'text' },
        { name: 'C_FILI_MUNI', type: 'text' },
        { name: 'C_FILI_UFED', type: 'text' },
        { name: 'C_FILI_FONE', type: 'text' },
        { name: 'C_FILI_MAIL', type: 'text' },
        { name: 'C_FILI_CREA', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'C_FILI_UPDT', type: 'autodate', onCreate: true, onUpdate: true },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: [],
    })

    app.save(collection)
  },
  (app) => {
    try {
      const collection = app.findCollectionByNameOrId('C_FILI')
      app.delete(collection)
    } catch (_) {}
  },
)
