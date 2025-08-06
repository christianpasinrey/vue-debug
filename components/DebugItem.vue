<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  data: any;
  path: string;
  level: number;
}

const props = defineProps<Props>();
const isCollapsed = ref(false);

const getType = (value: any): string => {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  return typeof value;
};

const getValueColor = (type: string): string => {
  switch (type) {
    case 'string': return '#98c379';
    case 'number': return '#d19a66';
    case 'boolean': return '#56b6c2';
    case 'null': return '#e06c75';
    case 'undefined': return '#e06c75';
    default: return '#abb2bf';
  }
};

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};

const isExpandable = (value: any): boolean => {
  return (typeof value === 'object' && value !== null) || Array.isArray(value);
};
</script>

<template>
  <div class="debug-item-wrapper transition-all duration-200 ease-in-out" :style="{ marginLeft: props.level * 20 + 'px' }">
    <div class="flex items-center py-0.5 min-h-5 transition-colors duration-150 hover:bg-gray-800 hover:bg-opacity-30 rounded px-1">
      <span
        v-if="isExpandable(props.data)"
        @click="toggleCollapse"
        class="cursor-pointer text-cyan-400 mr-2 select-none w-3 inline-block text-center transition-all duration-300 ease-out hover:text-cyan-300 hover:scale-125 active:scale-110"
        :class="{ 'rotate-90': !isCollapsed }"
      >
        ▶
      </span>
      <span v-else class="text-gray-600 mr-2 w-3 inline-block text-center transition-opacity duration-200">•</span>

      <span class="text-yellow-400 font-medium mr-2 transition-colors duration-150">{{ props.path }}:</span>
      <span class="text-purple-400 italic mr-2 text-xs transition-colors duration-150">({{ getType(props.data) }})</span>

      <span
        v-if="!isExpandable(props.data)"
        class="font-medium transition-colors duration-150"
        :style="{ color: getValueColor(getType(props.data)) }"
      >
        {{ typeof props.data === 'string' ? '"' + props.data + '"' : String(props.data) }}
      </span>

      <span
        v-else-if="isCollapsed"
        class="text-gray-600 italic cursor-pointer transition-all duration-200 hover:text-gray-400"
        @click="toggleCollapse"
      >
        {{ Array.isArray(props.data) ? '[' + props.data.length + ' items]' : '{' + Object.keys(props.data).length + ' props}' }}
      </span>
    </div>

    <transition
      name="debug-expand"
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="max-h-0 opacity-0 transform -translate-y-1"
      enter-to-class="max-h-screen opacity-100 transform translate-y-0"
      leave-from-class="max-h-screen opacity-100 transform translate-y-0"
      leave-to-class="max-h-0 opacity-0 transform -translate-y-1"
    >
      <div v-if="isExpandable(props.data) && !isCollapsed" class="debug-children-wrapper overflow-hidden">
        <div class="border-l border-gray-700 ml-1.5 transition-colors duration-300">
          <template v-if="Array.isArray(props.data)">
            <DebugItem
              v-for="(item, index) in props.data"
              :key="index"
              :data="item"
              :path="'[' + index + ']'"
              :level="props.level + 1"
              :style="{ transitionDelay: (index * 20) + 'ms' }"
              class="debug-child-item transition-all duration-200 ease-out"
            />
          </template>
          <template v-else>
            <DebugItem
              v-for="(value, key, index) in props.data"
              :key="key"
              :data="value"
              :path="key"
              :level="props.level + 1"
              :style="{ transitionDelay: (index * 20) + 'ms' }"
              class="debug-child-item transition-all duration-200 ease-out"
            />
          </template>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
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
</style>
