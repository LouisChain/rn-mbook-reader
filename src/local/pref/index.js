import { AsyncStorage } from "react-native";
// Need secure by encrypt data value

const set = (key, values) => {
  try {
    return AsyncStorage.setItem(key, JSON.stringify(values));
  } catch (error) {
    console.error('AsyncStorage#setItem error: ' + error.message);
  }
};

const get = key => {
  return AsyncStorage.getItem(key)
    .then((result) => {
      if (result) {
        try {
          result = JSON.parse(result);
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
