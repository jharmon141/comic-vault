<template>
    <div>
        <div v-if="loadingStatus">
            <loading></loading>
        </div>
        <div v-else>
            <h1>Search For Comics:</h1>
            <div class="columns">
                <div class="container column is-8">
                    <tabs>
                    <tab name="Series" :selected="true">
                    <div class="column is-12">
                        <div class="field">
                            <p class="control">
                            <input @keyup.enter="clicked" type="text" placeholder="Series Name" v-model="seriesName">
                            </p>
                        </div>
                    </div>
                    </tab>
                    <tab name="Issue">
                    <div class="column is-12">
                        <div class="field">
                            <p class="control">
                            <input @keyup.enter="clicked" type="text" placeholder="Issue Name" v-model="issueName">
                            <input @keyup.enter="clicked" type="text" placeholder="Issue Number" v-model="volumeNumber">
                            </p>
                        </div>
                    </div>
                    </tab>
                    <tab name="Character">
                    <div class="column is-12">
                        <div class="field">
                            <p class="control">
                            <input @keyup.enter="clicked" type="text" placeholder="Character Name" v-model="characterName">
                            </p>
                        </div>
                    </div>
                    </tab>
                    <br>
                    <span class="button is-danger is-outlined" @click="clicked">Search</span>
                    </tabs>
                    <br>
                    <div id="results">
                    <results :responses="queryResponse"></results>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Tabs from './components/Tabs.vue'
import Tab from './components/Tab.vue'
import Results from './components/Results.vue'
import store from '../../store/index.js'
import Loading from '../../components/Loading.vue'

export default {
    name: 'search',
    components: {
        'tabs': Tabs,
        'tab': Tab,
        'results': Results,
        'loading': Loading
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
        clicked() {
            this.loadingStatus = true
            this.queryParams.field = ''
            this.queryParams.name = ''
            this.queryParams.series = this.seriesName
            this.queryParams.issue = this.issueName
            this.queryParams.character = this.characterName
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

            var that = this.queryParams.field
            axios.get(`http://localhost:5000/api/${this.queryParams.name}/${this.queryParams.volume}/${this.queryParams.field}`).then((response) => {
                let filteredResponse = []
                for (let i = 0; i < response.data.results.length; i++) {
                    if (that == 'issue,volume') {
                        that = 'issue'
                    }
                    if (response.data.results[i].resource_type == that) {
                        filteredResponse.push(response.data.results[i])
                    }
                }
                this.queryResponse = filteredResponse
                this.loadingStatus = false
            })
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
