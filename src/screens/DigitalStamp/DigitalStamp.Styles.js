import {StyleSheet} from 'react-native';

const useStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 15,
    },
    titleText: {
      textAlign: 'center',
      lineHeight: 27,
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    itemImage: {
      width: 70,
      height: 70,
      marginHorizontal: 20,
      marginTop: 20,
      marginBottom: 10,
    },
    itemText: {
      textAlign: 'center',
      fontSize: 14,
      fontWeight: '600',
    },
  });
};

export default useStyles;
