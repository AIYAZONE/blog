<script lang="ts">
import { defineComponent, inject, ref, watchPostEffect } from 'vue'
import { useData } from 'vitepress'
import VPSwitch from './VPSwitch.vue'

export default defineComponent({
  name: 'VPSwitchAppearance',
  components: { VPSwitch },
  setup() {
    const { isDark, theme } = useData()

    const toggleAppearance = inject('toggle-appearance', () => {
      isDark.value = !isDark.value
    })

    const switchTitle = ref('')

    watchPostEffect(() => {
      switchTitle.value = isDark.value
        ? theme.value.lightModeSwitchTitle || 'Switch to light theme'
        : theme.value.darkModeSwitchTitle || 'Switch to dark theme'
    })

    return {
      isDark,
      switchTitle,
      toggleAppearance
    }
  }
})
</script>

<template>
  <VPSwitch
    :title="switchTitle"
    class="VPSwitchAppearance"
    :aria-checked="isDark"
    @click="toggleAppearance"
  >
    <span class="vpi-sun sun" />
    <span class="vpi-moon moon" />
  </VPSwitch>
</template>

<style scoped>
.sun {
  opacity: 1;
}

.moon {
  opacity: 0;
}

.dark .sun {
  opacity: 0;
}

.dark .moon {
  opacity: 1;
}

.dark .VPSwitchAppearance :deep(.check) {
  /*rtl:ignore*/
  transform: translateX(18px);
}
</style>
