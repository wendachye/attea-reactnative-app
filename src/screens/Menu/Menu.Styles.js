import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const useStyles = () => {
  const insets = useSafeAreaInsets();

  return StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: insets.top,
    },
    categoryContainer: {
      marginHorizontal: 20,
      marginVertical: 15,
    },
    itemContainer: {
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    itemInnerContainer: {
      backgroundColor: 'white',
      flex: 1,
      justifyContent: 'center',
      borderRadius: 15,
      paddingHorizontal: 10,
    },
    itemImage: {
      width: 120,
      height: 120,
      borderRadius: 5,
    },
    itemTitleText: {
      fontSize: 20,
      fontWeight: 'bold',
      lineHeight: 25,
    },
    itemDescriptionText: {
      fontSize: 12,
      paddingTop: 5,
    },
    itemPriceText: {
      paddingTop: 10,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
};

export default useStyles;
