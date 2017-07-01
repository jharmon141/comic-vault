<template>
  <div>

    <div class="tabs is-toggle">
      <ul>

        <li v-for="tab in tabs">
            <a :class="{ 'active': tab.isActive }" @click="selectTab(tab)">
                <span>{{tab.name}}</span>
            </a>
        </li>

      </ul>
    </div>

    <div>
        <slot></slot>
    </div>

  </div>
</template>


<script>
import Tab from './Tab.vue'
import store from '../../../store/index.js'

  export default {
    name: 'tabs',

    components: {
      'tab': Tab
    },

    data() {
      return {
        tabs: [],
        activate: false
      }
    },

    created() {
      this.tabs = this.$children
    },

    methods: {
        selectTab(selectedTab){
            this.$store.dispatch('handleSetSearchTab', selectedTab.name)
            this.tabs.map(tab => {
                tab.isActive = (tab.name === this.$store.state.searchTab)
        })
      }
    }
  }
</script>


<style scoped>

.tabs li {
    width: 33.3%;
    margin-bottom: 50px;
    font-size: 18px;
}

.tabs.is-toggle li a {
    color: dodgerblue;
    border-color: dodgerblue;
}

.tabs.is-toggle li a:hover{
    background-color: white;
    color: dodgerblue;
}

a.active {
    background-color: dodgerblue;
    color: white !important;
}

a.active:hover {
    background-color: dodgerblue !important;
    color: white !important;
}
</style>
