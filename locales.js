/**
 * locales.js — справочник локалей
 *
 * Генерация на основе Intl API Node.js.
 * Запуск: node locales.js (пересоздаёт locales-data.json)
 */

'use strict';

const fs = require('fs');
const path = require('path');

// Коды локалей, которые включим в справочник
const LOCALE_CODES = [
  'en-US', 'en-GB', 'en-AU', 'en-CA', 'en-NZ', 'en-ZA', 'en-IN',
  'de-DE', 'de-AT', 'de-CH',
  'fr-FR', 'fr-CA', 'fr-BE', 'fr-CH',
  'es-ES', 'es-MX', 'es-AR', 'es-CO',
  'pt-BR', 'pt-PT',
  'it-IT', 'it-CH',
  'ru-RU', 'ru-BY', 'ru-KZ',
  'ja-JP', 'zh-CN', 'zh-TW',
  'ko-KR', 'ar-SA', 'ar-AE',
  'nl-NL', 'nl-BE',
  'sv-SE', 'da-DK', 'fi-FI', 'nb-NO',
  'pl-PL', 'cs-CZ', 'hu-HU', 'ro-RO',
  'tr-TR', 'th-TH', 'vi-VN',
  'he-IL', 'hi-IN', 'id-ID', 'ms-MY',
  'uk-UA', 'el-GR',
];

const localeData = LOCALE_CODES.map((code) => {
  const parts = code.split('-');
  const langCode = parts[0];
  const countryCode = parts[1];

  // --- Язык (на родном языке локали) ---
  const langName = new Intl.DisplayNames(code, { type: 'language' }).of(langCode)
    || langCode;

  // --- Страна (на родном языке локали) ---
  const countryName = new Intl.DisplayNames(code, { type: 'region' }).of(countryCode)
    || countryCode;

  // --- Валюта ---
  // Пробуем получить валюту через форматтер валют для этой локали
  let currency = '';
  try {
    const parts2 = new Intl.NumberFormat(code, { style: 'currency', currencyDisplay: 'code' })
      .formatToParts(0);
    const currPart = parts2.find(p => p.type === 'currency');
    currency = currPart ? currPart.value : '';
  } catch {
    currency = '';
  }
  // Маппинг валют по региону (когда Intl не отдаёт)
  if (!currency) {
    const currencyByCountry = {
      US: 'USD', GB: 'GBP', CA: 'CAD', JP: 'JPY', CN: 'CNY',
      KR: 'KRW', RU: 'RUB', BR: 'BRL', IN: 'INR', DE: 'EUR',
      FR: 'EUR', IT: 'EUR', ES: 'EUR', NL: 'EUR', SE: 'SEK',
      DK: 'DKK', FI: 'EUR', NO: 'NOK', PL: 'PLN', CZ: 'CZK',
      HU: 'HUF', RO: 'RON', GR: 'EUR', TR: 'TRY', TH: 'THB',
      VN: 'VND', UA: 'UAH', ID: 'IDR', MX: 'MXN', AR: 'ARS',
      CO: 'COP',
    };
    currency = currencyByCountry[countryCode] || '';
  }
  // Тонкие переопределения для неочевидных сочетаний (валюта отличается от страны)
  const currencyOverride = {
    'en-AU': 'AUD', 'en-NZ': 'NZD', 'en-ZA': 'ZAR',
    'de-AT': 'EUR', 'de-CH': 'CHF',
    'fr-CH': 'CHF', 'it-CH': 'CHF',
    'zh-TW': 'TWD', 'hi-IN': 'INR', 'ms-MY': 'MYR',
    'he-IL': 'ILS', 'fr-CA': 'CAD', 'fr-BE': 'EUR',
    'ru-BY': 'BYN', 'ru-KZ': 'KZT', 'nl-BE': 'EUR',
    'nb-NO': 'NOK', 'pt-PT': 'EUR', 'pt-BR': 'BRL',
    'ar-SA': 'SAR', 'ar-AE': 'AED',
    'sv-SE': 'SEK', 'da-DK': 'DKK',
  };
  if (currencyOverride[code]) currency = currencyOverride[code];

  // --- TLD ---
  // Маппинг кодов стран в TLD
  const tldMap = {
    US: '.us', GB: '.uk', AU: '.au', CA: '.ca', NZ: '.nz', ZA: '.za', IN: '.in',
    DE: '.de', AT: '.at', CH: '.ch',
    FR: '.fr', BE: '.be',
    ES: '.es', MX: '.mx', AR: '.ar', CO: '.co',
    BR: '.br', PT: '.pt',
    IT: '.it',
    RU: '.ru', BY: '.by', KZ: '.kz',
    JP: '.jp', CN: '.cn', TW: '.tw',
    KR: '.kr', SA: '.sa', AE: '.ae',
    NL: '.nl',
    SE: '.se', DK: '.dk', FI: '.fi', NO: '.no',
    PL: '.pl', CZ: '.cz', HU: '.hu', RO: '.ro',
    TR: '.tr', TH: '.th', VN: '.vn',
    IL: '.il', MY: '.my',
    UA: '.ua', GR: '.gr',
  };
  const tld = tldMap[countryCode] || `.${countryCode.toLowerCase()}`;

  // --- Флаг (Regional Indicator Symbols из кода страны) ---
  const flag = [...countryCode.toUpperCase()]
    .map(ch => String.fromCodePoint(0x1F1E6 + ch.charCodeAt(0) - 65))
    .join('');

  return { code, language: langName, country: countryName, currency, tld, flag };
});

// Сортируем по коду
localeData.sort((a, b) => a.code.localeCompare(b.code));

const outputPath = path.join(__dirname, 'locales-data.json');
fs.writeFileSync(outputPath, JSON.stringify(localeData, null, 2), 'utf-8');
console.log(`Сгенерировано ${localeData.length} локалей → ${outputPath}`);
