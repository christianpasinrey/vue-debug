
# @christianpasinrey/vue3-debug-data

> A visual debugging plugin for Vue 3, ideal for real-time data development and debugging.

## Features
- Elegant and collapsible visualization of any object or array.
- Global `<Debug />` component to display data anywhere in your app.
- `useDebug` composable to emit debug data from anywhere.
- Easy event name configuration.
- 100% TypeScript and easy to integrate.

## Installation

```bash
npm install @christianpasinrey/vue3-debug-data
```

## Basic Usage

### 1. Register the plugin in your Vue 3 app

```typescript
import { createApp } from 'vue';
import App from './App.vue';
import { DebugPlugin } from '@christianpasinrey/vue3-debug-data';

const app = createApp(App);
app.use(DebugPlugin); // You can pass options if you want
app.mount('#app');
```

### 2. Show the component in your layout

```vue
<template>
  <Debug />
  <!-- ...the rest of your app... -->
</template>
```

### 3. Emit data from anywhere

```typescript
import { useDebug } from '@christianpasinrey/vue3-debug-data';

// In any function, setup, or composable:
useDebug({ foo: 'bar', user: { name: 'Ana' } });
```

## Advanced Configuration

You can change the debug event name:

```typescript
app.use(DebugPlugin, { eventName: 'my-debug-event' });
```

## API

### `<Debug />`
Global component to visualize emitted data.

### `useDebug(data: any)`
Composable to emit debug data.

### Plugin options
- `eventName` _(string)_: Custom event name to listen and emit data.

## Full Example

```typescript
import { createApp } from 'vue';
import App from './App.vue';
import { DebugPlugin, useDebug } from '@christianpasinrey/vue3-debug-data';

const app = createApp(App);
app.use(DebugPlugin, { eventName: 'debug' });
app.mount('#app');

// Anywhere in your app:
useDebug({ foo: 'bar' });
```

---

## License
MIT
