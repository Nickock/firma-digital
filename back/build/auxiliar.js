"use strict";
// import CryptoKey from './utils/keyUtils'
// import crypto from 'crypto'
console.log('AUXILIAR.TS BEGIN'.bgCyan);
//Asi se desencripta la clave privada
// const encryptedData = 'ZH01rAVmK+Cy95zOy219tceIBOzZCpn0oxbYUpeCE12xG0FZaQQ=' //<= clavePrivadaEncriptada
// const iv = 'erj4lbU3nwbiA0hJ' //<- encyption IV
// const signHash = '2ed451033a0d026b6b0ab819282cae2b06c5325129a4fc46128e8f3f0139e761' //<= Hash generado por la firma del usuario (dibujo)
// const decripted = await CryptoKey.decryptWithHash(encryptedData, iv, signHash)
// console.log(decripted)
//Como valida la app externa que la firma es valida?
//ASI:
// const isValid = crypto.verify(
//   'sha256',
//   Buffer.from(doc_hash),
//   {
//     key: public_key,
//     type: 'spki',
//     format: 'pem'
//   },
//   Buffer.from(signatureBase64, 'base64')
// )
// console.log('FIRMA VALIDA : ' + isValid)
console.log('AUXILIAR.TS END'.bgCyan);
//# sourceMappingURL=auxiliar.js.map