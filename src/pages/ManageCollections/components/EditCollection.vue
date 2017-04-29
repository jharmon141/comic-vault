<template>

    <div class="editCollection">
        <h1>Edit Collections:</h1>
        
        <div v-for="collection in collections">
            <updateCollection :collection="collection"></updateCollection>
        </div>
    </div>

</template>

<script>
import gql from 'graphql-tag'
import store from '@/store/index.js'
import UpdateCollection from './UpdateCollection'

export default {

    components: {
        'updateCollection': UpdateCollection,
    },

    computed: {

        collections() {
            return this.$store.state.collections.filter((obj) => {
                return obj.name !== "All"
            })
        },

    },


}
</script>

<style scoped>

.editCollection {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    width: 67%;
}

input {
    height: 50px;
    font-size: 18px;
}

textarea {
    height: 300px;
    width: 100%;
    font-size: 18px;
    border: solid 1px #bbb;
    margin-bottom: 25px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    padding: 9px;
}

h1 {
    font-size: 24px;
    margin-bottom: 50px;
    margin-top: 10px;
}

li {
    float: left;
    margin-right: 10px;
}

ul {
    overflow: hidden;
}
.button:hover, .button.is-hovered {
    background-color: #fe0000;
    color: whitesmoke;
}

.button.is-danger.is-outlined:hover, .button.is-danger.is-outlined:focus{
    background-color: #fe0000;
}

.button.is-danger.is-outlined{
    border-color: #fe0000;
    color: #fe0000;
}

.button {
    width: 100%;
    height: 50px;
    font-size: 20px;
}

input {
    width: 100%;
}

</style>
<style src="bulma/css/bulma.css"></style>

