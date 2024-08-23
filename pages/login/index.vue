<template>
  <v-container mt-5>
    <v-container grid-list-xl>
      <v-layout row wrap justify-center>
        <v-flex md6>
          <v-card class="elevation-12">
            <v-card-title>
              <span class="text-h5">Iniciar sesión</span>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      name="username"
                      label="Usuario"
                      type="text"
                      v-model="user.username"
                      required
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      name="password"
                      label="Contraseña"
                      type="password"
                      v-model="user.password"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn to="/signup" icon color="blue darken-1" class="mx-15">
                <v-icon> mdi-home </v-icon> <span> Registrarse </span>
              </v-btn>
              <v-btn color="blue darken-1" text @click="login()">
                Acceder
              </v-btn>
            </v-card-actions>
          </v-card></v-flex
        >
      </v-layout>
    </v-container>
  </v-container>
</template>


<script>
export default {
  layout: 'empty',
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
        await this.$auth.$storage.setUniversal(
          'user',
          {
            username: this.user.username,
          },
          true
        )
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
