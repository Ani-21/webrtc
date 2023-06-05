import { I18nextProvider, initReactI18next } from "react-i18next";
import i18n from "i18next";

import {en} from "@/locales/en";

export const I18NextProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const i18nextInstance = i18n.createInstance();

  i18nextInstance.use(initReactI18next).init({
    lng: "en",
    debug: false,
    resources: {
      en,
    },
    interpolation: {
      escapeValue: false,
    },
  });

  return <I18NextProvider i18n={i18nextInstance}>{children}</I18nextProvider>;
};