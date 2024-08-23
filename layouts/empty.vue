<template>
  <v-app id="inspire">
    <v-main>
      <Nuxt />
    </v-main>
    <v-footer padless class="light-blue darken-1">
      <v-col class="text-center color-white" cols="12">
        {{ new Date().getFullYear() }} — <strong>UNISS</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('auth', ['loggedIn']),
  },
}
</script>
