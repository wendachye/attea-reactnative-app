import LocalizedStrings from 'react-native-localization';
import english from './english';
import chinese from './chinese';

export const strings = new LocalizedStrings({
  en: english,
  'zh-tw': chinese,
});
