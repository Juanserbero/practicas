<template>
  <v-container mt-5>
    <v-data-table
      :headers="headers"
      :items="profesor_disciplina"
      sort-by="search"
      class="elevation-1 px-4"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title style="color: #01579b"
            >Profesores por disciplina</v-toolbar-title
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

                      <!-------------------------------------------------- disciplina---------------------------------------------------->

                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          :items="disciplina"
                          v-model="editedItem.idDisciplina"
                          label="Disciplina"
                          class="d-flex"
                          item-value="idDisciplina"
                          :item-text="(item) => item.nombre_disciplina"
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
      title: 'Profesores-disciplina',
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
      { text: 'Profesores', value: 'idTrabajador' },
      { text: 'disciplina', value: 'idDisciplina' },
      { text: 'Curso', value: 'curso' },

      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    profesor_disciplina: [],
    disciplina: [],
    profesor: [],

    editedIndex: -1,
    editedItem: {
      idTrabajador: null,
      idDisciplina: null,
      curso: null,
    },
    defaultItem: {
      idTrabajador: null,
      idDisciplina: null,
      curso: null,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? 'Profesores por disciplina'
        : 'Profesores por disciplina'
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
    await Promise.all([this.getProfesor(), this.getDisciplina()])
    await this.initialize()
  },

  methods: {
    async initialize() {
      try {
        const profesor_disciplinaUrl = await this.$axios.$get(
          '/api/profesor_disciplina'
        )
        this.profesor_disciplina = profesor_disciplinaUrl.map((item) => {
          const discAux = item.idDisciplina
            ? this.disciplina.find(
                (disciplina) => disciplina.idDisciplina === item.idDisciplina
              ).nombre_disciplina
            : null
          const prof = this.profesor.find(
            (profesor) => profesor.idTrabajador === item.idTrabajador
          )

          const profesorAux = prof
            ? `${prof.nombre_trabajador} ${prof.apellido}`
            : null
          return {
            idProfesor_disciplina: item.idProfesor_disciplina,
            idTrabajador: profesorAux,
            idDisciplina: discAux,
            curso: item.curso,
          }
        })
      } catch (error) {
        console.error(error)
      }
    },

    async getDisciplina() {
      try {
        const response = await this.$axios.$get('/api/disciplina')
        this.disciplina = response.map((item) => ({
          idDisciplina: item.idDisciplina,
          nombre_disciplina: item.nombre_disciplina,
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

    editItem(item) {
      this.editedIndex = this.profesor_disciplina.indexOf(item)
      this.editedItem = Object.assign({}, item)
      const discAux = this.disciplina.find(
        (disciplina) =>
          this.editedItem.idDisciplina === disciplina.nombre_disciplina
      )
      this.editedItem.idDisciplina = discAux
      const profesorAux = this.profesor.find(
        (profesor) =>
          this.editedItem.idTrabajador ===
          `${profesor.nombre_trabajador} ${profesor.apellido}`
      )
      this.editedItem.idTrabajador = profesorAux
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.profesor_disciplina.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    async deleteItemConfirm() {
      const idProfesor_disciplina =
        this.profesor_disciplina[this.editedIndex].idProfesor_disciplina
      try {
        await this.$axios.$delete(
          `/api/profesor_disciplina/${idProfesor_disciplina}`
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

      let { editedItem, editedIndex, profesor_disciplina } = this
      const url = '/api/profesor_disciplina/'
      const id =
        editedIndex >= 0
          ? profesor_disciplina[editedIndex].idProfesor_disciplina
          : ''
      const requestData = {
        idTrabajador: editedItem.idTrabajador ? editedItem.idTrabajador.idTrabajador || editedItem.idTrabajador : null,
        idDisciplina: editedItem.idDisciplina
          ? editedItem.idDisciplina.idDisciplina || editedItem.idDisciplina
          : null,
        curso: editedItem.curso,
      }
      try {
        if (editedIndex > -1) {
          await this.$axios.$put(`${url}${id}/`, requestData)
        } else await this.$axios.$post(url, requestData)
      } catch (error) {
        console.error(error)
      }
      profesor_disciplina = []
      await this.initialize()
      this.close()
    },
  },
}
</script>
