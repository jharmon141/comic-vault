<template>
    <div>
        <aside class="menu">
            <p class="menu-label">
            Add Comics
            </p>
            <ul class="menu-list">
                <li><router-link to="/search"><a>Search</a></router-link></li>
                <li><router-link to="/manual"><a>Add Manual</a></router-link></li>
            </ul>
            <p class="menu-label">
            Archive
            </p>
            <ul class="menu-list">
                <li><router-link to="/collections"><a>All</a></router-link></li>
                <li>
                    <p class="menu-label">
                    Collections
                    </p>
                    <ul>
                        <li><a>Marvel</a></li>
                        <li><a>DC</a></li>
                        <li><a>Graphic Novels</a></li>
                    </ul>
                </li>
            </ul>
            <ul class="menu-list">
                <li><router-link to="/addcollection"><a>Add Collection</a></router-link></li>
            </ul>
        </aside>
    </div>
</template>

    
<script>


</script>

<style scoped>

aside {
    margin-left: 10px;
}

.menu-list a:hover{
    color: #fe0000;
}

.menu-list {
    margin-bottom: 40px;
}

.menu-label {
    margin-top: 10px;
}

</style>
<style src="bulma/css/bulma.css"></style>
