<template>
    <div>
        <div class="columns">
            <div class="column is-12">

                <div v-for="comic in comics" class="comicList">
                    <thumb-comic :comic="comic"></thumb-comic>
                </div>

            </div>
        </div>
    </div>

</template>

<script>
import ThumbComic from './ThumbComic.vue'

export default {
    name: 'thumbs',

    props: ['comics'],

    components: {
        'thumb-comic': ThumbComic
    },

}

</script>

<style scoped>

.is-10 {
    margin-left: 0px;
}

</style>
