<template>
  <div>
    <div class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title"><strong>Add to Collection:</strong></p>
          <button @click="changeBack" class="delete"></button>
        </header>
        <section class="modal-card-body">
              <ul>
                  <li v-for="collection in collections">
                      <span @click="addToCollection(collection)" type="submit" class="button is-outlined is-danger">{{collection.name}}</span>
                  </li>
              </ul>
        </section>
        <footer class="modal-card-foot">
        </footer>
      </div>
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
    props: {
        comic: {},
    },

    computed: {
        collections() {
            return this.$store.state.collections.filter(obj => {
                return obj.name.toLowerCase() !== "all"
            })
        },
    },

    methods: {

        changeBack() {
            this.$parent.toggleAddCollectionModal()
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
                this.$router.push({ path: '/' })
                location.reload()
            }).catch((error) => {
                console.error(error)
            })
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
    height: 50%;
}

.modal-card-head {
    background-color: dodgerblue;
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
    width: 100%;
    height: auto;
}

.button.is-danger.is-outlined:hover, .button.is-danger.is-outlined.is-hovered {
    background-color: #fe0000;
    color: white;
}

.modal-card-head, .modal-card-foot {
    justify-content: flex-end;
}


</style>
