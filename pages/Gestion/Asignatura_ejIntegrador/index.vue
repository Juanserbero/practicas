<template>
  <v-container mt-5>
    <v-data-table
      :headers="headers"
      :items="ejercicio_integrador_asignatura"
      sort-by="search"
      class="elevation-1 px-4"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title style="color: #01579b"
            >Ejercicios integradores por asignatura</v-toolbar-title
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
                      <!-------------------------------------------------- Ejercicio integrador---------------------------------------------------->

                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          :items="ejercicio_integrador"
                          v-model="editedItem.idEjercicio_integrador"
                          label="Ejercicio integrador"
                          class="d-flex"
                          item-value="idEjercicio_integrador"
                          :item-text="
                            (item) => item.nombre_ejercicio_integrador
                          "
                        ></v-select>
                      </v-col>

                      <!-------------------------------------------------- Asignatura---------------------------------------------------->

                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          :items="asignatura"
                          v-model="editedItem.idAsignatura"
                          label="Asignatura"
                          class="d-flex"
                          item-value="idAsignatura"
                          :item-text="(item) => item.nombre_asignatura"
                        ></v-select>
                      </v-col>

                      <!-------------------------------------------------- curso ---------------------------------------------------->
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.curso"
                          label="Curso"
                          :rules="numberRules"
                          maxlength="10"
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
export default {
  head() {
    return {
      title: 'Ejercicio integrador-Asignatura',
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
      { text: 'Ejercicio integrador', value: 'idEjercicio_integrador' },
      { text: 'Asignatura', value: 'idAsignatura' },
      { text: 'Curso', value: 'curso' },

      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    ejercicio_integrador_asignatura: [],
    asignatura: [],
    ejercicio_integrador: [],

    editedIndex: -1,
    editedItem: {
      idEjercicio_integrador: null,
      idAsignatura: null,
      curso: null,
    },
    defaultItem: {
      idEjercicio_integrador: null,
      idAsignatura: null,
      curso: null,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? 'Ejercicio integrador por asignatura'
        : 'Ejercicio integrador por asignatura'
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
    await Promise.all([this.getEjercicioIntegrador(), this.getAsignatura()])
    await this.initialize()
  },

  methods: {
    async initialize() {
      try {
        const ejercicio_integradorUrl = await this.$axios.$get(
          '/api/ejercicio_integrador_asignatura'
        )

        this.ejercicio_integrador_asignatura = ejercicio_integradorUrl.map(
          (item) => {
            const asigAux = item.idAsignatura
              ? this.asignatura.find(
                  (asignatura) => asignatura.idAsignatura === item.idAsignatura
                ).nombre_asignatura
              : null

            const ejIntegradorAux = item.idEjercicio_integrador
              ? this.ejercicio_integrador.find(
                  (ejercicio_integrador) =>
                    ejercicio_integrador.idEjercicio_integrador ===
                    item.idEjercicio_integrador
                ).nombre_ejercicio_integrador
              : null
            return {
              idAsignatura_ejIntegrador: item.idAsignatura_ejIntegrador,
              idAsignatura: asigAux,
              idEjercicio_integrador: ejIntegradorAux,
              curso: item.curso,
            }
          }
        )
      } catch (error) {
        console.error(error)
      }
    },

    async getAsignatura() {
      try {
        const response = await this.$axios.$get('/api/asignatura')
        this.asignatura = response.map((item) => ({
          idAsignatura: item.idAsignatura,
          nombre_asignatura: item.nombre_asignatura,
        }))
      } catch (error) {
        console.error(error)
      }
    },

    async getEjercicioIntegrador() {
      try {
        const response = await this.$axios.$get('/api/ejercicio_integrador')
        this.ejercicio_integrador = response.map((item) => ({
          idEjercicio_integrador: item.idEjercicio_integrador,
          nombre_ejercicio_integrador: item.nombre_ejercicio_integrador,
        }))
      } catch (error) {
        console.error(error)
      }
    },

    editItem(item) {
      this.editedIndex = this.ejercicio_integrador_asignatura.indexOf(item)
      this.editedItem = Object.assign({}, item)

      const asigAux = this.asignatura.find(
        (asignatura) =>
          this.editedItem.idAsignatura === asignatura.nombre_asignatura
      )
      this.editedItem.idAsignatura = asigAux

      const ejIntegradorAux = this.ejercicio_integrador.find(
        (ejercicio_integrador) =>
          this.editedItem.idEjercicio_integrador ===
          ejercicio_integrador.nombre_ejercicio_integrador
      )
      this.editedItem.idEjercicio_integrador = ejIntegradorAux

      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.ejercicio_integrador_asignatura.indexOf(item)
      this.editedItem = Object.assign({}, item)

      this.dialogDelete = true
    },
    async deleteItemConfirm() {
      const idAsignatura_ejIntegrador =
        this.ejercicio_integrador_asignatura[this.editedIndex]
          .idAsignatura_ejIntegrador

      try {
        await this.$axios.$delete(
          `/api/ejercicio_integrador_asignatura/${idAsignatura_ejIntegrador}`
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
      let { editedItem, editedIndex, ejercicio_integrador_asignatura } = this
      const url = '/api/ejercicio_integrador_asignatura/'
      console.log(
        'editedItem.idAlumno_ayudante',
        editedItem.idEjercicio_integrador.idEjercicio_integrador
      )
      console.log('editedItem.idAsignatura', editedItem.idAsignatura)

      const id =
        editedIndex >= 0
          ? ejercicio_integrador_asignatura[editedIndex]
              .idAsignatura_ejIntegrador
          : ''

      const requestData = {
        idEjercicio_integrador: editedItem.idEjercicio_integrador
          ? editedItem.idEjercicio_integrador.idEjercicio_integrador || editedItem.idEjercicio_integrador
          : null,
        idAsignatura: editedItem.idAsignatura
          ? editedItem.idAsignatura.idAsignatura || editedItem.idAsignatura
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
      ejercicio_integrador_asignatura = []
      await this.initialize()
      this.close()
    },
  },
}
</script>
