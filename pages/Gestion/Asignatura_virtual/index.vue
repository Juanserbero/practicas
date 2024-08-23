<template>
  <v-container mt-5>
    <v-data-table
      :headers="headers"
      :items="asignatura_virtual"
      sort-by="search"
      class="elevation-1 px-4"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title style="color: #01579b">Asignatura virtual</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <v-dialog v-model="dialog" max-width="800px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="mx-2"
                fab
                small
                dark
                color="primary"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-plus-thick </v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
                <v-spacer></v-spacer>
                <v-card-actions v-if="desabilitado === true">
                  <v-btn color="red darken-1" text @click="close">
                    <v-btn
                    class="mx-2"
                    fab
                    small
                    dark
                    color="primary"
                    @click="close"
                  >
                    <v-icon> mdi-close-thick</v-icon>
                  </v-btn>
                  </v-btn>
                </v-card-actions>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-form ref="form" lazy-validation>
                    <v-row style="padding: 0px">
                      <!-------------------------------------------------- nombre de asignatura ---------------------------------------------------->
                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        v-if="desabilitado == false"
                      >
                        <v-text-field
                          v-model="editedItem.nombre_asignatura"
                          label="Nombre de la asignatura"
                          :rules="textRules"
                          maxlength="15"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="3" v-else>
                        <v-card-title style="font-size: 16px">
                          Nombre Asig.
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.nombre_asignatura }}
                        </v-card-subtitle>
                      </v-col>
                      <!-------------------------------------------------- Año academico---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        v-if="desabilitado == false"
                      >
                        <v-select
                          :items="agnos"
                          v-model="editedItem.agno_academico"
                          label="Año académico"
                          class="d-flex"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="3" v-else>
                        <v-card-title style="font-size: 16px">
                         Año académico
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.agno_academico }}
                        </v-card-subtitle>
                      </v-col>
                      <!--------------------------------------------------Objetivo---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        v-if="desabilitado == false"
                      >
                        <v-text-field
                          v-model="editedItem.objetivo"
                          label="Objetivo"
                          :rules="textRules"
                          maxlength="30"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="3" v-else>
                        <v-card-title style="font-size: 16px"
                          >Objetivo</v-card-title
                        >

                        <v-card-subtitle>
                          {{ editedItem.objetivo }}
                        </v-card-subtitle>
                      </v-col>

                      <!-------------------------------------------------- Cant. de horas---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        v-if="desabilitado == false"
                      >
                        <v-text-field
                          v-model="editedItem.cant_horas"
                          label="Cant. de horas"
                          :rules="numberRules"
                          maxlength="3"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="3" v-else>
                        <v-card-title style="font-size: 16px">
                          Cant. de horas
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.cant_horas }}
                        </v-card-subtitle>
                      </v-col>
                      <!-------------------------------------------------- Horas totales---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        v-if="desabilitado == false"
                      >
                        <v-text-field
                          v-model="editedItem.horas_totales"
                          label="Horas totales"
                          :rules="numberRules"
                          maxlength="3"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="3" v-else>
                        <v-card-title style="font-size: 16px">
                          Horas totales
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.horas_totales }}
                        </v-card-subtitle>
                      </v-col>
                      <!-------------------------------------------------- Controles realizados---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        v-if="desabilitado == false"
                      >
                        <v-text-field
                          v-model="editedItem.control_realizado"
                          label="Controles realizados"
                          maxlength="3"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="3" v-else>
                        <v-card-title style="font-size: 16px">
                          Controles realizados
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.control_realizado }}
                        </v-card-subtitle>
                      </v-col>
                      <!-------------------------------------------------- Resultado Controles realizados---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        v-if="desabilitado == false"
                      >
                        <v-select
                          :items="resultado_control"
                          v-model="editedItem.resultado_control_realizado"
                          label="Resultado del control realizado"
                          class="d-flex"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="3" v-else>
                        <v-card-title style="font-size: 16px">
                          Resultado del control realizado
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.resultado_control_realizado }}
                        </v-card-subtitle>
                      </v-col>

                      <!--------------------------------------------------Tipo de currículo---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        v-if="desabilitado == false"
                      >
                        <v-select
                          :items="tipo_curriculum"
                          v-model="editedItem.tipo_curriculum"
                          label="Tipo de currículo"
                          class="d-flex"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="3" v-else>
                        <v-card-title style="font-size: 16px">
                          Tipo de currículo
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.tipo_curriculum }}
                        </v-card-subtitle>
                      </v-col>

                      <!-------------------------------------------------- Tipo evaluación final---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        v-if="desabilitado == false"
                      >
                        <v-select
                          :items="tipo_evaluacion_final"
                          v-model="editedItem.tipo_evaluacion_final"
                          label="Tipo E. final"
                          class="d-flex"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="3" v-else>
                        <v-card-title style="font-size: 16px">
                          Tipo E. final
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.tipo_evaluacion_final }}
                        </v-card-subtitle>
                      </v-col>

                      <!-------------------------------------------------- Disciplina---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        v-if="desabilitado == false"
                      >
                        <v-select
                          :items="Object.values(disciplina)"
                          v-model="editedItem.idDisciplina"
                          label="Disciplina"
                          class="d-flex"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="3" v-else>
                        <v-card-title style="font-size: 16px"
                          >Disciplina</v-card-title
                        >

                        <v-card-subtitle>
                          {{ editedItem.idDisciplina }}
                        </v-card-subtitle>
                      </v-col>

                      <!-- ------------------------------------------------ Profesor--------------------------------------------------

                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        v-if="desabilitado == false"
                      >
                        <v-select
                          :items="Object.values(trabajador)"
                          v-model="editedItem.idTrabajador"
                          label="Profesor"
                          class="d-flex"
                          multiple
                        >
                          <template v-slot:selection="{ item, index }">
                            <div v-if="index === 0">
                              <span>{{ item }}</span>
                            </div>
                            <span
                              v-if="index === 1"
                              class="grey--text text-caption"
                            >
                              &nbsp;&nbsp;(+{{
                                editedItem.idTrabajador.length - 1
                              }})
                            </span>
                          </template>
                        </v-select>
                      </v-col>
                      -->
                      <v-col cols="12" sm="6" md="3" v-if="desabilitado == true">
                        <v-card-title style="font-size: 16px"
                          >Profesor</v-card-title
                        >

                        <v-card-subtitle>
                          {{ editedItem.idTrabajador.join(', ') }}
                        </v-card-subtitle>
                      </v-col> 
                      <!-------------------------------------------------- Bibliografía---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        v-if="desabilitado == false"
                      >
                        <v-select
                          :items="Object.values(bibliografia)"
                          v-model="editedItem.idBibliografia"
                          label="Bibliografía"
                          class="d-flex"
                          multiple
                        >
                          <template v-slot:selection="{ item, index }">
                            <div v-if="index === 0">
                              <span>{{ item }}</span>
                            </div>
                            <span
                              v-if="index === 1"
                              class="grey--text text-caption"
                            >
                              &nbsp;&nbsp;(+{{
                                editedItem.idBibliografia.length - 1
                              }})
                            </span>
                          </template>
                        </v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="3" v-else>
                        <v-card-title style="font-size: 16px"
                          >Bibliografía</v-card-title
                        >

                        <v-card-subtitle>
                          {{ editedItem.idBibliografia.join(', ') }}
                        </v-card-subtitle>
                      </v-col>
                      <!-------------------------------------------------- Software---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        v-if="desabilitado == false"
                      >
                        <v-select
                          :items="Object.values(software)"
                          v-model="editedItem.idSoftware"
                          label="Software"
                          class="d-flex"
                          multiple
                        >
                          <template v-slot:selection="{ item, index }">
                            <div v-if="index === 0">
                              <span>{{ item }}</span>
                            </div>
                            <span
                              v-if="index === 1"
                              class="grey--text text-caption"
                            >
                              &nbsp;&nbsp;(+{{
                                editedItem.idSoftware.length - 1
                              }})
                            </span>
                          </template>
                        </v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="3" v-else>
                        <v-card-title style="font-size: 16px"
                          >Software</v-card-title
                        >

                        <v-card-subtitle>
                          {{ editedItem.idSoftware.join(', ') }}
                        </v-card-subtitle>
                      </v-col>
                      <!-- ------------------------------------------------ Alumno ayudante-------------------------------------------------- -->
                      <!-- <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        v-if="desabilitado == false"
                      >
                        <v-select
                          :items="Object.values(alumno_ayudante)"
                          v-model="editedItem.idAlumno_ayudante"
                          label="Alumno ayudante"
                          class="d-flex"
                          multiple
                        >
                          <template v-slot:selection="{ item, index }">
                            <div v-if="index === 0">
                              <span>{{ item }}</span>
                            </div>
                            <span
                              v-if="index === 1"
                              class="grey--text text-caption"
                            >
                              &nbsp;&nbsp;(+{{
                                editedItem.idAlumno_ayudante.length - 1
                              }})
                            </span>
                          </template>
                        </v-select>
                      </v-col>
                      -->
                      <v-col cols="12" sm="6" md="3" v-if="desabilitado == true">
                        <v-card-title style="font-size: 16px"
                          >Alumno ayudante</v-card-title
                        >

                        <v-card-subtitle>
                          {{ editedItem.idAlumno_ayudante.join(', ') }}
                        </v-card-subtitle>
                      </v-col> 
                    </v-row>
                  </v-form>
                </v-container>
              </v-card-text>

              <v-card-actions v-if="desabilitado === false">
                <v-spacer></v-spacer>

                <v-btn color="blue darken-1" text @click="close">
                  Cancelar
                </v-btn>
                <v-btn color="blue darken-1" text @click="save">
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h6 pl-11"
                >¿Seguro que desea eliminar este elemento?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancelar</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="showItem(item)"> mdi-eye </v-icon>
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template #no-data>
        <v-btn class="mx-2" fab small dark color="primary">
          <v-icon @click="initialize">mdi-restart </v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
