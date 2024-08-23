<template>
  <v-container mt-5>
    <v-data-table
      :headers="headers"
      :items="asignatura"
      sort-by="search"
      class="elevation-1 px-4"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title style="color: #01579b">Asignaturas</v-toolbar-title>
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
                        class="my-n3"
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

                      <v-col cols="12" sm="6" md="3" class="my-n3" v-else>
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
                        class="my-n3"
                        v-if="desabilitado == false"
                      >
                        <v-select
                          :items="agnos"
                          v-model="editedItem.agno_academico"
                          label="Año académico"
                          class="d-flex"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="3" class="my-n3" v-else>
                        <v-card-title style="font-size: 16px">
                          Año académico
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.agno_academico }}
                        </v-card-subtitle>
                      </v-col>



                      <!-------------------------------------------------- Tipo evaluación final---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        class="my-n3"
                        v-if="desabilitado == false"
                      >
                        <v-select
                          :items="tipo_evaluacion_final"
                          v-model="editedItem.tipo_evaluacion_final"
                          label="Tipo Eval. final"
                          class="d-flex"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="3" class="my-n3" v-else>
                        <v-card-title style="font-size: 16px">
                          Tipo Eval. final
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
                        class="my-n3"
                        v-if="desabilitado == false"
                      >
                        <v-select
                          :items="disciplina"
                          v-model="editedItem.idDisciplina"
                          label="Disciplina"
                          class="d-flex"
                          item-value="idDisciplina"
                          :item-text="(item) => item.nombre_disciplina"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="3" class="my-n3" v-else>
                        <v-card-title style="font-size: 16px"
                          >Disciplina</v-card-title
                        >

                        <v-card-subtitle>
                          {{ editedItem.idDisciplina }}
                        </v-card-subtitle>
                      </v-col>
                      <!-------------------------------------------------- Alumno ayudante---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        class="my-n3"
                        v-if="desabilitado == false"
                      >
                        <v-select
                          :items="alumno_ayudante"
                          v-model="editedItem.idAlumno_ayudante"
                          label="Alumno Ayudante"
                          class="d-flex"
                          item-value="idAlumno_ayudante"
                          :item-text="(item) => `${item.nombre_alumno_ayudante} ${item.apellido}`"
                        ></v-select>
                      </v-col>
                       <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        class="my-n3"
                        v-else
                      >
                        <v-card-title style="font-size: 16px"
                          >Alumno ayudante</v-card-title
                        >

                        <v-card-subtitle>
                          {{ editedItem.idAlumno_ayudante.join(', ') }}
                        </v-card-subtitle>
                      </v-col>
                      <!-- ------------------------------------------------ Profesor-------------------------------------------------->
                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        class="my-n3"
                        v-if="desabilitado == true"
                      >
                        <v-card-title style="font-size: 16px"
                          >Profesor</v-card-title
                        >

                        <v-card-subtitle>
                          {{ editedItem.idTrabajador.join(', ') }}
                        </v-card-subtitle>
                      </v-col>
                      <!-------------------------------------------------- Virtual---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        class="my-n3"
                        v-if="desabilitado == false"
                      >
                        <v-select
                          :items="virtual"
                          v-model="editedItem.asig_virtual"
                          label="Virtual"
                          class="d-flex"
                          :rules="[(v) => !!v || 'Campo requerido']"
                          
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="3" class="my-n3" v-else>
                        <v-card-title style="font-size: 16px"
                          >Virtual</v-card-title
                        >

                        <v-card-subtitle>
                          {{ editedItem.asig_virtual }}
                        </v-card-subtitle>
                      </v-col>

                      <!-- ------------------------------------------------Programa-------------------------------------------------- -->
                        <v-col cols="12" sm="6" md="3" class="my-n3"  v-if="desabilitado == false">
                        <v-file-input
                          ref="programa"
                          accept=".pdf,.xlsx,.docx"
                          small-chips
                          truncate-length="15"
                          v-model="editedItem.programa"
                          label="Programa"
                          class="d-flex"
                        ></v-file-input>
                      </v-col>
                       <v-col cols="12" sm="6" md="3" class="my-n3" v-else>
                        <v-card-title style="font-size: 16px"
                          >Programa</v-card-title
                        >

                        <v-card-subtitle>
                          <a
                            :href="editedItem.programa_url"
                            target="_blank"
                            @click.prevent="downloadFile(editedItem)"
                            >{{ editedItem.programa }}</a
                          >
                        </v-card-subtitle>
                      </v-col>
                      <!-- ------------------------------------------------ Alumno ayudante-------------------------------------------------- -->
                    
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
export default {
  head() {
    return {
      title: 'Asignaturas',
    }
  },
  data: () => ({
    virtual: ['Si', 'No'],
    agnos: ['1', '2', '3', '4', '5'],
    resultado_control: ['Bien', 'Regular', 'Mal'],

    tipo_evaluacion_final: [
      'Trabajo de curso',
      'Proyecto de curso',
      'Exámen final',
      'Ejercicio integrador',
    ],
    textRules: [
           (v) => !!v || "Campo requerido",
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
      // { text: "Tema de la Práct. Lab.", value: "tema_practica_laboral" },
      // { text: "Tipo de evaluación final", value: "tipo_evaluacion_final" },
      // { text: "Virtual", value: "virtual" },
      { text: 'Disciplina', value: 'idDisciplina' },
      { text: 'Profesor', value: 'idTrabajador' },
      // { text: 'Bibliografía', value: 'idBibliografia' },
      // { text: 'Software', value: 'idSoftware' },
      { text: 'Alumno ayudante', value: 'idAlumno_ayudante' },

      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    asignatura: [],
    // bibliografia: [],
    // software: [],
    alumno_ayudante: [],
    trabajador: [],
    disciplina: [],

    editedIndex: -1,
    editedItem: {
      agnos: null,
      tema_practica_laboral: null,
      nombre_asignatura: null,
      tipo_evaluacion_final: null,
      virtual: null,
      programa: null,
      programa_url: null,


      // idBibliografia: null,
      // idSoftware: null,
      // idAlumno_ayudante: null,
      idDisciplina: null,
      idAlumno_ayudante: null,
      // idTrabajador: null,
    },
    defaultItem: {
      agnos: null,
      tema_practica_laboral: null,
      programa: null,
            programa_url: null,


      nombre_asignatura: null,
      tipo_evaluacion_final: null,
      virtual: null,
      // idBibliografia: null,
      // idTrabajador: null,
      // idSoftware: null,
      // idAlumno_ayudante: null,
      idDisciplina: null,
      idAlumno_ayudante: null,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Asignatura' : 'Asignatura'
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
      const promesas = [
        // this.getBibliografia(),
        this.getTrabajador(),
        // this.getSoftware(),
        this.getAlumno_ayudante(),
        this.getDisciplina(),
      ]
      await Promise.all(promesas)
      await this.initialize()
    } catch (error) {
      console.error(error)
    }
  },

  methods: {
    async initialize() {
      try {
        const asignaturaUrl = await this.$axios.$get('/api/asignatura')
        this.asignatura = asignaturaUrl.map((item) => {
          // const bibAux = item.idBibliografia
          //   .map((id) =>
          //     this.bibliografia.find(
          //       (bibliografia) => bibliografia.idBibliografia === id
          //     )
          //   )
          //   .filter((bibliografia) => bibliografia !== undefined)

          // const softAux = item.idSoftware
          //   .map((id) =>
          //     this.software.find((software) => software.idSoftware === id)
          //   )
          //   .filter((software) => software !== undefined)

          const disAux = item.idDisciplina
            ? this.disciplina.find(
                (disciplina) => disciplina.idDisciplina === item.idDisciplina
              ).nombre_disciplina
            : null

          const trabAux = item.idTrabajador
            .map((id) =>
              this.trabajador.find(
                (trabajador) => trabajador.idTrabajador === id
              )
            )
            .filter((trabajador) => trabajador !== undefined)

          const alumnoAux = item.idAlumno_ayudante
            .map((id) =>
              this.alumno_ayudante.find(
                (alumno_ayudante) => alumno_ayudante.idAlumno_ayudante === id
              )
            )
            .filter((alumno_ayudante) => alumno_ayudante !== undefined)

          return {
            idAsignatura: item.idAsignatura,
            nombre_asignatura: item.nombre_asignatura,
            tipo_evaluacion_final: item.tipo_evaluacion_final,
            asig_virtual: item.asig_virtual,
            agno_academico: item.agno_academico,
            programa: item.programa,
            programa_url: `${this.$axios.defaults.baseURL}/download/asignatura/${item.idAsignatura}/programa/`,
         

            // idBibliografia: bibAux.map((bibliografia) => bibliografia.titulo),
            // idSoftware: softAux.map((software) => software.nombre_software),
            idDisciplina: disAux,
            idTrabajador: trabAux.map(
              (trabajador) =>
                `${trabajador.nombre_trabajador} ${trabajador.apellido}`
            ),
            idAlumno_ayudante: alumnoAux.map(
              (alumno_ayudante) =>
                `${alumno_ayudante.nombre_alumno_ayudante} ${alumno_ayudante.apellido}`
            ),
          }
        })
      } catch (error) {
        console.error(error)
      }
    },

    downloadFile(item) {
      fetch(item.programa_url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `El archivo "${item.programa}" no se pudo encontrar`
            )
          }
          return response.blob()
        })
        .then((blob) => {
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = item.programa
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
        })
        .catch((error) => {
          alert(error.message)
        })
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
      this.editedIndex = this.asignatura.indexOf(item)
      console.log("this.asignatura",this.asignatura);
      this.editedItem = Object.assign({}, item)

      const { editedItem, disciplina, alumno_ayudante } = this

      const disAux = disciplina.find(
        (disciplina) => editedItem.idDisciplina === disciplina.nombre_disciplina
      )
      editedItem.idDisciplina = disAux
      editedItem.programa = null

       const alumnoAux = alumno_ayudante.find(
        (alumno) =>
          editedItem.idAlumno_ayudante ==
          `${alumno.nombre_alumno_ayudante} ${alumno.apellido}`
      )
      console.log('alumnoAux',alumnoAux);
      console.log('alumno_ayudante',alumno_ayudante);
      editedItem.idAlumno_ayudante = alumnoAux



      this.dialog = true
    },
    showItem(item) {
      this.editedIndex = this.asignatura.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
      this.desabilitado = true
    },

    deleteItem(item) {
      this.editedIndex = this.asignatura.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      const idAsignatura = this.asignatura[this.editedIndex].idAsignatura

      try {
        await this.$axios.$delete(`/api/asignatura/${idAsignatura}`)
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
      let { editedItem, editedIndex, asignatura } = this
      const url = '/api/asignatura/'
      const id = editedIndex >= 0 ? asignatura[editedIndex].idAsignatura : ''
      
      const formData = new FormData()
      
      formData.append(
        'nombre_asignatura',
        editedItem.nombre_asignatura
      )
      formData.append('tipo_evaluacion_final', editedItem.tipo_evaluacion_final)
      formData.append('asig_virtual', editedItem.asig_virtual)
      formData.append('agno_academico', editedItem.agno_academico)


      if (editedItem.idDisciplina != null || editedItem.idDisciplina != undefined) {
        formData.append('idDisciplina', editedItem.idDisciplina)
      }
      if (editedItem.idAlumno_ayudante != null || editedItem.idAlumno_ayudante != undefined) {
        formData.append('idAlumno_ayudante', editedItem.idAlumno_ayudante)
      }
      console.log('editedItem.programa',editedItem.programa);
      if (editedItem.programa !== null) {
        formData.append('programa', editedItem.programa)
      }
      
      try {
        if (editedIndex > -1) {
          await this.$axios.$put(`${url}${id}/`, formData)
        } else await this.$axios.$post(url, formData)
      } catch (error) {
        console.error(error)
      }
      asignatura = []
      await this.initialize()
      this.close()
    },
  },
}
</script>
