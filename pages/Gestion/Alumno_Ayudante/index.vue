<template>
  <v-container mt-5>
    <v-data-table
      :headers="headers"
      :items="alumno_ayudante"
      sort-by="search"
      class="elevation-1 px-4"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title style="color: #01579b"
            >Alumno ayudante</v-toolbar-title
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
                <v-icon fab dark>mdi-plus-thick </v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-form
                    @click="save"
                    ref="form"
                    enctype="multipart/form-data"
                    lazy-validation
                  >
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.nombre_alumno_ayudante"
                          label="Nombre"
                          :rules="textRules"
                          maxlength="15"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.apellido"
                          label="Apellidos"
                          :rules="textRules"
                          maxlength="15"
                          required
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          :items="agno_academico"
                          v-model="editedItem.agno_academico"
                          label="Años como alumno ayud."
                          class="d-flex"
                          :rules="[(v) => !!v || 'Campo requerido']"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-file-input
                          ref="plan"
                          accept=".pdf,.xlsx,.docx"
                          small-chips
                          truncate-length="15"
                          v-model="editedItem.plan"
                          label="Tareas"
                          class="d-flex"
                        ></v-file-input>
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
                <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                  @keydown.enter.native="save"
                  tabindex="1"
                >
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
      <template v-slot:item.plan="{ item }">
        <a
          :href="item.plan_url"
          target="_blank"
          @click.prevent="downloadFile(item)"
          >{{ item.plan }}</a
        >
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
      title: 'Alumnos Ayudantes',
    }
  },
  data: () => ({
    agno_academico: ['1', '2', '3', '4', '5'],
    textRules: [
      (v) => !!v || 'Campo requerido',
      (v) =>
        !v || /^[A-ZÁÉÍÓÚÑa-záéíóúñ -]+$/.test(v) || 'El campo es sólo letras',
    ],

    search: '',
    dialog: false,
    dialogDelete: false,
    // eslint-disable-next-line no-sparse-arrays
    headers: [
      {
        text: 'Nombre',
        align: 'start',
        sortable: true,
        value: 'nombre_alumno_ayudante',
      },
      { text: 'Apellidos', value: 'apellido' },
      {
        text: 'Años como alum. ayud.',
        align: 'center',
        value: 'agno_academico',
      },
      {
        text: 'Tareas',
        align: 'start',
        value: 'plan',
      },

      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    alumno_ayudante: [],
    editedIndex: -1,
    editedItem: {
      nombre_alumno_ayudante: null,
      apellido: null,
      agno_academico: null,
      plan: null,
    },
    defaultItem: {
      nombre_alumno_ayudante: null,
      apellido: null,
      agno_academico: null,
      plan: null,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Alumno ayudante' : 'Alumno ayudante'
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
        const response = await this.$axios.$get('/api/alumno_ayudante')
        this.alumno_ayudante = response.map((item) => {
          return {
            idAlumno_ayudante: item.idAlumno_ayudante,
            nombre_alumno_ayudante: item.nombre_alumno_ayudante,
            apellido: item.apellido,
            agno_academico: item.agno_academico,
            plan: item.plan,
            plan_url: `${this.$axios.defaults.baseURL}/download/alumno_ayudante/${item.idAlumno_ayudante}/plan/`,
          }
        })
      } catch (error) {
        console.error(error)
      }
    },
    async downloadFile(item) {
      try {
        const response = await fetch(item.plan_url)
        if (!response.ok) {
          throw new Error(`El archivo "${item.plan}" no se pudo encontrar`)
        }
        const aux = await response.blob()
        const url = URL.createObjectURL(aux)
        const aux2 = document.createElement('a')
        aux2.href = url
        aux2.download = item.plan
        document.body.appendChild(aux2)
        aux2.click()
        document.body.removeChild(aux2)
      } catch (error) {
        alert(error.message)
      }
    },

    async editItem(item) {
      this.editedIndex = this.alumno_ayudante.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editedItem.plan = null
      this.dialog = true
    },
    deleteItem(item) {
      this.editedIndex = this.alumno_ayudante.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },


    async deleteItemConfirm() {
      const idAlumno_ayudante =
        this.alumno_ayudante[this.editedIndex].idAlumno_ayudante

      try {
        await this.$axios.$delete(`/api/alumno_ayudante/${idAlumno_ayudante}`)
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

      const { editedItem, editedIndex, alumno_ayudante } = this
      const url = '/api/alumno_ayudante/'
      const id =
        editedIndex >= 0
          ? alumno_ayudante[editedIndex].idAlumno_ayudante + '/'
          : ''
      const formData = new FormData()

      formData.append(
        'nombre_alumno_ayudante',
        editedItem.nombre_alumno_ayudante
      )
      formData.append('apellido', editedItem.apellido)
      formData.append('agno_academico', editedItem.agno_academico)

      if (editedItem.plan !== null) {
        formData.append('plan', editedItem.plan)
      }

      try {
        if (editedIndex > -1) {
          await this.$axios.$put(`${url}${id}`, formData)
        } else await this.$axios.$post(url, formData)
      } catch (error) {
        console.error(error)
      }

      this.alumno_ayudante = []
      await this.initialize()
      this.close()
    },
  },
}
</script>
