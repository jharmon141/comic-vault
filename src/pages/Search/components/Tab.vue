<template>
    <div v-show="isActive">
        <transition name="fade">
        <slot></slot>
        </transition>
    </div>
</template>


<script>
  export default {
    name: 'tab',

    props: {
      name: {required: true},
      selected: {default: false}
    },

    data() {
      return {
        isActive: false
      }
    },

    mounted() {
      this.isActive = this.selected
    }
  }
</script>


<style scoped>

</style>
