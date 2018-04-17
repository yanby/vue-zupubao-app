<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">

</style>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
*{padding: 0; margin: 0;}
body {
	font-family: "微软雅黑";
    font-size: 16px;
    color: #666;
    width: 7.5rem;
    margin: 0 auto;
    background: #f7f8fa;
}

a{text-decoration: none;}

/*display: -webkit-box;
display: -moz-box;
display: -webkit-flex;
display: -ms-flexbox;

transform: -webkit-box;
transform: -moz-box;
transform: -webkit-flex;
transform: -ms-flexbox;*/
</style>
