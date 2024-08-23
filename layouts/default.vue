<template>
  <v-app id="inspire">
    <v-app-bar app class="light-blue darken-1">
      <v-app-bar-nav-icon dark @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="color-white">Calidad</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="px-4 color-white">
        <v-list-item-avatar>
          <v-badge
            bordered
            bottom
            color="green"
            dot
            offset-x="10"
            offset-y="10"
          >
            <v-icon dark large> mdi-account-circle </v-icon>
          </v-badge>
        </v-list-item-avatar>

        <span v-if="loggedIn"> {{ username }}</span>
      </div>
      <v-dialog v-model="dialoglogout" max-width="500px">
        <v-card>
          <v-card-title class="text-h6 pl-11"
            >¿Seguro que desea cerrar sesión?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialoglogout = false"
              >Cancelar</v-btn
            >
            <v-btn color="blue darken-1" text @click="logoutItemConfirm()"
              >OK</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-btn dark v-if="loggedIn" @click="logoutItem()" icon>
        <v-icon dark> mdi-logout-variant </v-icon>
      </v-btn>
      <v-btn dark v-else to="/login" icon>
        <v-icon dark> mdi-login </v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      app
      class="light-blue darken-4"
      width="250px"
    >
      <v-list-item class="pl-7 pt-2">
        <v-list-item-avatar>
          <img src="/logo.png" />
        </v-list-item-avatar>

        <v-list-item-title class="font-weight-medium color-white"
          >UNISS</v-list-item-title
        >
      </v-list-item>

      <v-list dense>
        <Sidebar />
      </v-list>
    </v-navigation-drawer>

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
import Sidebar from '../components/Sidebar.vue'
export default {
  data() {
    return {
      dialoglogout: false,
      drawer: null,
      variable1: false,
      variable2: false,
      variable3: false,
      variable4: false,
      variable5: false,
      gestion: false,
      Practica_laboral: false,
      Asignatura: false,
      Proyecto: false,
    }
  },
  components: { Sidebar },

  computed: {
    username() {
      return this.$auth.$storage.getUniversal('user').username
    },
    ...mapState('auth', ['loggedIn']),
  },
  //watch: {
  //    this.dialoglogout = false;
  //},
  methods: {
    logoutItem() {
      this.dialoglogout = true
    },
    async logoutItemConfirm() {
      /*        this.closelogout();*/
      this.$router.push('/logout')
    },
  },
  closeLogout() {
    this.dialoglogout = false
  },
}
</script>
