<script lang="ts" setup>
const name = useRouteQuery('name')

function back() {
  uni.navigateBack()
}
</script>

<template>
  <view>
    <wd-navbar title="Custom Navigation Bar" left-text="Back" safe-area-inset-top left-arrow placeholder fixed @click-left="back" />
    <TestCase title="Layout">
      Non layout (Without `padding: sm`)
    </TestCase>
    <TestCase title="Route Query Test">
      Hello {{ name }} !
    </TestCase>
  </view>
</template>

<route lang="jsonc">
{
  "style": {
    "navigationStyle": "custom"
  },
  "layout": false
}
</route>
