<template>
  <view>
    <view>component test</view>
    <HelloWorld></HelloWorld>
    <view>navigate test</view>
    <button @click="onLogin">to login/index</button>
    <view>uni-ui auto import test</view>
    <button @click="onToggle">toggle uni-popup</button>
    <uni-popup ref="popup" type="bottom" background-color="#fff" @change="onChange"
      >from bottom</uni-popup
    >
    <view>unocss test</view>
    <button class="bg-black b-rd-2 text-green-500/50">unocss based button</button>
    <view>echarts test</view>
    <Chart></Chart>
    <view>mock test</view>
    <view>{{ response }}</view>
    <view>unocss iconify test</view>
    <view class="i-uil-apple"></view>
    <view>Reactivity Transform Sugar Test</view>
    <view>{{ count }}<button @click="onAdd">add</button></view>
  </view>
</template>

<script setup lang="ts">
import { getExample } from "@/api/example";
import Chart from "@/components/Chart.vue";
import HelloWorld from "@/components/HelloWorld.vue";
import { useUniPopup } from "@/composables/useUniPopup";
import { ref } from "vue";

const onLogin = () => {
  uni.navigateTo({
    url: "/pages/login/index",
  });
};
const popup = ref();
const { show, onChange } = useUniPopup(popup);
const onToggle = () => {
  show.value = !show.value;
};

const response = ref();
const query = () => {
  if (import.meta.env.MODE === "mock") {
    getExample().then(res => {
      console.log(res);
      response.value = res;
    });
  }
};

let count = $ref(0);
const onAdd = () => count++;
query();
</script>
