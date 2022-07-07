import Vue from 'vue'
import VueI18n from 'vue-i18n'

import { locale as en } from './locales/en.js'
import { locale as tw } from './locales/tw.js'

Vue.use(VueI18n)

const locale = localStorage.getItem('language') || 'en'

const messages = {
  en,
  tw
}

const i18n = new VueI18n({
    locale,
    messages
})

export default i18n