<script setup lang="ts">
defineProps<{
  title?: string
  children?: any
}>()
</script>

<template>
  <view>
    <view class="text-lg font-bold">
      {{ title }}
    </view>
    <view>
      <slot>
        {{ children }}
      </slot>
    </view>
  </view>
</template>
