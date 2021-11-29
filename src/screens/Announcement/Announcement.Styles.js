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
    itemImage: {
      height: 250,
      borderRadius: 12,
    },
    itemVideo: {
      height: 250,
      borderRadius: 12,
      backgroundColor: '#000000',
    },
    itemTextContainer: {
      marginVertical: 15,
    },
  });
};

export default useStyles;
