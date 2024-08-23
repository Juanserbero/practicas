<template>
  <v-container mt-5>
    <v-data-table
      :headers="headers"
      :items="datos_promocion"
      sort-by="search"
      class="elevation-1 px-4"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title style="color: #01579b"
            >Datos promoción</v-toolbar-title
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
                        <v-select
                          :items="agnos"
                          v-model="editedItem.agno_academico"
                          label="Año académico"
                          class="d-flex"
                        ></v-select>
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.curso"
                          label="Curso escolar"
                          :rules="numberRules"
                          maxlength="10"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.matricula_inicial"
                          label="Matrícula inicial"
                          :rules="numberRules"
                          maxlength="3"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.cant_aprobados"
                          label="Cant. aprobados"
                          :rules="numberRules"
                          maxlength="3"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.promocion"
                          label="Promoción (%)"
                          :rules="numberRules"
                          maxlength="10"
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
      title: 'Datos promoción',
    }
  },
  data: () => ({
    agnos: ['1', '2', '3', '4', '5'],

    numberRules: [
      (v) => !!v || 'Campo requerido',
      (v) => (!v || /^[0-9 -]+$/.test(v)) || 'El campo es sólo números',
    ],
    search: '',
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: 'Carrera', value: 'idCarrera' },
      { text: 'Año académico', value: 'agno_academico' },
      { text: 'Curso', value: 'curso' },
      { text: 'Matrícula inicial', value: 'matricula_inicial' },
      { text: 'Cant. aprobados', value: 'cant_aprobados' },
      { text: 'Promoción (%)', value: 'promocion' },

      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    datos_promocion: [],
    carrera: {},

    editedIndex: -1,
    editedItem: {
      agno_academico: null,
      curso: null,
      idCarrera: null,
      matricula_inicial: null,
      cant_aprobados: null,
      promocion: null,
    },
    defaultItem: {
      agno_academico: null,
      curso: null,
      idCarrera: null,
      matricula_inicial: null,
      cant_aprobados: null,
      promocion: null,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Datos promoción' : 'Datos promoción'
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
        const datos_promocionUrl = await this.$axios.$get(
          '/api/datos_promocion'
        )
        this.datos_promocion = datos_promocionUrl.map((item) => {
          const carreraAux = item.idCarrera
            ? this.carrera.find(
                (carrera) => carrera.idCarrera === item.idCarrera
              ).nombre_carrera
            : null
          return {
            idDatos_promocion: item.idDatos_promocion,
            agno_academico: item.agno_academico,
            curso: item.curso,
            idCarrera: carreraAux,
            matricula_inicial: item.matricula_inicial,
            cant_aprobados: item.cant_aprobados,
            promocion: item.promocion,
          }
        })
      } catch (error) {
        console.error(error)
      }
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
      this.editedIndex = this.datos_promocion.indexOf(item)
      this.editedItem = Object.assign({}, item)
      const carreraAux = this.carrera.find(
        (carrera) => this.editedItem.idCarrera === carrera.nombre_carrera
      )
      this.editedItem.idCarrera = carreraAux

      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.datos_promocion.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      const idDatos_promocion = this.datos_promocion[this.editedIndex].idDatos_promocion

      try {
        await this.$axios.$delete(`/api/datos_promocion/${idDatos_promocion}`)
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
      let { editedItem, editedIndex, datos_promocion } = this
      const url = '/api/datos_promocion/'
      const id =
        editedIndex >= 0 ? datos_promocion[editedIndex].idDatos_promocion : ''
      const requestData = {
        agno_academico: editedItem.agno_academico,
        curso: editedItem.curso,
        matricula_inicial: editedItem.matricula_inicial,
        cant_aprobados: editedItem.cant_aprobados,
        promocion: editedItem.promocion,
        idCarrera: editedItem.idCarrera
          ? editedItem.idCarrera.idCarrera || editedItem.idCarrera
          : null,
      }
      try {
        if (editedIndex > -1) {
          await this.$axios.$put(`${url}${id}/`, requestData)
        } else await this.$axios.$post(url, requestData)
      } catch (error) {
        console.error(error)
      }
      datos_promocion = []
      await this.initialize()
      this.close()
    },
  },
}
</script>
