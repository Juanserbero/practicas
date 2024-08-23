<template>
  <v-container mt-5>
    <v-data-table
      :headers="headers"
      :items="publicacion"
      sort-by="search"
      class="elevation-1 px-4"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title style="color: #01579b"
            >Publicaciones</v-toolbar-title
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
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-form ref="form" lazy-validation>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.titulo"
                          label="Título"
                          :rules="textRules"
                          maxlength="15"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
                        <v-menu
                          v-model="menu1"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="editedItem.fecha_publicacion"
                              label="Fecha de publicación"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              :rules="[(v) => !!v || 'Campo requerido']"
                            >
                            </v-text-field>
                          </template>
                          <v-date-picker
                            v-model="editedItem.fecha_publicacion"
                            @input="menu1 = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.autor"
                          label="Autor"
                          :rules="textRules"
                          maxlength="25"
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
      title: 'Publicaciones',
    }
  },
  data: () => ({
    menu1: false,

    textRules: [
      (v) => !!v || 'Campo requerido',
      (v) =>
        (!v || /^[A-ZÁÉÍÓÚÑa-záéíóúñ ]+$/.test(v)) ||
        'El campo es sólo letras y debe comenzar con mayúsculas',
    ],

    search: '',
    dialog: false,
    dialogDelete: false,

    // eslint-disable-next-line no-sparse-arrays
    headers: [
      {
        text: 'Título',
        align: 'start',
        sortable: true,
        value: 'titulo',
      },
      { text: 'Fecha de publicación', value: 'fecha_publicacion' },
      { text: 'Autor', value: 'autor' },

      { text: 'Acciones', value: 'actions', sortable: false },

      ,
    ],
    publicacion: [],
    editedIndex: -1,
    editedItem: {
      titulo: null,
      fecha_publicacion: null,
      autor: null,
    },
    defaultItem: {
      titulo: null,
      fecha_publicacion: null,
      autor: null,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Publicación' : 'Publicación'
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
        const publicacionUrl = await this.$axios.$get('/api/publicacion')
        this.publicacion = publicacionUrl.map((item) => {
          return {
            idPublicacion: item.idPublicacion,
            titulo: item.titulo,
            fecha_publicacion: item.fecha_publicacion,
            autor: item.autor,
          }
        })
      } catch (error) {
        console.error(error)
      }
    },

    editItem(item) {
      this.editedIndex = this.publicacion.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.publicacion.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      const idPublicacion = this.publicacion[this.editedIndex].idPublicacion

      try {
        await this.$axios.$delete(`/api/publicacion/${idPublicacion}`)
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
      let { editedItem, editedIndex, publicacion } = this
      const url = '/api/publicacion/'
      const id = editedIndex >= 0 ? publicacion[editedIndex].idPublicacion : ''
      const requestData = {
        titulo: editedItem.titulo,
        fecha_publicacion: editedItem.fecha_publicacion,
        autor: editedItem.autor,
      }
      try {
        if (editedIndex > -1) {
          await this.$axios.$put(`${url}${id}/`, requestData)
        } else await this.$axios.$post(url, requestData)
      } catch (error) {
        console.error(error)
      }
      publicacion = []
      await this.initialize()
      this.close()
    },
  },
}
</script>
