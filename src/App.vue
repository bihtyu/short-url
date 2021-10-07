<script lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { defineComponent } from 'vue'
import {
  NMessageProvider
} from 'naive-ui'

export default defineComponent({
  components: {
    NMessageProvider
  }
})
</script>

<template>
  <n-message-provider>
    <router-view />
  </n-message-provider>
</template>

<style>
#app {
  font-family: v-sans, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  line-height: 1.6;
}
</style>
