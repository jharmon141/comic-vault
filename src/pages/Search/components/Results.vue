<template>
    <div>
        <div v-for="response in responses">
                <issues v-if="response.resource_type == 'issue'" :issue="response"/>
                <volumes v-if="response.resource_type == 'volume'" :volume="response"/>
                <characters v-if="response.resource_type == 'character'" :character="response"/>
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
    props: ['responses']
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
