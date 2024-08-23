<template>
  <v-container mt-5>
    <v-data-table
      :headers="headers"
      :items="egresado"
      sort-by="search"
      class="elevation-1 px-4"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title style="color: #01579b">Egresados</v-toolbar-title>
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
                </v-card-actions>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-form ref="form" lazy-validation>
                    <v-row style="padding: 0px">
                      <!-------------------------------------------------- nombre de egresado ---------------------------------------------------->
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                        v-if="desabilitado == false"
                      >
                        <v-text-field
                          v-model="editedItem.nombre_egresado"
                          label="Nombre"
                          :rules="textRules"
                          maxlength="15"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="4" v-else>
                        <v-card-title style="font-size: 16px">
                          Nombre
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.nombre_egresado }}
                        </v-card-subtitle>
                      </v-col>
                      <!-------------------------------------------------- Apellidos ---------------------------------------------------->
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
                          maxlength="15"
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
                      <!-------------------------------------------------- carrera ---------------------------------------------------->
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                        v-if="desabilitado == false"
                      >
                        <v-select
                          :items="carrera"
                          v-model="editedItem.idCarrera"
                          label="Carrera"
                          class="d-flex"
                          item-value="idCarrera"
                          :item-text="(item) => item.nombre_carrera"
                        ></v-select>
                      </v-col>

                      <v-col cols="12" sm="6" md="4" v-else>
                        <v-card-title style="font-size: 16px">
                          Carrera
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.idCarrera }}
                        </v-card-subtitle>
                      </v-col>
                      <!-------------------------------------------------- tipo de superacion-------------------------------------------------->
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                        v-if="desabilitado == false"
                      >
                        <v-select
                          :items="tipos_superacion"
                          v-model="editedItem.tipo_superacion"
                          label="Tipo de superación"
                          class="d-flex"
                          :rules="[(v) => !!v || 'Campo requerido']"
                        ></v-select>
                      </v-col>

                      <v-col cols="12" sm="6" md="4" v-else>
                        <v-card-title style="font-size: 16px">
                          Nombre
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.nombre_egresado }}
                        </v-card-subtitle>
                      </v-col>

                      <!-------------------------------------------------- centro_trabajo---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                        v-if="desabilitado == false"
                      >
                        <v-text-field
                          v-model="editedItem.centro_trabajo"
                          label="Centro trabajo"
                          maxlength="20"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4" v-else>
                        <v-card-title style="font-size: 16px">
                          Centro trabajo
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.centro_trabajo }}
                        </v-card-subtitle>
                      </v-col>

                      <!-------------------------------------------------- telefono---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                        v-if="desabilitado == false"
                      >
                        <v-text-field
                          v-model="editedItem.telefono"
                          label="Teléfono centro trabajo"
                          maxlength="15"
                          :rules="numberRules"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4" v-else>
                        <v-card-title style="font-size: 16px">
                          Teléfono centro trabajo
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.telefono }}
                        </v-card-subtitle>
                      </v-col>
                      <!-------------------------------------------------- acciones_seguimiento---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                        v-if="desabilitado == false"
                      >
                        <v-file-input
                          ref="acciones_seguimiento"
                          accept=".pdf,.xlsx,.docx"
                          small-chips
                          truncate-length="15"
                          v-model="editedItem.acciones_seguimiento"
                          label="Acciones de seguimiento"
                          class="d-flex"
                        ></v-file-input>
                      </v-col>
                      <v-col cols="12" sm="6" md="3" class="my-n3" v-else>
                        <v-card-title style="font-size: 16px"
                          >Acciones de seguimiento</v-card-title
                        >

                        <v-card-subtitle>
                          <a
                            :href="editedItem.acciones_seguimiento_url"
                            target="_blank"
                            @click.prevent="downloadFile(editedItem)"
                            >{{ editedItem.acciones_seguimiento }}</a
                          >
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
      title: 'Egresado',
    }
  },
  data: () => ({
    tipos_superacion: [
      'Curso de posgrado',
      'Diplomado',
      'Maestría',
      'Doctorado',
      'Talleres',
      'Conferencia especializada',
    ],
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
    headers: [
      {
        text: 'Nombre',
        align: 'start',
        sortable: true,
        value: 'nombre_egresado',
      },
      { text: 'Apellidos', value: 'apellido' },
      { text: 'Carrera', value: 'idCarrera' },
      { text: 'Tipo de superación', value: 'tipo_superacion' },
      { text: 'centro_trabajo', value: 'centro_trabajo' },

      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    egresado: [],
    carrera: {},

    editedIndex: -1,
    editedItem: {
      nombre_egresado: null,
      centro_trabajo: null,
      telefono: null,
      acciones_seguimiento: null,
      idCarrera: null,
      tipo_superacion: null,
    },
    defaultItem: {
      nombre_egresado: null,
      centro_trabajo: null,
      telefono: null,
      acciones_seguimiento: null,
      idCarrera: null,
      tipo_superacion: null,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Egresado' : 'Egresado'
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
        const egresadoUrl = await this.$axios.$get('/api/egresado')
        this.egresado = egresadoUrl.map((item) => {
          const carreraAux = item.idCarrera
            ? this.carrera.find(
                (carrera) => carrera.idCarrera === item.idCarrera
              ).nombre_carrera
            : null
          return {
            idEgresado: item.idEgresado,
            nombre_egresado: item.nombre_egresado,
            apellido: item.apellido,
            centro_trabajo: item.centro_trabajo,
            telefono: item.telefono,
            acciones_seguimiento: item.acciones_seguimiento,
            tipo_superacion: item.tipo_superacion,
            acciones_seguimiento_url: `${this.$axios.defaults.baseURL}/download/egresado/${item.idEgresado}/acciones_seguimiento/`,

            idCarrera: carreraAux,
          }
        })
      } catch (error) {
        console.error(error)
      }
    },
    async downloadFile(item) {
      try {
        const response = await fetch(item.acciones_seguimiento_url)
        if (!response.ok) {
          throw new Error(`El archivo "${item.acciones_seguimiento}" no se pudo encontrar`)
        }
        const aux = await response.blob()
        const url = URL.createObjectURL(aux)
        const aux2 = document.createElement('a')
        aux2.href = url
        aux2.download = item.acciones_seguimiento
        document.body.appendChild(aux2)
        aux2.click()
        document.body.removeChild(aux2)
      } catch (error) {
        alert(error.message)
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
      this.editedIndex = this.egresado.indexOf(item)
      this.editedItem = Object.assign({}, item)
      const carreraAux = this.carrera.find(
        (carrera) => this.editedItem.idCarrera === carrera.nombre_carrera
      )
      this.editedItem.idCarrera = carreraAux

      this.dialog = true
    },
    showItem(item) {
      this.editedIndex = this.egresado.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
      this.desabilitado = true
    },

    deleteItem(item) {
      this.editedIndex = this.egresado.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      const idEgresado = this.egresado[this.editedIndex].idEgresado

      try {
        await this.$axios.$delete(`/api/egresado/${idEgresado}`)
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
      let { editedItem, editedIndex, egresado } = this
      const url = '/api/egresado/'
      const id = editedIndex >= 0 ? egresado[editedIndex].idEgresado : ''
     
     const formData = new FormData()

      formData.append(
        'nombre_egresado',
        editedItem.nombre_egresado
      )
      formData.append('apellido', editedItem.apellido)
      formData.append('centro_trabajo', editedItem.centro_trabajo)
      formData.append('telefono', editedItem.telefono)
      formData.append('tipo_superacion', editedItem.tipo_superacion)
      console.log('editedItem.acciones_seguimiento',editedItem.acciones_seguimiento);
      if (editedItem.acciones_seguimiento !== null) {
        formData.append('acciones_seguimiento', editedItem.acciones_seguimiento)
      }
      if (editedItem.idCarrera !== null) {
      formData.append(
        'idCarrera',
        editedItem.idCarrera || editedItem.idCarrera.idCarrera
      )
      }

     
      try {
        if (editedIndex > -1) {
          await this.$axios.$put(`${url}${id}/`, formData)
        } else await this.$axios.$post(url, formData)
      } catch (error) {
        console.error(error)
      }
      egresado = []
      await this.initialize()
      this.close()
    },
  },
}
</script>
