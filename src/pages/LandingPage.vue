<template>

    <HomeAuth v-if="viewType === 'list'"></HomeAuth>
    <HomeUnAuth v-else-if="viewType === 'thumbs'"></HomeUnAuth>

</template>

<script>


</script>

<style>

</style>
