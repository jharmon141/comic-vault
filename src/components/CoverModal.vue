<template>
    <div>
        <div class="modal is-active">
            <div class="modal-background"></div>
            <div class="modal-content">
                <div class="box">
                    <img v-if="comic" :src="response.artUrl" alt="">
                    <img v-else :src="response.image.small_url" alt="">
                </div>
            </div>
            <button @click="changeBack" class="modal-close"></button>
        </div>
    </div>
</template>


<script>
  export default {
      name: 'cover-modal',
      props: {
          response: [],
          comic: false
      },

    methods: {
      changeBack() {
        console.log(this.response)
        this.$parent.toggleCoverModal()
      }
    }
  }
</script>


<style scoped>

.modal-content {
    height: 95%;
    width: auto;
}

.box {
    background-color:rgba(0, 0, 0, 0);
}

.box:hover {
    border: 0px;
}
</style>
