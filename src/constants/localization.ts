import enTrans from '../locales/en/translation.json';
import esTrans from '../locales/es/translation.json';
import jpTrans from '../locales/jp/translation.json';
import viTrans from '../locales/vi/translation.json';
import zhTrans from '../locales/zh/translation.json';
import koTrans from '../locales/ko/translation.json'; 

import enUS from 'antd/lib/locale/en_US';
import esES from 'antd/lib/locale/es_ES';
import jaJP from 'antd/lib/locale/ja_JP';
import viVN from 'antd/lib/locale/vi_VN';
import zhCN from 'antd/lib/locale/zh_CN';
import koKR from 'antd/lib/locale/ko_KR'; 

import { IRegion } from '../types';

const RESOURCES = {
  vi: { translation: viTrans },
  en: { translation: enTrans },
  jp: { translation: jpTrans },
  zh: { translation: zhTrans },
  es: { translation: esTrans },
  ko: { translation: koTrans } 
};

const REGIONS: IRegion = {
  vi: {
    key: 'vi',
    name: 'Tiếng Việt',
    antdLocale: viVN,
  },
  en: {
    key: 'en',
    name: 'English',
    antdLocale: enUS,
  },
  jp: {
    key: 'jp',
    name: 'Japan',
    antdLocale: jaJP
  },
  zh: {
    key: 'zh',
    name: 'Chinese',
    antdLocale: zhCN
  },
  es: {
    key: 'es',
    name: 'Spanish',
    antdLocale: esES
  },
  ko: {
    key: 'ko',
    name: 'Korean',
    antdLocale: koKR 
  }
};

export default {
  RESOURCES,
  REGIONS,
};
