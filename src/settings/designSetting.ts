import { MenuWidthEnum } from '../enums/appEnum';
import { designType } from '/#/config';

export const menuWidths: designType[] = [
  { name: MenuWidthEnum.W_200, value: MenuWidthEnum.W_200 },
  { name: MenuWidthEnum.W_220, value: MenuWidthEnum.W_220 },
  { name: MenuWidthEnum.W_240, value: MenuWidthEnum.W_240 },
];

export const sizeThemes: designType[] = [
  { name: 'Large', value: 'large' },
  { name: 'Medium', value: 'default' },
  { name: 'Small', value: 'small' },
];

export const colorTheme = '#722ed1';

export const colorThemes: designType[] = [
  { color: '#1b2a47', name: 'default' },
  { color: '#A43b76', name: 'light' },
  { color: '#f5222d', name: 'dusk' },
  { color: '#fa541c', name: 'volcano' },
  { color: '#00ba7c', name: 'yellow' },
  { color: '#13c2c2', name: 'mingQing' },
  { color: '#52c41a', name: 'auroraGreen' },
  { color: '#eb2f96', name: 'pink' },
  { color: '#722ed1', name: 'saucePurple' },
];
