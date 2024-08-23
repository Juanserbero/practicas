<template>
  <v-container mt-5>
    <v-data-table
      :headers="headers"
      :items="trab_diploma_profesor_estudiante"
      sort-by="search"
      class="elevation-1 px-4"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title style="color: #01579b"
            >Trab. diploma-tutor-estudiante</v-toolbar-title
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
                <v-spacer></v-spacer>
                <v-card-actions> </v-card-actions>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-form ref="form" lazy-validation>
                    <v-row style="padding: 0px">
                      <!-------------------------------------------------- Trabajo diploma---------------------------------------------------->

                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          :items="trabajo_diploma"
                          v-model="editedItem.idTrabajo_diploma"
                          label="Trabajo diploma"
                          class="d-flex"
                          item-value="idTrabajo_diploma"
                          :item-text="(item) => item.titulo"
                        ></v-select>
                      </v-col>

                      <!-------------------------------------------------- estudiante---------------------------------------------------->

                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          :items="estudiante"
                          v-model="editedItem.idEstudiante"
                          label="Estudiante"
                          class="d-flex"
                          item-value="idEstudiante"
                          :item-text="
                            (item) =>
                              `${item.nombre_estudiante} ${item.apellido}`
                          "
                        ></v-select>
                      </v-col>

                      <!-------------------------------------------------- Profesor---------------------------------------------------->

                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          :items="profesor"
                          v-model="editedItem.idTrabajador"
                          label="Profesor"
                          class="d-flex"
                          item-value="idTrabajador"
                          :item-text="
                            (item) =>
                              `${item.nombre_trabajador} ${item.apellido}`
                          "
                        ></v-select>
                      </v-col>

                      <!-------------------------------------------------- curso ---------------------------------------------------->
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.curso"
                          label="Curso"
                          :rules="numberRules"
                          maxlength="4"
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
      title: 'Trab. diploma-tutor-estudiante',
    }
  },
  data: () => ({
    numberRules: [
      /*      (v) => !!v || "Campo requerido",*/
      (v) => (!v || /^[0-9 -]+$/.test(v)) || 'El campo es sólo números',
    ],

    search: '',
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: 'Trabajo diploma', value: 'idTrabajo_diploma' },
      { text: 'Nombre tutor', value: 'idTrabajador' },
      { text: 'Estudiante', value: 'idEstudiante' },
      { text: 'Curso', value: 'curso' },

      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    trab_diploma_profesor_estudiante: [],
    estudiante: [],
    profesor: [],
    trabajo_diploma: [],

    editedIndex: -1,
    editedItem: {
      idTrabajador: null,
      idEstudiante: null,
      idTrabajo_diploma: null,
      curso: null,
    },
    defaultItem: {
      idTrabajador: null,
      idEstudiante: null,
      idTrabajo_diploma: null,
      curso: null,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? 'Trab. diploma-tutor-estudiante'
        : 'Trab. diploma-tutor-estudiante'
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
    await Promise.all([
      this.getProfesor(),
      this.getTrabajo_diploma(),
      this.getEstudiante(),
    ])
    await this.initialize()
  },

  methods: {
    async initialize() {
      try {
        const trab_diploma_profesor_estudianteUrl = await this.$axios.$get(
          '/api/trab_diploma_profesor_estudiante'
        )
        this.trab_diploma_profesor_estudiante =
          trab_diploma_profesor_estudianteUrl.map((item) => {
            const trabajo_diplomaAux = item.idTrabajo_diploma
              ? this.trabajo_diploma.find(
                  (trabajo_diploma) =>
                    trabajo_diploma.idTrabajo_diploma === item.idTrabajo_diploma
                ).titulo
              : null
            const prof = this.profesor.find(
              (profesor) => profesor.idTrabajador === item.idTrabajador
            )
              const profesorAux = prof
                ? `${prof.nombre_trabajador} ${prof.apellido}`
                : null

            const est = this.estudiante.find(
              (estudiante) => estudiante.idEstudiante === item.idEstudiante
            )
            const estudianteAux = est
              ? `${est.nombre_estudiante} ${est.apellido}`
              : null

            return {
              idTrab_diploma_profesor_estudiante:
                item.idTrab_diploma_profesor_estudiante,

              idTrabajador: profesorAux,
              idEstudiante: estudianteAux,
              idTrabajo_diploma: trabajo_diplomaAux,
              curso: item.curso,
            }
          })
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

    async getProfesor() {
      try {
        const response = await this.$axios.$get('/api/profesor')
        this.profesor = response.map((item) => ({
          idTrabajador: item.idTrabajador,
          nombre_trabajador: item.nombre_trabajador,
          apellido: item.apellido,
        }))
      } catch (error) {
        console.error(error)
      }
    },

    async getTrabajo_diploma() {
      try {
        const response = await this.$axios.$get('/api/trabajo_diploma')
        this.trabajo_diploma = response.map((item) => ({
          idTrabajo_diploma: item.idTrabajo_diploma,
          titulo: item.titulo,
        }))
      } catch (error) {
        console.error(error)
      }
    },

    editItem(item) {
      this.editedIndex = this.trab_diploma_profesor_estudiante.indexOf(item)
      this.editedItem = Object.assign({}, item)
      const trabajo_diplomaAux = this.trabajo_diploma.find(
        (trabajo_diploma) =>
          this.editedItem.idTrabajo_diploma === trabajo_diploma.titulo
      )
      this.editedItem.idTrabajo_diploma = trabajo_diplomaAux
      const profesorAux = this.profesor.find(
        (profesor) =>
          this.editedItem.idTrabajador ===
          `${profesor.nombre_trabajador} ${profesor.apellido}`
      )
      this.editedItem.idTrabajador = profesorAux

      const estudianteAux = this.estudiante.find(
        (estudiante) =>
          this.editedItem.idEstudiante ===
          `${estudiante.nombre_estudiante} ${estudiante.apellido}`
      )
      this.editedItem.idEstudiante = estudianteAux
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.trab_diploma_profesor_estudiante.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    async deleteItemConfirm() {
      const idTrab_diploma_profesor_estudiante =
        this.trab_diploma_profesor_estudiante[this.editedIndex]
          .idTrab_diploma_profesor_estudiante
      try {
        await this.$axios.$delete(
          `/api/trab_diploma_profesor_estudiante/${idTrab_diploma_profesor_estudiante}`
        )
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

      let { editedItem, editedIndex, trab_diploma_profesor_estudiante } = this
      const url = '/api/trab_diploma_profesor_estudiante/'
      const id =
        editedIndex >= 0
          ? trab_diploma_profesor_estudiante[editedIndex]
              .idTrab_diploma_profesor_estudiante
          : ''
      const requestData = {
        idTrabajador: editedItem.idTrabajador
          ? editedItem.idTrabajador.idTrabajador || editedItem.idTrabajador
          : null,
        idEstudiante: editedItem.idEstudiante
          ? editedItem.idEstudiante.idEstudiante || editedItem.idEstudiante
          : null,
        idTrabajo_diploma: editedItem.idTrabajo_diploma
          ? editedItem.idTrabajo_diploma.idTrabajo_diploma || editedItem.idTrabajo_diploma
          : null,

        curso: this.editedItem.curso,
      }
      try {
        if (editedIndex > -1) {
          await this.$axios.$put(`${url}${id}/`, requestData)
        } else await this.$axios.$post(url, requestData)
      } catch (error) {
        console.error(error)
      }
      trab_diploma_profesor_estudiante = []
      await this.initialize()
      this.close()
    },
  },
}
</script>
