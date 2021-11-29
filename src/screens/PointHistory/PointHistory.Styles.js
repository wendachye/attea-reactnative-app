import {StyleSheet} from 'react-native';

const useStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 15,
    },
    card: {
      backgroundColor: '#FFD780',
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
    cardTitle: {
      color: '#000000',
    },
    cardSubtitle: {
      color: '#000000',
      fontWeight: 'bold',
      fontSize: 26,
      padding: 5,
    },
    cardCaption: {
      color: '#000000',
    },
    titleContainer: {
      marginVertical: 15,
    },
    dividerContainer: {
      marginBottom: 15,
    },
  });
};

export default useStyles;
