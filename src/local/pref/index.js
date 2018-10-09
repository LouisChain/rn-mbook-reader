import { AsyncStorage } from "react-native";
import Keys from "@constants/key";
import { AesCtr } from "@utils/crypto/Aes-Ctr";

const set = (key, values) => {
  try {
    let str = JSON.stringify(values);
    let cypherText = AesCtr.encrypt(str, Keys.CYPHER_PASSWORD, Keys.CYPHER_BITS);
    return AsyncStorage.setItem(key, cypherText);
  } catch (error) {
    console.error('AsyncStorage#setItem error: ' + error.message);
  }
};

const get = key => {
  return AsyncStorage.getItem(key)
    .then((cypherText) => {
      let result = null;
      if (cypherText) {
        try {
          let plainText = AesCtr.decrypt(cypherText, Keys.CYPHER_PASSWORD, Keys.CYPHER_BITS);
          result = JSON.parse(plainText);
        } catch (e) {
          console.error('AsyncStorage#getItem error deserializing JSON for key: ' + key, e.message);
        }
      }
      return result;
    });
};

const remove = (key) => {
  return AsyncStorage.removeItem(key);
}

const clear = async () => {
  return AsyncStorage.clear();
}

export { get, set, remove, clear };
