export const dataDictionary = {
  users: [
    {
      field: 'name',
      techName: 'C_USER_NOME',
      type: 'string',
      description: 'Nome Completo do Usuário',
    },
    { field: 'email', techName: 'C_USER_MAIL', type: 'string', description: 'E-mail do Usuário' },
    { field: 'role', techName: 'C_USER_PERF', type: 'string', description: 'Perfil de Acesso' },
    { field: 'status', techName: 'C_USER_STAT', type: 'string', description: 'Status do Usuário' },
    { field: 'cep', techName: 'C_USER_CCEP', type: 'string', description: 'CEP' },
    { field: 'logradouro', techName: 'C_USER_ENDE', type: 'string', description: 'Logradouro' },
    { field: 'numero', techName: 'C_USER_NUME', type: 'number', description: 'Número do Endereço' },
    { field: 'complemento', techName: 'C_USER_COMP', type: 'string', description: 'Complemento' },
    { field: 'bairro', techName: 'C_USER_BAIR', type: 'string', description: 'Bairro' },
    { field: 'cidade', techName: 'C_USER_MUNI', type: 'string', description: 'Município' },
    { field: 'uf', techName: 'C_USER_UFED', type: 'string', description: 'Unidade Federativa' },
  ],
  empresas: [
    { field: 'razaoSocial', techName: 'C_EMPR_NOME', type: 'string', description: 'Razão Social' },
    {
      field: 'nomeFantasia',
      techName: 'C_EMPR_FANT',
      type: 'string',
      description: 'Nome Fantasia',
    },
    { field: 'cnpj', techName: 'C_EMPR_CNPJ', type: 'string', description: 'CNPJ' },
    { field: 'ie', techName: 'C_EMPR_INSC', type: 'string', description: 'Inscrição Estadual' },
    { field: 'im', techName: 'C_EMPR_IMUN', type: 'string', description: 'Inscrição Municipal' },
    { field: 'cep', techName: 'C_EMPR_CCEP', type: 'string', description: 'CEP' },
    { field: 'logradouro', techName: 'C_EMPR_ENDE', type: 'string', description: 'Logradouro' },
    { field: 'numero', techName: 'C_EMPR_NUME', type: 'number', description: 'Número do Endereço' },
    { field: 'complemento', techName: 'C_EMPR_COMP', type: 'string', description: 'Complemento' },
    { field: 'bairro', techName: 'C_EMPR_BAIR', type: 'string', description: 'Bairro' },
    { field: 'cidade', techName: 'C_EMPR_MUNI', type: 'string', description: 'Município' },
    { field: 'uf', techName: 'C_EMPR_UFED', type: 'string', description: 'Unidade Federativa' },
    { field: 'telefone', techName: 'C_EMPR_FONE', type: 'string', description: 'Telefone' },
    { field: 'email', techName: 'C_EMPR_MAIL', type: 'string', description: 'E-mail' },
  ],
  filiais: [
    {
      field: 'empresaId',
      techName: 'C_FILI_EMPR',
      type: 'string',
      description: 'ID da Empresa Matriz',
    },
    { field: 'nome', techName: 'C_FILI_NOME', type: 'string', description: 'Nome da Filial' },
    { field: 'cnpj', techName: 'C_FILI_CNPJ', type: 'string', description: 'CNPJ' },
    { field: 'ie', techName: 'C_FILI_INSC', type: 'string', description: 'Inscrição Estadual' },
    { field: 'cep', techName: 'C_FILI_CCEP', type: 'string', description: 'CEP' },
    { field: 'logradouro', techName: 'C_FILI_ENDE', type: 'string', description: 'Logradouro' },
    { field: 'numero', techName: 'C_FILI_NUME', type: 'number', description: 'Número do Endereço' },
    { field: 'complemento', techName: 'C_FILI_COMP', type: 'string', description: 'Complemento' },
    { field: 'bairro', techName: 'C_FILI_BAIR', type: 'string', description: 'Bairro' },
    { field: 'cidade', techName: 'C_FILI_MUNI', type: 'string', description: 'Município' },
    { field: 'uf', techName: 'C_FILI_UFED', type: 'string', description: 'Unidade Federativa' },
    { field: 'telefone', techName: 'C_FILI_FONE', type: 'string', description: 'Telefone' },
    { field: 'email', techName: 'C_FILI_MAIL', type: 'string', description: 'E-mail' },
  ],
  perfis: [
    {
      field: 'C_PERF_NOME',
      techName: 'C_PERF_NOME',
      type: 'string',
      description: 'Nome do Perfil',
    },
    {
      field: 'C_PERF_DESC',
      techName: 'C_PERF_DESC',
      type: 'string',
      description: 'Descrição do Perfil',
    },
    { field: 'C_PERF_PERM', techName: 'C_PERF_PERM', type: 'array', description: 'Permissões' },
  ],
}

export function validateTechnicalTypes(data: any, entity: keyof typeof dataDictionary): string[] {
  const errors: string[] = []
  const dictionary = dataDictionary[entity]

  if (!dictionary) return []

  for (const field of dictionary) {
    const value = data[field.field]
    if (value === undefined || value === null || value === '') continue

    if (field.type === 'number') {
      // Bloqueia qualquer envio que não seja composto apenas de números
      if (!/^\d+$/.test(String(value))) {
        errors.push(
          `Trava de Segurança: O campo '${field.techName}' espera o tipo NUMÉRICO no banco de dados, mas recebeu caracteres inválidos.`,
        )
      }
    } else if (field.type === 'array') {
      if (!Array.isArray(value)) {
        errors.push(
          `Trava de Segurança: O campo '${field.techName}' espera um ARRAY, mas recebeu um formato incompatível.`,
        )
      }
    }
  }

  return errors
}
