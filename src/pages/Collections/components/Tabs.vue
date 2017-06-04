<template>
    <div class="tabs">

        <div class="tabs is-toggle">
            <ul class="tabList">
                <li :class="{ 'is-active': listView }" v-on:click="setListView">
                    <a>
                        <v-icon>list</v-icon>
                    </a>
                </li>
                <li :class="{ 'is-active': thumbView }" v-on:click="setThumbView">
                    <a >
                        <v-icon>view_module</v-icon>
                    </a>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>

export default {

    props: ['thumbView','listView', 'setListView', 'setThumbView'],

}

</script>

<style scoped>

.tabs {
    margin-left: 15%;
}

.tabs.is-toggle{
    margin-bottom: 100px;
}

.tabs.is-toggle li a{
    border-color: #fe0000;
    color: #fe0000;
}

.tabs.is-toggle li.is-active a{
    border-color: #fe0000;
    background-color: #fe0000;
    color: white;
}

.tabs li {
    width: 20%;
}

v-icon {
    margin-left: 0px;
}

.tabs.is-toggle a:hover{
    background-color: white;
}
</style>
