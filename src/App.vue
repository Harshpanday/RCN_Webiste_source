<template>
  <nav>
    <div class="topnav">
  <a class="active" href="#home">Ohio RCN</a>
  <a class="active" href="https://od.commons.osu.edu/dataverse/foodshed" style="float:right">Dataverse</a>
  <b href="#demo"><el-collapse ><el-collapse-item title="Demo" name="Demo">
    <iframe width="600" height="400" src="https://www.youtube.com/embed/X613xWvP7CQ" title="Demo for Visualization of Ohio RCN data" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  </el-collapse-item></el-collapse></b>
  
</div>
  </nav>
  <router-view/>
</template>

<script>

export default{
  name:"AppView",
  methods:
  {
    handleSelect(val){
      console.log(val)
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.topnav {
  overflow: hidden;
  background-color: rgb(255, 255, 255);
}

.topnav a {
  float: left;
  color: #000000;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a.active {
  background-color: #04AA6D;
  color: white;
}

.topnav b {
  float: left;
  color: #000000;
  text-align: center;
  padding: 1px 10px;
  text-decoration: none;
  font-size: 20px;
}

.topnav b:hover {
  background-color: #ddd;
  color: black;
}
</style>
