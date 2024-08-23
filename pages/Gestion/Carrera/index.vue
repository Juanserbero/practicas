<template>
  <v-container mt-5>
    <div id="app">
      <v-data-table
        :headers="headers"
        :items="carrera"
        sort-by="search"
        class="elevation-1 px-4"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title style="color: #01579b">Carreras</v-toolbar-title>
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
                        <!-------------------------------------------------- nombre de carrera ---------------------------------------------------->
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                          v-if="desabilitado == false"
                        >
                          <v-text-field
                            v-model="editedItem.nombre_carrera"
                            label="Nombre"
                            :rules="textRules"
                            maxlength="25"
                            required
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="4" v-else>
                          <v-card-title style="font-size: 16px">
                            Nombre
                          </v-card-title>

                          <v-card-subtitle>
                            {{ editedItem.nombre_carrera }}
                          </v-card-subtitle>
                        </v-col>

                        <!-------------------------------------------------- Unidades docentes---------------------------------------------------->

                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                          v-if="desabilitado == false"
                        >
                          <v-text-field
                            v-model="editedItem.unidades_docente"
                            label="Unidades docentes"
                            :rules="numberRules"
                            maxlength="20"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" v-else>
                          <v-card-title style="font-size: 16px">
                            Unidades docentes
                          </v-card-title>

                          <v-card-subtitle>
                            {{ editedItem.unidades_docente }}
                          </v-card-subtitle>
                        </v-col>

                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                          v-if="desabilitado == false"
                        >
                          <v-select
                            :items="modalidad"
                            v-model="editedItem.modalidad"
                            label="Modalidad"
                            class="d-flex"
                            :rules="[(v) => !!v || 'Campo requerido']"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" v-else>
                          <v-card-title style="font-size: 16px"
                            >Modalidad</v-card-title
                          >

                          <v-card-subtitle>
                            {{ editedItem.modalidad }}
                          </v-card-subtitle>
                        </v-col>

                        <!-------------------------------------------------- Departamento---------------------------------------------------->

                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                          v-if="desabilitado == false"
                        >
                          <v-select
                            :items="departamento"
                            v-model="editedItem.idDepartamento"
                            label="Departamento"
                            class="d-flex"
                            item-value="idDepartamento"
                            :item-text="(item) => item.nombre_departamento"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" v-else>
                          <v-card-title style="font-size: 16px"
                            >Departamento</v-card-title
                          >

                          <v-card-subtitle>
                            {{ editedItem.idDepartamento }}
                          </v-card-subtitle>
                        </v-col>
                                                <!-------------------------------------------------- Plan de estudio---------------------------------------------------->

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
                            v-model="editedItem.plan_estudio"
                            label="Plan de estudio"
                            class="d-flex"
                          ></v-file-input>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" v-else>
                          <v-card-title style="font-size: 16px">
                            Plan de estudio
                          </v-card-title>

                          <v-card-subtitle>
                            <a
                              :href="editedItem.plan_estudio_url"
                              target="_blank"
                              @click.prevent="
                                downloadFiles(editedItem, 'plan_estudio')
                              "
                              >{{ editedItem.plan_estudio }}</a
                            >
                          </v-card-subtitle>
                        </v-col>

                        <!-------------------------------------------------- plan_trabajo_metodologico ---------------------------------------------------->

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
                            v-model="editedItem.plan_trabajo_metodologico"
                            label="Plan trab. metodológico"
                            class="d-flex"
                          ></v-file-input>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" v-else>
                          <v-card-title style="font-size: 16px">
                            Plan trab. met.
                          </v-card-title>

                          <v-card-subtitle>
                            <a
                              :href="editedItem.plan_trabajo_metodologico_url"
                              target="_blank"
                              @click.prevent="
                                downloadFiles(
                                  editedItem,
                                  'plan_trabajo_metodologico'
                                )
                              "
                              >{{ editedItem.plan_trabajo_metodologico }}</a
                            >
                          </v-card-subtitle>
                        </v-col>
                        <!-------------------------------------------------- Est. educativa carrera---------------------------------------------------->

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
                            v-model="editedItem.estrategia_educativa_carrera"
                            label="Est. educativa carrera"
                            class="d-flex"
                          ></v-file-input>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" v-else>
                          <v-card-title style="font-size: 16px">
                            Est. educativa carrera
                          </v-card-title>

                          <v-card-subtitle>
                            <a
                              :href="editedItem.estrategia_educativa_carrera_url"
                              target="_blank"
                              @click.prevent="
                                downloadFiles(
                                  editedItem,
                                  'estrategia_educativa_carrera'
                                )
                              "
                              >{{ editedItem.estrategia_educativa_carrera }}</a
                            >
                          </v-card-subtitle>
                        </v-col>
                        <!-------------------------------------------------- Est. educativa años---------------------------------------------------->

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
                            v-model="editedItem.estrategia_educativa_agno"
                            label="Est. educativa años"
                            class="d-flex"
                          ></v-file-input>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" v-else>
                          <v-card-title style="font-size: 16px">
                            Est. educativa años
                          </v-card-title>

                          <v-card-subtitle>
                            <a
                              :href="editedItem.estrategia_educativa_carrera_url"
                              target="_blank"
                              @click.prevent="
                                downloadFiles(
                                  editedItem,
                                  'estrategia_educativa_agnos'
                                )
                              "
                              >{{ editedItem.estrategia_educativa_agnos }}</a
                            >
                          </v-card-subtitle>
                        </v-col>

                        <!-------------------------------------------------- Estrategia curricular---------------------------------------------------->

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
                            v-model="editedItem.estrategia_curricular"
                            label="Estrategia curricular"
                            class="d-flex"
                          ></v-file-input>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" v-else>
                          <v-card-title style="font-size: 16px">
                            Estrategia curricular
                          </v-card-title>

                          <v-card-subtitle>
                            <a
                              :href="editedItem.estrategia_curricular_url"
                              target="_blank"
                              @click.prevent="
                                downloadFiles(
                                  editedItem,
                                  'estrategia_curricular'
                                )
                              "
                              >{{ editedItem.estrategia_curricular }}</a
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
      title: 'Carreras',
    }
  },
  name: 'App',
  data: () => ({
    plan_estudio: ['D', 'E'],
    modalidad: ['CD', 'CE', 'Distancia', 'Ciclo corto'],
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
    // dialogShow: false,
    dialogDelete: false,
    // eslint-disable-next-line no-sparse-arrays
    headers: [
      {
        text: 'Nombre',
        align: 'start',
        sortable: true,
        value: 'nombre_carrera',
      },
      { text: 'Departamento', value: 'idDepartamento' },
      // { text: "plan_trabajo_metodologico", value: "plan_trabajo_metodologico" },
      /*        { text: "Plan de estudio", align: "center", value: "plan_estudio" },*/
      { text: 'Modalidad', value: 'modalidad' },
      // { text: "Est. educativa carrera", value: "estrategia_educativa_carrera" },
      // { text: "Unidades docente", value: "unidades_docente" },

      { text: 'Acciones', value: 'actions', sortable: false },
    ],

    carrera: [],
    // showcarrera: [],
    departamento: {},

    editedIndex: -1,
    editedItem: {
      nombre_carrera: null,
      plan_trabajo_metodologico: null,
      plan_estudio: null,
      plan_estudio_url: null,
      modalidad: null,
      estrategia_educativa_carrera: null,
      estrategia_educativa_agno: null,
      unidades_docente: null,
      idDepartamento: null,
    },
    defaultItem: {
      nombre_carrera: null,
      plan_trabajo_metodologico: null,
      plan_estudio: null,
      plan_estudio_url: null,
      modalidad: null,
      estrategia_educativa_carrera: null,
      estrategia_educativa_agno: null,
      unidades_docente: null,
      idDepartamento: null,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Carrera' : 'Carrera'
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
    await this.getDepartamento()
    this.initialize()
  },

  methods: {
    async initialize() {
      try {
        const response = await this.$axios.$get('/api/carrera')
        this.carrera = response.map((item) => {
          const depAux = item.idDepartamento
            ? this.departamento.find(
                (departamento) =>
                  departamento.idDepartamento === item.idDepartamento
              ).nombre_departamento
            : null
          return {
            idCarrera: item.idCarrera,
            nombre_carrera: item.nombre_carrera,
            plan_estudio: item.plan_estudio,
            modalidad: item.modalidad,
            unidades_docente: item.unidades_docente,
            plan_trabajo_metodologico: item.plan_trabajo_metodologico,
            estrategia_educativa_carrera: item.estrategia_educativa_carrera,
            estrategia_educativa_agno: item.estrategia_educativa_agno,
            estrategia_curricular: item.estrategia_curricular,
            idDepartamento: depAux,
            plan_estudio_url: `${this.$axios.defaults.baseURL}/download/carrera/${item.idCarrera}/plan_estudio/`,
            plan_trabajo_metodologico_url: `${this.$axios.defaults.baseURL}/download/carrera/${item.idCarrera}/plan_trabajo_metodologico/`,
            estrategia_educativa_carrera_url: `${this.$axios.defaults.baseURL}/download/carrera/${item.idCarrera}/estrategia_educativa_carrera/`,
            estrategia_educativa_agno_url: `${this.$axios.defaults.baseURL}/download/carrera/${item.idCarrera}/estrategia_educativa_agno/`,
            estrategia_curricular_url: `${this.$axios.defaults.baseURL}/download/carrera/${item.idCarrera}/estrategia_curricular/`,
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
        case 'plan_estudio':
          this.downloadFile(item.plan_estudio_url, item.plan_estudio)
          break
        case 'plan_trabajo_metodologico':
          this.downloadFile(
            item.plan_trabajo_metodologico_url,
            item.plan_trabajo_metodologico
          )
          break
        case 'estrategia_educativa_carrera':
          this.downloadFile(
            item.estrategia_educativa_carrera_url,
            item.estrategia_educativa_carrera
          )
          break
        case 'estrategia_educativa_agno':
          this.downloadFile(
            item.estrategia_educativa_agno_url,
            item.estrategia_educativa_agno
          )
          break
        default:
          this.downloadFile(
            item.estrategia_curricular_url,
            item.estrategia_curricular
          )
      }
    },

    async getDepartamento() {
      try {
        const response = await this.$axios.$get('/api/departamento')
        this.departamento = response.map((item) => ({
          idDepartamento: item.idDepartamento,
          nombre_departamento: item.nombre_departamento,
        }))
      } catch (error) {
        console.error(error)
      }
    },

    editItem(item) {
      this.editedIndex = this.carrera.indexOf(item)
      const editedItem = { ...item }
      const { departamento } = this
      const depAux = departamento.find(
        (departamento) =>
          editedItem.idDepartamento === departamento.nombre_departamento
      )
      editedItem.idDepartamento = depAux
      editedItem.plan_estudio = null
      editedItem.plan_trabajo_metodologico = null
      editedItem.estrategia_educativa_carrera = null
      editedItem.estrategia_educativa_agno = null
      editedItem.estrategia_curricular = null
      this.editedItem = {
        ...editedItem,
      }
      this.dialog = true
    },
    showItem(item) {
      this.editedIndex = this.carrera.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
      this.desabilitado = true
    },

    deleteItem(item) {
      this.editedIndex = this.carrera.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      const idDepartamento = this.departamento[this.editedIndex].idDepartamento

      try {
        await this.$axios.$delete(`/api/departamento/${idDepartamento}`)
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

      const { editedItem, editedIndex, carrera } = this
      const url = '/api/carrera/'
      const id = editedIndex >= 0 ? carrera[editedIndex].idCarrera + '/' : ''
      const formData = new FormData()

      formData.append('nombre_carrera', editedItem.nombre_carrera)
      formData.append('modalidad', editedItem.modalidad)
      formData.append('unidades_docente', editedItem.unidades_docente)
      console.log('editedItem.idDepartamento',editedItem.idDepartamento);
      if (editedItem.idDepartamento !== null || editedItem.idDepartamento !== undefined ) {
      formData.append(
        'idDepartamento',
        editedItem.idDepartamento || editedItem.idDepartamento.idDepartamento
      )
      }
      if (editedItem.plan_estudio !== null) {
        formData.append('plan_estudio', editedItem.plan_estudio)
      }
      if (editedItem.plan_trabajo_metodologico !== null) {
        formData.append(
          'plan_trabajo_metodologico',
          editedItem.plan_trabajo_metodologico
        )
      }
      if (editedItem.estrategia_curricular != null) {
        formData.append(
          'estrategia_curricular',
          editedItem.estrategia_curricular
        )
      }
      if (editedItem.estrategia_educativa_carrera !== null) {
        formData.append('estrategia_educativa_carrera', editedItem.estrategia_educativa_carrera)
      }
      if (editedItem.estrategia_educativa_agno !== null) {
        formData.append('estrategia_educativa_agno', editedItem.estrategia_educativa_agno)
      }

      try {
        if (editedIndex > -1) {
          await this.$axios.$put(`${url}${id}`, formData)
        } else await this.$axios.$post(url, formData)
      } catch (error) {
        console.error(error)
      }
      this.carrera = []
      await this.initialize()
      this.close()
    },
  },
}
</script>
