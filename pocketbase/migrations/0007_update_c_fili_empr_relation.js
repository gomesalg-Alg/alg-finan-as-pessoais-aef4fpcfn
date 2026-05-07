migrate(
  (app) => {
    const emprCol = app.findCollectionByNameOrId('C_EMPR')

    // Limpar duplicatas de C_EMPR_PKID antes de criar indice unico para garantir integridade
    app
      .db()
      .newQuery(`
    DELETE FROM C_EMPR WHERE id NOT IN (
      SELECT MIN(id) FROM C_EMPR GROUP BY C_EMPR_PKID
    ) AND C_EMPR_PKID IS NOT NULL AND C_EMPR_PKID != ''
  `)
      .execute()

    emprCol.addIndex('idx_c_empr_pkid_unique', true, 'C_EMPR_PKID', "C_EMPR_PKID != ''")
    app.save(emprCol)

    const filiCol = app.findCollectionByNameOrId('C_FILI')
    const relField = filiCol.fields.getByName('C_FILI_EMPR')

    if (relField && relField.type === 'relation') {
      // 1. Criar campo texto temporario
      filiCol.fields.add(
        new TextField({
          name: 'C_FILI_EMPR_TEXT',
          required: false,
        }),
      )
      app.save(filiCol)

      // 2. Copiar dados convertendo do ID interno do PB para C_EMPR_PKID
      app
        .db()
        .newQuery(`
      UPDATE C_FILI 
      SET C_FILI_EMPR_TEXT = (
        SELECT C_EMPR_PKID FROM C_EMPR WHERE C_EMPR.id = C_FILI.C_FILI_EMPR
      )
      WHERE C_FILI_EMPR IS NOT NULL AND C_FILI_EMPR != ''
    `)
        .execute()

      // 3. Fallback: se não tiver C_EMPR_PKID preenchido, usar o ID mesmo
      app
        .db()
        .newQuery(`
      UPDATE C_FILI 
      SET C_FILI_EMPR_TEXT = C_FILI_EMPR
      WHERE (C_FILI_EMPR_TEXT IS NULL OR C_FILI_EMPR_TEXT = '') 
      AND C_FILI_EMPR IS NOT NULL AND C_FILI_EMPR != ''
    `)
        .execute()

      // 4. Remover campo relation original
      filiCol.fields.removeByName('C_FILI_EMPR')
      app.save(filiCol)

      // 5. Renomear o texto para assumir a coluna original
      const tempField = filiCol.fields.getByName('C_FILI_EMPR_TEXT')
      tempField.name = 'C_FILI_EMPR'
      app.save(filiCol)
    } else if (!relField) {
      filiCol.fields.add(
        new TextField({
          name: 'C_FILI_EMPR',
          required: false,
        }),
      )
      app.save(filiCol)
    }

    // Criar indice para otimizar a foreign key simulada
    filiCol.addIndex('idx_c_fili_empr_fk', false, 'C_FILI_EMPR', '')
    app.save(filiCol)
  },
  (app) => {
    const filiCol = app.findCollectionByNameOrId('C_FILI')
    const textField = filiCol.fields.getByName('C_FILI_EMPR')

    if (textField && textField.type === 'text') {
      filiCol.fields.add(
        new RelationField({
          name: 'C_FILI_EMPR_REL',
          collectionId: app.findCollectionByNameOrId('C_EMPR').id,
          maxSelect: 1,
        }),
      )
      app.save(filiCol)

      app
        .db()
        .newQuery(`
      UPDATE C_FILI 
      SET C_FILI_EMPR_REL = (
        SELECT id FROM C_EMPR WHERE C_EMPR.C_EMPR_PKID = C_FILI.C_FILI_EMPR LIMIT 1
      )
      WHERE C_FILI_EMPR IS NOT NULL AND C_FILI_EMPR != ''
    `)
        .execute()

      filiCol.fields.removeByName('C_FILI_EMPR')
      app.save(filiCol)

      const relTemp = filiCol.fields.getByName('C_FILI_EMPR_REL')
      relTemp.name = 'C_FILI_EMPR'
      app.save(filiCol)
    }

    const emprCol = app.findCollectionByNameOrId('C_EMPR')
    emprCol.removeIndex('idx_c_empr_pkid_unique')
    app.save(emprCol)
  },
)
