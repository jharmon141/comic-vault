<template>
  <div>
    <!-- <modal v-if="showIssueModal" :response="response"></modal> -->
    <!-- <a @click="toggleModal"> -->
      <div class="box">
        <article class="media">
          <div class="media-left">
            <figure class="image">
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
                <a v-if="issue.name" class="button is-small is-primary is-outlined">{{issue.name}}</a>
                <a v-else class="button is-small is-primary is-outlined">{{issue.volume.name}}</a>
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
    name: 'issues',
    props: {
      issue: {}
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
}
</style>
