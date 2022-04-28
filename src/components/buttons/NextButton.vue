<template>
  <button-component></button-component>
</template>

<script>
import ButtonComponent from '@/components/buttons/ButtonComponent'
export default {
  name: 'NextButton',
  components: { ButtonComponent }
}
</script>

<style scoped>
button {
  background-color: rgb(47, 70, 47);
}

button:hover {
  background-color: rgb(47, 80, 47);
}
</style>
