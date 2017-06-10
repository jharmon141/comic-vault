<template>
  <div>

    <div v-if="response.resource_type === 'volume' || response.count_of_issues" :class="{ 'slideOutDown': active }" class="animated slideInUp modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title"><strong>{{response.name}}</strong></p>
          <button @click="changeBack" class="delete"></button>
        </header>
        <section class="modal-card-body">
          <article class="media">
            <div class="media-left">
                <img :src="response.image.small_url" alt="">
                <small></small>
            </div>
            <div class="media-content">
                  <strong v-if="response.name">{{response.name}}</strong> 
                  <br>
                  <em>Published by:</em> <small v-if="response.publisher.name"><strong>{{response.publisher.name}}</strong></small>
                  <br>
                  <div>
                      <em v-if="response.start_year">Released: </em><strong>{{response.start_year}}</strong>
                    <br>
                    <em v-if="response.count_of_issues">Issues: </em><strong>{{response.count_of_issues}}</strong>
                    <br>
                    <em>Description: </em>
                    <div class="description" v-html="response.description"></div>
              </div>
            </div>
          </article>
        </section>
        <footer class="modal-card-foot">
            <a class="button is-danger" @click="search('issues', response.id)">Search issues in {{response.name}}</a>
        </footer>
      </div>
    </div>


    <div v-else-if="response.resource_type === 'character'" :class="{ 'slideOutDown': active }" class="animated slideInUp modal is-active">
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
                    <small v-if="response.aliases">Aliases: <strong>{{response.aliases}}</strong></small>
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
        </footer>
      </div>
    </div>

    <div v-else :class="{ 'slideOutDown': active }" class="animated slideInUp modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title"><strong>{{response.name}}</strong></p>
          <button @click="changeBack" class="delete"></button>
        </header>
        <section class="modal-card-body">
          <article class="media">
            <div class="media-left">
                <img :src="response.image.small_url" alt="">
                <small></small>
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

  </div>
</template>


<script>
export default {
    name: 'info-modal',

    data: () => ({
        active: false,
    }),

    props: ['search', 'toggleInfoModal', 'handleCreate', 'response'],

    methods: {

      changeBack() {
        this.active = true
        setTimeout(this.toggleInfoModal, 1000)
      },

        save(){
            this.handleCreate()
        }
    }
}
</script>


<style scoped>

.description {
    margin-top: 15px;
}

.image {
    width: auto;
    overflow: auto;
}

.media-left {
    width: 25%;
}


small {
    font-size: 16px;
}

.modal-card {
    height: 90%;
    width: 85%;
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

header {
    height: 55px;
}

footer {
    height: 55px;
}
</style>
