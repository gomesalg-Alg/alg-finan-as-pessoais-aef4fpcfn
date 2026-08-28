migrate(
  (app) => {
    // 1. Antes de excluir, copiar o valor de name para C_USER_NOME em todos os registros onde C_USER_NOME esteja vazio/nulo
    app
      .db()
      .newQuery(
        `UPDATE C_USER SET C_USER_NOME = name WHERE (C_USER_NOME IS NULL OR C_USER_NOME = '') AND (name IS NOT NULL AND name != '')`,
      )
      .execute()

    // 2. Localizar coleção C_USER e remover o campo 'name'
    const users = app.findCollectionByNameOrId('C_USER')
    if (users.fields.getByName('name')) {
      users.fields.removeByName('name')
      app.save(users)
    }
  },
  (app) => {
    // Revert: readicionar campo text 'name' se necessário
    const users = app.findCollectionByNameOrId('C_USER')
    if (!users.fields.getByName('name')) {
      users.fields.add(
        new TextField({
          name: 'name',
          required: false,
        }),
      )
      app.save(users)

      // Copiar de volta C_USER_NOME para name
      app
        .db()
        .newQuery(
          `UPDATE C_USER SET name = C_USER_NOME WHERE (name IS NULL OR name = '') AND (C_USER_NOME IS NOT NULL AND C_USER_NOME != '')`,
        )
        .execute()
    }
  },
)
