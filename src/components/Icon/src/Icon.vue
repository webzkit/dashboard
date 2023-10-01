<template>
  <i class="el-icon" ref="elRef"></i>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, ref, unref, watch } from "vue";
import Iconify from "@purge-icons/generated";


export default defineComponent({
  name: 'Icon',
  props: {
    icon: {
      require: true,
      type: String
    },

    prefix: {
      require: false,
      type: String,
      default: ''
    }
  },

  setup(props) {
    const elRef = ref<ElRef>(null);
    const getIconRef = computed(() => `${props.prefix ? props.prefix + ':' : ''}${props.icon}`);

    const update = async () => {
      const el = unref(elRef);
      await nextTick();
      const icon = unref(getIconRef);

      if (!icon) return;
      const svg = Iconify.renderSVG(icon, {})

      if (svg) {
        //el.textContent = "";
        el?.appendChild(svg);

        return;
      }

      const span = document.createElement('span');
      span.className = 'iconify';
      span.dataset.icon = icon;
      //el.textContent = '';
      el?.appendChild(span);
    }

    watch(() => props.icon, update, { flush: 'post' });
    onMounted(update);

    return {
      elRef
    }
  }
});
</script>
