import { AsyncStorage } from 'react-native';
import { getPromotions } from '../config';

export default class PromotionManager {
  constructor() {
  }

  getUnreadPromotions = () => {
    return new Promise(async function(resolve, reject) {
      try {
        const promotions = await getPromotions();
        const readPromotionIds = await AsyncStorage.getItem('promotions')

        const unreadPromotions = [];
        let parsedPromotionIds;

        if (readPromotionIds) {
          parsedPromotionIds = readPromotionIds;
        }
        if (parsedPromotionIds) {
          for (let i = 0; i < promotions.length; i++) {

            const id = promotions[i].id;
            if (parsedPromotionIds.indexOf(id) === -1) {
              unreadPromotions.push(promotions[i]);
            }
          }
          resolve(unreadPromotions);
        }
        resolve(promotions);
      } catch (error) {
        reject(error);
      }
    });
  }

  getPromotions = () => {
    return this.promotions;
  }

  markPromotionAsRead = async (id) => {
    const readPromotionIds = await AsyncStorage.getItem('promotions');
    let parsedPromotionIds = [];

    if (readPromotionIds) {
      parsedPromotionIds = JSON.parse(readPromotionIds);
    }

    if (parsedPromotionIds.indexOf(id) === -1) {
      parsedPromotionIds.push(id);
      AsyncStorage.setItem('promotions', JSON.stringify(parsedPromotionIds));
    }
  }
}
