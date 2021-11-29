import {StyleSheet} from 'react-native';

const useStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 15,
    },
    formContainer: {
      marginHorizontal: 15,
    },
    inputContainer: {
      marginBottom: 10,
    },
    errorTextContainer: {
      paddingTop: 5,
    },
    errorText: {
      fontSize: 11,
      lineHeight: 20,
      color: '#CC0000',
    },
    updateButton: {
      marginVertical: 10,
    },
    modalMessage: {
      color: '#000000',
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 20,
      marginBottom: 20,
    },
    label: {
      fontSize: 11,
      lineHeight: 20,
      paddingLeft: 3,
    },
  });
};

export default useStyles;
