import Debug from './components/Debug.vue';
import useDebug, { setDebugEventName } from './composables/useDebug';
import type { DebugData } from './types/debug-data.d.ts';

export { Debug, useDebug, DebugData };

export const DebugPlugin = {
  install(app: any, options?: { eventName?: string }) {
    app.component('Debug', Debug);
    if (options?.eventName) {
      setDebugEventName(options.eventName);
    }
  }
};
