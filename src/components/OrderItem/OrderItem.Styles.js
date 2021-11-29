import {StyleSheet} from 'react-native';

const useStyles = () => {
  return StyleSheet.create({
    container: {
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
      shadowRadius: 5,
      marginBottom: 15,
    },
    orderLeftContainer: {
      flex: 0.8,
    },
    orderRightContainer: {
      flex: 0.2,
    },
    orderTitle: {
      color: '#000000',
      fontWeight: 'bold',
      lineHeight: 25,
    },
    orderSubTitle: {
      color: '#000000',
      lineHeight: 23,
    },
    dividerContainer: {
      marginVertical: 10,
    },
  });
};

export default useStyles;
