import arrowBack from 'open-city-modules/img/arrow_back.png';
import EStyleSheet from 'react-native-extended-stylesheet';
import { withProps } from 'recompose';


export const parseDate = (mDate) => {
  const dateObject = new Date(mDate);
  const date = dateObject.getDate();
  const month = dateObject.getMonth();
  const year = dateObject.getFullYear();

  return (date + '.' + month + '.' + year)
}

export const withBackButton = (navigation, tintColor = EStyleSheet.value(colors.max)) => withProps({
  leftAction: {
    icon: arrowBack,
    style: { tintColor },
    action: () => navigation.goBack(),
  },
});
