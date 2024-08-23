<template>
  <v-container mt-5>
    <v-data-table
      :headers="headers"
      :items="laboratorio"
      sort-by="search"
      class="elevation-1 px-4"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title style="color: #01579b">Laboratorio</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
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
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-form ref="form" lazy-validation>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.numero"
                          label="Número"
                          :rules="numeroRules"
                          maxlength="3"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          :items="carrera"
                          v-model="editedItem.idCarrera"
                          label="Carrera"
                          class="d-flex"
                          item-value="idCarrera"
                          :item-text="(item) => item.nombre_carrera"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.total_pc"
                          label="Total PC"
                          :rules="numberRules"
                          maxlength="3"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-file-input
                          accept=".pdf,.xlsx,.docx"
                          small-chips
                          truncate-length="15"
                          v-model="editedItem.disp_tecnica"
                          label="Disp. técnica"
                          class="d-flex"
                        ></v-file-input>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-container>
              </v-card-text>

              <v-card-actions>
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
      <template v-slot:item.disp_tecnica="{ item }">
        <a
          :href="item.disp_tecnica_url"
          target="_blank"
          @click.prevent="downloadFile(item)"
          >{{ item.disp_tecnica }}</a
        >
      </template>
      <template v-slot:item.actions="{ item }">
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
      title: 'Laboratorios',
    }
  },
  data: () => ({
    textRules: [
      (v) => !!v || 'Campo requerido',
      (v) =>
        (!v || /^[A-ZÁÉÍÓÚÑa-záéíóúñ ]+$/.test(v)) ||
        'El campo es sólo letras y debe comenzar con mayúsculas',
    ],
    numberRules: [
      (v) => !!v || 'Campo requerido',
      (v) => (!v || /^[0-9 -]+$/.test(v)) || 'El campo es sólo números',
    ],
    search: '',
    dialog: false,
    dialogDelete: false,
    // eslint-disable-next-line no-sparse-arrays
    headers: [
      {
        text: 'Número',
        align: 'start',
        sortable: true,
        value: 'numero',
      },
      { text: 'Carrera', value: 'idCarrera' },
      { text: 'Total PC', value: 'total_pc' },
      { text: 'Disp. técnica', value: 'disp_tecnica' },

      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    laboratorio: [],
    carrera: {},

    editedIndex: -1,
    editedItem: {
      numero: null,
      total_pc: null,
      idCarrera: null,
      disp_tecnica: null,
    },
    defaultItem: {
      numero: null,
      total_pc: null,
      idCarrera: null,
      disp_tecnica: null,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Laboratorios' : 'Laboratorios'
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
    await this.getCarrera()
    this.initialize()
  },

  methods: {
    async initialize() {
      try {
        const laboratorioUrl = await this.$axios.$get(
          '/api/laboratorio'
        )
        this.laboratorio = laboratorioUrl.map((item) => {
          const carreraAux = item.idCarrera
            ? this.carrera.find(
                (carrera) => carrera.idCarrera === item.idCarrera
              ).nombre_carrera
            : null
          return {
            idLaboratorio: item.idLaboratorio,
            numero: item.numero,
            total_pc: item.total_pc,
            idCarrera: carreraAux,
            disp_tecnica: item.disp_tecnica,
            disp_tecnica_url: `${this.$axios.defaults.baseURL}/download/laboratorio/${item.idLaboratorio}/disp_tecnica/`,
          }
        })
      } catch (error) {
        console.error(error)
      }
    },
    downloadFile(item) {
      fetch(item.disp_tecnica_url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `El archivo "${item.disp_tecnica}" no se pudo encontrar`
            )
          }
          return response.blob()
        })
        .then((blob) => {
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = item.disp_tecnica
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
        })
        .catch((error) => {
          alert(error.message)
        })
    },
    async getCarrera() {
      try {
        const response = await this.$axios.$get('/api/carrera')
        this.carrera = response.map((item) => ({
          idCarrera: item.idCarrera,
          nombre_carrera: item.nombre_carrera,
        }))
      } catch (error) {
        console.error(error)
      }
    },

    editItem(item) {
      this.editedIndex = this.laboratorio.indexOf(item)
      this.editedItem = Object.assign({}, item)
      const carreraAux = this.carrera.find(
        (carrera) => this.editedItem.idCarrera === carrera.nombre_carrera
      )
      this.editedItem.idCarrera = carreraAux
      this.editedItem.disp_tecnica = null
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.laboratorio.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      const idLaboratorio = this.laboratorio[this.editedIndex].idLaboratorio

      try {
        await this.$axios.$delete(`/api/laboratorio/${idLaboratorio}`)
        await this.initialize()
        this.closeDelete()
      } catch (error) {
        console.error(error)
      }
    },

    close() {
      this.dialog = false
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

      const { editedItem, editedIndex, laboratorio } = this
      const url = '/api/laboratorio/'
      const id =
        editedIndex >= 0
          ? laboratorio[editedIndex].idLaboratorio + '/'
          : ''
      const formData = new FormData()
      formData.append('numero', editedItem.numero)
      formData.append('idCarrera', editedItem.idCarrera
          ? editedItem.idCarrera.idCarrera || editedItem.idCarrera
          : null)
      formData.append('total_pc', editedItem.total_pc)
      if (editedItem.disp_tecnica !== null) {
        formData.append('disp_tecnica', editedItem.disp_tecnica)
      }

      try {
        if (editedIndex > -1) {
          await this.$axios.$put(`${url}${id}`, formData)
        } else await this.$axios.$post(url, formData)
      } catch (error) {
        console.error(error)
      }

      this.alumno_ayudante = []
      await this.initialize()
      this.close()
    },
  },
}
</script>
