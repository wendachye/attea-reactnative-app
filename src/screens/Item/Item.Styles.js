import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const useStyles = () => {
  const insets = useSafeAreaInsets();

  return StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: insets.bottom,
    },
    parallaxTitleContainer: {
      marginLeft: 20,
      marginRight: 40,
      marginVertical: 15,
    },
    itemImage: {
      width: '100%',
      height: 200,
      backgroundColor: '#FFFFFF',
    },
    itemContentContainer: {
      marginHorizontal: 20,
      marginVertical: 15,
    },
    itemDetailsContainer: {
      flexDirection: 'row',
      padding: 15,
    },
    itemTitleContainer: {
      flex: 0.7,
      marginRight: 10,
    },
    itemTitleText: {
      fontSize: 20,
      fontWeight: 'bold',
      lineHeight: 23,
    },
    itemDescriptionText: {
      fontSize: 12,
      paddingTop: 3,
    },
    itemPriceContainer: {
      flex: 0.3,
      justifyContent: 'center',
      alignItems: 'center',
    },
    condimentGroupContainer: {
      paddingTop: 15,
    },
    condimentGroupNameContainer: {
      flex: 0.9,
      paddingBottom: 5,
    },
    condimentGroupTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    condimentSelectTextContainer: {
      marginVertical: 3,
    },
    condimentGroupMustSelectText: {
      color: 'lightgrey',
      fontSize: 14,
      fontWeight: '500',
    },
    bottomContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 15,
    },
    quantityContainer: {
      flex: 0.4,
    },
    addToCartContainer: {
      flex: 0.6,
    },
    quantityView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
  });
};

export default useStyles;
