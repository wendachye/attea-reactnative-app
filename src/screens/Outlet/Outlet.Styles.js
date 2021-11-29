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
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.25,
      shadowRadius: 15,
    },
    image: {
      width: '100%',
      height: 200,
    },
    contentContainer: {
      marginTop: 15,
    },
    content: {
      margin: 5,
    },
    subtitleContainer: {
      marginVertical: 10,
    },
    label: {
      color: '#000000',
      fontSize: 14,
    },
  });
};

export default useStyles;
