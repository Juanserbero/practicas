<template>
  <v-container mt-5>
    <v-data-table
      :headers="headers"
      :items="evento"
      sort-by="search"
      class="elevation-1 px-4"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title style="color: #01579b"
            >Ponencias presentadas en eventos</v-toolbar-title
          >
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
                    <v-row style="padding: 0px">
                      <!-------------------------------------------------- titulo ---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        v-if="desabilitado == false"
                      >
                        <v-text-field
                          v-model="editedItem.tipo_ponencia"
                          label="Título ponencia"
                          :rules="textRules"
                          maxlength="20"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="3" v-else>
                        <v-card-title style="font-size: 16px">
                          Título
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.tipo_ponencia }}
                        </v-card-subtitle>
                      </v-col>

                      <!-------------------------------------------------- nombre de evento ---------------------------------------------------->
                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        v-if="desabilitado == false"
                      >
                        <v-text-field
                          v-model="editedItem.nombre_ponencia"
                          label="Nombre"
                          :rules="textRules"
                          maxlength="15"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="3" v-else>
                        <v-card-title style="font-size: 16px">
                          Nombre
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.nombre_ponencia }}
                        </v-card-subtitle>
                      </v-col>
                      <!-------------------------------------------------- nombre de agno ---------------------------------------------------->
                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        v-if="desabilitado == false"
                      >
                        <v-text-field
                          v-model="editedItem.agno"
                          label="Año"
                          :rules="numberRules"
                          maxlength="4"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="3" v-else>
                        <v-card-title style="font-size: 16px">
                          Año
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.agno }}
                        </v-card-subtitle>
                      </v-col>
                      <!-------------------------------------------------- Tipo evento---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        v-if="desabilitado == false"
                      >
                       <v-select
                          :items="tipo_evento"
                          v-model="editedItem.tipo_evento"
                          label="Tipo evento"
                          class="d-flex"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="3" v-else>
                        <v-card-title style="font-size: 16px">
                          Tipo evento
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.tipo_evento }}
                        </v-card-subtitle>
                      </v-col>
                      <!-------------------------------------------------- Lugar evento---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        v-if="desabilitado == false"
                      >
                        <v-text-field
                          v-model="editedItem.pais"
                          label="Lugar evento"
                          maxlength="15"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="3" v-else>
                        <v-card-title style="font-size: 16px">
                          Lugar evento
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.pais }}
                        </v-card-subtitle>
                      </v-col>

                      <!-------------------------------------------------- Profesor---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        v-if="desabilitado == false"
                      >
                        <v-select
                          :items="trabajador"
                          v-model="editedItem.idTrabajador"
                          label="Autores"
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
                      <v-col cols="12" sm="6" md="3" v-else>
                        <v-card-title style="font-size: 16px"
                          >Profesor</v-card-title
                        >

                        <v-card-subtitle>
                          {{ editedItem.idTrabajador.join(', ') }}
                        </v-card-subtitle>
                      </v-col>
                      <!-------------------------------------------------- Estudiante---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        v-if="desabilitado == false"
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
                      <v-col cols="12" sm="6" md="3" v-else>
                        <v-card-title style="font-size: 16px"
                          >Estudiante</v-card-title
                        >

                        <v-card-subtitle>
                          {{ editedItem.idEstudiante }}
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
      title: 'Ponencia evento',
    }
  },
  data: () => ({
     tipo_evento: ['Nacionales', 'Internacionales'],
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
    dialog: false,
    desabilitado: false,
    dialogDelete: false,
    // eslint-disable-next-line no-sparse-arrays
    headers: [
        { text: "Titulo ponencia", value: "tipo_ponencia" },
      {
        text: 'Nombre',
        align: 'start',
        sortable: true,
        value: 'nombre_ponencia',
      },
      // { text: 'Año', value: 'agno' },
      //   { text: "Tipo evento", value: "tipo_evento" },
      { text: 'Lugar evento', value: 'pais' },
      { text: 'Profesor', value: 'idTrabajador' },
      { text: 'Estudiante', value: 'idEstudiante' },

      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    evento: [],
    trabajador: [],
    mostrar_profesor: [],
    mostrar_estudiante: [],
    estudiante: {},

    editedIndex: -1,
    editedItem: {
      nombre_ponencia: null,
      agno: null,
      tipo_ponencia: null,
      tipo_evento: null,
      pais: null,

      idTrabajador: null,
      idEstudiante: null,
    },
    defaultItem: {
      nombre_ponencia: null,
      agno: null,
      tipo_ponencia: null,
      tipo_evento: null,
      pais: null,

      idTrabajador: null,
      idEstudiante: null,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Ponencia presentada en evento' : 'Ponencia presentada en evento'
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
    await Promise.all([this.getProfesor(), this.getEstudiante()])
    await this.initialize()
  },

  methods: {
    async initialize() {
      try {
        const eventoUrl = await this.$axios.$get('/api/evento')
        this.evento = eventoUrl.map((item) => {
          const estAux = item.idEstudiante
            .map((id) =>
              this.estudiante.find(
                (estudiante) => estudiante.idEstudiante === id
              )
            )
            .filter((estudiante) => estudiante !== undefined)

          const trabAux = item.idTrabajador
            .map((id) =>
              this.trabajador.find(
                (trabajador) => trabajador.idTrabajador === id
              )
            )
            .filter((trabajador) => trabajador !== undefined)

          return {
            idEvento: item.idEvento,
            nombre_ponencia: item.nombre_ponencia,
            agno: item.agno,
            tipo_ponencia: item.tipo_ponencia,
            tipo_evento: item.tipo_evento,
            pais: item.pais,

            idTrabajador: trabAux.map(
              (trabajador) =>
                `${trabajador.nombre_trabajador} ${trabajador.apellido}`
            ),
            idEstudiante: estAux.map(
              (estudiante) =>
                `${estudiante.nombre_estudiante} ${estudiante.apellido}`
            ),
          }
        })
      } catch (error) {
        console.error(error)
      }
    },

    async getProfesor() {
      try {
        const response = await this.$axios.$get('/api/profesor')
        this.trabajador = response.map((item) => ({
          idTrabajador: item.idTrabajador,
          nombre_trabajador: item.nombre_trabajador,
          apellido: item.apellido,
        }))
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
      this.editedIndex = this.evento.indexOf(item)
      this.editedItem = Object.assign({}, item)
      const { editedItem, trabajador, estudiante } = this
      const trabId = editedItem.idTrabajador.map((nombre_trabajador) => {
        const trabAux = trabajador.find(
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
    showItem(item) {
      this.editedIndex = this.evento.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
      this.desabilitado = true
    },

    deleteItem(item) {
      this.editedIndex = this.evento.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      const idEvento = this.evento[this.editedIndex].idEvento

      try {
        await this.$axios.$delete(`/api/evento/${idEvento}`)
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
      let { editedItem, editedIndex, evento } = this
      const url = '/api/evento/'
      const id = editedIndex >= 0 ? evento[editedIndex].idEvento : ''
      const requestData = {
        nombre_ponencia: editedItem.nombre_ponencia,
        agno: editedItem.agno,
        tipo_ponencia: editedItem.tipo_ponencia,
        tipo_evento: editedItem.tipo_evento,
        pais: editedItem.pais,
        idTrabajador: editedItem.idTrabajador || [],
        idEstudiante: editedItem.idEstudiante || [],
      }
      try {
        if (editedIndex > -1) {
          await this.$axios.$put(`${url}${id}/`, requestData)
        } else await this.$axios.$post(url, requestData)
      } catch (error) {
        console.error(error)
      }
      evento = []
      await this.initialize()
      this.close()
    },
  },
}
</script>
