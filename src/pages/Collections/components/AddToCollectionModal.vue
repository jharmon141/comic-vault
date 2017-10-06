<template>
  <div>
    <div class="modal is-active">
      <div class="modal-background"></div>
      <div :class="{ 'slideOutDown': active }" class="animated slideInUp modal-card">
        <section class="modal-card-body">
          <h1>Add to Collection:</h1>
          <ul>
            <li v-for="collection in collections">
              <span @click="addToCollection(collection)" type="submit" class="button is-outlined is-danger">{{collection.name}}</span>
            </li>
          </ul>
        </section>
      </div>
      <button @click="changeBack" class="modal-close"></button>
    </div>
  </div>
</template>


<script>
import gql from 'graphql-tag'


const createCollectionOnComic = gql`
  mutation($comicId: ID!, $collectionId: ID!){
    addToCollectionOnComic(comicsComicId: $comicId, collectionsCollectionId: $collectionId){
      comicsComic{
        id
      }
      collectionsCollection{
        id
      }
    }
  }
`

export default {

  data: () => ({
    active: false,
  }),

  props: ['toggleAddCollectionModal', 'comic'],

  computed: {
    collections() {
      return this.$store.state.collections.filter(obj => {
        return obj.name.toLowerCase() !== "all"
      })
    },
  },

  methods: {

    changeBack() {
      this.active = true
      setTimeout(this.toggleAddCollectionModal, 800)
    },

    addToCollection(collection){
      let comicId = this.comic.id
      let collectionId = collection.id


      this.$apollo.mutate({
        mutation: createCollectionOnComic,
        variables: {
          comicId,
          collectionId
        },
      }).then((data) => {
        window.localStorage.setItem("Snackbar", true)
        window.localStorage.setItem("snackMessage", "Comic added to collection")
        location.reload()
      }).catch((error) => {
        console.error(error)
      })
    }
  }
}
</script>


<style scoped>

h1 {
  font-size: 33px;
  margin-bottom: 40px;
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
  border-color: dodgerblue;
  color: dodgerblue;
  float: right;
  width: 100%;
  height: 50px;
  font-size: 22px;
}

.button.is-danger.is-outlined:hover, .button.is-danger.is-outlined.is-hovered {
  background-color: dodgerblue;
  border-color: dodgerblue;
  color: white;
}

.modal-card-head, .modal-card-foot {
  justify-content: flex-end;
}
</style>
