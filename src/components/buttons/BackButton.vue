<template>
  <button-component></button-component>
</template>

<script>
import ButtonComponent from '@/components/buttons/ButtonComponent'
export default {
  name: 'BackButton',
  components: { ButtonComponent }
}
</script>

<style scoped>
button {
  background-color: rgb(90, 47, 47);
}

button:hover {
  background-color: rgb(100, 47, 47);
}
</style>
