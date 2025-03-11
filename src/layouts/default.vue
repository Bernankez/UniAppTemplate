<script setup lang="ts">
import themeVars from '@/styles/wot'
</script>

<template>
  <WdConfigProvider :theme-vars="themeVars">
    <slot name="toast">
      <WdToast />
    </slot>
    <slot name="messageBox">
      <WdMessageBox />
    </slot>
    <view class="box-border p-sm pb-max-safe-0.875rem">
      <slot />
    </view>
  </WdConfigProvider>
</template>
