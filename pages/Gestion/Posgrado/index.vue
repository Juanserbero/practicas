<template>
  <v-container mt-5>
    <v-data-table
      :headers="headers"
      :items="posgrado"
      sort-by="search"
      class="elevation-1 px-4"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title style="color: #01579b">Posgrados</v-toolbar-title>
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
                    <v-row style="padding: 0px">
                      <!-------------------------------------------------- nombre de posgrado ---------------------------------------------------->
                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        class="my-n5"
                        v-if="desabilitado == false"
                      >
                        <v-text-field
                          v-model="editedItem.nombre_posgrado"
                          label="Nombre"
                          :rules="textRules"
                          maxlength="15"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="3" class="my-n5" v-else>
                        <v-card-title style="font-size: 16px">
                          Nombre
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.nombre_posgrado }}
                        </v-card-subtitle>
                      </v-col>
                      <!-------------------------------------------------- expediente ---------------------------------------------------->
                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        class="my-n5"
                        v-if="desabilitado == false"
                      >
                        <v-select
                          :items="expedientes_sin_posgrado"
                          v-model="editedItem.idExpediente"
                          label="Expediente"
                          class="d-flex"
                          item-value="idExpediente"
                          :item-text="(item) => item.archivo"
                        ></v-select>
                      </v-col>

                      <v-col cols="12" sm="6" md="3" class="my-n5" v-else>
                        <v-card-title style="font-size: 16px">
                          Expediente
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.idExpediente }}
                        </v-card-subtitle>
                      </v-col>
                      <!-------------------------------------------------- edicion---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        class="my-n5"
                        v-if="desabilitado == false"
                      >
                        <v-text-field
                          v-model="editedItem.edicion"
                          label="Edición"
                          :rules="textRules"
                          maxlength="11"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="3" class="my-n5" v-else>
                        <v-card-title style="font-size: 16px">
                          Edición
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.edicion }}
                        </v-card-subtitle>
                      </v-col>
                      <!-------------------------------------------------- fecha_inicio_edicion---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        class="my-n5"
                        v-if="desabilitado == false"
                      >
                        <v-menu
                          v-model="menu1"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="editedItem.fecha_inicio_edicion"
                              label="Fecha inicio de edición"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            >
                            </v-text-field>
                          </template>
                          <v-date-picker
                            v-model="editedItem.fecha_inicio_edicion"
                            @input="menu1 = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="12" sm="6" md="3" class="my-n5" v-else>
                        <v-card-title style="font-size: 16px">
                          Fecha inicio de edición
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.fecha_inicio_edicion }}
                        </v-card-subtitle>
                      </v-col>

                      <!-------------------------------------------------- programa---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        class="my-n5"
                        v-if="desabilitado == false"
                      >
                        <v-file-input
                          accept=".pdf,.xlsx,.docx"
                          small-chips
                          truncate-length="15"
                          v-model="editedItem.programa"
                          label="Programa"
                          class="d-flex"
                        ></v-file-input>
                      </v-col>
                      <v-col cols="12" sm="6" md="4" v-else>
                        <v-card-title style="font-size: 16px">
                          Programa
                        </v-card-title>

                        <v-card-subtitle>
                          <a
                            :href="editedItem.programa_url"
                            target="_blank"
                            @click.prevent="
                              downloadFiles(editedItem, 'programa')
                            "
                            >{{ editedItem.programa }}</a
                          >
                        </v-card-subtitle>
                      </v-col>
                      <!-------------------------------------------------- fecha_culminacion_edicion---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        class="my-n5"
                        v-if="desabilitado == false"
                      >
                        <v-menu
                          v-model="menu2"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="editedItem.fecha_culminacion_edicion"
                              label="Fecha culminación de edición"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            >
                            </v-text-field>
                          </template>
                          <v-date-picker
                            v-model="editedItem.fecha_culminacion_edicion"
                            @input="menu2 = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="12" sm="6" md="3" class="my-n5" v-else>
                        <v-card-title style="font-size: 16px">
                          Fecha inicio de edición
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.fecha_culminacion_edicion }}
                        </v-card-subtitle>
                      </v-col>

                      <!-------------------------------------------------- reconocimiento---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        class="my-n5"
                        v-if="desabilitado == false"
                      >
                        <v-text-field
                          v-model="editedItem.reconocimiento"
                          label="Reconocimiento"
                          maxlength="25"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="3" class="my-n5" v-else>
                        <v-card-title style="font-size: 16px">
                          Reconocimiento
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.reconocimiento }}
                        </v-card-subtitle>
                      </v-col>
                      <!-------------------------------------------------- matricula_inicial_edicion---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        class="my-n5"
                        v-if="desabilitado == false"
                      >
                        <v-text-field
                          v-model="editedItem.matricula_inicial_edicion"
                          label="Matrícula inicial edición"
                          maxlength="25"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="3" class="my-n5" v-else>
                        <v-card-title style="font-size: 16px">
                          Matrícula inicial edición
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.matricula_inicial_edicion }}
                        </v-card-subtitle>
                      </v-col>
                      <!-------------------------------------------------- matricula_final_edicion---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        class="my-n5"
                        v-if="desabilitado == false"
                      >
                        <v-text-field
                          v-model="editedItem.matricula_final_edicion"
                          label="Matrícula final edición"
                          maxlength="25"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="3" class="my-n5" v-else>
                        <v-card-title style="font-size: 16px">
                          Matrícula final edición
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.matricula_final_edicion }}
                        </v-card-subtitle>
                      </v-col>
                      <!-------------------------------------------------- convenio---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        class="my-n5"
                        v-if="desabilitado == false"
                      >
                        <v-text-field
                          v-model="editedItem.convenio"
                          label="Convenio"
                          maxlength="25"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="3" class="my-n5" v-else>
                        <v-card-title style="font-size: 16px">
                          Convenio
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.convenio }}
                        </v-card-subtitle>
                      </v-col>
                      <!-------------------------------------------------- categoria_cientifica---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        class="my-n5"
                        v-if="desabilitado == false"
                      >
                        <v-text-field
                          v-model="editedItem.categoria_cientifica"
                          label="Categoría científica"
                          maxlength="25"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="3" class="my-n5" v-else>
                        <v-card-title style="font-size: 16px">
                          Categoría científica
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.categoria_cientifica }}
                        </v-card-subtitle>
                      </v-col>
                      <!-------------------------------------------------- tipo_posgrado---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        class="my-n5"
                        v-if="desabilitado == false"
                      >
                        <v-text-field
                          v-model="editedItem.tipo_posgrado"
                          label="Tipo posgrado"
                          maxlength="25"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="3" class="my-n5" v-else>
                        <v-card-title style="font-size: 16px">
                          Tipo posgrado
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.tipo_posgrado }}
                        </v-card-subtitle>
                      </v-col>
                      <!-------------------------------------------------- encuesta_satisfaccion---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        class="my-n5"
                        v-if="desabilitado == false"
                      >
                        <v-file-input
                          accept=".pdf,.xlsx,.docx"
                          small-chips
                          truncate-length="15"
                          v-model="editedItem.encuesta_satisfaccion"
                          label="Encuesta satisfacción"
                          class="d-flex"
                        ></v-file-input>
                      </v-col>
                      <v-col cols="12" sm="6" md="4" v-else>
                        <v-card-title style="font-size: 16px">
                          Encuesta satisfacción
                        </v-card-title>

                        <v-card-subtitle>
                          <a
                            :href="editedItem.encuesta_satisfaccion_url"
                            target="_blank"
                            @click.prevent="
                              downloadFiles(editedItem, 'encuesta_satisfaccion')
                            "
                            >{{ editedItem.encuesta_satisfaccion }}</a
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
const axios = require('axios')
export default {
  head() {
    return {
      title: 'Posgrado',
    }
  },
  data: () => ({
    militancia: ['Si', 'No'],
    sexo: ['F', 'M'],
    posgrado_departamento: ['Si', 'No'],

    textRules: [
      /*      (v) => !!v || "Campo requerido",*/
      (v) =>
        !v || /^[A-ZÁÉÍÓÚÑa-záéíóúñ ]+$/.test(v) || 'El campo es sólo letras',
    ],
    numberRules: [
      /*      (v) => !!v || "Campo requerido",*/
      (v) => !v || /^[0-9 -]+$/.test(v) || 'El campo es sólo números',
    ],

    search: '',
    menu1: false,
    menu2: false,

    dialog: false,
    desabilitado: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Nombre',
        align: 'start',
        sortable: true,
        value: 'nombre_posgrado',
      },
      { text: 'Carnet de identidad', value: 'edicion' },
      { text: 'Expediente', value: 'idExpediente' },
      { text: 'Fecha inicio edición', value: 'fecha_inicio_edicion' },
      //   { text: 'Dirección', value: 'programa' },
      //   { text: 'Teléfono', value: 'fecha_culminacion_edicion' },
      { text: 'Otros datos', value: 'reconocimiento' },

      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    posgrado: [],
    expediente: {},
    expedientes_sin_posgrado: {},

    editedIndex: -1,
    editedItem: {
      nombre_posgrado: null,
      edicion: null,
      fecha_inicio_edicion: null,
      programa: null,
      fecha_culminacion_edicion: null,
      reconocimiento: null,
      idExpediente: null,
    },
    defaultItem: {
      nombre_posgrado: null,
      edicion: null,
      fecha_inicio_edicion: null,
      programa: null,
      fecha_culminacion_edicion: null,
      reconocimiento: null,
      idExpediente: null,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Posgrado' : 'Posgrado'
    },
  },

  watch: {
    updatedData: function () {
      this.getExpedienteSinPosgrado()
    },
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  async created() {
    await this.getExpediente()
    await this.getExpedienteSinPosgrado()
    this.initialize()
  },

  methods: {
    async initialize() {
      try {
        const posgradoUrl = await this.$axios.$get('/api/posgrado')
        this.posgrado = posgradoUrl.map((item) => {
          const expedienteAux = item.idExpediente
            ? this.expediente.find(
                (expediente) => expediente.idExpediente === item.idExpediente
              ).archivo
            : null
          return {
            idPosgrado: item.idPosgrado,
            nombre_posgrado: item.nombre_posgrado,
            edicion: item.edicion,
            fecha_inicio_edicion: item.fecha_inicio_edicion,
            fecha_culminacion_edicion: item.fecha_culminacion_edicion,
            reconocimiento: item.reconocimiento,
            matricula_inicial_edicion: item.matricula_inicial_edicion,
            matricula_final_edicion: item.matricula_final_edicion,
            convenio: item.convenio,
            categoria_cientifica: item.categoria_cientifica,
            tipo_posgrado: item.tipo_posgrado,
            programa: item.programa,
            encuesta_satisfaccion: item.encuesta_satisfaccion,
            encuesta_satisfaccion_url: `${this.$axios.defaults.baseURL}/download/posgrado/${item.idPosgrado}/encuesta_satisfaccion/`,
            programa_url: `${this.$axios.defaults.baseURL}/download/posgrado/${item.idPosgrado}/programa/`,

            idExpediente: expedienteAux,
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
        case 'encuesta_satisfaccion':
          this.downloadFile(
            item.encuesta_satisfaccion_url,
            item.encuesta_satisfaccion
          )
          break
        default:
          this.downloadFile(item.programa_url, item.programa)
      }
    },
    async getExpediente() {
      try {
        const response = await this.$axios.$get('/api/expediente')
        this.expediente = response.map((item) => ({
          idExpediente: item.idExpediente,
          archivo: item.archivo,
        }))
      } catch (error) {
        console.error(error)
      }
    },
    async getExpedienteSinPosgrado() {
      try {
        const response = await this.$axios.$get('/api/expedientes_sin_posgrado')
        this.expedientes_sin_posgrado = response.map((item) => ({
          idExpediente: item.idExpediente,
          archivo: item.archivo,
        }))
      } catch (error) {
        console.error(error)
      }
    },

    editItem(item) {
      this.editedIndex = this.posgrado.indexOf(item)
      this.editedItem = Object.assign({}, item)
      const expedienteAux = this.expediente.find(
        (expediente) => this.editedItem.idExpediente === expediente.archivo
      )
      this.editedItem.idExpediente = expedienteAux
      this.editedItem.programa = null
      this.editedItem.encuesta_satisfaccion = null
      this.dialog = true
    },
    showItem(item) {
      this.editedIndex = this.posgrado.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
      this.desabilitado = true
    },

    deleteItem(item) {
      this.editedIndex = this.posgrado.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      const idPosgrado = this.posgrado[this.editedIndex].idPosgrado

      try {
        await this.$axios.$delete(`/api/posgrado/${idPosgrado}`)
        await this.initialize()
        this.closeDelete()
      } catch (error) {
        console.error(error)
      }
      this.getExpedienteSinPosgrado();
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

      const { editedItem, editedIndex, posgrado } = this
      const url = '/api/posgrado/'
      const id = editedIndex >= 0 ? posgrado[editedIndex].idPosgrado + '/' : ''
      const formData = new FormData()
      formData.append('nombre_posgrado', editedItem.nombre_posgrado)
      formData.append('edicion', editedItem.edicion)
      formData.append('fecha_inicio_edicion', editedItem.fecha_inicio_edicion)
      if (editedItem.programa !== null) {
        formData.append('programa', editedItem.programa)
      }
      formData.append(
        'fecha_culminacion_edicion',
        editedItem.fecha_culminacion_edicion
      )
      formData.append('reconocimiento', editedItem.reconocimiento)
      formData.append(
        'matricula_inicial_edicion',
        editedItem.matricula_inicial_edicion
      )
      formData.append(
        'matricula_final_edicion',
        editedItem.matricula_final_edicion
      )
      formData.append('convenio', editedItem.convenio)
      formData.append('categoria_cientifica', editedItem.categoria_cientifica)
      formData.append('tipo_posgrado', editedItem.tipo_posgrado)
      if (editedItem.encuesta_satisfaccion !== null) {
        formData.append(
          'encuesta_satisfaccion',
          editedItem.encuesta_satisfaccion
        )
      }
      console.log('editedItem.idExpediente', editedItem.idExpediente)
      if (editedItem.idExpediente !== undefined) {
        formData.append(
          'idExpediente',
          editedItem.idExpediente
            ? editedItem.idExpediente.idExpediente || editedItem.idExpediente
            : null
        )
      }
      try {
        if (editedIndex > -1) {
          await this.$axios.$put(`${url}${id}`, formData)
        } else await this.$axios.$post(url, formData)
      } catch (error) {
        console.error(error)
      }

      this.posgrado = []
      await this.getExpedienteSinPosgrado()
      await this.initialize()
      this.close()
    },
  },
}
</script>
