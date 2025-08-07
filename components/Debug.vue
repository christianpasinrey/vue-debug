<template>
  <div class="bg-gray-900 text-gray-300 rounded-lg overflow-auto max-h-[600px] border border-gray-700 font-mono text-sm shadow-xl">
    <div
      @click="toggleMainCollapse"
      class="bg-gray-800 px-4 py-3 border-b border-gray-700 rounded-t-lg cursor-pointer hover:bg-gray-750 transition-colors duration-200 select-none"
    >
      <div class="flex items-center">
        <span class="text-cyan-400 mr-2 transition-transform duration-200" :class="{ 'rotate-90': !isMainCollapsed }">
          ▶
        </span>
        <h3 class="m-0 text-red-400 text-base font-semibold flex-1">
          🐛 Debug {{ path ? `- ${path}` : 'Data' }}
        </h3>
      </div>
    </div>
    <div
      ref="contentWrapper"
      class="debug-content-wrapper overflow-hidden"
      :style="wrapperStyle"
    >
      <div ref="contentInner" class="p-4 overflow-y-auto">
        <DebugItem :data="data" :path="'root'" :level="0" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import DebugItem from './DebugItem.vue';

const data = ref<any>(null);
const path = ref<string | null>(null);

const isMainCollapsed = ref(false);
const contentWrapper = ref<HTMLElement | null>(null);
const contentInner = ref<HTMLElement | null>(null);
const wrapperStyle = ref<Record<string, string>>({
  maxHeight: '0px',
  opacity: '0',
  transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease-in-out',
});

const setWrapperStyle = (collapsed: boolean) => {
  if (!contentInner.value) return;
  if (!collapsed) {
    const scrollHeight = contentInner.value.scrollHeight;
    wrapperStyle.value = {
      maxHeight: scrollHeight + 'px',
      opacity: '1',
      transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease-in-out',
    };
  } else {
    wrapperStyle.value = {
      maxHeight: '0px',
      opacity: '0',
      transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease-in-out',
    };
  }
};

const toggleMainCollapse = () => {
  isMainCollapsed.value = !isMainCollapsed.value;
};

watch(isMainCollapsed, async (collapsed) => {
  await nextTick();
  setWrapperStyle(collapsed);
});

// Inicializar estilo y listener al montar
import { onMounted } from 'vue';
onMounted(() => {
  setWrapperStyle(isMainCollapsed.value);
  window.addEventListener('debug', (event: Event) => {
    const customEvent = event as CustomEvent;
    data.value = customEvent.detail.data;
    path.value = customEvent.detail.path || null;
  });
});
</script>

<style scoped>
/* Scrollbar personalizado */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #374151;
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #6b7280;
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* Transiciones personalizadas para el contenido principal */
.debug-content-wrapper {
  will-change: max-height, opacity;
}

/* Animaciones para los elementos hijos con stagger effect */
.debug-child-item {
  animation: slideInFromLeft 0.3s ease-out forwards;
  opacity: 0;
  transform: translateX(-10px);
}

@keyframes slideInFromLeft {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Efectos hover más suaves */
.debug-item-wrapper:hover .debug-child-item {
  transition-delay: 0ms !important;
}

/* Animación del icono de colapso */
.cursor-pointer {
  transform-origin: center;
}

/* Mejora visual para el hover de las filas */
.flex:hover {
  backdrop-filter: brightness(1.1);
}
</style>
