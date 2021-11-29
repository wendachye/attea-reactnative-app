import {StyleSheet} from 'react-native';

const useStyles = () => {
  return StyleSheet.create({
    container: {
      marginBottom: 15,
    },
    innerContainer: {
      flex: 1,
      justifyContent: 'center',
      borderRadius: 15,
      padding: 15,
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
      height: 100,
      width: 100,
    },
    itemContent: {
      flex: 1,
      paddingLeft: 10,
    },
    itemTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      paddingBottom: 5,
    },
  });
};

export default useStyles;
