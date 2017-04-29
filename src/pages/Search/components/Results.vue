<template>
  <div>
    <div v-for="response in responses">
      <div v-if="response.resource_type == 'issue'">
        <div class="column is-12">
          <div class="individual">
            <issues :issue="response"/>
          </div>
        </div>
      </div>
      <div v-if="response.resource_type == 'volume'">
        <div class="column is-12">
          <div class="individual">
            <volumes :volume="response"/>
          </div>
        </div>
      </div>
      <div v-if="response.resource_type == 'character'">
        <div class="column is-12">
          <div class="individual">
            <characters :character="response"/>
          </div>
        </div>
      </div>
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
