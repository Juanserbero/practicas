<template>
  <v-container mt-5>
    <div id="app">
      <v-data-table
        :headers="headers"
        :items="trabajo_diploma"
        sort-by="search"
        class="elevation-1 px-4"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title style="color: #01579b"
              >Trabajos de Diplomas</v-toolbar-title
            >
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="700px">
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
                    <v-form
                      ref="form"
                      enctype="multipart/form-data"
                      lazy-validation
                    >
                      <v-row>
                        <!-------------------------------------------------- titulo de trabajo_diploma ---------------------------------------------------->
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                          v-if="desabilitado == false"
                        >
                          <v-text-field
                            v-model="editedItem.titulo"
                            label="Título"
                            :rules="textRules"
                            maxlength="15"
                            required
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="4" v-else>
                          <v-card-title style="font-size: 16px">
                            Título
                          </v-card-title>

                          <v-card-subtitle>
                            {{ editedItem.titulo }}
                          </v-card-subtitle>
                        </v-col>
                        <!-------------------------------------------------- Descripción ---------------------------------------------------->

                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                          v-if="desabilitado == false"
                        >
                          <v-text-field
                            v-model="editedItem.descripcion"
                            label="Descripción"
                            :rules="textRules"
                            maxlength="25"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" v-else>
                          <v-card-title style="font-size: 16px">
                            Descripción
                          </v-card-title>

                          <v-card-subtitle>
                            {{ editedItem.descripcion }}
                          </v-card-subtitle>
                        </v-col>
                        <!-------------------------------------------------- informe ---------------------------------------------------->

                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                          v-if="desabilitado == false"
                        >
                          <v-file-input
                            accept=".pdf,.xlsx,.docx"
                            small-chips
                            truncate-length="15"
                            v-model="editedItem.informe"
                            label="Informe"
                            class="d-flex"
                          ></v-file-input>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" v-else>
                          <v-card-title style="font-size: 16px">
                            Informe
                          </v-card-title>

                          <v-card-subtitle>
                          <a
                            :href="editedItem.informe_url"
                            target="_blank"
                            @click.prevent="
                              downloadFiles(editedItem, 'informe')
                            "
                            >{{ editedItem.informe }}</a
                          >
                        </v-card-subtitle>
                        </v-col>

                        <!-------------------------------------------------- opinion_tutor---------------------------------------------------->

                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                          v-if="desabilitado == false"
                        >
                          <v-text-field
                            v-model="editedItem.opinion_tutor"
                            label="Opinión del tutor"
                            :rules="textRules"
                            maxlength="25"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" v-else>
                          <v-card-title style="font-size: 16px"
                            >Opinión del tutor</v-card-title
                          >

                          <v-card-subtitle>
                            {{ editedItem.opinion_tutor }}
                          </v-card-subtitle>
                        </v-col>

                        <!-------------------------------------------------- opinion_oponente---------------------------------------------------->

                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                          v-if="desabilitado == false"
                        >
                          <v-text-field
                            v-model="editedItem.opinion_oponente"
                            label="Opinión del oponente"
                            :rules="textRules"
                            maxlength="25"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" v-else>
                          <v-card-title style="font-size: 16px">
                            opinion del oponente</v-card-title
                          >

                          <v-card-subtitle>
                            {{ editedItem.opinion_oponente }}
                          </v-card-subtitle>
                        </v-col>

                        <!-------------------------------------------------- linea---------------------------------------------------->

                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                          v-if="desabilitado == false"
                        >
                          <v-text-field
                            v-model="editedItem.linea"
                            label="Línea"
                            :rules="textRules"
                            maxlength="15"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" v-else>
                          <v-card-title style="font-size: 16px"
                            >Línea</v-card-title
                          >

                          <v-card-subtitle>
                            {{ editedItem.linea }}
                          </v-card-subtitle>
                        </v-col>
                        <!-------------------------------------------------- nombre tutor---------------------------------------------------->
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                          v-if="desabilitado == true"
                        >
                          <v-card-title style="font-size: 16px"
                            >Nombre tutor</v-card-title
                          >

                          <v-card-subtitle>
                            {{ editedItem.idTrabajador}}
                          </v-card-subtitle>
                        </v-col>

                        <!-------------------------------------------------- nota---------------------------------------------------->

                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                          v-if="desabilitado == false"
                        >
                          <v-select
                            :items="nota"
                            v-model="editedItem.nota"
                            label="Nota"
                            class="d-flex"
                            :rules="[(v) => !!v || 'Campo requerido']"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" v-else>
                          <v-card-title style="font-size: 16px"
                            >Nota
                          </v-card-title>

                          <v-card-subtitle>
                            {{ editedItem.nota }}
                          </v-card-subtitle>
                        </v-col>
                        <!-------------------------------------------------- Aval---------------------------------------------------->

                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                          v-if="desabilitado == false"
                        >
                          <v-file-input
                            accept=".pdf,.xlsx,.docx"
                            small-chips
                            truncate-length="15"
                            v-model="editedItem.aval"
                            label="Aval"
                            class="d-flex"
                          ></v-file-input>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" v-else>
                          <v-card-title style="font-size: 16px">
                            Aval
                          </v-card-title>

                          <v-card-subtitle>
                          <a
                            :href="editedItem.aval_url"
                            target="_blank"
                            @click.prevent="
                              downloadFiles(editedItem, 'aval')
                            "
                            >{{ editedItem.aval }}</a
                          >
                        </v-card-subtitle>
                        </v-col>
                        <!-------------------------------------------------- Estudiantes---------------------------------------------------->
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                          v-if="desabilitado == true"
                        >
                          <v-card-title style="font-size: 16px"
                            >Estudiantes</v-card-title
                          >

                          <v-card-subtitle>
                            {{ editedItem.idEstudiante }}
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
         <template v-slot:item.informe="{ item }">
        <a
          :href="item.informe_url"
          target="_blank"
          @click.prevent=" downloadFile(item.informe_url,item.informe)"
          >{{ item.informe }}</a
        >
      </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="showItem(item)"> mdi-eye </v-icon>
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
        <template #no-data>
          <v-btn class="mx-2" fab small dark color="primary">
            <v-icon @click="initialize">mdi-restart </v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </div>
  </v-container>
