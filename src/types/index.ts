import { Locale } from "antd/es/locale";

export interface IRegionItem {
  key: string;
  name: string;
  antdLocale: Locale;
}

export interface IRegion {
  [key: string]: IRegionItem;
}