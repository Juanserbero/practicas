<template>
  <v-container mt-5>
    <v-container grid-list-xl>
      <v-layout row wrap justify-center>
        <v-flex md6>
          <v-card class="elevation-12">
            <v-card-title>
              <span class="text-h5">Registrarse</span>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="6">
                    <v-text-field name="lastName"
                                  label="Nombre"
                                  type="text"
                                  v-model="firstName"
                                  required>
                    </v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field name="lastName"
                                  label="Apellidos"
                                  type="text"
                                  v-model="lastName"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field name="username"
                                  label="Usuario"
                                  type="text"
                                  v-model="username"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field name="email"
                                  label="Correo"
                                  type="text"
                                  :rules="emailRules"
                                  v-model="email"></v-text-field>
                  </v-col><v-col cols="12">
                    <v-text-field name="password"
                                  label="Contraseña"
                                  type="password"
                                  v-model="password"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn to="/signup" icon color="blue darken-1" class="mx-15" @click="signupHandler">
                <v-icon> mdi-home </v-icon> <span> Registrarse </span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>

<script>
  export default {
    name: 'Signup',
    data() {
      return {
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        firstName: null,
        lastName: null,
        username: null,
        rol: null,
        email: null,
        password: null,
      }
    },
    methods: {
      async signupHandler() {
        const data = {
          'first_name': this.firstName,
          'last_name': this.lastName,
          'username': this.username,
          'rol': "usuario",
          'email': this.email,
          'password': this.password
        }
        console.log(data);
        try {
          const res = await this.$axios.post('/users/', data)
          await this.$auth.logout()
          this.$router.push('/login')
          console.log(res)
        }
        catch (e) {
          console.log(e.message)
        }
      }
    }
  };
</script>

<style></style>
