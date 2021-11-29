import {StyleSheet} from 'react-native';

const useStyles = () => {
  return StyleSheet.create({
    itemContainer: {
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    itemInnerContainer: {
      flex: 1,
      justifyContent: 'center',
      borderRadius: 15,
      paddingHorizontal: 10,
      backgroundColor: 'white',
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.25,
      shadowRadius: 2.5,
    },
    itemImage: {
      width: 120,
      height: 120,
      borderRadius: 5,
    },
    itemContent: {
      flex: 1,
      paddingLeft: 10,
    },
    itemTitleText: {
      fontSize: 18,
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
