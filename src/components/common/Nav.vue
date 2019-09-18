<template>
    <nav>
        <router-link to="/" active-class="router-link-exact-active" exact>Home</router-link>
        <a href="#">Contacts</a>
        <a href="#">Details</a>
    </nav>
</template>
<script>

</script>
<style lang="scss" scoped>
nav {
    display:block;
    a {
        text-decoration: none;
        padding: 5px 15px 5px 0;
        color: darkslategray;
    }
} 
.router-link-exact-active {
    color: red;
}
</style>