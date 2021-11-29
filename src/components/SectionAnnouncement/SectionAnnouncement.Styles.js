import {StyleSheet, Dimensions} from 'react-native';

const styles = () => {
  const screenWidth = Dimensions.get('window').width;

  return StyleSheet.create({
    container: {
      marginHorizontal: 20,
      marginVertical: 15,
    },
    itemContainer: {
      flexDirection: 'row',
      marginBottom: 15,
    },
    itemImage: {
      width: 150,
      height: 150,
      borderRadius: 15,
    },
    itemText: {
      width: screenWidth - 40 - 150,
      height: 150,
      paddingHorizontal: 15,
      paddingVertical: 5,
    },
  });
};

export default styles;
