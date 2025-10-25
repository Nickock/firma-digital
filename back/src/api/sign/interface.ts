export interface ISignDocumentResponse {
  message?: string
  return_url?: string
  external_success?: boolean
  external_error?: string //external app errors:
  error?: string
}
export interface ISignDocumentResponseExternalApp {
  doc_hash: string
  signed_doc: string
  public_key: string
  signer_name: string
  signer_surname: string
  external_ref?: string
}
