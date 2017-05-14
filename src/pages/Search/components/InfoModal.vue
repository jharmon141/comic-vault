<template>
  <div>
    <div v-if="response.resource_type === 'volume'" class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title"><strong>{{response.name}}</strong></p>
          <button @click="changeBack" class="delete"></button>
        </header>
        <section class="modal-card-body">
          <article class="media">
            <div class="media-left">
              <p class="image">
                <img :src="response.image.small_url" alt="">
                <small></small>
              </p>
            </div>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong v-if="response.name">{{response.name}}</strong> <small>Published by</small> <small v-if="response.publisher.name"><strong>{{response.publisher.name}}</strong></small>
                  <br>
                  <div>
                    <small v-if="response.start_year">Released: <strong>{{response.start_year}}</strong></small>
                    <br>
                    <small v-if="response.count_of_issues">Issues: <strong>{{response.count_of_issues}}</strong></small>
                  </div>
                </p>
              </div>
            </div>
          </article>
          <div v-html="response.description"></div>
        </section>
        <footer class="modal-card-foot">
          <a class="button is-danger">Save</a>
        </footer>
      </div>
    </div>
    <div v-if="response.resource_type === 'issue'" class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title"><strong>{{response.name}}</strong></p>
          <button @click="changeBack" class="delete"></button>
        </header>
        <section class="modal-card-body">
          <article class="media">
            <div class="media-left">
              <p class="image">
                <img :src="response.image.small_url" alt="">
                <small></small>
              </p>
            </div>
            <div class="media-content">
              <div class="content">
                <p>
                  <div>
                    <small v-if="response.cover_date">Cover Date: <strong>{{response.cover_date}}</strong></small>
                    <br>
                    <small v-if="response.name">Volume: <strong>{{response.name}}</strong></small>
                    <br>
                    <small v-if="response.issue_number">Issue in Volume: <strong>{{response.issue_number}}</strong></small>
                  </div>
                </p>
              </div>
            </div>
          </article>
          <div v-html="response.description"></div>
        </section>
        <footer class="modal-card-foot">
          <a @click="save" class="button is-danger">Save</a>
        </footer>
      </div>
    </div>
    <div v-if="response.resource_type === 'character'" class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title"><strong>{{response.name}}</strong></p>
          <button @click="changeBack" class="delete"></button>
        </header>
        <section class="modal-card-body">
          <article class="media">
            <div class="media-left">
              <p class="image">
                <img :src="response.image.small_url" alt="">
                <small></small>
              </p>
            </div>
            <div class="media-content">
              <div class="content">
                <p>
                  <div>
                    <small v-if="response.real_name">Real Name: <strong>{{response.real_name}}</strong></small>
                    <br>
                    <small v-if="response.birth">Birth: <strong>{{response.birth}}</strong></small>
                    <br>
                    <small v-if="response.publisher.name">Creator: <strong>{{response.publisher.name}}</strong></small>
                  </div>
                </p>
              </div>
            </div>
          </article>
          <div v-html="response.description"></div>
        </section>
        <footer class="modal-card-foot">
          <a class="button is-danger">Save</a>
        </footer>
      </div>
    </div>
  </div>
</template>


<script>
export default {
    name: 'info-modal',
    props: ['response'],

    methods: {

        changeBack() {
            this.$parent.toggleInfoModal()
        },

        save(){
            this.$parent.handleCreate()
        }
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


small {
    font-size: 16px;
}

.modal-card {
    height: 85%;
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

.button.is-danger {
    background-color: white;
    border-color: #fe0000;
    color: #fe0000;
    float: right;
}

.button.is-danger:hover, .button.is-danger.is-hovered {
    background-color: #fe0000;
    color: white;
}

.modal-card-head, .modal-card-foot {
    justify-content: flex-end;
}


</style>
