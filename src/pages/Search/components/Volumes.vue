<template>
  <div>

    <cover-modal :toggleCoverModal="toggleCoverModal" v-if="showIssueModal" :response="volume"></cover-modal>
    <info-modal v-if="showInfoIssueModal" :toggleInfoModal="toggleInfoModal" :search="search" :response="volume"></info-modal>

      <div @click="toggleInfoModal" class="box">
        <article class="media">
          <div class="media-left">
            <figure @click="toggleCoverModal" class="image">
                <img v-if="volume.image" :src="volume.image.small_url" alt="cover">
            </figure>
          </div>
          <div class="media-content">
            <div class="content">
              <p>
                <strong v-if="volume.name">{{volume.name}}</strong> <small>Published by</small> <small v-if="volume.publisher.name"><strong>{{volume.publisher.name}}</strong></small>
                <br>
                <div>
                  <small v-if="volume.start_year">Released: <strong>{{volume.start_year}}</strong></small>
                  <br>
                  <small v-if="volume.count_of_issues">Issues: <strong>{{volume.count_of_issues}}</strong></small>
                </div>
              </p>
            </div>
            <nav class="level is-mobile">
              <div class="level-left">
                <a  class="button is-small is-primary is-outlined">More Info</a>
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
    name: 'volumes',

    components: {
      'cover-modal': CoverModal,
      'info-modal': InfoModal
    },

    props: ['volume','search'],

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


<style scoped>

.box:hover {
  border: 1px solid dodgerblue;
  cursor: pointer;
}

.box {
    font-size: 18px;
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
