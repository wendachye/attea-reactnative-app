import {StyleSheet} from 'react-native';

const useStyles = () => {
  return StyleSheet.create({
    condimentContainer: {
      flex: 0.9,
    },
    condimentCheckBox: {
      height: 45,
      alignItems: 'center',
    },
    condimentNameText: {
      fontSize: 16,
      fontWeight: '600',
    },
  });
};

export default useStyles;
