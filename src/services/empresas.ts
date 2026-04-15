import pb from '@/lib/pocketbase/client'
import { Empresa } from '@/types/empresa'

export const mapRecordToEmpresa = (record: any): Empresa => ({
  id: record.id,
  C_ACIA_PKID: record.C_ACIA_PKID || record.id,
  C_ACIA_CREA: record.C_ACIA_CREA || record.created,
  C_ACIA_UPDT: record.C_ACIA_UPDT || record.updated,
  razaoSocial: record.C_EMPR_NOME,
  nomeFantasia: record.C_EMPR_FANT,
  cnpj: record.C_EMPR_CNPJ,
  ie: record.C_EMPR_INSC,
  im: record.C_EMPR_IMUN,
  cep: record.C_EMPR_CCEP,
  logradouro: record.C_EMPR_ENDE,
  numero: record.C_EMPR_NUME,
  complemento: record.C_EMPR_COMP,
  bairro: record.C_EMPR_BAIR,
  cidade: record.C_EMPR_MUNI,
  uf: record.C_EMPR_UFED,
  telefone: record.C_EMPR_FONE,
  email: record.C_EMPR_MAIL,
  dataAbertura: record.C_ACIA_DTAB,
  C_EMPR_CODI: record.C_EMPR_CODI,
  C_EMPR_NOME: record.C_EMPR_NOME,
  C_EMPR_FANT: record.C_EMPR_FANT,
  C_EMPR_CNPJ: record.C_EMPR_CNPJ,
})

const mapDataToRecord = (data: any) => ({
  C_EMPR_CODI: data.C_EMPR_CODI || `EMP${Date.now().toString().slice(-4)}`,
  C_EMPR_NOME: data.razaoSocial,
  C_EMPR_FANT: data.nomeFantasia,
  C_EMPR_CNPJ: data.cnpj?.replace(/\D/g, ''),
  C_EMPR_INSC: data.ie,
  C_EMPR_IMUN: data.im,
  C_EMPR_CCEP: data.cep?.replace(/\D/g, ''),
  C_EMPR_ENDE: data.logradouro,
  C_EMPR_NUME: data.numero,
  C_EMPR_COMP: data.complemento,
  C_EMPR_BAIR: data.bairro,
  C_EMPR_MUNI: data.cidade,
  C_EMPR_UFED: data.uf,
  C_EMPR_FONE: data.telefone?.replace(/\D/g, ''),
  C_EMPR_MAIL: data.email,
  C_ACIA_DTAB: data.dataAbertura ? new Date(data.dataAbertura).toISOString() : null,
})

export const getEmpresas = async () => {
  const records = await pb.collection('empresas').getFullList({ sort: '-created' })
  return records.map(mapRecordToEmpresa)
}

export const createEmpresa = async (data: any) => {
  const record = await pb.collection('empresas').create(mapDataToRecord(data))
  return mapRecordToEmpresa(record)
}

export const updateEmpresa = async (id: string, data: any) => {
  const record = await pb.collection('empresas').update(id, mapDataToRecord(data))
  return mapRecordToEmpresa(record)
}

export const deleteEmpresa = async (id: string) => {
  return pb.collection('empresas').delete(id)
}
