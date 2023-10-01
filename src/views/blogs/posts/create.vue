<template>
  <div>
    <page-main>
      {{ message }}
    </page-main>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from '/@/hooks/web/useI18n';

export default defineComponent(({
  name: `create-post-blog`,
  setup() {
    const { t } = useI18n();

    return {
      message: t('routes.blog.posts.create')
    }
  }
}))
</script>

