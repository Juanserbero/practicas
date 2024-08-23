<template>
  <v-container mt-5>
    <div id="app">
      <v-data-table
        :headers="headers"
        :items="revista"
        sort-by="search"
        class="elevation-1 px-4"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title style="color: #01579b">Revistas</v-toolbar-title>
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
                      <v-row>
                        <!-------------------------------------------------- Título  ---------------------------------------------------->
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                          v-if="desabilitado == false"
                        >
                          <v-text-field
                            v-model="editedItem.titulo"
                            label="Título"
                            :rules="textRules"
                            maxlength="20"
                            required
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="6" md="4" v-else>
                          <v-card-title style="font-size: 16px">
                            Título
                          </v-card-title>

                          <v-card-subtitle>
                            {{ editedItem.titulo }}
                          </v-card-subtitle>
                        </v-col>
                        <!-------------------------------------------------- Líder del proyecto ---------------------------------------------------->
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                          v-if="desabilitado == false"
                        >
                          <v-menu
                            v-model="menu1"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                            v-if="desabilitado == false"
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
                        <v-col cols="12" sm="6" md="4" v-else>
                          <v-card-title style="font-size: 16px"
                            >Fecha publicación</v-card-title
                          >

                          <v-card-subtitle>
                            {{ editedItem.fecha_publicacion }}
                          </v-card-subtitle>
                        </v-col>

                        <!-------------------------------------------------- Autor ---------------------------------------------------->

                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                          v-if="desabilitado == false"
                        >
                          <v-text-field
                            v-model="editedItem.autor"
                            label="Autor"
                            :rules="textRules"
                            maxlength="20"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" v-else>
                          <v-card-title style="font-size: 16px"
                            >Autor</v-card-title
                          >

                          <v-card-subtitle>
                            {{ editedItem.autor }}
                          </v-card-subtitle>
                        </v-col>
                        <!-------------------------------------------------- Estudiantes---------------------------------------------------->

                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                          v-if="desabilitado == false"
                        >
                          <v-text-field
                            v-model="editedItem.titulo_revista"
                            label="Título revista"
                            :rules="textRules"
                            maxlength="25"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" v-else>
                          <v-card-title style="font-size: 16px"
                            >Título revista</v-card-title
                          >

                          <v-card-subtitle>
                            {{ editedItem.titulo_revista }}
                          </v-card-subtitle>
                        </v-col>

                        <!-------------------------------------------------- Volumen---------------------------------------------------->
                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                          v-if="desabilitado == false"
                        >
                          <v-text-field
                            v-model="editedItem.volumen"
                            label="Volumen"
                            :rules="textRules"
                            maxlength="25"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" v-else>
                          <v-card-title style="font-size: 16px">
                            Volumen
                          </v-card-title>

                          <v-card-subtitle>
                            {{ editedItem.volumen }}
                          </v-card-subtitle>
                        </v-col>

                        <!-------------------------------------------------- Tareas cátedra honoríficas---------------------------------------------------->

                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                          v-if="desabilitado == false"
                        >
                          <v-text-field
                            v-model="editedItem.pagina_inicial"
                            label="Página inicial"
                            :rules="numberRules"
                            maxlength="25"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" v-else>
                          <v-card-title style="font-size: 16px">
                            Página inicial
                          </v-card-title>

                          <v-card-subtitle>
                            {{ editedItem.pagina_inicial }}
                          </v-card-subtitle>
                        </v-col>
                        <!-------------------------------------------------- Tareas cátedra honoríficas---------------------------------------------------->

                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                          v-if="desabilitado == false"
                        >
                          <v-text-field
                            v-model="editedItem.pagina_final"
                            label="Página final"
                            :rules="numberRules"
                            maxlength="25"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" v-else>
                          <v-card-title style="font-size: 16px">
                            Página final
                          </v-card-title>

                          <v-card-subtitle>
                            {{ editedItem.pagina_final }}
                          </v-card-subtitle>
                        </v-col>
                        <!-------------------------------------------------- Tareas cátedra honoríficas---------------------------------------------------->

                        <v-col
                          cols="12"
                          sm="6"
                          md="3"
                          v-if="desabilitado == false"
                        >
                          <v-select
                            :items="nivel"
                            v-model="editedItem.nivel"
                            label="Nivel"
                            class="d-flex"
                          ></v-select>
                        </v-col>

                        <v-col cols="12" sm="6" md="4" v-else>
                          <v-card-title style="font-size: 16px">
                            Nivel
                          </v-card-title>

                          <v-card-subtitle>
                            {{ editedItem.nivel }}
                          </v-card-subtitle>
                        </v-col>
                        <!-------------------------------------------------- Tareas cátedra honoríficas---------------------------------------------------->

                        <v-col
                          cols="12"
                          sm="6"
                          md="4"
                          v-if="desabilitado == false"
                        >
                          <v-text-field
                            v-model="editedItem.numero"
                            label="Número"
                            :rules="numberRules"
                            maxlength="25"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" v-else>
                          <v-card-title style="font-size: 16px">
                            Número
                          </v-card-title>

                          <v-card-subtitle>
                            {{ editedItem.numero }}
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
      title: 'Revista',
    }
  },
  data: () => ({
    menu1: false,
    nivel: ['1ra', '2da', '3ra', '4ta', '5ta'],

    textRules: [
      (v) => !!v || 'Campo requerido',
      (v) =>
        (!v || /^[A-ZÁÉÍÓÚÑa-záéíóúñ ]+$/.test(v)) || 'El campo es sólo letras',
    ],
    numberRules: [
      (v) => !!v || 'Campo requerido',
      (v) => (!v || /^[0-9 -]+$/.test(v)) || 'El campo es sólo números',
    ],
    search: '',
    dialog: false,
    dialogDelete: false,
    desabilitado: false,

    headers: [
      {
        text: 'Título',
        align: 'start',
        sortable: true,
        value: 'titulo',
      },
      { text: 'Fecha de publicación', value: 'fecha_publicacion' },
      { text: 'Título revista', value: 'titulo_revista' },
      { text: 'Volumen', value: 'volumen' },
      { text: 'Nivel', value: 'nivel' },

      { text: 'Acciones', value: 'actions', sortable: false },

      ,
    ],
    revista: [],
    editedIndex: -1,
    editedItem: {
      titulo: null,
      fecha_publicacion: null,
      autor: null,
      titulo_revista: null,
      volumen: null,
      pagina_inicial: null,
      pagina_final: null,
      nivel: null,
      numero: null,
    },
    defaultItem: {
      titulo: null,
      fecha_publicacion: null,
      autor: null,
      titulo_revista: null,
      volumen: null,
      pagina_inicial: null,
      pagina_final: null,
      nivel: null,
      numero: null,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Revista' : 'Revista'
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
        const revistaUrl = await this.$axios.$get('/api/revista')
        this.revista = revistaUrl.map((item) => {
          return {
            idPublicacion: item.idPublicacion,
            titulo: item.titulo,
            fecha_publicacion: item.fecha_publicacion,
            autor: item.autor,
            titulo_revista: item.titulo_revista,
            volumen: item.volumen,
            pagina_inicial: item.pagina_inicial,
            pagina_final: item.pagina_final,
            nivel: item.nivel,
            numero: item.numero,
          }
        })
      } catch (error) {
        console.error(error)
      }
    },

    editItem(item) {
      this.editedIndex = this.revista.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
     showItem(item) {
      this.editedIndex = this.revista.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
      this.desabilitado = true
    },

    deleteItem(item) {
      this.editedIndex = this.revista.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      const idPublicacion = this.revista[this.editedIndex].idPublicacion

      try {
        await this.$axios.$delete(`/api/revista/${idPublicacion}`)
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
      let { editedItem, editedIndex, revista } = this
      const url = '/api/revista/'
      const id = editedIndex >= 0 ? revista[editedIndex].idPublicacion : ''
      const requestData = {
        titulo: editedItem.titulo,
        fecha_publicacion: editedItem.fecha_publicacion,
        autor: editedItem.autor,
        titulo_revista: editedItem.titulo_revista,
        volumen: editedItem.volumen,
        pagina_inicial: editedItem.pagina_inicial,
        pagina_final: editedItem.pagina_final,
        nivel: editedItem.nivel,
        numero: editedItem.numero,
      }
      try {
        if (editedIndex > -1) {
          await this.$axios.$put(`${url}${id}/`, requestData)
        } else await this.$axios.$post(url, requestData)
      } catch (error) {
        console.error(error)
      }
      revista = []
      await this.initialize()
      this.close()
    },
  },
}
</script>
