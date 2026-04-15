migrate(
  (app) => {
    const collection = new Collection({
      name: 'empresas',
      type: 'base',
      listRule: "@request.auth.id != ''",
      viewRule: "@request.auth.id != ''",
      createRule: "@request.auth.id != ''",
      updateRule: "@request.auth.id != ''",
      deleteRule: "@request.auth.id != ''",
      fields: [
        { name: 'C_EMPR_CODI', type: 'text', required: true },
        { name: 'C_EMPR_NOME', type: 'text', required: true },
        { name: 'C_EMPR_FANT', type: 'text' },
        { name: 'C_EMPR_CNPJ', type: 'text' },
        { name: 'C_EMPR_INSC', type: 'text' },
        { name: 'C_EMPR_IMUN', type: 'text' },
        { name: 'C_EMPR_CCEP', type: 'text' },
        { name: 'C_EMPR_ENDE', type: 'text' },
        { name: 'C_EMPR_NUME', type: 'text' },
        { name: 'C_EMPR_COMP', type: 'text' },
        { name: 'C_EMPR_BAIR', type: 'text' },
        { name: 'C_EMPR_MUNI', type: 'text' },
        { name: 'C_EMPR_UFED', type: 'text' },
        { name: 'C_EMPR_FONE', type: 'text' },
        { name: 'C_EMPR_MAIL', type: 'text' },
        { name: 'C_ACIA_DTAB', type: 'date' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
    })
    app.save(collection)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('empresas')
    app.delete(collection)
  },
)
