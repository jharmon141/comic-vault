<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="box">
        <img :src="response.image.small_url" alt="">
        <p>
          {{response.name}}
        </p>
      </div>
    </div>
    <button @click="changeBack" class="modal-close"></button>
  </div>
</template>


<script>
  export default {
    name: 'modal',
    props: ['response'],

    methods: {
      changeBack() {
        console.log(this.response);;
        this.$parent.toggleModal()
      }
    }
  }
</script>


<style scoped>

</style>
