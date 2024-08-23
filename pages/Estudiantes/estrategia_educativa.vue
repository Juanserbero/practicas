<template>
  <v-container mt-2>
    <v-container grid-list-xl>
      <v-layout row wrap>
        <v-flex md6>
          <v-card>
            <v-card-title>
              <v-card-title>
                <div>Proyectos Comunitarios y Extensionistas</div></v-card-title
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
                    <tr v-for="item in proyecto" :key="item.idProyecto">
                      <td class="text-center">{{ item.nombre_proyecto }}</td>

                      <td class="text-center">
                        <v-btn text @click="CantEstudiantePorProyecto(item)">
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
                  Para mostrar la cantidad de estudiantes y sus tareas de impacto debe seleccionar primero un proyecto
                </v-alert>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>

        <v-flex md6 v-else>
          <v-card>
            <v-card-title class="pb-0">
              <v-card-title> <div>{{nombreDelProyecto}}</div></v-card-title>
            </v-card-title>
            <v-card-text>
              <v-simple-table fixed-header height="auto">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-center">Cantidad de estudiantes</th>
                      <th class="text-center">Tareas de impacto</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-center">{{ cantEstudiante }}</td>
                      <td class="text-center">{{ tareas_impacto }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>
          <!-- ------------------------------------No Protagonismo------------------------------------ -->
          <v-card class="mt-4" v-if="porciento < 90">
            <v-card-title>
              <v-card-title>
                <div style="color: red">No protagonismo</div></v-card-title
              >
            </v-card-title>
            <v-card-text>
              <div>
                <v-alert dense outlined type="error">
                  <div>
                    La cantidad de estudiantes incorporados a los proyectos
                    representa el <strong>{{ porciento }}</strong
                    >%
                  </div>
                </v-alert>
              </div>
            </v-card-text>
          </v-card>
          <!-- ------------------------------------Protagonismo------------------------------------ -->

          <v-card class="mt-4" v-else>
            <v-card-title>
              <v-card-title>
                <div style="color: green">Protagonismo</div></v-card-title
              >
            </v-card-title>
            <v-card-text>
              <div>
                <v-alert dense outlined type="success">
                  <div>
                    La cantidad de estudiantes incorporados a los proyectos
                    representa el <strong>{{ porciento }}</strong
                    >%
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
const axios = require("axios");
export default {
  name: "App",
  data: () => ({
    activado: false,
    proyecto: [],
    cantEstudiante: 0,
    tareas_impacto: "",
    nombreDelProyecto:0,
    cantEstEnProyectos: [],
    cantEstBD: [],
    porciento: 0,
  }),

  created() {
    this.getProyectos();
  },

  methods: {
    async getProyectos() {
      const totalEstudiante = [];
      const auxiliar = [];
      const estudiante = [];
      const unicosEstudiantesbd = [];
      let contador = 0;
      const unicosEstudiantes = [];
      let contador2 = 0;

      await axios
        .get("http://localhost:8000/api/extensionista")
        .then((response) => {
          // console.table("comunitario", this.proyecto);
          response.data.forEach((item) => {
            this.proyecto.push({
              idProyecto: item.idProyecto,
              nombre_proyecto: item.nombre_proyecto,
              idEstudiante: item.idEstudiante,
              tareas_impacto: item.tareas_impacto,
            });
          });
        });

      await axios
        .get("http://localhost:8000/api/comunitario")
        .then((response) => {
          response.data.forEach((item) => {
            this.proyecto.push({
              idProyecto: item.idProyecto,
              nombre_proyecto: item.nombre_proyecto,
              idEstudiante: item.idEstudiante,
              tareas_impacto: item.tareas_impacto,
            });
          });
        });
      await axios
        .get("http://localhost:8000/api/estudiante")
        .then((response) => {
          response.data.forEach((item) => {
            estudiante.push(item.idEstudiante);
          });
        })
        .catch((error) => {
          console.error(error);
        });

      this.proyecto.forEach((est) => {
        totalEstudiante.push(est.idEstudiante);
      });
      // console.log("lola", totalEstudiante);

      for (let i = 0; i < totalEstudiante.length; i++) {
        for (let j = 0; j < totalEstudiante[i].length; j++) {
          auxiliar.push(totalEstudiante[i][j]);
        }
      }
      auxiliar.sort((a, b) => a - b);
      for (let i = 0; i < auxiliar.length; i++) {
        if (auxiliar[i + 1] !== auxiliar[i]) {
          unicosEstudiantes.push(auxiliar[i]);
        }
      }
      for (let i = 0; i < unicosEstudiantes.length; i++) {
        contador2++;
      }
      this.cantEstEnProyectos.push(contador2);
      for (let i = 0; i < estudiante.length; i++) {
        if (estudiante[i + 1] !== estudiante[i]) {
          unicosEstudiantesbd.push(estudiante[i]);
        }
      }
      for (let i = 0; i < unicosEstudiantesbd.length; i++) {
        contador++;
      }
      this.cantEstBD.push(contador);

      // console.log("cantEstEnProyectos", this.cantEstEnProyectos);
      // console.log("cantEstBD", this.cantEstBD);

      this.porciento = Math.round(
        (this.cantEstEnProyectos[0] * 100) / this.cantEstBD[0]
      );

      // console.log("porciento",this.porciento);
    },

    CantEstudiantePorProyecto(item) {
      let contador = 0;
      this.cantEstudiante = 0;
      this.tareas_impacto = "";
      for (let i = 0; i < item.idEstudiante.length; i++) {
        contador++;
      }
      this.cantEstudiante = contador;
      this.tareas_impacto = item.tareas_impacto;
      this.activado= true;
      this.nombreDelProyecto = item.nombre_proyecto
      contador = 0;

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
