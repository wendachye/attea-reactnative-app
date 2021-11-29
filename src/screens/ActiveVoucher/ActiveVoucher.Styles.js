import {StyleSheet} from 'react-native';

const useStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
    },
    listContentContainer: {
      paddingTop: 15,
    },
    modalQRContainer: {
      minWidth: 160,
    },
    modalTitle: {
      textAlign: 'center',
      marginBottom: 15,
    },
  });
};

export default useStyles;
