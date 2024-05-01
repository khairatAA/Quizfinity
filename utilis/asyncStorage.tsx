import AsyncStorage from '@react-native-async-storage/async-storage';

type storeItemProps = {
    key: string;
    value: string;
}
export const storeItem = async ({key, value}: storeItemProps) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log('Error storing value: ', e);
      
    }
};

type getItemProps = {
    key: string;
}

export const getItem = async ({key}: getItemProps) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null){
        return value
      }
    } catch (e) {
        console.log('Error retriving value: ', e);
    }
};

type removeItemProps = {
    key: string;
}

export const removeItem = async ({key}: removeItemProps) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
        console.log('Error deleting value: ', e);
    }
};
