<template>
  <v-container mt-5>
    <v-data-table
      :headers="headers"
      :items="profesor_cargo_metodologico"
      sort-by="search"
      class="elevation-1 px-4"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title style="color: #01579b"
            >Profesores por cargo metodológico</v-toolbar-title
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

                      <!-------------------------------------------------- cargo_metodologico---------------------------------------------------->

                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          :items="cargo_metodologico"
                          v-model="editedItem.idCargo_metodologico"
                          label="Cargo metodológico"
                          class="d-flex"
                          item-value="idCargo_metodologico"
                          :item-text="(item) => item.cargo"
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
      title: 'Profesores-cargo metodológico',
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
      { text: 'cargo_metodologico', value: 'idCargo_metodologico' },
      { text: 'Curso', value: 'curso' },

      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    profesor_cargo_metodologico: [],
    cargo_metodologico: [],
    profesor: [],

    editedIndex: -1,
    editedItem: {
      idTrabajador: null,
      idCargo_metodologico: null,
      curso: null,
    },
    defaultItem: {
      idTrabajador: null,
      idCargo_metodologico: null,
      curso: null,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? 'Profesores por cargo metodológico'
        : 'Profesores por cargo metodológico'
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
    await Promise.all([this.getProfesor(), this.getCargo_metodologico()])
    await this.initialize()
  },

  methods: {
    async initialize() {
      try {
        const profesor_cargo_metodologicoUrl = await this.$axios.$get(
          '/api/profesor_cargo_metodologico'
        )

        this.profesor_cargo_metodologico = profesor_cargo_metodologicoUrl.map(
          (item) => {
            const cargoAux = item.idCargo_metodologico
              ? this.cargo_metodologico.find(
                  (cargo) =>
                    cargo.idCargo_metodologico === item.idCargo_metodologico
                ).cargo
              : null
            const prof = this.profesor.find(
              (profesor) => profesor.idTrabajador === item.idTrabajador
            )

            const profesorAux = prof
              ? `${prof.nombre_trabajador} ${prof.apellido}`
              : null
            return {
              idProfesor_cargo_metodologico: item.idProfesor_cargo_metodologico,
              idTrabajador: profesorAux,
              idCargo_metodologico: cargoAux,
              curso: item.curso,
            }
          }
        )
      } catch (error) {
        console.error(error)
      }
    },

    async getCargo_metodologico() {
      try {
        const response = await this.$axios.$get('/api/cargo_metodologico')
        this.cargo_metodologico = response.map((item) => ({
          idCargo_metodologico: item.idCargo_metodologico,
          cargo: item.cargo,
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
      this.editedIndex = this.profesor_cargo_metodologico.indexOf(item)
      this.editedItem = Object.assign({}, item)
      const cargoAux = this.cargo_metodologico.find(
        (cargo) => this.editedItem.idCargo_metodologico === cargo.cargo
      )
      this.editedItem.idCargo_metodologico = cargoAux
      const profesorAux = this.profesor.find(
        (profesor) =>
          this.editedItem.idTrabajador ===
          `${profesor.nombre_trabajador} ${profesor.apellido}`
      )
      this.editedItem.idTrabajador = profesorAux
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.profesor_cargo_metodologico.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    async deleteItemConfirm() {
      const idProfesor_cargo_metodologico =
        this.profesor_cargo_metodologico[this.editedIndex]
          .idProfesor_cargo_metodologico

      try {
        await this.$axios.$delete(
          `/api/profesor_cargo_metodologico/${idProfesor_cargo_metodologico}`
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

      let { editedItem, editedIndex, profesor_cargo_metodologico } = this
      const url = '/api/profesor_cargo_metodologico/'
      const id =
        editedIndex >= 0
          ? profesor_cargo_metodologico[editedIndex]
              .idProfesor_cargo_metodologico
          : ''
      const requestData = {
        idTrabajador: editedItem.idTrabajador
          ? editedItem.idTrabajador.idTrabajador || editedItem.idTrabajador
          : null,
        idCargo_metodologico: editedItem.idCargo_metodologico
          ? editedItem.idCargo_metodologico.idCargo_metodologico ||
            editedItem.idCargo_metodologico
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
      profesor_cargo_metodologico = []
      await this.initialize()
      this.close()
    },
  },
}
</script>
