<template>
  <v-container mt-5>
    <v-data-table
      :headers="headers"
      :items="departamento"
      sort-by="search"
      class="elevation-1 px-4"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title style="color: #01579b"
            >Departamentos</v-toolbar-title
          >
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="600px">
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
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.nombre_departamento"
                          label="Nombre"
                          :rules="nombreRules"
                          maxlength="20"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.facultad"
                          label="Facultad"
                          :rules="nombreRules"
                          maxlength="20"
                          required
                        ></v-text-field>
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
      title: 'Departamentos',
    }
  },
  data: () => ({
    // plan_trabajo_metodologico: ["inf", "pedagogia", "cultura fisica"],
    nombreRules: [
      (v) => !!v || 'Campo requerido',
      (v) =>
        (v && /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/.test(v)) || 'El campo es sólo letras',
    ],
    search: '',
    dialog: false,
    dialogDelete: false,
    // eslint-disable-next-line no-sparse-arrays
    headers: [
      {
        text: 'Nombre',
        align: 'start',
        sortable: true,
        value: 'nombre_departamento',
      },
      { text: 'Facultad', value: 'facultad' },

      { text: 'Acciones', value: 'actions', sortable: false },
    ],

    departamento: [],

    editedIndex: -1,
    editedItem: {
      nombre_departamento: null,
      facultad: null,
    },
    defaultItem: {
      nombre_departamento: null,
      facultad: null,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Departamentos' : 'Departamentos'
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
        const response = await this.$axios.$get('/api/departamento')
        this.departamento = response.map((item) => {
          return {
            idDepartamento: item.idDepartamento,
            nombre_departamento: item.nombre_departamento,
            facultad: item.facultad,
          }
        })
      } catch (error) {
        console.error(error)
      }
    },
    editItem(item) {
      this.editedIndex = this.departamento.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.departamento.indexOf(item)
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

      const { editedItem, editedIndex, departamento } = this
      const url = '/api/departamento/'
      const id =
        editedIndex >= 0 ? departamento[editedIndex].idDepartamento + '/' : ''
      const formData = new FormData()

      formData.append('nombre_departamento', editedItem.nombre_departamento)
      formData.append('facultad', editedItem.facultad)
      try {
        if (editedIndex > -1) {
          await this.$axios.$put(`${url}${id}`, formData)
        } else await this.$axios.$post(url, formData)
      } catch (error) {
        console.error(error)
      }

      this.departamento = []
      await this.initialize()
      this.close()
    },
  },
}
</script>
