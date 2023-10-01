<template>
  <div />
</template>

<script setup lang="ts">
import { onUpdated, unref } from 'vue';
import { onBeforeRouteUpdate, useRouter } from 'vue-router';

const router = useRouter();

/*router.afterEach((to, from) => {
  console.log(unref(to))
  console.log(unref(from))
});*/

/*
onUpdated(() => {
  router.go(-1);
});
*/
</script>

