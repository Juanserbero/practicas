<template>
  <v-container mt-2>
    <v-container grid-list-xl>
      <v-layout row wrap>
        <v-flex md6>
          <v-card>
            <v-card-title>
              <v-card-title>
                <div>Ejercicios integradores</div></v-card-title
              >
            </v-card-title>
            <v-card-text>
              <v-simple-table fixed-header height="287px">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-center">Nombre</th>
                      <th class="text-center">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-center">Ej. integrador 1</td>
                      <!-- <td class="text-center">{{ item }}</td> -->
                      <!-- <td class="text-center">{{ item.idCarrera }}</td> -->

                      <td class="text-center">
                        <v-btn text @click="getEstudiante(item)">
                          <v-icon small class="mr-2"> mdi-eye </v-icon>
                        </v-btn>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-center">Ej. integrador 2</td>
                      <!-- <td class="text-center">{{ item }}</td> -->
                      <!-- <td class="text-center">{{ item.idCarrera }}</td> -->

                      <td class="text-center">
                        <v-btn text @click="getEstudiante(item)">
                          <v-icon small class="mr-2"> mdi-eye </v-icon>
                        </v-btn>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-center">Ej. integrador 3</td>
                      <!-- <td class="text-center">{{ item }}</td> -->
                      <!-- <td class="text-center">{{ item.idCarrera }}</td> -->

                      <td class="text-center">
                        <v-btn text @click="getEstudiante(item)">
                          <v-icon small class="mr-2"> mdi-eye </v-icon>
                        </v-btn>
                      </td>
                    </tr>
                    <!-- <tr v-for="item in carrera" :key="item.idCarrera">
                      <td class="text-center">{{ item.nombre_carrera }}</td>

                      <td class="text-center">
                        <v-btn text @click="getEstudiante(item)">
                          <v-icon small class="mr-2"> mdi-eye </v-icon>
                        </v-btn>
                      </td>
                    </tr> -->
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex md6>
          <!-------------------------------------------- NO BORRAR --------------------------------------->
          <!-- <v-card>
            <v-card-title>
              <v-card-title> <div>Proyecto</div></v-card-title>
            </v-card-title>
            <v-card-text>
              <div>
                <v-alert outlined type="warning" elevation="1">
                  El proyecto seleccionado no posee ningún estudiante insertado
                  en la base de datos
                </v-alert>
              </div>
            </v-card-text>
          </v-card> -->
          <!-------------------------------------------- NO BORRAR --------------------------------------->

          <v-card>
            <v-card-title class="pb-0">
              <v-card-title> <div>Nombre del Ej. integrador </div></v-card-title>
            </v-card-title>
            <v-card-text>
              <v-simple-table fixed-header height="auto">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-center">Cantidad de estudiantes</th>
                      <th class="text-center">Nota</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-center">3</td>
                      <td class="text-center">4</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>
          <!-- ------------------------------------No Protagonismo------------------------------------ -->
          <!-- <v-card class="mt-4">
            <v-card-title>
              <v-card-title>
                <div style="color: red">No protagonismo</div></v-card-title
              >
            </v-card-title>
            <v-card-text>
              <div>
                <v-alert dense outlined type="error">
                  <div>
                    La cantidad de estudiantes aprobados en los ejercicios integradores
                    representa el <strong>65</strong>%
                  </div>
                </v-alert>
              </div>
            </v-card-text>
          </v-card> -->
          <!-- ------------------------------------Protagonismo------------------------------------ -->

          <v-card class="mt-4">
            <v-card-title>
              <v-card-title>
                <div style="color: green">Protagonismo</div></v-card-title
              >
            </v-card-title>
            <v-card-text>
              <div>
                <v-alert dense outlined type="success">
                  <div>
                    La cantidad de estudiantes aprobados en los ejercicios integradores
                    representa el <strong>75</strong>%
                  </div>
                </v-alert>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>
<script>
// const axios = require("axios");
export default {
  name: "App",
  data: () => ({
  }),
};
</script>
<style>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
