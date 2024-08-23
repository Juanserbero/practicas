<template>
  <v-container mt-5>
    <v-data-table
      :headers="headers"
      :items="expediente"
      sort-by="search"
      class="elevation-1 px-4"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title style="color: #01579b">Expedientes</v-toolbar-title>
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
                  <v-form
                    ref="form"
                    enctype="multipart/form-data"
                    lazy-validation
                  >
                    <v-row>
                      <v-col cols="12" sm="6" md="5">
                        <v-file-input
                          accept=".pdf,.xlsx,.docx"
                          small-chips
                          truncate-length="15"
                          v-model="editedItem.archivo"
                          label="Archivos"
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
      <template v-slot:item.archivo="{ item }">
        <a
          :href="item.archivo_url"
          target="_blank"
          @click.prevent="downloadFile(item)"
          >{{ item.archivo }}</a
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
      title: 'Expediente',
    }
  },
  data: () => ({
    textRules: [
      (v) => !!v || 'Campo requerido',
      (v) =>
        (!v || /^[A-ZÁÉÍÓÚÑa-záéíóúñ ]+$/.test(v)) ||
        'El campo es sólo letras y debe comenzar con mayúsculas',
    ],
    search: '',
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Expediente',
        align: 'start',
        sortable: true,
        value: 'archivo',
      },

      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    expediente: [],

    editedIndex: -1,
    editedItem: {
      archivo: null,
    },
    defaultItem: {
      archivo: null,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Expediente' : 'Expediente'
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

  created() {
    this.initialize()
  },

  methods: {
    async initialize() {
      try {
        const response = await this.$axios.$get('/api/expediente')
        this.expediente = response.map((item) => {
          return {
            idExpediente: item.idExpediente,
            archivo: item.archivo,
            archivo_url: `${this.$axios.defaults.baseURL}/download/expediente/${item.idExpediente}/archivo/`,
          }
        })
      } catch (error) {
        console.error(error)
      }
    },
    downloadFile(item) {
      fetch(item.archivo_url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`El archivo "${item.archivo}" no se pudo encontrar`)
          }
          return response.blob()
        })
        .then((blob) => {
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = item.archivo
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
        })
        .catch((error) => {
          alert(error.message)
        })
    },

    editItem(item) {
      this.editedIndex = this.expediente.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editedItem.archivo = null
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.expediente.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      const idExpediente = this.expediente[this.editedIndex].idExpediente

      try {
        await this.$axios.$delete(`/api/expediente/${idExpediente}`)
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

      const { editedItem, editedIndex, expediente } = this
      const url = '/api/expediente/'
      const id =
        editedIndex >= 0 ? expediente[editedIndex].idExpediente + '/' : ''
      const formData = new FormData()

      if (this.editedItem.archivo !== null) {
        formData.append('archivo', editedItem.archivo)
      }

      try {
        if (editedIndex > -1) {
          await this.$axios.$put(`${url}${id}`, formData)
        } else await this.$axios.$post(url, formData)
      } catch (error) {
        console.error(error)
      }

      this.expediente = []
      await this.initialize()
      this.close()
    },
  },
}
</script>
