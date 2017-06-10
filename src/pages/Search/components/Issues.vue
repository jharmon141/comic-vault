<template>
  <div>

    <cover-modal :toggleCoverModal="toggleCoverModal" v-if="showIssueModal" :response="issue"></cover-modal>
    <info-modal v-if="showInfoIssueModal" :toggleInfoModal="toggleInfoModal" :handleCreate="handleCreate" :response="issue"></info-modal>

      <div class="box">
        <article class="media">

          <div class="media-left">
            <figure @click="toggleCoverModal" class="image">
              <img v-if="issue.image" :src="issue.image.small_url" alt="cover">
            </figure>
          </div>

          <div class="media-content">
            <div class="content">
              <p v-if="issue.name">
                <strong>{{issue.name}}</strong>
              </p>
              <p v-else>
                <strong>{{issue.volume.name}}</strong>
              <p>
                <div>
                  <small v-if="issue.cover_date">Cover Date: <strong>{{issue.cover_date}}</strong></small>
                  <br>
                  <small v-if="issue.volume.name">Volume: <strong>{{issue.volume.name}}</strong></small>
                  <br>
                  <small v-if="issue.issue_number">Issue in Volume: <strong>{{issue.issue_number}}</strong></small>
                </div>
            </div>

            <nav class="level is-mobile">
              <div class="level-left">
                <a v-if="issue.name" @click="toggleInfoModal" class="button is-small is-primary is-outlined">{{issue.name}}</a>
                <a v-else @click="toggleInfoModal" class="button is-small is-primary is-outlined">{{issue.volume.name}}</a>
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
    name: 'issues',

    components: {
        'cover-modal': CoverModal,
        'info-modal': InfoModal
    },

    props: ['issue'] ,

    data: () => ({
        showIssueModal: false,
        showInfoIssueModal: false
    }),

    methods: {
        handleCreate(){
            let comic = this.issue
            console.log(comic)
            this.$store.dispatch('handleSetNewComic', comic)
            this.$router.push('/new')
        },

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
}

.image{
  width: 6em;
  height: auto;
}

.button.is-primary.is-outlined {
    color: #fe0000;
    border-color: #fe0000;
}

.button.is-primary.is-outlined:hover {
    color: white;
    background-color: #fe0000;
    border-color: #fe0000;
}

.image img{
    cursor: pointer;
}
</style>
