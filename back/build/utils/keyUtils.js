"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
class CryptoKey {
    // Generar par de claves RSA (Con esto se firma)
    static generateRSAKeyPair() {
        try {
            const { publicKey, privateKey } = crypto_1.default.generateKeyPairSync('rsa', {
                modulusLength: 2048,
                publicKeyEncoding: {
                    type: 'spki',
                    format: 'pem'
                },
                privateKeyEncoding: {
                    type: 'pkcs8',
                    format: 'pem'
                }
            });
            return {
                publicKey,
                privateKey,
                keyType: 'rsa'
            };
        }
        catch (error) {
            throw new Error(`Error generando claves RSA: ${error}`);
        }
    }
    //Preparar el hash de dibujo firma para asegurar 32 bytes
    static async prepareHashAsKey(hash) {
        const encoder = new TextEncoder();
        const hashBytes = encoder.encode(hash);
        if (hashBytes.length === 32) {
            return hashBytes;
        }
        if (hashBytes.length > 32) {
            return hashBytes.slice(0, 32);
        }
        const result = new Uint8Array(32);
        for (let i = 0; i < 32; i++) {
            result[i] = hashBytes[i % hashBytes.length];
        }
        return result;
    }
    //para encriptar clave privada
    static async encryptWithHash(privateKey, userHash) {
        const keyData = await this.prepareHashAsKey(userHash);
        const key = await crypto_1.default.subtle.importKey('raw', keyData, { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']);
        const iv = crypto_1.default.getRandomValues(new Uint8Array(12));
        const encrypted = await crypto_1.default.subtle.encrypt({ name: 'AES-GCM', iv }, key, new TextEncoder().encode(privateKey));
        return {
            encrypted: btoa(String.fromCharCode(...new Uint8Array(encrypted))),
            iv: btoa(String.fromCharCode(...iv))
        };
    }
    // Desencriptar clave privada (con dibujo firma) para firmar digitalmente
    static async decryptWithHash(encryptedData, iv, userHash) {
        const keyData = await this.prepareHashAsKey(userHash);
        const key = await crypto_1.default.subtle.importKey('raw', keyData, { name: 'AES-GCM' }, false, ['decrypt']);
        const encryptedBuffer = Uint8Array.from(atob(encryptedData), (c) => c.charCodeAt(0));
        const ivBuffer = Uint8Array.from(atob(iv), (c) => c.charCodeAt(0));
        const decrypted = await crypto_1.default.subtle.decrypt({ name: 'AES-GCM', iv: ivBuffer }, key, encryptedBuffer);
        return new TextDecoder().decode(decrypted);
    }
}
exports.default = CryptoKey;
//# sourceMappingURL=keyUtils.js.map