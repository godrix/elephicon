import i18next from 'i18next';

import en from './locales/en.json';
import ja from './locales/ja.json';
/** Merge the pull request sent by DrDeee. */
/** https://github.com/sprout2000/elephicon/pull/108 */
import de from './locales/de.json';
/** Merge the pull request sent by kitt3911. */
/** https://github.com/sprout2000/elephicon/pull/135 */
import ru from './locales/ru.json';

import pt from './locales/pt.json';

export const setLocales = (locale: string): void => {
  i18next.init({
    lng: locale,
    fallbackLng: 'en',
    resources: {
      en: { translation: en },
      ja: { translation: ja },
      de: { translation: de },
      ru: { translation: ru },
      pt: { translation: pt },
    },
  });
};
