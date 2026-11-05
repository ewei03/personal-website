import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { translations } from "./content/translations.js";

/*
 * Lightweight localization.
 * - Content in site.js stays in English. Translations live in content/translations.js, keyed by
 *   the exact English text. Anything without a translation falls back to English.
 * - t("text") translates; t("Hello {name}", { name }) also fills {placeholders}.
 * - td("Aug 2026 - Present") localizes dates / ages / "Featured".
 */

export const LANGS = [
  { code: "en", label: "EN", html: "en", name: "English" },
  { code: "fr", label: "FR", html: "fr-CA", name: "Français" },
  { code: "zh", label: "中文", html: "zh-CN", name: "中文" },
];

const I18nContext = createContext(null);

function initialLang() {
  try {
    const saved = localStorage.getItem("lang");
    if (LANGS.some((l) => l.code === saved)) return saved;
  } catch (e) {}
  return "en";
}

const fill = (str, vars) =>
  vars ? str.replace(/\{(\w+)\}/g, (m, k) => (vars[k] !== undefined ? vars[k] : m)) : str;

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
const FR_MONTHS = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juill.", "août", "sept.", "oct.", "nov.", "déc."];

function localizeDate(str, lang) {
  if (typeof str !== "string" || lang === "en") return str;
  let out = str.replace(/\b([A-Z][a-z]{2})[a-z]*\.? (\d{4})\b/g, (m, mon, year) => {
    const i = MONTHS.indexOf(mon.toLowerCase());
    if (i === -1) return m;
    return lang === "fr" ? `${FR_MONTHS[i]} ${year}` : `${year}年${i + 1}月`;
  });
  out = out
    .replace(/\bPresent\b/g, lang === "fr" ? "aujourd'hui" : "至今")
    .replace(/\bFeatured\b/g, lang === "fr" ? "En vedette" : "精选")
    .replace(/\bAge (\d+)\b/g, (m, n) => (lang === "fr" ? `${n} ans` : `${n}岁`));
  return out;
}

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(initialLang);

  const setLang = useCallback((code) => {
    setLangState(code);
    try { localStorage.setItem("lang", code); } catch (e) {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = LANGS.find((l) => l.code === lang)?.html || "en";
  }, [lang]);

  const value = useMemo(() => {
    const dict = translations[lang] || {};
    const t = (text, vars) => {
      if (typeof text !== "string") return text;
      const hit = lang === "en" ? text : dict[text];
      return fill(hit !== undefined ? hit : text, vars);
    };
    const td = (text) => localizeDate(text, lang);
    return { lang, setLang, t, td };
  }, [lang, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
