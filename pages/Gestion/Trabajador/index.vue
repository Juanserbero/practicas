<template>
  <v-container mt-5>
    <v-data-table
      :headers="headers"
      :items="trabajador"
      sort-by="search"
      class="elevation-1 px-4"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title style="color: #01579b">Trabajadores</v-toolbar-title>
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
                      <!-------------------------------------------------- nombre de trabajador ---------------------------------------------------->
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                        v-if="desabilitado == false"
                      >
                        <v-text-field
                          v-model="editedItem.nombre_trabajador"
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
                          {{ editedItem.nombre_trabajador }}
                        </v-card-subtitle>
                      </v-col>
                      <!-------------------------------------------------- apellidos ---------------------------------------------------->
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
                      <!-------------------------------------------------- edad---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                        v-if="desabilitado == false"
                      >
                        <v-text-field
                          v-model="editedItem.edad"
                          label="Edad"
                          maxlength="2"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4" v-else>
                        <v-card-title style="font-size: 16px">
                          Edad
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.edad }}
                        </v-card-subtitle>
                      </v-col>

                      <!-------------------------------------------------- titulo_academico---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                        v-if="desabilitado == false"
                      >
                        <v-text-field
                          v-model="editedItem.titulo_academico"
                          label="Título académico"
                          maxlength="25"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4" v-else>
                        <v-card-title style="font-size: 16px">
                          Título académico
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.titulo_academico }}
                        </v-card-subtitle>
                      </v-col>
                      <!--------------------------------------------------ujc ---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                        v-if="desabilitado == false"
                      >
                        <v-select
                          :items="boolean"
                          v-model="editedItem.ujc"
                          label="Miembro UJC"
                          class="d-flex"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="4" v-else>
                        <v-card-title style="font-size: 16px">
                           Miembro UJC
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.ujc }}
                        </v-card-subtitle>
                      </v-col>
                      <!--------------------------------------------------pcc ---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                        v-if="desabilitado == false"
                      >
                        <v-select
                          :items="boolean"
                          v-model="editedItem.pcc"
                          label="Miembro PCC"
                          class="d-flex"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="4" v-else>
                        <v-card-title style="font-size: 16px">
                           Miembro PCC
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.pcc }}
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
      title: 'Trabajador',
    }
  },
  data: () => ({
    boolean: ['Si', 'No'],

    textRules: [
      /*      (v) => !!v || "Campo requerido",*/
      (v) =>
        (!v || /^[A-ZÁÉÍÓÚÑa-záéíóúñ ]+$/.test(v)) || 'El campo es sólo letras',
    ],
    numberRules: [
      /*      (v) => !!v || "Campo requerido",*/
      (v) => (!v || /^[0-9 -]+$/.test(v)) || 'El campo es sólo números',
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
        value: 'nombre_trabajador',
      },
      { text: 'Apellidos', value: 'apellido' },
      { text: 'Edad', value: 'edad' },
      { text: 'Título académico', value: 'titulo_academico' },
      { text: 'Trabajador Dpto.', value: 'trabajador_departamento' },
      //   { text: 'Militancia', value: 'militancia' },

      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    trabajador: [],

    editedIndex: -1,
    editedItem: {
      nombre_trabajador: null,
      apellido: null,
      edad: null,
      titulo_academico: null,
      militancia: null,
    },
    defaultItem: {
      nombre_trabajador: null,
      apellido: null,
      edad: null,
      titulo_academico: null,
      militancia: null,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Trabajador' : 'Trabajador'
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
        const trabajadorUrl = await this.$axios.$get('/api/trabajador')
        this.trabajador = trabajadorUrl.map((item) => {
          return {
            idTrabajador: item.idTrabajador,
            nombre_trabajador: item.nombre_trabajador,
            apellido: item.apellido,
            edad: item.edad,
            titulo_academico: item.titulo_academico,
            ujc: item.ujc,
            pcc: item.pcc,
          }
        })
      } catch (error) {
        console.error(error)
      }
    },

    editItem(item) {
      this.editedIndex = this.trabajador.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    showItem(item) {
      this.editedIndex = this.trabajador.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
      this.desabilitado = true
    },

    deleteItem(item) {
      this.editedIndex = this.trabajador.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      const idTrabajador = this.trabajador[this.editedIndex].idTrabajador

      try {
        await this.$axios.$delete(`/api/trabajador/${idTrabajador}`)
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

      let { editedItem, editedIndex, trabajador } = this
      const url = '/api/trabajador/'
      const id = editedIndex >= 0 ? trabajador[editedIndex].idTrabajador : ''
      const requestData = {
        nombre_trabajador: editedItem.nombre_trabajador,
        apellido: editedItem.apellido,
        edad: editedItem.edad,
        titulo_academico: editedItem.titulo_academico,
        ujc: editedItem.ujc,
        pcc: editedItem.pcc,
      }
      try {
        if (editedIndex > -1) {
          await this.$axios.$put(`${url}${id}/`, requestData)
        } else await this.$axios.$post(url, requestData)
      } catch (error) {
        console.error(error)
      }
      trabajador = []
      await this.initialize()
      this.close()
    },
  },
}
</script>
