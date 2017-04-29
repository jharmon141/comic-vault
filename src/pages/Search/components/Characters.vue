<template>
  <div>
    <!-- <modal v-if="showIssueModal" :response="response"></modal> -->
    <!-- <a @click="toggleModal"> -->
      <div class="box">
        <article class="media">
          <div class="media-left">
            <figure class="image">
              <img v-if="character.image" :src="character.image.small_url" alt="cover">
            </figure>
          </div>
          <div class="media-content">
            <div class="content">
              <p v-if="character.name">
                <strong>{{character.name}}</strong>
              </p>
              <p v-else>
                <strong>{{character.aliases}}</strong>
              <p>
                <div>
                  <small v-if="character.real_name">Real Name: <strong>{{character.real_name}}</strong></small>
                  <br>
                  <small v-if="character.birth">Birth: <strong>{{character.birth}}</strong></small>
                  <br>
                  <small v-if="character.publisher.name">Creator: <strong>{{character.publisher.name}}</strong></small>
                </div>
            </div>
            <nav class="level is-mobile">
              <div class="level-left">
                <a v-if="character.name" class="button is-small is-primary is-outlined">{{character.name}}</a>
                <a v-else class="button is-small is-primary is-outlined">{{character.volume.name}}</a>
              </div>
            </nav>
          </div>
        </article>
      </div>
    <!-- </a> -->
  </div>
</template>

<script>
  // import Modal from './Modal.vue'
  export default {
    name: 'characters',
    props: {
      character: {}
    }
    // data: () => ({
    //   showIssueModal: false
    // }),
    // methods: {
    //   toggleModal() {
    //     if (this.showIssueModal == false) {
    //       this.showIssueModal = true
    //     } else {
    //       this.showIssueModal = false
    //     }
    //   }
    // }
  }
</script>

<style lang="css">
.box:hover {
  border: 1px solid #fe0000;
}
.image{
  width: 6em;
  height: auto;
}
</style>
