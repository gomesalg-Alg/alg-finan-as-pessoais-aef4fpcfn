import pb from '@/lib/pocketbase/client'

export const mapRecordToUsuario = (record: any) => ({
  id: record.id,
  email: record.email,
  name: record.name || record.C_USER_NOME,
  C_USER_PKID: record.C_USER_PKID || record.id,
  C_USER_CREA: record.C_USER_CREA || record.created,
  C_USER_CODI: record.C_USER_CODI,
  C_USER_NOME: record.C_USER_NOME,
  C_USER_NCPF: record.C_USER_NCPF,
  C_USER_MAIL: record.C_USER_MAIL || record.email,
  C_USER_PERF: record.C_USER_PERF,
  C_USER_EMPR: record.C_USER_EMPR,
  C_USER_FILI: record.C_USER_FILI,
  C_USER_STAT: record.C_USER_STAT,
  createdAt: record.created,
  updatedAt: record.updated,
})

const mapDataToRecord = (data: any) => ({
  name: data.name,
  C_USER_NOME: data.name,
  C_USER_NCPF: data.cpf?.replace(/\D/g, ''),
  C_USER_MAIL: data.email,
  C_USER_PERF: data.perfilId,
  C_USER_EMPR: data.empresaId,
  C_USER_FILI: data.filialId,
  C_USER_STAT: data.status || 'ATIVO',
  ...(data.password ? { password: data.password, passwordConfirm: data.password } : {}),
})

export const getUsuarios = async () => {
  const records = await pb.collection('C_USER').getFullList({ sort: '-created' })
  return records.map(mapRecordToUsuario)
}

export const getUsuario = async (id: string) => {
  const record = await pb.collection('C_USER').getOne(id)
  return mapRecordToUsuario(record)
}

export const createUsuario = async (data: any) => {
  const recordData = {
    ...mapDataToRecord(data),
    email: data.email,
  }
  const record = await pb.collection('C_USER').create(recordData)
  return mapRecordToUsuario(record)
}

export const updateUsuario = async (id: string, data: any) => {
  const record = await pb.collection('C_USER').update(id, mapDataToRecord(data))
  return mapRecordToUsuario(record)
}

export const deleteUsuario = async (id: string) => {
  return pb.collection('C_USER').delete(id)
}
