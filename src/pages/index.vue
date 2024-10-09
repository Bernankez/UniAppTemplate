<script setup lang="ts">
function toTestPage() {
  uni.navigateTo({
    url: '/pages/examples',
  })
}
</script>

<template>
  <button @click="toTestPage">
    Go to test page
  </button>
</template>

<route type="home" lang="jsonc">
{
  "style": {
    "navigationBarTitleText": "首页"
  }
}
</route>
