import CryptoJS from 'crypto-js';

const secret_key = process.env.REACT_APP_SECRET_KEY ?? 'secret_key';

export const encrypt = (text: string) => {
  return CryptoJS.AES.encrypt(text, secret_key).toString();
};

export const decrypt = (text: string) => {
  try {
    const bytes = CryptoJS.AES.decrypt(text, secret_key);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Decryption error:', error);
    return '';
  }
};