// import {textRules, numberRules} from '~plugins/validator.js'
export default {
  head() {
    return {
      title: 'Asignatura virtual',
    }
  },
  data: () => ({
    agnos: ['1', '2', '3', '4', '5'],
    resultado_control: ['Bien', 'Regular', 'Mal'],

    tipo_curriculum: ['Base', 'Propio', 'Optativa'],
    tipo_evaluacion_final: [
      'Trabajo de curso',
      'Proyecto de curso',
      'Exámen final',
      'Ejercicio integrador',
    ],
      textRules: [
        /*      (v) => !!v || "Campo requerido",*/
        (v) =>
          (!v || /^[A-ZÁÉÍÓÚÑa-záéíóúñ ]+$/.test(v)) || 'El campo es sólo letras',
      ],
      numberRules: [
        /*      (v) => !!v || "Campo requerido",*/
        (v) => (!v || /^[0-9 -]+$/.test(v)) || 'El campo es sólo números',
      ],

    search: '',
    dialog: false,
    desabilitado: false,
    dialogDelete: false,
    // eslint-disable-next-line no-sparse-arrays
    headers: [
      {
        text: 'Nombre Asignatura',
        align: 'start',
        sortable: true,
        value: 'nombre_asignatura',
      },
      // { text: "Año de Práct. Lab.", value: "agnos" },
      // { text: "Objetivo de la Práct. Lab.", value: "objetivo" },
      // { text: "Tema de la Práct. Lab.", value: "tema_practica_laboral" },
      // { text: "Cantidad de horas", value: "cant_horas" },
      // { text: "Horas totales", value: "horas_totales" },
      // { text: "Tipo de currículo", align: "center", value: "tipo_curriculum" },
      // { text: "Tipo de evaluación final", value: "tipo_evaluacion_final" },
      // { text: "Virtual", value: "virtual" },
      { text: 'Disciplina', value: 'idDisciplina' },
      { text: "Profesor", value: "idTrabajador" },
      { text: 'Bibliografía', value: 'idBibliografia' },
      { text: 'Software', value: 'idSoftware' },
      { text: "Alumno ayudante", value: "idAlumno_ayudante" },

      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    asignatura_virtual: [],
    bibliografia: [],
    mostrar_bibliografia: [],
    mostrar_software: [],
    mostrar_trabajador: [],
    mostrar_alumno_ayudante: [],
    software: {},
    alumno_ayudante: {},
    trabajador: {},
    disciplina: {},

    editedIndex: -1,
    editedItem: {
      agnos: null,
      objetivo: null,
      tema_practica_laboral: null,
      nombre_asignatura: null,
      cant_horas: null,
      horas_totales: null,
      tipo_curriculum: null,
      tipo_evaluacion_final: null,
      virtual: null,

      idBibliografia: null,
      idSoftware: null,
      // idAlumno_ayudante: null,
      idDisciplina: null,
      // idTrabajador: null,
    },
    defaultItem: {
      agnos: null,
      objetivo: null,
      tema_practica_laboral: null,

      nombre_asignatura: null,
      cant_horas: null,
      horas_totales: null,
      tipo_curriculum: null,
      tipo_evaluacion_final: null,
      virtual: null,
      idBibliografia: null,
      // idTrabajador: null,
      idSoftware: null,
      // idAlumno_ayudante: null,
      idDisciplina: null,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Asignatura virtual' : 'Asignatura virtual'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

async created() {
  try {
    const promises = [
      this.getBibliografia(),
      this.getTrabajador(),
      this.getSoftware(),
      this.getAlumno_ayudante(),
      this.getDisciplina()
    ]
    await Promise.all(promises)
    await this.initialize()
  } catch (error) {
    console.error(error)
  }
},

  methods: {
   async initialize() {
  try {
    const asignatura_virtualUrl = await this.$axios.$get('/api/asignatura_virtual');
    this.asignatura_virtual = asignatura_virtualUrl.map((item) => {
      const bibAux = item.idBibliografia
        .map((id) =>
          this.bibliografia.find(
            (bibliografia) => bibliografia.idBibliografia === id
          )
        )
        .filter((bibliografia) => bibliografia !== undefined);

      const softAux = item.idSoftware
        .map((id) =>
          this.software.find((software) => software.idSoftware === id)
        )
        .filter((software) => software !== undefined);

      const disAux = item.idDisciplina
        ? this.disciplina.find(
            (disciplina) => disciplina.idDisciplina === item.idDisciplina
          ).nombre_disciplina
        : null;

      const trabAux = item.idTrabajador
        .map((id) =>
          this.trabajador.find(
            (trabajador) => trabajador.idTrabajador === id
          )
        )
        .filter((trabajador) => trabajador !== undefined);

      const alumnoAux = item.idAlumno_ayudante
        .map((id) =>
          this.alumno_ayudante.find(
            (alumno_ayudante) =>
              alumno_ayudante.idAlumno_ayudante === id
          )
        )
        .filter((alumno_ayudante) => alumno_ayudante !== undefined);

      return {
        idAsignatura: item.idAsignatura,
        nombre_asignatura: item.nombre_asignatura,
        cant_horas: item.cant_horas,
        horas_totales: item.horas_totales,
        tipo_curriculum: item.tipo_curriculum,
        tipo_evaluacion_final: item.tipo_evaluacion_final,
        asig_virtual: item.asig_virtual,
        agno_academico: item.agno_academico,
        objetivo: item.objetivo,
        control_realizado: item.control_realizado,
        resultado_control_realizado: item.resultado_control_realizado,

        idBibliografia: bibAux.map((bibliografia) => bibliografia.titulo),
        idSoftware: softAux.map((software) => software.nombre_software),
        idDisciplina: disAux,
        idTrabajador: trabAux.map(
          (trabajador) =>
            `${trabajador.nombre_trabajador} ${trabajador.apellido}`
        ),
        idAlumno_ayudante: alumnoAux.map(
          (alumno_ayudante) =>
            `${alumno_ayudante.nombre_alumno_ayudante} ${alumno_ayudante.apellido}`
        ),
      };
    });
  } catch (error) {
    console.error(error);
  }
},
    
    async getDisciplina() {
      try {
        const response = await this.$axios.$get('/api/disciplina')
        this.disciplina = response.map((item) => ({
          idDisciplina: item.idDisciplina,
          nombre_disciplina: item.nombre_disciplina,
        }))
      } catch (error) {
        console.error(error)
      }
    },

    async getBibliografia() {
      try {
        const response = await this.$axios.$get('/api/bibliografia')
        this.bibliografia = response.map((item) => ({
          idBibliografia: item.idBibliografia,
          titulo: item.titulo,
        }))
      } catch (error) {
        console.error(error)
      }
    },
    async getTrabajador() {
      try {
        const response = await this.$axios.$get('/api/profesor')
        this.trabajador = response.map((item) => ({
          idTrabajador: item.idTrabajador,
          nombre_trabajador: item.nombre_trabajador,
          apellido: item.apellido,
        }))
      } catch (error) {
        console.error(error)
      }
    },

    async getSoftware() {
      try {
        const response = await this.$axios.$get('/api/software')
        this.software = response.map((item) => ({
          idSoftware: item.idSoftware,
          nombre_software: item.nombre_software,
        }))
      } catch (error) {
        console.error(error)
      }
    },
    async getAlumno_ayudante() {
      try {
        const response = await this.$axios.$get('/api/alumno_ayudante')
        this.alumno_ayudante = response.map((item) => ({
          idAlumno_ayudante: item.idAlumno_ayudante,
          nombre_alumno_ayudante: item.nombre_alumno_ayudante,
          apellido: item.apellido,
        }))
      } catch (error) {
        console.error(error)
      }
    },


     editItem(item) {
      this.editedIndex = this.asignatura_virtual.indexOf(item)
      this.editedItem = Object.assign({}, item)

      const { editedItem, bibliografia, software } = this

      const bibId = editedItem.idBibliografia.map((titulo) => {
        const bibAux = bibliografia.find((item) => item.titulo === titulo)
        return bibAux ? bibAux.idBibliografia : null
      })
      editedItem.idBibliografia = bibId

      const softId = editedItem.idSoftware.map((nombre_software) => {
        const softAux = software.find(
          (item) => item.nombre_software === nombre_software
        )
        return softAux ? softAux.idSoftware : null
      })
      editedItem.idSoftware = softId
      const disAux = this.disciplina.find(
        (disciplina) => editedItem.idDisciplina === disciplina.nombre_disciplina
      )
      editedItem.idDisciplina = disAux

      this.dialog = true
    },
    showItem(item) {
      this.editedIndex = this.asignatura_virtual.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
      this.desabilitado = true
    },

    deleteItem(item) {
      this.editedIndex = this.asignatura_virtual.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      const idAsignatura = this.asignatura_virtual[this.editedIndex].idAsignatura

      try {
        await this.$axios.$delete(`/api/asignatura_virtual/${idAsignatura}`)
        await this.initialize()
        this.closeDelete()
      } catch (error) {
        console.error(error)
      }
    },

    close() {
      this.dialog = false
      this.desabilitado = false
      this.$nextTick(() => {
        this.$refs.form.resetValidation()
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

     async save() {
      if (!this.$refs.form.validate()) {
        return
      }
      let { editedItem, editedIndex, asignatura_virtual } = this
      const url = '/api/asignatura_virtual/'
      const id = editedIndex >= 0 ? asignatura_virtual[editedIndex].idAsignatura : ''
      const requestData = {
        nombre_asignatura: editedItem.nombre_asignatura,
        cant_horas: editedItem.cant_horas,
        horas_totales: editedItem.horas_totales,
        tipo_curriculum: editedItem.tipo_curriculum,
        tipo_evaluacion_final: editedItem.tipo_evaluacion_final,
        asig_virtual: "Si",
        agno_academico: editedItem.agno_academico,
        objetivo: editedItem.objetivo,
        control_realizado: editedItem.control_realizado,
        resultado_control_realizado: editedItem.resultado_control_realizado,
        idDisciplina: editedItem.idDisciplina
          ? editedItem.idDisciplina.idDisciplina || editedItem.idDisciplina
          : null,

        idBibliografia: editedItem.idBibliografia || [],
        idSoftware: editedItem.idSoftware || [],
      }
      try {
        if (editedIndex > -1) {
          await this.$axios.$put(`${url}${id}/`, requestData)
        } else await this.$axios.$post(url, requestData)
      } catch (error) {
        console.error(error)
      }
      asignatura_virtual = []
      await this.initialize()
      this.close()
    },
  },
}
</script>
