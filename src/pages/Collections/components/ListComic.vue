<template>
    <div class="listView">

      <cover-modal :comic="true" v-if="showCoverModal" :response="comic"></cover-modal>
      <add-to-collection-modal :comic="comic" v-if="showAddCollectionModal"></add-to-collection-modal>

        <div class="comic" >
            <div class="columns">
                <div class="column is-3">
                    <img @click="toggleCoverModal" :src="comic.artUrl">
                </div>
                <div class="column is-7">
                    <div class="columns">
                        <div class="column is-6">
                            <p><em>Title</em>: {{comic.title}}</p>
                            <p><em>Series</em>: {{comic.series}}</p>
                            <p><em>Issue #</em>: {{comic.issueNumber}}</p>
                            <p><em>Publisher</em>: {{comic.publisher}}</p>
                        </div>
                        <div class="column is-6">
                            <p><em>Year</em>: {{comic.pubYear}}</p>
                            <p><em>Written By</em>: {{comic.writer}}</p>
                            <p><em>Art By</em>: {{comic.artist}}</p>
                        </div>
                    </div>

                    <div class="columns">
                        <div class="column is-12 ">
                            <p :class="{ 'fadeOutUp': active, 'fadeInDown': inActive}" class="animated" v-if="showMore"><em>Description:</em></p>
                            <div :class="{ 'fadeOutUp': active, 'fadeInDown': inActive}" class="animated" v-html="comic.description" v-if="showMore"></div>
                        </div>
                    </div>

                </div>

                <div v-if="!showMore" class="column is-2">
                    <span @click="toggleView()" class=" button edit is-outlined"><v-icon>expand_more</v-icon></span>
                </div>
                <div v-else="showMore" class="column is-2">
                    <span @click="handleToggleView()" class="button edit is-outlined"><v-icon>expand_less</v-icon></span>
                    <br>
                    <router-link :comic="comic" :to="{name: 'EditComic', params: {comic: comic.id}}"><span  class="button is-danger is-outlined"><v-icon>edit</v-icon></span></router-link>
                    <br>
                    <div v-if="collection.name === 'All'">
                    <span  @click="toggleAddCollectionModal" class="button is-danger is-outlined"><v-icon>add</v-icon></span>
                    <br>
                    </div>
                    <span @click="handleDelete" class="button is-danger is-outlined"><v-icon>clear</v-icon></span>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
import CoverModal from '../../../components/CoverModal.vue'
import AddToCollectionModal from './AddToCollectionModal.vue'

export default {

    data: () => ({
        showMore: false,
        showCoverModal: false,
        showAddCollectionModal: false,
        active: false,
        inActive: true
    }),

    components: {
        'cover-modal': CoverModal,
        'add-to-collection-modal': AddToCollectionModal
    },

    props: {
        comic: {},
        collection: '',
    },

    methods: {

        handleToggleView(){
            this.active = true
            this.inActive = false
            setTimeout(this.toggleView, 600)
        },

        toggleView(){
            if (this.showMore === true){
                this.showMore = false
            } else {
                this.inActive = true
                this.showMore = true
            }
        },

        toggleCoverModal(){
            if (this.showCoverModal == false) {
                this.showCoverModal = true
            } else {
                this.showCoverModal = false
            }
        },

        toggleAddCollectionModal(){
            if (this.showAddCollectionModal == false) {
                this.showAddCollectionModal = true
            } else {
                this.showAddCollectionModal = false
            }
        },

        handleDelete(){
            this.$parent.delete(this.comic)
        },


    }

}

</script>

<style scoped>

img {
    cursor: pointer;
    box-shadow: 10px 10px 5px #888888;
    max-height: 250px;
}

.comic {
    margin-left: 10px;
    margin-bottom: 60px;
}


.button.is-danger.is-outlined:hover, .button.is-danger.is-outlined:focus{
    background-color: red;
}

.button.is-danger.is-outlined{
    border-color: red;
    color: red;
}

.button.edit.is-outlined{
    border-color: dodgerblue;
    color: dodgerblue;
}

.button.edit.is-outlined:hover, .button.edit.is-outlined:focus{
    background-color: dodgerblue;
    color: white;
}

.button {
    width: 50%;
    height: 35px;
    font-size: 20px;
    margin-bottom: 25px;
}

.fade-enter-active, .fade-leave-active {
    transition: all .3s ease;
}

.fade-enter, .fade-leave-active {
    opacity: 0;
}
</style>
