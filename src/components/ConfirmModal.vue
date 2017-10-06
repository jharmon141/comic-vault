<template>
  <div>
    <div class="modal is-active">
      <div class="modal-background"></div>
      <div :class="{ 'slideOutDown': active }" class="animated slideInUp modal-card">
        <section class="modal-card-body">
          <h1>{{text}}</h1>
          <span 
            @click="changeBack" 
            class="button is-danger is-outlined">
            <v-icon>clear</v-icon>
          </span>
          <span  
            @click="actionFunction" 
            class="button is-confirm is-outlined">
            <v-icon>check</v-icon>
          </span>
        </section>
      </div>
      <button 
        @click="changeBack" 
        class="modal-close">
      </button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ConfirmModal',
  data: () => ({
    active: false,
  }),
  props: ['toggleConfirmModal', 'text', 'actionFunction'],

  computed: {
  },

  methods: {
    changeBack() {
      this.active = true
      setTimeout(this.toggleConfirmModal, 800)
    },
  }
}
</script>

<style scoped>

.image {
  width: auto;
}

.media-left {
  width: 50%;
}

h1 {
  font-size: 34px;
  margin-bottom: 75px;
  margin-top: 30px;
}

.modal-card {
  height: 50%;
}

.modal-card-head {
  background-color: #fe0000;
}

.modal-card-title strong {
  color: white;
}

.modal-card-foot {
  background-color: #D9D9D9;
}

.button.is-danger.is-outlined {
  background-color: white;
  border-color: #fe0000;
  color: #fe0000;
  float: right;
  width: 50%;
  height: 50px;
}

.button.is-danger.is-outlined:hover, .button.is-danger.is-outlined.is-hovered {
  background-color: #fe0000;
  border-color: #fe0000;
  color: white;
}
.button.is-confirm.is-outlined {
  background-color: white;
  border-color: dodgerblue;
  color: dodgerblue;
  float: right;
  width: 50%;
  height: 50px;
}

.button.is-confirm.is-outlined:hover, .button.is-confirm.is-outlined.is-hovered {
  background-color: dodgerblue;
  border-color: dodgerblue;
  color: white;
}

.modal-card-head, .modal-card-foot {
  justify-content: flex-end;
}
</style>
