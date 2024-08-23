<template>
  <v-container mt-5>
    <v-data-table
      :headers="headers"
      :items="estudiante"
      sort-by="search"
      class="elevation-1 px-4"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title style="color: #01579b">Estudiantes</v-toolbar-title>
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
                  <v-form ref="form" lazy-validation>
                    <v-row>
                      <!-------------------------------------------------- nombre de estudiante ---------------------------------------------------->
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                        v-if="desabilitado == false"
                      >
                        <v-text-field
                          v-model="editedItem.nombre_estudiante"
                          label="Nombre"
                          :rules="textRules"
                          maxlength="20"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4" v-else>
                        <v-card-title style="font-size: 16px">
                          Nombre
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.nombre_estudiante }}
                        </v-card-subtitle>
                      </v-col>
                      <!-------------------------------------------------- apellido ---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                        v-if="desabilitado == false"
                      >
                        <v-text-field
                          v-model="editedItem.apellido"
                          label="Apellidos"
                          :rules="textRules"
                          maxlength="25"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4" v-else>
                        <v-card-title style="font-size: 16px">
                          Apellidos
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.apellido }}
                        </v-card-subtitle>
                      </v-col>
                      <!-------------------------------------------------- Año académico ---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                        v-if="desabilitado == false"
                      >
                        <v-select
                          :items="items3"
                          v-model="editedItem.agno_academico"
                          label="Año académico"
                          class="d-flex"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="4" v-else>
                        <v-card-title style="font-size: 16px">
                          Año Académico
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.agno_academico }}
                        </v-card-subtitle>
                      </v-col>
                      <!-------------------------------------------------- Disp. Tecnológica ---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                        v-if="desabilitado == false"
                      >
                        <v-select
                          :items="items2"
                          v-model="editedItem.disponibilidad_tecnologica"
                          label="Disp. Tecnológica"
                          class="d-flex"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="4" v-else>
                        <v-card-title style="font-size: 16px">
                          Disp. Tecnológica
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.disponibilidad_tecnologica }}
                        </v-card-subtitle>
                      </v-col>
                      <!-------------------------------------------------- Acceso Wifi ---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                        v-if="desabilitado == false"
                      >
                        <v-select
                          :items="items2"
                          v-model="editedItem.acceso_wifi"
                          label="Acceso Wifi"
                          class="d-flex"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="4" v-else>
                        <v-card-title style="font-size: 16px">
                          Acceso Wifi
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.acceso_wifi }}
                        </v-card-subtitle>
                      </v-col>
                      <!-------------------------------------------------- Becado ---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                        v-if="desabilitado == false"
                      >
                        <v-select
                          :items="items2"
                          v-model="editedItem.becado"
                          label="Becado"
                          class="d-flex"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="4" v-else>
                        <v-card-title style="font-size: 16px">
                          Becado
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.becado }}
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
      title: 'Estudiantes',
    }
  },
  data: () => ({
    items2: ['Si', 'No'],
    items3: ['1', '2', '3', '4', '5'],
    textRules: [
      (v) => !!v || 'Campo requerido',
      (v) =>
        (!v || /^[A-ZÁÉÍÓÚÑa-záéíóúñ ]+$/.test(v)) ||
        'El campo es sólo letras y debe comenzar con mayúsculas',
    ],
    numberRules: [
      (v) => !!v || 'Campo requerido',
      (v) => (!v || /^[0-9 -]+$/.test(v)) || 'El campo es sólo números',
      (v) => (v && v.length == 11) || 'El campo requiere de 11 caracteres',
    ],

    search: '',
    dialog: false,
    desabilitado: false,
    dialogDelete: false,
    // eslint-disable-next-line no-sparse-arrays
    headers: [
      {
        text: 'Nombre',
        align: 'start',
        sortable: true,
        value: 'nombre_estudiante',
      },
      { text: 'Apellidos', value: 'apellido' },
      { text: 'Año académico', align: 'center', value: 'agno_academico' },
      {
        text: 'Disponibilidad tecnológica',
        align: 'center',
        value: 'disponibilidad_tecnologica',
      },

      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    estudiante: [],
    editedIndex: -1,
    editedItem: {
      nombre_estudiante: null,
      apellido: null,
      agno_academico: null,
      disponibilidad_tecnologica: null,
      acceso_wifi: null,
      becado: null,
    },
    defaultItem: {
      nombre_estudiante: null,
      apellido: null,
      agno_academico: null,
      disponibilidad_tecnologica: null,
      acceso_wifi: null,
      becado: null,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Estudiantes' : 'Estudiantes'
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
        const estudianteUrl = await this.$axios.$get('/api/estudiante')
        this.estudiante = estudianteUrl.map((item) => {
          return {
            idEstudiante: item.idEstudiante,
            nombre_estudiante: item.nombre_estudiante,
            apellido: item.apellido,
            agno_academico: item.agno_academico,
            acceso_wifi: item.acceso_wifi,
            becado: item.becado,
            disponibilidad_tecnologica: item.disponibilidad_tecnologica,
          }
        })
      } catch (error) {
        console.error(error)
      }
    },

    editItem(item) {
      this.editedIndex = this.estudiante.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    showItem(item) {
      this.editedIndex = this.estudiante.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
      this.desabilitado = true
    },

    deleteItem(item) {
      this.editedIndex = this.estudiante.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      const idEstudiante = this.estudiante[this.editedIndex].idEstudiante

      try {
        await this.$axios.$delete(`/api/estudiante/${idEstudiante}`)
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
      let { editedItem, editedIndex, estudiante } = this
      const url = '/api/estudiante/'
      const id = editedIndex >= 0 ? estudiante[editedIndex].idEstudiante : ''
      const requestData = {
        nombre_estudiante: editedItem.nombre_estudiante,
        apellido: editedItem.apellido,
        agno_academico: editedItem.agno_academico, 
        acceso_wifi: editedItem.acceso_wifi,
        becado: editedItem.becado,
        disponibilidad_tecnologica: editedItem.disponibilidad_tecnologica,
      }
      try {
        if (editedIndex > -1) {
          await this.$axios.$put(`${url}${id}/`, requestData)
        } else await this.$axios.$post(url, requestData)
      } catch (error) {
        console.error(error)
      }
      estudiante = []
      await this.initialize()
      this.close()
    },
  },
}
</script>
