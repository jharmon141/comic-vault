<template>
  <div>
    <div :class="{ 'slideOutUp': active }" class="animated slideInDown modal is-active">
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

  data: () => ({
    active: false,
  }),

  props: ['toggleCoverModal', 'response', 'comic'],

  methods: {
    changeBack() {
      this.active = true
      setTimeout(this.toggleCoverModal, 1000)
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
