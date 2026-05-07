migrate(
  (app) => {
    try {
      app.findFirstRecordByData('C_FILI', 'C_FILI_NOME', 'Filial Centro')
      return // Already seeded
    } catch (_) {}

    try {
      // We need an existing company
      const empresas = app.findRecordsByFilter('C_EMPR', "C_EMPR_NOME != ''", '', 1, 0)
      if (empresas.length === 0) return // No company to link to
      const empresa = empresas[0]

      const filiCollection = app.findCollectionByNameOrId('C_FILI')
      const record = new Record(filiCollection)

      record.set('C_FILI_PKID', 'FILI-001')
      record.set('C_FILI_NOME', 'Filial Centro')
      record.set('C_FILI_FANT', 'Filial Centro')
      record.set('C_FILI_CNPJ', '12345678000299')
      record.set('C_FILI_CODI', 'FIL001')
      record.set('C_FILI_EMPR', empresa.id)
      record.set('C_FILI_CCEP', '01001000')
      record.set('C_FILI_ENDE', 'Praça da Sé')
      record.set('C_FILI_NUME', '100')
      record.set('C_FILI_BAIR', 'Sé')
      record.set('C_FILI_MUNI', 'São Paulo')
      record.set('C_FILI_UFED', 'SP')
      record.set('C_FILI_FONE', '11999999999')
      record.set('C_FILI_MAIL', 'centro@empresa.com')

      app.save(record)
    } catch (err) {
      console.log('Error seeding C_FILI:', err)
    }
  },
  (app) => {
    try {
      const record = app.findFirstRecordByData('C_FILI', 'C_FILI_NOME', 'Filial Centro')
      app.delete(record)
    } catch (_) {}
  },
)
