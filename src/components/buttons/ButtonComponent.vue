<template>
  <button>{{ content }}</button>
</template>

<script>
export default {
  name: 'ButtonComponent',
  props: {
    content: String
  }
}
</script>

<style scoped>

button {
  height: 100px;
  width: 60%;
  color: white;
  background-color: rgb(47, 47, 80);
  border-radius: 20px;
  border: 1px solid rgb(71, 71, 71);
  font-size: xx-large;
  touch-action: manipulation;
  margin-bottom: 10px;
}

button:hover, button:active {
  /*background-color: rgb(36, 36, 36);*/
  background-color: rgb(47, 47, 100);
}

</style>
