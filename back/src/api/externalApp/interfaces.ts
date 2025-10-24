export interface ISignRequestResponse {
  error?: string
  requestId?: string
}

export interface DTSignData {
  doc_hash?: string
  doc_id?: string
  doc_url?: string
  callback_url?: string
  return_url?: string
  description?: string
}
