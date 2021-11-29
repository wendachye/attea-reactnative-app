import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    paddingBottom: 8,
    flexDirection: 'row',
    marginHorizontal: 15,
    minHeight: 56,
  },
  divider: {
    borderColor: '#EFEFF4',
    borderBottomWidth: 1,
  },
  headerLeftContainer: {
    alignSelf: 'center',
  },
  headerCenterContainer: {
    marginHorizontal: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flex: 1,
  },
  headerGuestCenterContainer: {
    marginHorizontal: 10,
    justifyContent: 'center',
    flex: 1,
  },
  headerRightContainer: {
    alignSelf: 'center',
  },
  titleText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  subtitleText: {
    fontSize: 11,
    fontWeight: '600',
    lineHeight: 18,
    color: '#FFFFFF',
    marginLeft: 5,
  },
  logoImage: {
    maxHeight: 56,
  },
  headerRightImage: {
    height: 28,
    width: 28,
  },
  headerSecondaryContainer: {
    minHeight: 56,
    justifyContent: 'center',
  },
  headerSecondaryTitle: {
    textAlign: 'center',
  },
  headerSecondaryCenterContainer: {
    marginLeft: 50,
    justifyContent: 'center',
    flex: 1,
  },
  loginTitleText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'right',
  },
});

export default styles;
