<template>
    <div class="animated slideInUp manageCollections">

        <add-collection></add-collection>
        <edit-collections></edit-collections>

    </div>
</template>

<script>
import AddCollection from './components/AddCollection'
import EditCollection from './components/EditCollection'

export default {
    name: 'ManageCollections',
    components: {
        'add-collection': AddCollection,
        'edit-collections': EditCollection
    },
}

</script>

<style>

</style>
