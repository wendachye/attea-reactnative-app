import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const useStyles = () => {
  const insets = useSafeAreaInsets();

  return StyleSheet.create({
    flex: {
      flex: 1,
    },
    flexCenter: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    flexDirectionRow: {
      flexDirection: 'row',
    },
    flexDirectionColumn: {
      flexDirection: 'column',
    },
    flexDirectionRowCenter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    flexDirectionRowAlignCenter: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    centerItem: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    sectionDivider: {
      marginHorizontal: 15,
      marginVertical: 5,
    },
    flexGrow: {
      flexGrow: 1,
    },
    flexGrowZero: {
      flexGrow: 0,
    },
    container: {
      flex: 1,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    },
    containerWithBottomTab: {
      flex: 1,
      paddingTop: insets.top,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    },
    containerModal: {
      flex: 1,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    },
  });
};

export default useStyles;
