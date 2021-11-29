import {StyleSheet} from 'react-native';

const useStyles = () => {
  return StyleSheet.create({
    container: {
      marginHorizontal: 20,
      marginVertical: 15,
    },
    titleContainer: {
      marginHorizontal: 10,
      marginBottom: 15,
    },
    card: {
      backgroundColor: 'white',
      padding: 15,
      borderRadius: 15,
      shadowColor: '#000000',
      shadowOffset: {
        width: 3,
        height: 5,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3,
    },
    itemContainer: {
      height: 400,
    },
    itemImage: {
      width: '100%',
      height: 220,
    },
    contentContainer: {
      marginTop: 15,
    },
    content: {
      margin: 5,
    },
    priceText: {
      color: '#000000',
      fontSize: 16,
      fontWeight: 'bold',
    },
    paginationDot: {
      width: 12,
      height: 12,
      borderRadius: 12,
      marginHorizontal: 8,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
  });
};

export default useStyles;