</template>

<script>
const axios = require('axios')
export default {
  head() {
    return {
      title: 'Trabajo diploma',
    }
  },
  name: 'App',
  data: () => ({
    nota: ['2', '3', '4', '5'],
    informe: ['Si', 'No'],
    textRules: [
      (v) => !!v || 'Campo requerido',
      (v) =>
        (!v || /^[A-ZÁÉÍÓÚÑa-záéíóúñ ]+$/.test(v)) ||
        'El campo es sólo letras y debe comenzar con mayúsculas',
    ],

    search: '',
    dialog: false,
    desabilitado: false,
    // dialogShow: false,
    dialogDelete: false,
    // eslint-disable-next-line no-sparse-arrays
    headers: [
      {
        text: 'Título',
        align: 'start',
        sortable: true,
        value: 'titulo',
      },
      // { text: "Descripción", value: "descripcion" },
      { text: 'Informe', value: 'informe' },
      // { text: "Opinión del tutor", value: "opinion_tutor" },
      // { text: "Opinión del oponente", value: "opinion_oponente" },
      // { text: "Línea", value: "linea" },
      { text: 'Nombre tutor', value: 'idTrabajador' },
      { text: 'Nota', value: 'nota' },
      // { text: 'Aval', value: 'aval' },
      { text: 'Estudiante', value: 'idEstudiante' },

      { text: 'Acciones', value: 'actions', sortable: false },
    ],

    trabajo_diploma: [],
    mostrar_estudiante: [],
    mostrar_profesor: [],

    estudiante: {},
    profesor: {},

    editedIndex: -1,
    editedItem: {
      titulo: null,
      descripcion: null,
      informe: null,
      opinion_tutor: null,
      opinion_oponente: null,
      linea: null,
      nota: null,
      idEstudiante: null,
      idTrabajador: null,
    },
    defaultItem: {
      titulo: null,
      descripcion: null,
      informe: null,
      opinion_tutor: null,
      opinion_oponente: null,
      linea: null,
      nota: null,
      idEstudiante: null,
      idTrabajador: null,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? 'Trabajo de diploma'
        : 'Trabajo de diploma'
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
    await Promise.all([this.getProfesor(), this.getEstudiante()])
    await this.initialize()
  },
  methods: {
    async initialize() {
      try {
        const trabajo_diplomaUrl = await this.$axios.$get(
          '/api/trabajo_diploma'
        )
        console.log('trabajo_diplomaUrl',trabajo_diplomaUrl);
        this.trabajo_diploma = trabajo_diplomaUrl.map((item) => {
          const prof = this.profesor.find(
            (profesor) => profesor.idTrabajador === item.idTrabajador
          )
          const profesorAux = prof
            ? `${prof.nombre_trabajador} ${prof.apellido}`
            : null

          const est = this.estudiante.find(
            (estudiante) => estudiante.idEstudiante === item.idEstudiante
          )
          const estudianteAux = est
            ? `${est.nombre_estudiante} ${est.apellido}`
            : null

          return {
            idTrabajo_diploma: item.idTrabajo_diploma,
            titulo: item.titulo,
            descripcion: item.descripcion,
            informe: item.informe,
            opinion_tutor: item.opinion_tutor,
            opinion_oponente: item.opinion_oponente,
            linea: item.linea,
            nombre_tutor: item.nombre_tutor,
            nota: item.nota,
            aval: item.aval,
            idEstudiante: estudianteAux,
            idTrabajador: profesorAux,
            informe_url: `${this.$axios.defaults.baseURL}/download/trabajo_diploma/${item.idTrabajo_diploma}/informe/`,
            aval_url: `${this.$axios.defaults.baseURL}/download/trabajo_diploma/${item.idTrabajo_diploma}/aval/`,

          }
        })
      } catch (error) {
        console.error(error)
      }
    },
     async downloadFile(url, filename) {
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`El archivo "${filename}" no se pudo encontrar`)
        }
        const blob = await response.blob()
        const urlObj = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = urlObj
        a.download = filename
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      } catch (error) {
        alert(error.message)
      }
    },

    downloadFiles(item, tipoArchivo) {
      switch (tipoArchivo) {
        case 'informe':
          this.downloadFile(
            item.informe_url,
            item.informe
          )
          break
        default:
          this.downloadFile(item.aval_url, item.aval)
      }
    },
    async getEstudiante() {
      try {
        const response = await this.$axios.$get('/api/estudiante')
        this.estudiante = response.map((item) => ({
          idEstudiante: item.idEstudiante,
          nombre_estudiante: item.nombre_estudiante,
          apellido: item.apellido,
        }))
      } catch (error) {
        console.error(error)
      }
    },
    async getProfesor() {
      try {
        const response = await this.$axios.$get('/api/profesor')
        this.profesor = response.map((item) => ({
          idTrabajador: item.idTrabajador,
          nombre_trabajador: item.nombre_trabajador,
          apellido: item.apellido,
        }))
      } catch (error) {
        console.error(error)
      }
    },

    editItem(item) {
      this.editedIndex = this.trabajo_diploma.indexOf(item)
      this.editedItem = Object.assign({}, item)
      const profesorAux = this.profesor.find(
        (profesor) =>
          this.editedItem.idTrabajador ===
          `${profesor.nombre_trabajador} ${profesor.apellido}`
      )
      this.editedItem.idTrabajador = profesorAux

      const estudianteAux = this.estudiante.find(
        (estudiante) =>
          this.editedItem.idEstudiante ===
          `${estudiante.nombre_estudiante} ${estudiante.apellido}`
      )
      this.editedItem.idEstudiante = estudianteAux
      this.editedItem.informe = null
      this.editedItem.aval = null
      this.dialog = true
    },
    showItem(item) {
      this.editedIndex = this.trabajo_diploma.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
      this.desabilitado = true
    },

    deleteItem(item) {
      this.editedIndex = this.trabajo_diploma.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      const idTrabajo_diploma =
        this.trabajo_diploma[this.editedIndex].idTrabajo_diploma
      try {
        await this.$axios.$delete(`/api/trabajo_diploma/${idTrabajo_diploma}`)
        await this.initialize()
        this.closeDelete()
      } catch (error) {
        console.error(error)
      }
    },

    close() {
      this.$refs.form.resetValidation()

      this.dialog = false
      this.desabilitado = false
      this.$nextTick(() => {
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

      const { editedItem, editedIndex, trabajo_diploma } = this
      const url = '/api/trabajo_diploma/'
      const id =
        editedIndex >= 0
          ? trabajo_diploma[editedIndex].idTrabajo_diploma + '/'
          : ''
      const formData = new FormData()
      formData.append('nombre_posgrado', editedItem.nombre_posgrado)
      formData.append('edicion', editedItem.edicion)
      formData.append('fecha_inicio_edicion', editedItem.fecha_inicio_edicion)
      formData.append('titulo', editedItem.titulo)
      formData.append('descripcion', editedItem.descripcion)
      if (editedItem.informe !== null) {
        formData.append('informe', editedItem.informe)
      }
      formData.append('opinion_tutor', editedItem.opinion_tutor)
      formData.append('opinion_oponente', editedItem.opinion_oponente)
      formData.append('linea', editedItem.linea)
      formData.append('nota', editedItem.nota)
      formData.append('idEstudiante',  editedItem.idEstudiante
          ? editedItem.idEstudiante.idEstudiante || editedItem.idEstudiante
          : null)
      formData.append('idTrabajador',  editedItem.idTrabajador
          ? editedItem.idTrabajador.idTrabajador || editedItem.idTrabajador 
          : null)
      if (editedItem.aval !== null) {
        formData.append('aval', editedItem.aval)
      }
      try {
        if (editedIndex > -1) {
          await this.$axios.$put(`${url}${id}`, formData)
        } else await this.$axios.$post(url, formData)
      } catch (error) {
        console.error(error)
      }

      this.trabajo_diploma = []
      await this.initialize()
      this.close()
    },
  },
}
</script>
