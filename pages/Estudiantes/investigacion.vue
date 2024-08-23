<template>
  <v-container mt-2>
    <v-container grid-list-xl>
      <v-layout row wrap>
        <v-flex md6>
          <v-card>
            <v-card-title>
              <v-card-title>
                <div>Proyectos de investigación</div></v-card-title
              >
            </v-card-title>
            <v-card-text>
              <v-simple-table fixed-header height="287px">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-center">Nombre</th>
                      <th class="text-center">Cant. Estudiantes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-center">proyecto 1</td>
                      <td class="text-center">5</td>
                      <!-- <td class="text-center">{{ item }}</td> -->
                      <!-- <td class="text-center">{{ item.idCarrera }}</td> -->

                    </tr>
                    <tr>
                      <td class="text-center">proyecto 2</td>
                      <td class="text-center">3</td>

                      <!-- <td class="text-center">{{ item }}</td> -->
                      <!-- <td class="text-center">{{ item.idCarrera }}</td> -->

                    </tr>
                    <tr>
                      <td class="text-center">proyecto 3</td>
                      <td class="text-center">7</td>

                      <!-- <td class="text-center">{{ item }}</td> -->
                      <!-- <td class="text-center">{{ item.idCarrera }}</td> -->

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
                    representa el <strong>30</strong>%
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
                    La cantidad de estudiantes aprobados en los ejercicios
                    integradores representa el <strong>40</strong>%
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
    //     carrera: [],
    //     estudiante: [],
    //     agnoAcademico: [],
    //     nombreCarrera: [],
    //     // nombre_carrera: [],
  }),

  //   created() {
  //     this.getCarrera();
  //     this.getEstudiante();
  //   },

  //   methods: {
  //     async getCarrera() {
  //       await axios
  //         .get("http://localhost:8000/api/carrera")
  //         .then((response) => {
  //           // console.log("carrera", response);
  //           response.data.forEach((item) => {
  //             this.carrera.push({
  //               idCarrera: item.idCarrera,
  //               nombre_carrera: item.nombre_carrera,
  //             });
  //           });
  //         })
  //         .catch((error) => {
  //           console.error(error);
  //         });
  //     },
  //     async getEstudiante(item) {
  //       await axios
  //         .get("http://localhost:8000/api/estudiante")
  //         .then((response) => {
  //           this.estudiante = [];
  //           this.agnoAcademico = [];
  //           this.nombreCarrera=[];

  //           response.data.forEach((x) => {
  //             if (x.idCarrera === item.idCarrera) {
  //               this.agnoAcademico.push(x.agno_academico);
  //               this.nombreCarrera.push(
  //               item.nombre_carrera
  //             );
  //             }
  //           });
  //           this.agnoAcademico.sort();
  //           console.log("dfsdfsf",this.agnoAcademico);
  //           let unicosAgAcad = [];
  //           let cantEstudiantes = [];
  //           let contador = 1;

  //           for (let i = 0; i < this.agnoAcademico.length; i++) {
  //             if (this.agnoAcademico[i + 1] === this.agnoAcademico[i]) {
  //               contador++;
  //             } else {
  //               unicosAgAcad.push(this.agnoAcademico[i]);
  //               cantEstudiantes.push(contador);
  //               contador = 1;
  //             }

  //           }
  //           for (let i = 0; i < unicosAgAcad.length; i++) {
  //             this.estudiante.push({
  //               agno_academico: unicosAgAcad[i],
  //               cantEst: cantEstudiantes[i],
  //             });
  //           }

  //           console.log("lala", unicosAgAcad);
  //           console.log("lolo", cantEstudiantes);
  //           console.log("estudiante", this.estudiante);

  //         })
  //         .catch((error) => {
  //           console.error(error);
  //         });
  //     },

  //   },
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
