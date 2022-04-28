<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/chords">Chords</router-link> |
    <router-link to="/tones">Tones</router-link> |
    <router-link to="/circle">Circle of Fifths</router-link>
  </nav>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

//body {
//  background-color: rgb(26, 26, 26);
//}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
