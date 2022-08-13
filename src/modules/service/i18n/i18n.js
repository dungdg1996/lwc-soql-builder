import en from './en';
import ja from './ja';

const I18N_MESSAGES = { en, ja };

const I18nMixin = base =>
  class I18nElement extends base {
    get i18n() {
      const language = window.navigator.language;
      const langPrefix = language.replace(/_.*/, '');
      return Object.assign(
        {},
        I18N_MESSAGES.en,
        I18N_MESSAGES[langPrefix],
        I18N_MESSAGES[language]
      );
    }
  };
export { I18nMixin };
