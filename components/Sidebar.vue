<template>
  <v-expansion-panels dark accordion>
    <!----------------------------- Aqui comienza un modulo --------------------------- -->

    <v-expansion-panel
      v-model="drawer"
      app
      class="light-blue darken-4"
      width="250px"
      v-if="admin"
    >
      <v-expansion-panel-header>
        <template>
          <div class="font-weight-medium mx-n3">
            <v-icon class="">mdi-account</v-icon>
            Gestión de usuarios
          </div>

          <v-spacer></v-spacer>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-list-item link class="mx-n6 pl-3" to="/users">
          <v-tab class="text-left text-none font-weight-regular link">
            users
          </v-tab>
        </v-list-item>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <!----------------------------- Aqui comienza un modulo --------------------------- -->

    <v-expansion-panel
      v-model="drawer"
      app
      class="light-blue darken-4"
      width="250px"
    >
      <v-expansion-panel-header>
        <template>
          <div class="font-weight-medium mx-n3">
            <v-icon class="">mdi-earth</v-icon>
            Impacto social
          </div>

          <v-spacer></v-spacer>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-list-item
          link
          class="mx-n6 pl-3"
          to="/Impacto_social/programa_desarrollo"
        >
          <v-tab class="text-left text-none font-weight-regular link">
            Programas de desarrollo
          </v-tab>
        </v-list-item>
        <v-list-item
          link
          class="mx-n6 pl-3"
          to="/Impacto_social/premio_reconocimiento"
        >
          <v-tab class="text-left text-none font-weight-regular link">
            Premios y reconocimientos
          </v-tab>
        </v-list-item>
        <v-list-item link class="mx-n6 pl-3" to="/Impacto_social/tarea_impacto">
          <v-tab class="text-left text-none font-weight-regular link">
            Tareas de impacto y proyectos comunitarios
          </v-tab>
        </v-list-item>
        <v-list-item
          link
          class="mx-n6 pl-3"
          to="/Impacto_social/nivel_satifaccion"
        >
          <v-tab class="text-left text-none font-weight-regular link">
            Nivel de satisfacción
          </v-tab>
        </v-list-item>
        <v-list-item
          link
          class="mx-n6 pl-3"
          to="/Impacto_social/continuidad_egresado"
        >
          <v-tab class="text-left text-none font-weight-regular link">
            Atención a egresados
          </v-tab>
        </v-list-item>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <!----------------------------- Aqui termina un modulo --------------------------- -->
    <!----------------------------- Aqui comienza un modulo --------------------------- -->

    <v-expansion-panel
      v-model="drawer"
      app
      class="light-blue darken-4"
      width="250px"
    >
      <v-expansion-panel-header>
        <template>
          <div class="font-weight-medium mx-n3">
            <v-icon class="">mdi-account-multiple</v-icon>
            Claustro
          </div>

          <v-spacer></v-spacer>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-list-item
          link
          class="mx-n6 pl-3"
          to="/Impacto_social/continuidad_egresado"
        >
          <v-tab class="text-left text-none font-weight-regular link">
            variable2
          </v-tab>
        </v-list-item>
        <v-list-item
          link
          class="mx-n6 pl-3"
          to="/Impacto_social/continuidad_egresado"
        >
          <v-tab class="text-left text-none font-weight-regular link">
            variable2
          </v-tab>
        </v-list-item>
        <v-list-item
          link
          class="mx-n6 pl-3"
          to="/Impacto_social/continuidad_egresado"
        >
          <v-tab class="text-left text-none font-weight-regular link">
            variable2
          </v-tab>
        </v-list-item>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <!----------------------------- Aqui termina un modulo --------------------------- -->
    <!----------------------------- Aqui comienza un modulo --------------------------- -->

    <v-expansion-panel
      v-model="drawer"
      app
      class="light-blue darken-4"
      width="250px"
    >
      <v-expansion-panel-header>
        <template>
          <div class="font-weight-medium mx-n3">
            <v-icon class="">mdi-school</v-icon>
            Estudiantes
          </div>

          <v-spacer></v-spacer>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-list-item link class="mx-n6 pl-3" to="/Estudiantes/matriculas_agno">
          <v-tab class="text-left text-none font-weight-regular link">
            Matrícula
            <p class="text-lowercase mb-0">&nbsp;por&nbsp;</p>
            Año
          </v-tab>
        </v-list-item>
        <v-list-item
          link
          class="mx-n6 pl-3"
          to="/Estudiantes/estrategia_educativa"
        >
          <v-tab class="text-left text-none font-weight-regular link">
            Estrategia educativa
          </v-tab>
        </v-list-item>
        <v-list-item
          link
          class="mx-n6 pl-3"
          to="/Estudiantes/ejercicios_integradores"
        >
          <v-tab class="text-left text-none font-weight-regular link">
            Ejercicios integradores
          </v-tab>
        </v-list-item>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <!----------------------------- Aqui termina un modulo --------------------------- -->
    <!----------------------------- Aqui comienza un modulo --------------------------- -->

    <v-expansion-panel
      v-model="drawer"
      app
      class="light-blue darken-4"
      width="250px"
    >
      <v-expansion-panel-header>
        <template>
          <div class="font-weight-medium mx-n3">
            <v-icon class="">mdi-home-city</v-icon>
            Infraestructura
          </div>

          <v-spacer></v-spacer>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-list-item
          link
          class="mx-n6 pl-3"
          to="/Impacto_social/continuidad_egresado"
        >
          <v-tab class="text-left text-none font-weight-regular link">
            variable4
          </v-tab>
        </v-list-item>
        <v-list-item
          link
          class="mx-n6 pl-3"
          to="/Impacto_social/continuidad_egresado"
        >
          <v-tab class="text-left text-none font-weight-regular link">
            variable4
          </v-tab>
        </v-list-item>
        <v-list-item
          link
          class="mx-n6 pl-3"
          to="/Impacto_social/continuidad_egresado"
        >
          <v-tab class="text-left text-none font-weight-regular link">
            variable4
          </v-tab>
        </v-list-item>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <!----------------------------- Aqui termina un modulo --------------------------- -->
    <!----------------------------- Aqui comienza un modulo --------------------------- -->

    <v-expansion-panel
      v-model="drawer"
      app
      class="light-blue darken-4"
      width="250px"
    >
      <v-expansion-panel-header>
        <template>
          <div class="font-weight-medium mx-n3">
            <v-icon class="">mdi-clipboard-text</v-icon>
            Currículo
          </div>

          <v-spacer></v-spacer>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-list-item
          link
          class="mx-n6 pl-3"
          to="/Impacto_social/continuidad_egresado"
        >
          <v-tab class="text-left text-none font-weight-regular link">
            variable5
          </v-tab>
        </v-list-item>
        <v-list-item
          link
          class="mx-n6 pl-3"
          to="/Impacto_social/continuidad_egresado"
        >
          <v-tab class="text-left text-none font-weight-regular link">
            variable5
          </v-tab>
        </v-list-item>
        <v-list-item
          link
          class="mx-n6 pl-3"
          to="/Impacto_social/continuidad_egresado"
        >
          <v-tab class="text-left text-none font-weight-regular link">
            variable5
          </v-tab>
        </v-list-item>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <!----------------------------- Aqui termina un modulo --------------------------- -->
    <!----------------------------- Aqui comienza un modulo --------------------------- -->

    <v-expansion-panel
      v-model="drawer"
      app
      class="light-blue darken-4"
      width="250px"
    >
      <v-expansion-panel-header>
        <template>
          <div class="font-weight-medium mx-n3">
            <v-icon class="">mdi-database-cog-outline</v-icon>Gestión  
            Información
          </div>

          <v-spacer></v-spacer>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-list-item link class="mx-n6 pl-3" to="/Gestion/Alumno_ayudante">
          <v-tab class="text-left text-none font-weight-regular">
            Alumno ayudante
          </v-tab>
        </v-list-item>

        <v-list-item link class="mx-n6 pl-3" to="/Gestion/Asignatura">
          <v-tab class="text-left text-none font-weight-regular"
            >Asignatura
          </v-tab>
        </v-list-item>


        <v-list-item
          link
          class="mx-n6 pl-3"
          to="/Gestion/Asignatura_ejIntegrador"
        >
          <v-tab class="text-left text-none font-weight-regular"
            >Asignatura-ejercicio integrador
          </v-tab>
        </v-list-item>

        <v-list-item link class="mx-n6 pl-3" to="/Gestion/Asignatura_profesor">
          <v-tab class="text-left text-none font-weight-regular"
            >Asignatura-profesor
          </v-tab>
        </v-list-item>

        <v-list-item link class="mx-n6 pl-3" to="/Gestion/Asignatura_virtual">
          <v-tab class="text-left text-none font-weight-regular"
            >Asignatura-virtual
          </v-tab>
        </v-list-item>


        <v-list-item link class="mx-n6 pl-3" to="/Gestion/Cargo_metodologico">
          <v-tab class="text-left text-none font-weight-regular"
            >Cargo metodológico</v-tab
          >
        </v-list-item>

        <v-list-item link class="mx-n7 pl-3" to="/Gestion/Carrera">
          <v-tab class="text-left text-none font-weight-regular"
            >Carrera
          </v-tab>
        </v-list-item>

        <v-list-item link class="mx-n6 pl-3" to="/Gestion/Datos_promocion">
          <v-tab class="text-left text-none font-weight-regular"
            >Datos promoción
          </v-tab>
        </v-list-item>

        <v-list-item link class="mx-n6 pl-3" to="/Gestion/Departamento">
          <v-tab class="text-left text-none font-weight-regular">
            Departamento
          </v-tab>
        </v-list-item>

        <v-list-item link class="mx-n6 pl-3" to="/Gestion/Disciplina">
          <v-tab class="text-left text-none font-weight-regular">
            Disciplina
          </v-tab>
        </v-list-item>

        <v-list-item link class="mx-n6 pl-3" to="/Gestion/Egresado">
          <v-tab class="text-left text-none font-weight-regular">
            Egresado
          </v-tab>
        </v-list-item>

        <v-list-item link class="mx-n6 pl-3" to="/Gestion/Ejercicio_integrador">
          <v-tab class="text-left text-none font-weight-regular">
            Ejercicio integrador
          </v-tab>
        </v-list-item>

        <v-list-item link class="mx-n6 pl-3" to="/Gestion/Estudiante">
          <v-tab class="text-left text-none font-weight-regular"
            >Estudiante
          </v-tab>
        </v-list-item>

        <v-list-item link class="mx-n6 pl-3" to="/Gestion/Estudiante_posgrado">
          <v-tab class="text-left text-none font-weight-regular"
            >Estudiante-posgrado
          </v-tab>
        </v-list-item>

        <v-list-item link class="mx-n7 pl-3" to="/Gestion/Ponencia_evento">
          <v-tab class="text-left text-none font-weight-regular">Ponencias presentadas en evento </v-tab>
        </v-list-item>

        <v-list-item link class="mx-n6 pl-3" to="/Gestion/Expediente">
          <v-tab class="text-left text-none font-weight-regular link">
            Expediente
          </v-tab>
        </v-list-item>

        <v-list-item link class="mx-n6 pl-3" to="/Gestion/Laboratorio">
          <v-tab class="text-left text-none font-weight-regular link">
            Laboratorio
          </v-tab>
        </v-list-item>

        <v-list-item link class="ml-n10" to="/Gestion/Libro_capitulo">
          <v-tab class="text-left text-none font-weight-regular link">
            Libro o capítulo
          </v-tab>
        </v-list-item>

        <v-list-item link class="mx-n6 pl-3" to="/Gestion/Posgrado">
          <v-tab class="text-left text-none font-weight-regular link">
            Posgrado
          </v-tab>
        </v-list-item>

        <v-list-item link class="mx-n6 pl-3" to="/Gestion/Practica_laboral">
          <v-tab class="text-left text-none font-weight-regular">
            Práctica laboral
          </v-tab>
        </v-list-item>

        <v-list-item link class="mx-n6 pl-3" to="/Gestion/Premio_reconocimiento">
          <v-tab class="text-left text-none font-weight-regular">
            Premios y Reconocimientos
          </v-tab>
        </v-list-item>

        <v-list-item link class="mx-n6 pl-3" to="/Gestion/Profesor">
          <v-tab class="text-left text-none font-weight-regular">
            Profesor
          </v-tab>
        </v-list-item>


        <v-list-item
          link
          class="mx-n6 pl-3"
          to="/Gestion/Profesor_cargo_metodologico"
        >
          <v-tab class="text-left text-none font-weight-regular">
            Profesor cargo metodológico
          </v-tab>
        </v-list-item>

        <v-list-item link class="mx-n6 pl-3" to="/Gestion/Profesor_disciplina">
          <v-tab class="text-left text-none font-weight-regular"
            >Profesor-disciplina
          </v-tab>
        </v-list-item>

        <v-list-item link class="mx-n6 pl-3" to="/Gestion/Profesor_posgrado">
          <v-tab class="text-left text-none font-weight-regular"
            >Profesor-posgrado
          </v-tab>
        </v-list-item>
        <v-card-actions class="ml-n4 pl-1 mr-n4">
          <v-list-item class="text-capitalize font-weight-bold" link @click="Proyecto = !Proyecto">
            <!-- <label class="ml-4 text-capitalize font-weight-bold" -->
              Proyectos
              <v-btn icon dark>
                <v-icon>
                  {{ Proyecto ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                </v-icon>
              </v-btn>
            <!-- </label> -->
          </v-list-item>

          <!-- <v-spacer></v-spacer> -->
        </v-card-actions>

        <v-expand-transition>
          <div v-show="Proyecto">
            <v-list-item
              link
              class="mx-n6 pl-8"
              to="/Gestion/Catedra_honorifica"
            >
              <v-tab class="text-left text-none font-weight-regular"
                >Cátedra honorífica</v-tab
              >
            </v-list-item>

            <v-list-item link class="mx-n6 pl-8" to="/Gestion/Comunitario">
              <v-tab class="text-left text-none font-weight-regular"
                >Comunitarios</v-tab
              >
            </v-list-item>

            <v-list-item link class="mx-n6 pl-8" to="/Gestion/Extensionista">
              <v-tab class="text-left text-none font-weight-regular">
                Extensionistas
              </v-tab>
            </v-list-item>

            <v-list-item link class="mx-n6 pl-8" to="/Gestion/Investigacion">
              <v-tab class="text-left text-none font-weight-regular">
                Investigación
              </v-tab>
            </v-list-item>
          </div>
        </v-expand-transition>
        <!------------------------------herencia--------------------------------->

        <v-list-item link class="mx-n6 pl-3" to="/Gestion/Publicacion">
          <v-tab class="text-left text-none font-weight-regular"
            >Publicación
          </v-tab>
        </v-list-item>

        <v-list-item link class="mx-n6 pl-3" to="/Gestion/Revista">
          <v-tab class="text-left text-none font-weight-regular"
            >Revista
          </v-tab>
        </v-list-item>


        <v-list-item
          link
          class="mx-n6 pl-3"
          to="/Gestion/Trab_diploma_profesor_estudiante"
        >
          <v-tab class="text-left text-none font-weight-regular"
            >Trabajo diploma-profesor-estudiante
          </v-tab>
        </v-list-item>

        <v-list-item link class="mx-n6 pl-3" to="/Gestion/Trabajador">
          <v-tab class="text-left text-none font-weight-regular"
            >Trabajador</v-tab
          >
        </v-list-item>

        <v-list-item
          link
          class="mx-n6 pl-3"
          to="/Gestion/Trabajador_no_docente"
        >
          <v-tab class="text-left text-none font-weight-regular"
            >Trabajador no docente</v-tab
          >
        </v-list-item>

        <v-list-item link class="mx-n6 pl-3" to="/Gestion/Trabajo_diploma">
          <v-tab class="text-left text-none font-weight-regular">
            Trabajo
            <p class="text-lowercase mb-0">&nbsp;de&nbsp;</p>
            diploma
          </v-tab>
        </v-list-item>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>

  <!----------------------------- Aqui termina un modulo --------------------------- -->
</template>
<script>
const axios = require('axios')

export default {
  data() {
    return {
      drawer: null,
      Practica_laboral: false,
      Asignatura: false,
      Proyecto: false,
      admin: false,
    }
  },
  created() {
    this.rol()
  },
  methods: {  
    async rol() {
      const user = this.$auth.$storage.getUniversal('user').username
      await axios
        .get('http://localhost:8000/users/')
        .then((response) => {
          response.data.forEach((item) => {
            if (user === item.username) {
              if (item.rol === 'administrador') {
                this.admin = true
              }
              console.log('admin', this.admin)
            }
          })
        })
        .catch((error) => {
          console.error(error)
        })
    },
  },
}
</script>
