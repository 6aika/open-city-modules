import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  getPromotions: null,
  getPromotionsSuccess: ['promotionList'],
  getPromotionsFailure: ['error'],
});

export const PromotionTypes = Types;
export default Creators;
