<script setup lang="ts">
const { count, inc, dec } = useCount()

const query = ref('')

function go() {
  uni.navigateTo({
    url: `/pages/hi?name=${query.value}`,
  })
}

const rate = ref(0)

const exampleStore = useExampleStore()

async function test() {
  const res = await service({
    url: '/test',
    method: 'get',
    params: {
      test: 1,
    },
    showLoading: true,
  })
  console.log(res)
}
test()
</script>

<template>
  <view>
    <TestCase title="Layout">
      default (With `padding: sm`)
    </TestCase>
    <TestCase title="UnoCSS Icon Test">
      <view class="i-carbon-cics-program" />
    </TestCase>
    <TestCase title="Auto Import Component Test">
      <HelloWorld />
    </TestCase>
    <TestCase title="Auto Import Composable Test">
      Count: {{ count }}
      <view class="flex gap-sm">
        <view class="btn" @click="dec">
          <text i-carbon-subtract />
        </view>
        <view class="btn" @click="inc">
          <text i-carbon-add />
        </view>
      </view>
    </TestCase>
    <TestCase title="Navigation Test">
      <input v-model="query" class="b-1 b-gray-200 rounded b-solid px-xs py-1" placeholder="Enter your name">
      <button class="mt-sm w-20" @click="go">
        GO
      </button>
    </TestCase>
    <TestCase title="UI Test (wot-design-uni)">
      <wd-rate v-model="rate" />
    </TestCase>
    <TestCase title="Store (Pinia) With Persisted State Test">
      <input v-model="exampleStore.title" class="b-1 b-gray-200 rounded b-solid px-xs py-1">
    </TestCase>
    <TestCase title="Request (Axios) Test">
      Open <code class="inline rounded-sm bg-gray-200 p-1">Network</code> to see results
    </TestCase>
    <TestCase title="Theme Color Test">
      <WdButton type="primary">
        Hello
      </WdButton>
      <text class="text-primary p-b-safe-1">
        Primary Color
      </text>
    </TestCase>
  </view>
</template>

<style scoped>
.btn {
  --at-apply: w-8 h-8 flex items-center justify-center rounded-full bg-teal-600 text-white cursor-pointer
}
</style>

<route lang="jsonc">
{
  "style": {
    "navigationBarTitleText": "Test Page"
  }
}
</route>
