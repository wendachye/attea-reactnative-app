import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 35,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subheaderButton: {
    flex: 1,
    alignItems: 'flex-start',
    marginHorizontal: 20,
  },
  subheaderGuestButton: {
    flex: 1,
    alignItems: 'center',
  },
  dividerVertical: {
    backgroundColor: '#EFEFF4',
    height: '70%',
    width: 1,
  },
  guestText: {
    color: '#000000',
  },
});

export default styles;
