<template>
    <div class="search">

        <div v-if="loadingStatus">
            <loading></loading>
        </div>

        <div v-else>
            <h1>Search For Comics:</h1>

            <div class="columns">
                <div class="container column is-8">
                    <tabs>

                    <tab name="Series">
                    <input  @keyup.enter="search('series')" type="text" placeholder="Series Name" v-model="seriesName">
                    </tab>

                    <tab name="Issue">
                    <input @keyup.enter="search('general')" type="text" placeholder="Issue Name" v-model="issueName">
                    <input @keyup.enter="search('general')" type="text" placeholder="Issue Number" v-model="volumeNumber">
                    </tab>

                    <tab name="Character">
                    <input @keyup.enter="search('general')" type="text" placeholder="Character Name" v-model="characterName">
                    </tab>

                    <br>

                    <span  class="button is-danger is-outlined" @click="search('general')">Search</span>

                    </tabs>

                    <br>

                    <div id="results">
                        <results :search="search" :responses="queryResponse"></results>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Tabs from './components/Tabs.vue'
import NewComicList from './components/NewComicList.vue'
import Tab from './components/Tab.vue'
import Results from './components/Results.vue'
import store from '../../store/index.js'
import Loading from '../../components/Loading.vue'

export default {
    name: 'Search',

    components: {
        'tabs': Tabs,
        'tab': Tab,
        'results': Results,
        'loading': Loading,
        'new-comic-list': NewComicList
    },

    data: () => ({
        seriesName: '',
        issueName: '',
        characterName: '',
        volumeNumber: '',
        queryResponse: [],
        queryParams: {},
        showIssueModal: false,
        loadingStatus: false
    }),

    methods: {

        search(type, id) {

            this.loadingStatus = true
            window.scrollTo(0,0)

            this.queryParams.field = ''
            this.queryParams.name = ''
            this.queryParams.series = this.seriesName
            this.queryParams.issue = this.issueName
            this.queryParams.character = this.characterName

            if (type === 'general') {

                if (this.queryParams.series !== ''){
                    this.queryParams.field = 'volume'
                    this.queryParams.name = this.seriesName
                } else if (this.queryParams.issue !== ''){
                    this.queryParams.field = 'issue,volume'
                    this.queryParams.name = this.issueName
                    this.queryParams.volume = this.volumeNumber
                } else if (this.queryParams.character !== ''){
                    this.queryParams.field = 'character'
                    this.queryParams.name = this.characterName
                } else {
                    alert('error')
                }

                let that = this.queryParams.field
            
                axios.get(`/api/${this.queryParams.name}/${this.queryParams.volume}/${this.queryParams.field}`).then((response) => {
                    let filteredResponse = []
                    for (let i = 0; i < response.data.results.length; i++) {
                        if (that == 'issue,volume') {
                            that = 'issue'
                        }
                        if (response.data.results[i].resource_type == that) {
                            filteredResponse.push(response.data.results[i])
                        }
                    }
                    this.queryResponse = response.data.results 
                    this.loadingStatus = false
                })
            }

            else if (type === 'issues') {
                axios.get(`/issues/${id}`).then((response) => {
                    this.queryResponse = response.data.results
                    this.loadingStatus = false
                })
            }

            else if (type === 'series') {
                let name = this.seriesName.trim().split(' ').join('+')
                axios.get(`/series/${name}`).then((response) => {
                    this.queryResponse = response.data.results
                    this.loadingStatus = false
                })
            }

            this.queryParams = {}
            this.seriesName = ''
            this.issueName = ''
            this.characterName = ''
            this.volumeNumber = ''
            this.queryResponse = []

        }
    }
}

</script>

<style scoped>

.search{
    display: initial;
    justify-content: flex-start;
    flex-direction: column;
}
.column.is-8 {
    margin-left: 0px !important;
    margin-right: 0px !important;
}

.column.is-12 {
    padding: 0px;
}

input {
    margin-bottom: 25px;
    height: 50px;
    font-size: 18px;
    width: 100%;
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
    margin-top: 25px;
    margin-bottom: 50px;
}
h1 {
    font-size: 24px;
    margin-bottom: 50px;
    margin-top: 10px;
}
</style>
