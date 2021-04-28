import { goToLanding,goToHome,goToSale,goToError } from './main.js';

export const PATHS = {
  landing: {
    path: '?page=home',
    refFunc: goToLanding,
  },
  about: {
    path: '?page=about',
    refFunc: goToLanding,
  },
  home: {
    path: '?page=home',
    refFunc: goToHome,
  },
  error: {
    path: '?page=error',
    refFunc: goToError,
  },
  sale: {
    path: '?page=sale',
    refFunc: goToSale,
  },
};
