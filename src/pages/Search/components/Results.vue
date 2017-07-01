<template>
    <div>
        <div v-for="response in responses">
                <volumes v-if="response.resource_type == 'volume' || response.count_of_issues" :search="search" :volume="response"/>
                <characters v-else-if="response.resource_type == 'character'" :search="search" :character="response"/>
                <issues v-else :issue="response"/>
        </div>
    </div>
</template>

<script>
  import Volumes from './Volumes.vue'
  import Issues from './Issues.vue'
  import Characters from './Characters.vue'

  export default {
    name: 'results',

    components: {
      'volumes': Volumes,
      'issues': Issues,
      'characters': Characters
    },

    props: ['search','responses']
  }

</script>


<style scoped>

.box {
    width: 100%;
}

.box:hover {
  border: 1px solid #fe0000;
}

.individual{
  padding-bottom: 1em;
}

.image{
  width: 6em;
  height: auto;
}

.column.is-12 {
    padding: 0px;
}
</style>
