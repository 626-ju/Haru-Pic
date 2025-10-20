import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function parseTitle(data) {
  return data.products[0].name.split(',')[0]?.replace('title:', '');
}

export function parseDescription(data) {
  return data.products[0].name.split(',')[1]?.replace('description:', '');
}

export function parseFrameColor(data) {
  return data.products[0].name.split(',')[2]?.replace('frameColor:', '');
}

export function parseImageUrl(data) {
  return data.products[0]?.imageUrl;
}
