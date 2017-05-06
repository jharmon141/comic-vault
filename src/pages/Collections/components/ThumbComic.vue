<template>

    <div class="thumbView">

        <cover-modal :comic="true" v-if="showCoverModal" :response="comic"></cover-modal>
        <img @click="toggleCoverModal" :src="comic.artUrl">
        <p><em>{{comic.series}}</em></p>
        <p>Issue: {{comic.issueNumber}}</p>

    </div>

</template>

<script>
    import CoverModal from '../../../components/CoverModal.vue'

    export default {

        data: () => ({
            showCoverModal: false
        }),

        components: {
            'cover-modal': CoverModal,
        },

        props: {
            comic: {}
        },

        methods: {

            toggleCoverModal(){
                if (this.showCoverModal == false) {
                    this.showCoverModal = true
                } else {
                    this.showCoverModal = false
                }
            },
        }
}

</script>

<style scoped>

img {
    max-width: 85%;
}

.thumbView {
    width: 25%;
    height: 300px;
    float: left;
    margin-bottom: 14%;
}

.thumbView p{
    word-wrap: break-word;
    padding-right: 15px;
}
.button:hover, .button.is-hovered {
    background-color: #1E90FF;
    color: whitesmoke;
}

.button.is-danger.is-outlined:hover, .button.is-danger.is-outlined:focus{
    background-color: #1E90FF;
}

.button.is-danger.is-outlined{
    border-color: #1E90FF;
    color: #1E90FF;
}

.button.edit.is-outlined{
    border-color: #1E90FF;
    color: #1E90FF;
    float: left;
}

.button.edit.is-outlined:hover, .button.edit.is-outlined:focus{
    background-color: #1E90FF;
    color: white;
}

.button {
    width: 50%;
    height: 35px;
    font-size: 20px;
    margin-bottom: 25px;
    color: #1E90FF;
    border-color: #1E90FF;
}

img {
    cursor: pointer;
}
</style>
