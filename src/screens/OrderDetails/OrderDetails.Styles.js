import {StyleSheet} from 'react-native';

const useStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 15,
    },
    card: {
      borderRadius: 10,
      padding: 15,
      backgroundColor: 'white',
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.25,
      shadowRadius: 5,
      marginBottom: 15,
    },
    dividerContainer: {
      marginVertical: 10,
    },
    sectionContainer: {
      minHeight: 30,
    },
    labelText: {
      fontSize: 12,
      color: 'black',
    },
    contentText: {
      color: 'black',
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'right',
    },
    titleView: {
      flex: 0.4,
    },
    contentView: {
      flex: 0.6,
    },
    sectionTitleText: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 15,
    },
    itemContainer: {
      marginVertical: 5,
    },
    itemQuantityView: {
      flex: 0.1,
    },
    itemNameView: {
      flex: 0.7,
    },
    itemPriceView: {
      flex: 0.2,
    },
    itemQuantityText: {
      fontSize: 12,
      fontWeight: 'bold',
      color: 'black',
    },
    itemNameText: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 5,
      color: 'black',
    },
    itemPriceText: {
      fontSize: 13,
      textAlign: 'right',
      color: 'black',
    },
    condimentText: {
      fontSize: 12,
      lineHeight: 16,
      color: 'black',
    },
  });
};

export default useStyles;
