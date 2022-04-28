<template>
  <div class="home">
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <div>
      <navigation-button content="Chords" to="/chords"></navigation-button>
      <navigation-button content="Tones" to="/tones"></navigation-button>
      <navigation-button content="Circle of Fifths" to="/circle"></navigation-button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NavigationButton from '@/components/buttons/NavigationButton'
export default {
  name: 'HomeView',
  components: { NavigationButton }
}
</script>
