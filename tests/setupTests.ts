import { isBrowser } from 'react-device-detect';
if (isBrowser) {
  (window as any).ResizeObserver = class ResizeObserver {
    observe() {}

    disconnect() {}
  };
}
