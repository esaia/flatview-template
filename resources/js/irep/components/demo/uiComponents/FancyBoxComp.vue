<script>
import { Fancybox } from "@fancyapps/ui";

export default {
  props: {
    options: Object,
  },
  mounted() {
    Fancybox.bind("[data-fancybox]", {
      Hash: false,
      Images: {
        zoom: false,
        Panzoom: {
          maxScale: 2,
        },
      },
      ...(this.options || {}),
    });
  },
  updated() {
    Fancybox.unbind("[data-fancybox]");
    Fancybox.close();

    Fancybox.bind("[data-fancybox]", {
      Hash: false,
      Images: {
        zoom: false,
        Panzoom: {
          maxScale: 2,
        },
      },
      ...(this.options || {}),
    });
  },
  unmounted() {
    Fancybox.destroy();
  },
};
</script>

<template>
  <div class="irep-fancybox">
    <slot></slot>
  </div>
</template>

<style>
.fancybox__dialog {
  z-index: 9999999 !important;
}
.fancybox__backdrop {
  z-index: 9999998 !important;
}
</style>
