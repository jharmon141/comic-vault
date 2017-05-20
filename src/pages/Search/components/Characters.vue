<template>
  <div>
      <cover-modal :toggleCoverModal="toggleCoverModal" v-if="showIssueModal" :response="character"></cover-modal>
      <info-modal :toggleInfoModal="toggleInfoModal" :handleCreate="handleCreate" v-if="showInfoIssueModal" :response="character"></info-modal>
      <div class="box">
        <article class="media">
          <div class="media-left">
            <figure @click="toggleCoverModal" class="image">
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
                <a v-if="character.name" @click="toggleInfoModal" class="button is-small is-primary is-outlined">{{character.name}}</a>
                <a v-else @click="toggleInfoModal" class="button is-small is-primary is-outlined">{{character.volume.name}}</a>
              </div>
            </nav>
          </div>
        </article>
      </div>
  </div>
</template>

<script>
import CoverModal from '../../../components/CoverModal.vue'
import InfoModal from './InfoModal.vue'

export default {
    name: 'characters',
    components: {
      'cover-modal': CoverModal,
      'info-modal': InfoModal
    },
    props: {
      character: {}
    },
    data: () => ({
      showIssueModal: false,
      showInfoIssueModal: false
    }),
    methods: {
      toggleCoverModal() {
        if (this.showIssueModal == false) {
          this.showIssueModal = true
        } else {
          this.showIssueModal = false
        }
      },
      toggleInfoModal() {
        if (this.showInfoIssueModal == false) {
          this.showInfoIssueModal = true
        } else {
          this.showInfoIssueModal = false
        }
      }
    }
  }
</script>

<style lang="css">
.box:hover {
  border: 1px solid dodgerblue;
}
.image{
  width: 6em;
  height: auto;
}
.button.is-primary.is-outlined {
    color: #fe0000 !important;
    border-color: #fe0000 !important;
}

.button.is-primary.is-outlined:hover {
    color: white !important;
    background-color: #fe0000 !important;
    border-color: #fe0000 !important;
}
.image img{
    cursor: pointer;
}
</style>
