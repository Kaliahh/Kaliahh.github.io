<template>
  <router-link :to="to" v-slot="{route, navigate}">
    <button-component :content="content" @click="navigate">
      {{ route.name }}
    </button-component>
  </router-link>
</template>

<script>

import ButtonComponent from '@/components/buttons/ButtonComponent'
export default {
  name: 'NavigationButton',
  props: {
    to: String,
    content: String
  },
  components: { ButtonComponent }
}
</script>

<style scoped>

</style>
