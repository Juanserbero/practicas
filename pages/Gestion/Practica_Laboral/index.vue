<template>
  <v-container mt-5>
    <v-data-table
      :headers="headers"
      :items="practica_laboral"
      sort-by="search"
      class="elevation-1 px-4"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title style="color: #01579b"
            >Prácticas laborales</v-toolbar-title
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
                  <v-form ref="form" lazy-validation>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          :items="agnos"
                          v-model="editedItem.agnos"
                          label="Año"
                          class="d-flex"
                          :rules="[(v) => !!v || 'Campo requerido']"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.objetivo"
                          label="Objetivo"
                          :rules="textRules"
                          maxlength="30"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.tema_practica_laboral"
                          label="Tema de las prácticas"
                          :rules="textRules"
                          maxlength="30"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          :items="nota"
                          v-model="editedItem.nota"
                          label="nota"
                          class="d-flex"
                        ></v-select>
                      </v-col>
                      <!-------------------------------------------------- Estudiantes---------------------------------------------------->

                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          :items="Object.values(estudiante)"
                          v-model="editedItem.idEstudiante"
                          label="Estudiante"
                          class="d-flex"
                          :rules="[(v) => !!v || 'Campo requerido']"
                          multiple
                        >
                          <template v-slot:selection="{ item, index }">
                            <div v-if="index === 0">
                              <span>{{ item }}</span>
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
      title: 'Práctica laboral',
    }
  },
  data: () => ({
    nota: ['2', '3', '4', '5'],

    agnos: ['1', '2', '3', '4', '5'],
    textRules: [
      (v) => !!v || 'Campo requerido',
      (v) =>
        (!v || /^[A-ZÁÉÍÓÚÑa-záéíóúñ ]+$/.test(v)) || 'El campo es sólo letras ',
    ],
    search: '',
    dialog: false,
    dialogDelete: false,
    // eslint-disable-next-line no-sparse-arrays
    headers: [
      {
        text: 'Años',
        align: 'start',
        sortable: true,
        value: 'agnos',
      },
      { text: 'Objetivo', value: 'objetivo' },
      { text: 'Tema de las prácticas', value: 'tema_practica_laboral' },
      { text: 'Estudiantes', value: 'estudiante' },

      { text: 'Acciones', value: 'actions', sortable: false },

      ,
    ],
    practica_laboral: [],
    estudiante: {},

    editedIndex: -1,
    editedItem: {
      agnos: null,
      objetivo: null,
      tema_practica_laboral: null,
      idEstudiante: null,
      nota: null,
    },
    defaultItem: {
      agnos: null,
      objetivo: null,
      tema_practica_laboral: null,
      idEstudiante: null,
      nota: null,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? 'Prácticas laborales'
        : 'Prácticas laborales'
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
    await this.getEstudiante()
    this.initialize()
  },

  methods: {
    async initialize() {
      // eslint-disable-next-line no-unused-vars
      await axios
        .get('http://localhost:8000/api/practica_laboral')
        .then((response) => {
          console.log(response)
          response.data.forEach((item) => {
            this.practica_laboral.push({
              idAsignatura: item.idAsignatura,
              agnos: item.agnos,
              objetivo: item.objetivo,
              tema_practica_laboral: item.tema_practica_laboral,
              nota: item.nota,
              idEstudiante: this.estudiante[item.idEstudiante],
            })
          })
        })
        .catch((error) => {
          console.error(error)
        })
    },
    async getEstudiante() {
      await axios
        .get('http://localhost:8000/api/estudiante')
        .then((response) => {
          response.data.forEach((item) => {
            this.estudiante[item.idEstudiante] = item.nombre_estudiante
          })
        })
        .catch((error) => {
          console.error(error)
        })
    },

    editItem(item) {
      this.editedIndex = this.practica_laboral.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.practica_laboral.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      await axios
        .delete(
          'http://localhost:8000/api/practica_laboral/' +
            this.practica_laboral[this.editedIndex].idAsignatura
        )
        .then((response) => console.log(response))
        .catch((error) => console.log('Error: ' + error))
      this.practica_laboral = []
      await this.initialize()
      this.closeDelete()
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
      if (this.$refs.form.validate()) {
        let estId = ''
        Object.keys(this.estudiante).forEach((item) => {
          if (this.estudiante[item] == this.editedItem.idEstudiante) {
            estId = item
          }
        })
        if (this.editedIndex > -1) {
          await axios
            .put(
              'http://localhost:8000/api/practica_laboral/' +
                this.practica_laboral[this.editedIndex].idAsignatura +
                '/',
              {
                agnos: this.editedItem.agnos,
                objetivo: this.editedItem.objetivo,
                tema_practica_laboral: this.editedItem.tema_practica_laboral,
                nota: this.editedItem.nota,
                idEstudiante: estId,
              }
            )
            .then((response) => {
              console.log(response)
            })
            .catch((error) => {
              console.error(error)
            })
        } else {
          await axios
            .post('http://localhost:8000/api/practica_laboral/', {
              agnos: this.editedItem.agnos,
              objetivo: this.editedItem.objetivo,
              tema_practica_laboral: this.editedItem.tema_practica_laboral,
              nota: this.editedItem.nota,
              idEstudiante: estId,
            })
            .then((response) => {
              console.log(response)
            })
            .catch((error) => {
              console.error(error)
            })
        }
        this.practica_laboral = []
        await this.initialize()
        this.close()
      }
    },
  },
}
</script>
