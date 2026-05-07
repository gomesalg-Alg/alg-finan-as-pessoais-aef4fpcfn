import pb from '@/lib/pocketbase/client'
import { User } from '@/types/user'

export const mapRecordToUser = (record: any): User => ({
  id: record.id,
  C_USER_PKID: record.C_USER_PKID || record.id,
  C_USER_CREA: record.C_USER_CREA || record.created,
  C_USER_UPDT: record.C_USER_UPDT || record.updated,
  name: record.C_USER_NOME || record.name,
  email: record.C_USER_MAIL || record.email,
  role: record.C_USER_PERF?.toLowerCase() || record.role || 'user',
  status: record.C_USER_STAT || record.status || 'active',
  cep: record.C_USER_CCEP,
  logradouro: record.C_USER_ENDE,
  numero: record.C_USER_NUME,
  complemento: record.C_USER_COMP,
  bairro: record.C_USER_BAIR,
  cidade: record.C_USER_MUNI,
  uf: record.C_USER_UFED,
  C_USER_CODI: record.C_USER_CODI,
  C_USER_NOME: record.C_USER_NOME,
  C_USER_NCPF: record.C_USER_NCPF,
  C_USER_MAIL: record.C_USER_MAIL,
  C_USER_PERF: record.C_USER_PERF,
  C_USER_EMPR: record.C_USER_EMPR,
  C_USER_FILI: record.C_USER_FILI,
})

const mapDataToRecord = (data: any, isCreate = false) => {
  const result: any = {
    C_USER_CODI: data.C_USER_CODI || `USR${Date.now().toString().slice(-4)}`,
    C_USER_NOME: data.name,
    name: data.name,
    C_USER_MAIL: data.email,
    email: data.email,
    C_USER_PERF: data.role?.toUpperCase(),
    role: data.role,
    C_USER_STAT: data.status,
    status: data.status,
    C_USER_CCEP: data.cep?.replace(/\D/g, ''),
    C_USER_ENDE: data.logradouro,
    C_USER_NUME: data.numero,
    C_USER_COMP: data.complemento,
    C_USER_BAIR: data.bairro,
    C_USER_MUNI: data.cidade,
    C_USER_UFED: data.uf,
  }

  if (data.password) {
    result.password = data.password
    result.passwordConfirm = data.password
  } else if (isCreate) {
    // Auth collections always require a password upon creation
    result.password = 'Mudar@123'
    result.passwordConfirm = 'Mudar@123'
  }

  // Ensure undefined values do not block PocketBase requests
  Object.keys(result).forEach((key) => result[key] === undefined && delete result[key])

  return result
}

export const getUsers = async () => {
  const records = await pb.collection('C_USER').getFullList({ sort: '-created' })
  return records.map(mapRecordToUser)
}

export const createUser = async (data: any) => {
  const record = await pb.collection('C_USER').create(mapDataToRecord(data, true))
  return mapRecordToUser(record)
}

export const updateUser = async (id: string, data: any) => {
  const record = await pb.collection('C_USER').update(id, mapDataToRecord(data, false))
  return mapRecordToUser(record)
}

export const deleteUser = async (id: string) => {
  return pb.collection('C_USER').delete(id)
}
