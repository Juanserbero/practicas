<template>
  <v-container mt-5>
    <div id="app">
      <v-data-table
        :headers="headers"
        :items="ejercicio_integrador"
        sort-by="search"
        class="elevation-1 px-4"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title style="color: #01579b"
              >Ejercicios integradores</v-toolbar-title
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
                      <v-row>
                        <!-------------------------------------------------- nombre  ---------------------------------------------------->
                        <v-col cols="12" sm="8" md="6">
                          <v-text-field
                            v-model="editedItem.nombre_ejercicio_integrador"
                            label="Nombre"
                            :rules="textRules"
                            maxlength="25"
                            required
                          ></v-text-field>
                        </v-col>
                        <!-------------------------------------------------- informe  ---------------------------------------------------->
                        <v-col cols="12" sm="8" md="6">
                          <v-file-input
                            ref="informe"
                            accept=".pdf,.xlsx,.docx"
                            small-chips
                            truncate-length="15"
                            v-model="editedItem.informe"
                            label="Informe"
                            class="d-flex"
                          ></v-file-input>
                        </v-col>

                        <!-- ------------------------------------------------ Asignatura--------------------------------------------------
                        <v-col cols="12" sm="6" md="4">
                          <v-select :items="Object.values(asignatura)" v-model="editedItem.idAsignatura"
                            label="Asignatura" class="d-flex" >
                          </v-select>
                        </v-col> -->
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
        <template v-slot:item.informe="{ item }">
          <a
            :href="item.informe_url"
            target="_blank"
            @click.prevent="downloadFile(item)"
            >{{ item.informe }}</a
          >
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
        <template #no-data>
          <v-btn class="mx-2" fab small dark color="primary">
            <v-icon @click="initialize">mdi-restart </v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </div>
  </v-container>
</template>

<script>
const axios = require('axios')
export default {
  head() {
    return {
      title: 'Ejercicio Integrador',
    }
  },
  name: 'App',
  data: () => ({
    textRules: [
      (v) => !!v || 'Campo requerido',
      (v) =>
        !v ||
        /^[A-ZÁÉÍÓÚÑa-záéíóúñ ]+$/.test(v) ||
        'El campo es sólo letras y debe comenzar con mayúsculas',
    ],
    nota: ['2', '3', '4', '5'],
    search: '',
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Nombre',
        align: 'start',
        sortable: true,
        value: 'nombre_ejercicio_integrador',
      },
      { text: 'Informe', value: 'informe' },
      { text: 'Asignatura', value: 'idAsignatura' },

      { text: 'Acciones', value: 'actions', sortable: false },
    ],

    ejercicio_integrador: [],
    asignatura: {},

    editedIndex: -1,
    editedItem: {
      nombre_ejercicio_integrador: null,
      informe: null,
      idAsignatura: null,
    },
    defaultItem: {
      nombre_ejercicio_integrador: null,
      informe: null,
      idAsignatura: null,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? 'Ejercicio integrador'
        : 'Ejercicio integrador'
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
    await this.getAsignatura()
    this.initialize()
  },

  methods: {
    async initialize() {
      try {
        const ejercicio_integradorUrl = await this.$axios.$get(
          '/api/ejercicio_integrador'
        )
        this.ejercicio_integrador = ejercicio_integradorUrl.map((item) => {
          const asigAux = item.idAsignatura
            .map((id) =>
              this.asignatura.find(
                (asignatura) => asignatura.idAsignatura === id
              )
            )
            .filter((asignatura) => asignatura !== undefined)
          return {
            idEjercicio_integrador: item.idEjercicio_integrador,
            nombre_ejercicio_integrador: item.nombre_ejercicio_integrador,
            informe: item.informe,
            informe_url: `${this.$axios.defaults.baseURL}/download/ejercicio_integrador/${item.idEjercicio_integrador}/informe/`,

            idAsignatura: asigAux.map(
              (asignatura) => asignatura.nombre_asignatura
            ),
          }
        })
      } catch (error) {
        console.error(error)
      }
    },
    async downloadFile(item) {
      try {
        const response = await fetch(item.informe_url)
        if (!response.ok) {
          throw new Error(`El archivo "${item.informe}" no se pudo encontrar`)
        }
        const aux = await response.blob()
        const url = URL.createObjectURL(aux)
        const aux2 = document.createElement('a')
        aux2.href = url
        aux2.download = item.informe
        document.body.appendChild(aux2)
        aux2.click()
        document.body.removeChild(aux2)
      } catch (error) {
        alert(error.message)
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

    editItem(item) {
      this.editedIndex = this.ejercicio_integrador.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editedItem.informe = null
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.ejercicio_integrador.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      const idEjercicio_integrador =
        this.ejercicio_integrador[this.editedIndex].idEjercicio_integrador

      try {
        await this.$axios.$delete(
          `/api/ejercicio_integrador/${idEjercicio_integrador}`
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

      let { editedItem, editedIndex, ejercicio_integrador } = this
      const url = '/api/ejercicio_integrador/'
      const id =
        editedIndex >= 0
          ? ejercicio_integrador[editedIndex].idEjercicio_integrador
          : ''
      const formData = new FormData()

      formData.append(
        'nombre_ejercicio_integrador',
        editedItem.nombre_ejercicio_integrador
      )

      if (editedItem.informe !== null) {
        formData.append('informe', editedItem.informe)
      }

      try {
        if (editedIndex > -1) {
          await this.$axios.$put(`${url}${id}`, formData)
        } else await this.$axios.$post(url, formData)
      } catch (error) {
        console.error(error)
      }

      ejercicio_integrador = []
      await this.initialize()
      this.close()
    },
  },
}
</script>
