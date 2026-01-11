import '@testing-library/jest-dom';
import { configureAxe } from 'jest-axe';

configureAxe({
  rules: {
    'color-contrast': { enabled: true },
    'keyboard-navigation': { enabled: true }
  }
});