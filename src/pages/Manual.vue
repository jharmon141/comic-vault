<template>

    <div class="manual">
        <h1>Add New Comic:</h1>
        <form>
            <input v-model="title" placeholder="Title" required>
            <br>
            <input v-model="series" placeholder="Series" required>
            <br>
            <input v-model="issueNumber" placeholder="Issue Number" required>
            <br>
            <input v-model="artUrl" placeholder="Cover Art Url" required>
            <br>
            <textarea v-model="description" placeholder="Description" required></textarea>
            <br>
            <input v-model="pubYear" placeholder="Year Published" required>
            <br>
            <input v-model="publisher" placeholder="Publisher" required>
            <br>
            <input v-model="writer" placeholder="Written By" required>
            <br>
            <input v-model="artist" placeholder="Art By" required>
            <br>
            <span type="submit" class="button is-outlined is-danger" @click="submit()">Submit</span>
        </form>


    </div>

</template>

<script>
import gql from 'graphql-tag'
import store from '../store/index.js'


const createComic = gql`
    mutation($collectionsIds: [ID!], $title: String, $series: String, $issueNumber: String, $artUrl: String, $description: String, $pubYear: String, $publisher: String, $writer: String, $artist: String){
createComic(title: $title, series: $series, issueNumber: $issueNumber, artUrl: $artUrl, description: $description, pubYear: $pubYear, publisher: $publisher, writer: $writer, artist: $artist, collectionsIds: $collectionsIds){
            id
        }
    }
`

export default {

    data: () => ({
        title: '',
        series: '',
        issueNumber: '',
        artUrl: '',
        description: '',
        pubYear: '',
        publisher: '',
        writer: '',
        artist: '',
    }),

    computed: {
        collectionsIds() {
            let collections = this.$store.state.collections
            let collectionsArr = []
            let allCollection = collections.find(collection => {
                return collection.name === "All"
            })
            collectionsArr.push(allCollection.id)
            return collectionsArr
        }
    },

    methods: {

        submit() {

            let title = this.title 
            let series = this.series
            let issueNumber = this.issueNumber
            let artUrl = this.artUrl
            let description = this.description
            let pubYear = this.pubYear
            let publisher = this.publisher
            let writer = this.writer
            let artist = this.artist
            let collectionsIds = this.collectionsIds
            let name = "All"


            // Mutation
            this.$apollo.mutate({
                mutation: createComic,
                variables: {
                    title,
                    series,
                    issueNumber,
                    artUrl,
                    description,
                    pubYear,
                    publisher,
                    writer,
                    artist,
                    collectionsIds
                },
            }).then((data) => {
                this.$parent.toggleSnackbar("Comic Added!")
                this.$router.push({ name: 'Collections' });
            }).catch((error) => {
                console.error(error)
            })
        },
    },


}
</script>

<style scoped>

.manual {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    width: 67%;
}

input {
    margin-bottom: 25px;
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

