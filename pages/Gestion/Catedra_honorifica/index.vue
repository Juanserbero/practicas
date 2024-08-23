<template>
  <v-container mt-5>
    <div id="app">
      <v-data-table
        :headers="headers"
        :items="catedra_honorifica"
        sort-by="search"
        class="elevation-1 px-4"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title style="color: #01579b"
              >Cátedra Honorífica</v-toolbar-title
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
                        <!-------------------------------------------------- nombre del proyecto  ---------------------------------------------------->
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                          v-if="desabilitado == false"
                        >
                          <v-text-field
                            v-model="editedItem.nombre_proyecto"
                            label="Nombre del proyecto"
                            :rules="textRules"
                            maxlength="20"
                            required
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="4" v-else>
                          <v-card-title style="font-size: 16px">
                            Nombre del proyecto
                          </v-card-title>

                          <v-card-subtitle>
                            {{ editedItem.nombre_proyecto }}
                          </v-card-subtitle>
                        </v-col>
                        <!-------------------------------------------------- Líder del proyecto ---------------------------------------------------->

                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                          v-if="desabilitado == false"
                        >
                          <v-select
                            :items="profesor"
                            v-model="editedItem.idTrabajador"
                            label="Líder proyecto"
                            class="d-flex"
                            item-value="idTrabajador"
                            :item-text="
                              (item) =>
                                `${item.nombre_trabajador} ${item.apellido}`
                            "
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" v-else>
                          <v-card-title style="font-size: 16px"
                            >Líder proyecto</v-card-title
                          >

                          <v-card-subtitle>
                            {{ editedItem.idTrabajador }}
                          </v-card-subtitle>
                        </v-col>

                        <!-------------------------------------------------- Años de experiencia ---------------------------------------------------->

                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                          v-if="desabilitado == false"
                        >
                          <v-text-field
                            v-model="editedItem.agno_experiencia_lider"
                            label="Años exp del líder"
                            :rules="numberRules"
                            maxlength="2"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" v-else>
                          <v-card-title style="font-size: 16px"
                            >Años exp del líder</v-card-title
                          >

                          <v-card-subtitle>
                            {{ editedItem.agno_experiencia_lider }}
                          </v-card-subtitle>
                        </v-col>
                        <!-------------------------------------------------- Estudiantes---------------------------------------------------->

                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                          v-if="desabilitado == false"
                        >
                          <v-select
                            :items="estudiante"
                            v-model="editedItem.idEstudiante"
                            label="Estudiante"
                            class="d-flex"
                            multiple
                            item-value="idEstudiante"
                            :item-text="
                              (item) =>
                                `${item.nombre_estudiante} ${item.apellido}`
                            "
                          >
                            <template v-slot:selection="{ item, index }">
                              <div v-if="index === 0">
                                <span
                                  >{{ item.nombre_estudiante }}
                                  {{ item.apellido }}</span
                                >
                              </div>
                              <span
                                v-if="index === 1"
                                class="grey--text text-caption"
                              >
                                &nbsp;&nbsp;(+{{
                                  editedItem.idEstudiante.length - 1
                                }})
                              </span>
                            </template>
                          </v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" v-else>
                          <v-card-title style="font-size: 16px"
                            >Estudiantes</v-card-title
                          >

                          <v-card-subtitle>
                            {{ editedItem.idEstudiante.join(', ') }}
                          </v-card-subtitle>
                        </v-col>

                        <!-------------------------------------------------- Tareas del impacto---------------------------------------------------->

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
                            v-model="editedItem.tareas_impacto"
                            label="Tareas impacto"
                            class="d-flex"
                          ></v-file-input>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" v-else>
                          <v-card-title style="font-size: 16px">
                            Tareas impacto
                          </v-card-title>

                          <v-card-subtitle>
                            <a
                              :href="editedItem.tareas_impacto_url"
                              target="_blank"
                              @click.prevent="
                                downloadFiles(editedItem, 'tareas_impacto')
                              "
                              >{{ editedItem.tareas_impacto }}</a
                            >
                          </v-card-subtitle>
                        </v-col>

                        <!-------------------------------------------------- Tareas cátedra honoríficas---------------------------------------------------->

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
                            v-model="editedItem.tareas_catedra_honorifica"
                            label="Tareas cátedra honoríficas"
                            class="d-flex"
                          ></v-file-input>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" v-else>
                          <v-card-title style="font-size: 16px">
                            Tareas cátedra honoríficas
                          </v-card-title>

                          <v-card-subtitle>
                            <a
                              :href="editedItem.tareas_catedra_honorifica_url"
                              target="_blank"
                              @click.prevent="
                                downloadFiles(
                                  editedItem,
                                  'tareas_catedra_honorifica'
                                )
                              "
                              >{{ editedItem.tareas_catedra_honorifica }}</a
                            >
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
        <!-- <template v-slot:item.tareas_impacto="{ item }">
          <a
            :href="item.tareas_impacto_url"
            target="_blank"
            @click.prevent="downloadFile(item.tareas_impacto_url, item.tareas_impacto)"
            >{{ item.tareas_impacto }}</a
          >
        </template> -->
        <template v-slot:item.tareas_catedra_honorifica="{ item }">
          <a
            :href="item.tareas_catedra_honorifica_url"
            target="_blank"
            @click.prevent="
              downloadFile(
                item.tareas_catedra_honorifica_url,
                item.tareas_catedra_honorifica
              )
            "
            >{{ item.tareas_catedra_honorifica }}</a
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
      title: 'Cátedra honorífica',
    }
  },
  name: 'App',
  data: () => ({
    textRules: [
      (v) => !!v || 'Campo requerido',
      (v) =>
        !v ||
        /^[A-ZÁÉÍÓÚÑa-záéíóúñ ]+$/.test(v) ||
        'El campo es sólo letras y debe comenzar con mayúsculas',
    ],
    numberRules: [
      (v) => !!v || 'Campo requerido',
      (v) => !v || /^[0-9 -]+$/.test(v) || 'El campo es sólo números',
    ],

    search: '',
    dialog: false,
    desabilitado: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Nombre proyecto',
        align: 'start',
        sortable: true,
        value: 'nombre_proyecto',
      },
      // { text: "Años de experiencia", value: "agno_experiencia_lider" },
      { text: 'Líder proyecto', value: 'idTrabajador' },
      { text: 'Estudiantes', value: 'idEstudiante' },

      // { text: "Jefe tarea", value: "jefe_tarea" },
      // { text: "Tareas proyecto", value: "tareas_proyecto" },
      // { text: "Investigación", value: "investigacion" },
      // { text: 'Tareas impacto', value: 'tareas_impacto' },
      { text: 'Tareas cátedra honorífica', value: 'tareas_catedra_honorifica' },

      { text: 'Acciones', value: 'actions', sortable: false },
    ],

    catedra_honorifica: [],

    estudiante: {},
    profesor: {},

    editedIndex: -1,
    editedItem: {
      nombre_proyecto: null,
      agno_experiencia_lider: null,
      tareas_impacto: null,
      tareas_catedra_honorifica: null,
      idEstudiante: null,
      idTrabajador: null,
    },
    defaultItem: {
      nombre_proyecto: null,
      agno_experiencia_lider: null,
      tareas_impacto: null,
      tareas_catedra_honorifica: null,
      idEstudiante: null,
      idTrabajador: null,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? 'Cátedra Honorífica'
        : 'Cátedra Honorífica'
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
        const catedra_honorificaUrl = await this.$axios.$get(
          '/api/catedra_honorifica'
        )
        this.catedra_honorifica = catedra_honorificaUrl.map((item) => {
          const prof = this.profesor.find(
            (profesor) => profesor.idTrabajador === item.idTrabajador
          )
          const profesorAux = prof
            ? `${prof.nombre_trabajador} ${prof.apellido}`
            : null
          const estAux = item.idEstudiante
            .map((id) =>
              this.estudiante.find(
                (estudiante) => estudiante.idEstudiante === id
              )
            )
            .filter((estudiante) => estudiante !== undefined)
          return {
            idProyecto: item.idProyecto,
            nombre_proyecto: item.nombre_proyecto,
            agno_experiencia_lider: item.agno_experiencia_lider,
            jefe_tarea: item.jefe_tarea,
            tareas_impacto: item.tareas_impacto,
            tareas_catedra_honorifica: item.tareas_catedra_honorifica,
            idEstudiante: estAux.map(
              (estudiante) =>
                `${estudiante.nombre_estudiante} ${estudiante.apellido}`
            ),
            idTrabajador: profesorAux,
            tareas_catedra_honorifica_url: `${this.$axios.defaults.baseURL}/download/catedra_honorifica/${item.idProyecto}/tareas_catedra_honorifica/`,
            tareas_impacto_url: `${this.$axios.defaults.baseURL}/download/catedra_honorifica/${item.idProyecto}/tareas_impacto/`,
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
        case 'tareas_catedra_honorifica':
          this.downloadFile(
            item.tareas_catedra_honorifica_url,
            item.tareas_catedra_honorifica
          )
          break
        default:
          this.downloadFile(item.tareas_impacto_url, item.tareas_impacto)
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
      this.editedIndex = this.catedra_honorifica.indexOf(item)
      this.editedItem = Object.assign({}, item)
      const estAux = this.editedItem.idEstudiante.map((nombre_estudiante) => {
        const estudiante = this.estudiante.find(
          (item) =>
            `${item.nombre_estudiante} ${item.apellido}` === nombre_estudiante
        )
        return estudiante ? estudiante.idEstudiante : null
      })
      this.editedItem.idEstudiante = estAux
      this.editedItem.tareas_catedra_honorifica = null
      this.editedItem.tareas_impacto = null
      const profesorAux = this.profesor.find(
        (profesor) =>
          this.editedItem.idTrabajador ===
          `${profesor.nombre_trabajador} ${profesor.apellido}`
      )
      this.editedItem.idTrabajador = profesorAux
      this.dialog = true
    },
    showItem(item) {
      this.editedIndex = this.catedra_honorifica.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
      this.desabilitado = true
    },

    deleteItem(item) {
      this.editedIndex = this.catedra_honorifica.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      const idProyecto = this.catedra_honorifica[this.editedIndex].idProyecto

      try {
        await this.$axios.$delete(`/api/catedra_honorifica/${idProyecto}`)
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

      const { editedItem, editedIndex, catedra_honorifica } = this
      const url = '/api/catedra_honorifica/'
      const id =
        editedIndex >= 0 ? catedra_honorifica[editedIndex].idProyecto + '/' : ''
      const formData = new FormData()
      formData.append('nombre_proyecto', editedItem.nombre_proyecto)
      formData.append(
        'agno_experiencia_lider',
        editedItem.agno_experiencia_lider
      )

      if (editedItem.idTrabajador !== null) {
        formData.append(
          'idTrabajador',
          editedItem.idTrabajador
            ? editedItem.idTrabajador.idTrabajador || editedItem.idTrabajador
            : null
        )
      }
      console.log('editedItem.idEstudiante', editedItem.idEstudiante)
      if (
        editedItem.idEstudiante !== null &&
        editedItem.idEstudiante.length > 0
      ) {
        editedItem.idEstudiante.forEach((id) => {
          formData.append('idEstudiante', id)
        })
      }
      if (editedItem.tareas_impacto !== null) {
        formData.append('tareas_impacto', editedItem.tareas_impacto)
      }
      if (editedItem.tareas_catedra_honorifica !== null) {
        formData.append(
          'tareas_catedra_honorifica',
          editedItem.tareas_catedra_honorifica
        )
      }
      try {
        if (editedIndex > -1) {
          await this.$axios.$put(`${url}${id}`, formData)
        } else await this.$axios.$post(url, formData)
      } catch (error) {
        console.error(error)
      }

      this.catedra_honorifica = []
      await this.initialize()
      this.close()
    },
  },
}
</script>
