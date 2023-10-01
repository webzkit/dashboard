<template>
  <div>
    <page-main>
      {{ message }}
    </page-main>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent(({
  name: `index-category-blog`,
  setup() {
    return {
      message: 'Danh sách category'
    }
  }
}))
</script>

