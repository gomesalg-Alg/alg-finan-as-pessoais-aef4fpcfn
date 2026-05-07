// Valida a foreign key entre C_FILI e C_EMPR
onRecordValidate((e) => {
  const empPkid = e.record.getString('C_FILI_EMPR')

  if (empPkid) {
    try {
      // Tenta encontrar a empresa pelo C_EMPR_PKID
      $app.findFirstRecordByData('C_EMPR', 'C_EMPR_PKID', empPkid)
    } catch (_) {
      try {
        // Fallback: se estiverem mandando o ID interno do PocketBase, tenta validar também
        $app.findRecordById('C_EMPR', empPkid)
      } catch (_) {
        throw new BadRequestError('Falha de validação de Integridade', {
          C_FILI_EMPR: 'A Empresa informada não existe na tabela C_EMPR.',
        })
      }
    }
  }

  e.next()
}, 'C_FILI')
