import pb from '@/lib/pocketbase/client'
import { Filial } from '@/types/filial'

export const mapRecordToFilial = (record: any): Filial => ({
  id: record.id,
  C_FILI_PKID: record.C_FILI_PKID || record.id,
  C_FILI_CREA: record.C_FILI_CREA || record.created,
  C_FILI_UPDT: record.C_FILI_UPDT || record.updated,
  empresaId: record.C_FILI_EMPR,
  nome: record.C_FILI_NOME,
  cnpj: record.C_FILI_CNPJ,
  ie: record.C_FILI_INSC,
  cep: record.C_FILI_CCEP,
  logradouro: record.C_FILI_ENDE,
  numero: record.C_FILI_NUME,
  complemento: record.C_FILI_COMP,
  bairro: record.C_FILI_BAIR,
  cidade: record.C_FILI_MUNI,
  uf: record.C_FILI_UFED,
  telefone: record.C_FILI_FONE,
  email: record.C_FILI_MAIL,
  C_FILI_CODI: record.C_FILI_CODI,
})

const mapDataToRecord = (data: any) => {
  const result: any = {
    C_FILI_CODI: data.C_FILI_CODI || `FIL${Date.now().toString().slice(-4)}`,
    C_FILI_EMPR: data.empresaId || null,
    C_FILI_NOME: data.nome,
    C_FILI_CNPJ: data.cnpj?.replace(/\D/g, ''),
    C_FILI_INSC: data.ie,
    C_FILI_CCEP: data.cep?.replace(/\D/g, ''),
    C_FILI_ENDE: data.logradouro,
    C_FILI_NUME: data.numero,
    C_FILI_COMP: data.complemento,
    C_FILI_BAIR: data.bairro,
    C_FILI_MUNI: data.cidade,
    C_FILI_UFED: data.uf,
    C_FILI_FONE: data.telefone?.replace(/\D/g, ''),
    C_FILI_MAIL: data.email,
  }

  // Ensure undefined values do not block PocketBase requests
  Object.keys(result).forEach((key) => result[key] === undefined && delete result[key])

  return result
}

export const getFiliais = async () => {
  const records = await pb.collection('C_FILI').getFullList({ sort: '-created' })
  return records.map(mapRecordToFilial)
}

export const createFilial = async (data: any) => {
  const record = await pb.collection('C_FILI').create(mapDataToRecord(data))
  return mapRecordToFilial(record)
}

export const updateFilial = async (id: string, data: any) => {
  const record = await pb.collection('C_FILI').update(id, mapDataToRecord(data))
  return mapRecordToFilial(record)
}

export const deleteFilial = async (id: string) => {
  return pb.collection('C_FILI').delete(id)
}
