<template>
  <v-container mt-5>
    <v-data-table
      :headers="headers"
      :items="premio"
      sort-by="search"
      class="elevation-1 px-4"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title style="color: #01579b">Premios y Reconcimientos</v-toolbar-title>
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
                <v-spacer></v-spacer>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-form ref="form" lazy-validation>
                    <v-row style="padding: 0px">
                      <!-------------------------------------------------- nombre de premio ---------------------------------------------------->
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.nombre_premio"
                          label="Nombre"
                          :rules="textRules"
                          maxlength="20"
                          required
                        ></v-text-field>
                      </v-col>
                      <!-------------------------------------------------- tipo de premio ---------------------------------------------------->
                      <v-col cols="12" sm="6" md="4">
                        <v-select
                        :items="tipo_premio"
                          v-model="editedItem.tipo_premio"
                          label="Tipo premio"
                          :rules="textRules"
                          maxlength="15"
                          required
                        ></v-select>
                      </v-col>

                      <!-------------------------------------------------- Profesor---------------------------------------------------->
                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          :items="profesor"
                          v-model="editedItem.idTrabajador"
                          label="Profesor"
                          class="d-flex"
                          multiple
                          item-value="idTrabajador"
                          :item-text="
                            (item) =>
                              `${item.nombre_trabajador} ${item.apellido}`
                          "
                        >
                          <template v-slot:selection="{ item, index }">
                            <div v-if="index === 0">
                              <span
                                >{{ item.nombre_trabajador }}
                                {{ item.apellido }}</span
                              >
                            </div>
                            <span
                              v-if="index === 1"
                              class="grey--text text-caption"
                            >
                              &nbsp;&nbsp;(+{{
                                editedItem.idTrabajador.length - 1
                              }})
                            </span>
                          </template>
                        </v-select>
                      </v-col>

                      <!-------------------------------------------------- Estudiante---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
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
                                >{{ item.nombre_estudiante
                                }}{{ item.apellido }}</span
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
      title: 'Premios y Reconocimientos',
    }
  },
  data: () => ({
    textRules: [
      /*      (v) => !!v || "Campo requerido",*/
      (v) =>
        (!v || /^[A-ZÁÉÍÓÚÑa-záéíóúñ ]+$/.test(v)) || 'El campo es sólo letras',
    ],
    numberRules: [
      /*      (v) => !!v || "Campo requerido",*/
      (v) => (!v || /^[0-9 -]+$/.test(v)) || 'El campo es sólo números',
    ],
    tipo_premio:['Premios','Reconocimientos'],
    search: '',
    dialog: false,
    dialogDelete: false,
    // eslint-disable-next-line no-sparse-arrays
    headers: [
      {
        text: 'Tipo premio',
        align: 'start',
        sortable: true,
        value: 'tipo_premio',
      },
      { text: 'Nombre', value: 'nombre_premio' },
      { text: 'Profesor', value: 'idTrabajador' },
      { text: 'Estudiante', value: 'idEstudiante' },

      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    premio: [],
    profesor: [],
    estudiante: {},

    editedIndex: -1,
    editedItem: {
      tipo_premio: null,

      idTrabajador: null,
      idEstudiante: null,
    },
    defaultItem: {
      tipo_premio: null,

      idTrabajador: null,
      idEstudiante: null,
    },
  }),

  computed: {
    formTitle() {
      return  'Premios y Reconocimientos'
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
    await Promise.all([this.getTrabajador(), this.getEstudiante()])
    await this.initialize()
  },

  methods: {
   async initialize() {
  try {
    const premioUrl = await this.$axios.$get('/api/premio')
    this.premio = premioUrl.map((item) => {
      const estAux = item.idEstudiante?.map((id) =>
        this.estudiante.find((estudiante) => estudiante.idEstudiante === id)
      ).filter((estudiante) => estudiante !== undefined)
      const trabAux = item.idProfesor?.map((id) =>
        this.profesor.find((trabajador) => trabajador.idTrabajador == id)
      ).filter((trabajador) => trabajador != undefined)
      return {
        idPremio: item.idPremio,
        tipo_premio: item.tipo_premio,
        nombre_premio: item.nombre_premio,
        clasificacion_ponencia: item.clasificacion_ponencia,
        agno: item.agno,
        titulo_trabajo: item.titulo_trabajo,
        autores: item.autores,
        tipo_premio: item.tipo_premio,
        lugar_premio: item.lugar_premio,

        idTrabajador: trabAux?.map(
          (trabajador) =>
            `${trabajador.nombre_trabajador} ${trabajador.apellido}`
        ),
        idEstudiante: estAux?.map(
          (estudiante) =>
            `${estudiante.nombre_estudiante} ${estudiante.apellido}`
        ),
      }
    })
  } catch (error) {
    console.error(error)
  }
},

    async getTrabajador() {
      try {
        const response = await this.$axios.$get('/api/profesor')
        this.profesor = response.map((item) => ({
          idTrabajador: item.idTrabajador,
          nombre_trabajador: item.nombre_trabajador,
          apellido: item.apellido,
        }))
        console.log("lolo",this.profesor);
      } catch (error) {
        console.error(error)
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

    editItem(item) {
      this.editedIndex = this.premio.indexOf(item)
      this.editedItem = Object.assign({}, item)
      const { editedItem, profesor, estudiante } = this
      const trabId = editedItem.idTrabajador.map((nombre_trabajador) => {
        const trabAux = profesor.find(
          (item) =>
            `${item.nombre_trabajador} ${item.apellido}` === nombre_trabajador
        )
        return trabAux ? trabAux.idTrabajador : null
      })
      editedItem.idTrabajador = trabId

      const estId = editedItem.idEstudiante.map((nombre_estudiante) => {
        const estAux = estudiante.find(
          (item) =>
            `${item.nombre_estudiante} ${item.apellido}` === nombre_estudiante
        )
        return estAux ? estAux.idEstudiante : null
      })
      editedItem.idEstudiante = estId
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.premio.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      const idPremio = this.premio[this.editedIndex].idPremio

      try {
        await this.$axios.$delete(`/api/premio/${idPremio}`)
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
      let { editedItem, editedIndex, premio } = this
      const url = '/api/premio/'
      const id = editedIndex >= 0 ? premio[editedIndex].idPremio : ''
      const requestData = {
        tipo_premio: editedItem.tipo_premio,
        nombre_premio: editedItem.nombre_premio,
        clasificacion_ponencia: editedItem.clasificacion_ponencia,
        agno: editedItem.agno,
        titulo_trabajo: editedItem.titulo_trabajo,
        autores: editedItem.autores,
        tipo_premio: editedItem.tipo_premio,
        lugar_premio: editedItem.lugar_premio,
        idProfesor: editedItem.idTrabajador || [],
        idEstudiante: editedItem.idEstudiante || [],
      }
      try {
        if (editedIndex > -1) {
          await this.$axios.$put(`${url}${id}/`, requestData)
        } else await this.$axios.$post(url, requestData)
      } catch (error) {
        console.error(error)
      }
      premio = []
      await this.initialize()
      this.close()
    },
  },
}
</script>
