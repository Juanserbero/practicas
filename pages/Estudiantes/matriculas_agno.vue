<template>
  <v-container mt-2>
    <v-container grid-list-xl>
      <v-layout row wrap>
        <v-flex md6>
          <v-card>
            <v-card-title>
              <v-card-title> <div>Carreras</div></v-card-title>
            </v-card-title>
            <v-card-text>
              <v-simple-table fixed-header height="300px">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-center">Nombre</th>
                      <th class="text-center">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in carrera" :key="item.idCarrera">
                      <td class="text-center">{{ item.nombre_carrera }}</td>
                      <!-- <td class="text-center">{{ item }}</td> -->
                      <!-- <td class="text-center">{{ item.idCarrera }}</td> -->

                      <td class="text-center">
                        <v-btn text @click="getEstudiante(item)">
                          <v-icon small class="mr-2"> mdi-eye </v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex md6 v-if="activado === false">
          <v-card>
            <v-card-title>
              <v-card-title> <div>Aviso</div></v-card-title>
            </v-card-title>
            <v-card-text>
              <div>
                <v-alert outlined type="warning" elevation="1">
                 Para mostrar la cantidad de estudiantes por año académico debe seleccionar una carrera
                </v-alert>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex md6 v-else-if="activado===true && estudiante == ''">
          <v-card>
            <v-card-title>
              <v-card-title> <div>Aviso</div></v-card-title>
            </v-card-title>
            <v-card-text>
              <div>
                <v-alert outlined type="warning" elevation="1">
                  La carrera seleccionada no posee ningún estudiante insertado
                  en la base de datos
                </v-alert>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex v-else>
          <v-card>
            <v-card-title>
              <v-card-title >
                <div>Matrícula por año de {{ nombreCarrera[0] }}</div></v-card-title
              >
            </v-card-title>
            <v-card-text>
              <v-simple-table fixed-header height="300px">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-center">Año académico</th>
                      <th class="text-center">Cantidad de estudiantes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in estudiante" :key="item.agno_academico">
                      <td class="text-center">{{ item.agno_academico }}</td>
                      <td class="text-center">{{ item.cantEst }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-container>
</template>
<script>
const axios = require("axios");
export default {
  name: "App",
  data: () => ({
    activado:false,
    carrera: [],
    estudiante: [],
    agnoAcademico: [],
    nombreCarrera: [],
    // nombre_carrera: [],
  }),

  created() {
    this.getCarrera();
    // this.getEstudiante();
  },

  methods: {
    async getCarrera() {
      await axios
        .get("http://localhost:8000/api/carrera")
        .then((response) => {
          // console.log("carrera", response);
          response.data.forEach((item) => {
            this.carrera.push({
              idCarrera: item.idCarrera,
              nombre_carrera: item.nombre_carrera,
            });
          });
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async getEstudiante(item) {
      await axios
        .get("http://localhost:8000/api/estudiante")
        .then((response) => {
          this.activado=true;
          this.estudiante = [];
          this.agnoAcademico = [];
          this.nombreCarrera=[];

          
          response.data.forEach((x) => {
            if (x.idCarrera === item.idCarrera) {
              this.agnoAcademico.push(x.agno_academico);
              this.nombreCarrera.push(
              item.nombre_carrera
            );
            }
          });
          this.agnoAcademico.sort((a, b) => a - b);
          let unicosAgAcad = [];
          let cantEstudiantes = [];
          let contador = 1;
           

          for (let i = 0; i < this.agnoAcademico.length; i++) {
            if (this.agnoAcademico[i + 1] === this.agnoAcademico[i]) {
              contador++;
            } else {
              unicosAgAcad.push(this.agnoAcademico[i]);
              cantEstudiantes.push(contador);
              contador = 1;
            }
            
          }
          for (let i = 0; i < unicosAgAcad.length; i++) {
            this.estudiante.push({
              agno_academico: unicosAgAcad[i],
              cantEst: cantEstudiantes[i],
            });
          }

        })
        .catch((error) => {
          console.error(error);
        });
    },

  },
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
