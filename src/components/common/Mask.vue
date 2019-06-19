<template lang="pug">
  .mask
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';

@Component({})
export default class Mask extends Vue {

}
</script>

<style lang="stylus" scoped>
  .mask {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    height: 100%;
  }

</style>
