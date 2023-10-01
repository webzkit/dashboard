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
  name: `index-group-account`,
  setup() {
    const { t } = useI18n();

    return {
      message: t('routes.account.group'),
    }
  }
}))

</script> 

