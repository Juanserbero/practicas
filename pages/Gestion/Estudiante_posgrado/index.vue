<template>
  <v-container mt-5>
    <v-data-table
      :headers="headers"
      :items="estudiante_posgrado"
      sort-by="search"
      class="elevation-1 px-4"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title style="color: #01579b"
            >Estudiantes de posgrado</v-toolbar-title
          >
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
                          v-model="editedItem.nombre_estudiante_posgrado"
                          label="Nombre"
                          :rules="textRules"
                          maxlength="20"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.apellido"
                          label="Apellidos"
                          :rules="textRules"
                          maxlength="20"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.carnet_identidad"
                          label="Carnet de identidad"
                          :rules="numberRules"
                          maxlength="11"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          :items="boolean"
                          v-model="editedItem.disponibilidad_tecnologica"
                          label="Disp. Tecnológica"
                          class="d-flex"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          :items="boolean"
                          v-model="editedItem.estudiante_egresado"
                          label="Estudiante egresado"
                          class="d-flex"
                        ></v-select>
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
      title: 'Estudiantes de posgrado',
    }
  },
  data: () => ({
    boolean: ['Si', 'No'],
    agnos: ['1', '2', '3', '4', '5'],

    textRules: [
      (v) => !!v || 'Campo requerido',
      (v) =>
        (!v || /^[A-ZÁÉÍÓÚÑa-záéíóúñ ]+$/.test(v)) || 'El campo es sólo letras',
    ],
    numeroRules: [
      (v) => !!v || 'Campo requerido',
      (v) => (!v || /^[0-9 -]+$/.test(v)) || 'El campo es sólo números',
    ],
    search: '',
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: 'Nombre', value: 'nombre_estudiante_posgrado' },
      { text: 'Apellidos', value: 'apellido' },
      { text: 'Carnet de identidad', value: 'carnet_identidad' },
      { text: 'Disp. tecnológica', value: 'disponibilidad_tecnologica' },
      { text: 'Estudiante egresado', value: 'estudiante_egresado' },

      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    estudiante_posgrado: [],
    carrera: {},

    editedIndex: -1,
    editedItem: {
      nombre_estudiante_posgrado: null,
      apellido: null,
      carnet_identidad: null,
      disponibilidad_tecnologica: null,
      estudiante_egresado: null,
    },
    defaultItem: {
      nombre_estudiante_posgrado: null,
      apellido: null,
      carnet_identidad: null,
      disponibilidad_tecnologica: null,
      estudiante_egresado: null,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? 'Estudiantes de posgrado'
        : 'Estudiantes de posgrado'
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
        const estudiante_posgradoUrl = await this.$axios.$get(
          '/api/estudiante_posgrado'
        )
        this.estudiante_posgrado = estudiante_posgradoUrl.map((item) => {
          return {
            idEstudiante_posgrado: item.idEstudiante_posgrado,
            nombre_estudiante_posgrado: item.nombre_estudiante_posgrado,
            apellido: item.apellido,
            carnet_identidad: item.carnet_identidad,
            disponibilidad_tecnologica: item.disponibilidad_tecnologica,
            estudiante_egresado: item.estudiante_egresado,
          }
        })
      } catch (error) {
        console.error(error)
      }
    },

    editItem(item) {
      this.editedIndex = this.estudiante_posgrado.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.estudiante_posgrado.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      const idEstudiante_posgrado =
        this.estudiante_posgrado[this.editedIndex].idEstudiante_posgrado

      try {
        await this.$axios.$delete(
          `/api/estudiante_posgrado/${idEstudiante_posgrado}`
        )
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
      let { editedItem, editedIndex, estudiante_posgrado } = this
      const url = '/api/estudiante_posgrado/'
      const id = editedIndex >= 0 ? estudiante_posgrado[editedIndex].idEstudiante_posgrado : ''
      const requestData = {
        nombre_estudiante_posgrado: editedItem.nombre_estudiante_posgrado,
        apellido: editedItem.apellido,
        carnet_identidad: editedItem.carnet_identidad,
        disponibilidad_tecnologica: editedItem.disponibilidad_tecnologica,
        estudiante_egresado: editedItem.estudiante_egresado,
      }
      try {
        if (editedIndex > -1) {
          await this.$axios.$put(`${url}${id}/`, requestData)
        } else await this.$axios.$post(url, requestData)
      } catch (error) {
        console.error(error)
      }
      estudiante_posgrado = []
      await this.initialize()
      this.close()
    },
  },
}
</script>
