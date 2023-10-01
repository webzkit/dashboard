<template>
  <div>
    <page-main>
      {{ message }}
    </page-main>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'


export default defineComponent(({
  name: `create-category-blog`,
  setup() {
    return {
      message: 'Create category'
    }
  }
}))
</script>
