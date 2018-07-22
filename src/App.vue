<template>
  <div id="app">
    <v-app >
        <v-navigation-drawer fixed v-model='sideNav' >
          <v-list>
            <v-list-tile>
              <v-list-tile-content>
                <v-btn flat to="/">Home</v-btn>
              </v-list-tile-content>    
            </v-list-tile>
            
            <v-list-tile>
              <v-list-tile-content>
                <v-btn flat>About</v-btn>
              </v-list-tile-content>  
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>
                <v-btn flat >Contact</v-btn>
              </v-list-tile-content>  
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-content>
                <v-btn flat >Bag</v-btn>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-navigation-drawer>
        <v-toolbar fixed class="navBar">
        <v-toolbar-side-icon class="hidden-md-and-up" @click.native="sideNav =!sideNav"></v-toolbar-side-icon>
       <router-link tag='a' to='/'> <v-toolbar-title>E-kart</v-toolbar-title></router-link>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down menuItems">
          <v-btn flat to="/">Home</v-btn>
          <v-btn flat>About</v-btn>
          <v-btn flat>Contact</v-btn>
          <v-btn flat>Bag</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      sideNav: false
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
   background-color: #FFF !important;
  color: #2c3e50;
  margin-top: 20px;
}
.navBar{
  background-color: #2c3e50 !important;
  margin: 0 auto !important;
  padding: 0 auto !important;
  
}
.menuItems a {
  color: #FFF !important;
}
.menuItems button {
  color: #FFF !important;
}
.v-toolbar__title {
   color: #FFF !important; 
}
a {
  text-decoration: none;
}
a div{
  color: #000;
}
</style>
