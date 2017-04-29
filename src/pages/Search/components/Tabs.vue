<template>
  <div>
    <div class="tabs is-toggle">
      <ul>
        <li v-for="tab in tabs">
          <a href="#" @click="selectTab(tab)">
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
        this.tabs.map(tab => {
          tab.isActive = (tab.name === selectedTab.name)
        })
      }
    }
  }
</script>


<style scoped>

.tabs li {
    width: 33.3%;
    margin-bottom: 50px;
}

.tabs.is-toggle li a {
    color: dodgerblue;
    border-color: dodgerblue;
}

.tabs.is-toggle li a:hover{
    background-color: dodgerblue;
    color: white;
}
</style>
