<template>
  <v-container mt-5>
    <v-container grid-list-xl>
      <v-layout row wrap justify-center>
        <v-flex md6>
          <v-card class="elevation-12">
            <v-card-title>
              <span class="text-h5">Iniciar sesión</span>
              <v-spacer></v-spacer>
              <v-btn text color="blue darken-1" to="/Singup">
                <v-tab>Registrar </v-tab></v-btn
              >
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      name="username"
                      label="Usuario"
                      required
                      type="text"
                      v-model="username"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      name="password"
                      label="Contraseña"
                      type="password"
                      v-model="password"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text> Cancelar </v-btn>
              <v-btn color="blue darken-1" text @click="login()">
                Aceptar
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
  name: "Login",
  data: () => { 
    return {
      username: null,
      password: null,
    };
  },
   methods: {
     async login() {
         const data = { 'username': this.username, 'password': this.password }
         console.log(data);
         try{
            const response = await this.$auth.loginWith('local', { data: data})
            this.$auth.$storage.setUniversal('username', response.data.user.username)
            await this.$auth.setUserToken(response.data.access-token, response.data.refresh-token)
            await this.$router.push('/estudiante');
            print("pp",response.data.user.username)
         } catch(e) {
            console.log(e.message)
         }
      }
   }
};
</script>
