import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      joinRoom: "Join room",
      roomIsFull: "Room is full",
      back: "Back",
    },
  },
  ru: {
    translation: {
      joinRoom: "Войти в комнату",
      roomIsFull: "Комната заполнена",
      back: "Назад",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "en",
});

export default i18n;
