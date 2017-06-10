<template>
    <div v-show="isActive">
        <slot></slot>
    </div>
</template>


<script>
import store from '../../../store/index.js'
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
      this.isActive = (this.$store.state.searchTab === this.name)
    }
  }
</script>


<style scoped>

</style>
