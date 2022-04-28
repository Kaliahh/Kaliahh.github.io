<template>
  <div>
    <button-component content="Major"></button-component>
    <button-component content="Minor"></button-component>
  </div>
</template>

<script>
import ButtonComponent from '@/components/buttons/ButtonComponent'
export default {
  name: 'ChordsView',
  components: { ButtonComponent },
  data () {
    return {
      minorChords: ['Am', 'Bbm', 'Bm', 'Cm', 'C#m', 'Dm', 'D#m', 'Em', 'Fm', 'F#m', 'Gm', 'G#m'],
      majorChords: ['A', 'Bb', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'],
      inversions: ['Root', '1st', '2nd']
    }
  }
}
</script>

<style scoped>

</style>
