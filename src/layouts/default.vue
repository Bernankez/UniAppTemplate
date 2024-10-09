<script setup lang="ts">
import themeVars from '@/styles/wot'
</script>

<template>
  <wd-config-provider :theme-vars="themeVars">
    <view class="p-sm">
      <slot />
    </view>
  </wd-config-provider>
</template>
