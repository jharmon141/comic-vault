<template>
  <div class="container">
    <article class="message is-info">
      <div class="message-header">
        <p>{{response.title}}</p>
        <a @click="change" class="button is-info is-inverted is-outlined">New Comic</a>
      </div>
      <div class="message-body">
        <strong>Description:</strong>
        {{response.description}}
        <br>
        <strong>Publisher:</strong>
        {{response.publisher}}
        <br>
        <strong>Creator(s):</strong>
        {{response.creators}}
        <br>
        <strong>Release Date:</strong>
        {{response.release_date}}
      </div>
    </article>
  </div>
</template>


<script>
  import axios from 'axios'
  export default {
    name: 'new-comic-list',
    data: () => ({
      response: [],
      dataReady: false
    }),
    beforeMount() {
      let queryNewComic = `
        https://api.shortboxed.com//comics/v1/new
      `
      axios.get(queryNewComic).then((response) => {
        let newInfo = response.data.comics
        let rando = Math.floor(Math.random()*100) + 1
        console.log(rando)
        this.response = newInfo[rando]
        this.dataReady = true
        this.source = response.title
      })
    },
    methods: {
      change() {
        let queryNewComic = `
          https://api.shortboxed.com//comics/v1/new
        `
        axios.get(queryNewComic).then((response) => {
          let newInfo = response.data.comics
          let rando = Math.floor(Math.random()*100) + 1
          console.log(rando)
          this.response = newInfo[rando]
          this.dataReady = true
          this.source = response.title
        })
      }
    }
  }
</script>


<style scoped>

</style>
