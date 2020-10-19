<template>
  <div id="app">

    <div class="container-fluid">
      <div class="row">
        <div class="col-md-3 d-flex justify-content-center align-items-center" id="banner">
          <img src="./assets/1.png" width="50%"></div>
        <div class="col-md-9 d-flex justify-content-center align-items-center" id="content">
         <div id="nav">
         <router-link to="/">Home</router-link> |
          <router-link to="/admin">Admin</router-link>
         </div>
          <div class="col-md-8 rounded px-5 py-5 shadow bg-white">
            <router-view/>
          </div>
           
        </div>
      </div>
    </div>
  </div>
</template>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #ffffff;
}

#nav a.router-link-exact-active {
  color: #770286;
}
#content {
  display: flex;
  flex-direction: column;
}


</style>
