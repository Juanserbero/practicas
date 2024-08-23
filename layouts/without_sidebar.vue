<template>
  <v-app id="inspire">
    <v-app-bar app class="light-blue darken-1">
      <v-app-bar-nav-icon dark @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="color-white">Calidad</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn dark v-if="loggedIn" to="/logout" icon >
        <v-icon dark> mdi-logout-variant </v-icon>
      </v-btn>
    </v-app-bar>
    <v-main class="grey lighten-3">
      <!--  -->
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
};
</script>
