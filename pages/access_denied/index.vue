<template>
  <v-container mt-5>
    <v-container grid-list-xl>
      <v-layout row wrap justify-center>
        <v-flex md6>
          <v-card class="mt-16">
            <v-card-title class="text-h5">
              <span class="text-h5" style="color: red">ACCESO DENEGADO</span>
              <v-spacer></v-spacer>
            </v-card-title>
            <section class="">
              <div class="ml-3">
                <h1 class="mb-5">
                  Usted no está autorizado a acceder a esta página.
                </h1>
                <h3 class="mb-15">
                  Por favor entre sus credenciales o vaya a la págna inicial.
                </h3>
              </div>
              <div class="text-lg-right">
                <v-btn to="/login" icon color="teal accent-4" class="mr-11">
                  <v-icon> mdi-login </v-icon> <span> Iniciar Sesión </span>
                </v-btn>
                <v-btn to="/signup" icon color="teal accent-4" class="mx-15">
                  <v-icon> mdi-home </v-icon> <span> Registrarse </span>
                </v-btn>
              </div>
            </section>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>


<script>
export default {
  layout: 'without_sidebar',
  auth: false,
  data() {
    return {
      user: {},
    }
  },
  methods: {
    async login() {
      try {
        const response = await this.$auth.loginWith('local', {
          data: this.user,
        })
        const loggedUser = {
          username: this.user.username,
        }
        await this.$auth.setUser(loggedUser)
        // await this.$auth.setUser(response)
        await this.$auth.$storage.setUniversal(
          'user',
          {
            username: this.user.username,
          },
          true
        )
        // commit('setUser', response)
        // this.$router.push(redirect || '/dashboard')
        this.$toasted.global.defaultSuccess({
          msg: 'Usuario autenticado satisfactoriamente',
        })
      } catch (err) {
        this.$toasted.global.defaultError({
          msg: 'Usuario o contraseña inválidos.',
        })
      }
    },
  },
  mounted() {
    if (this.$auth.loggedIn) this.$router.push('/')
  },
}
</script>
