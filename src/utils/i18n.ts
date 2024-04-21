import i18n from '../i18n';

export const t = (text: string | string[], options?: Record<string, any>): string => {
  return i18n.t(text, options) as string;
};