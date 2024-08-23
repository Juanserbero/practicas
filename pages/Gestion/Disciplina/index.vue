<template>
  <v-container mt-5>
    <v-data-table
      :headers="headers"
      :items="disciplina"
      sort-by="search"
      class="elevation-1 px-4"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title style="color: #01579b">Disciplinas</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <v-dialog v-model="dialog" max-width="600px">
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
                    <v-row style="padding: 0px">
                      <!-------------------------------------------------- nombre de disciplina ---------------------------------------------------->
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.nombre_disciplina"
                          label="Nombre de la disciplina"
                          :rules="textRules"
                          maxlength="15"
                          required
                        ></v-text-field>
                      </v-col>

                      <!------------------------------------------- plan_trabajo_metodologico ---------------------------------------------------->

                      <v-col cols="12" sm="6" md="4">
                        <v-file-input
                          accept=".pdf,.xlsx,.docx"
                          small-chips
                          truncate-length="15"
                          v-model="editedItem.plan_trabajo_metodologico"
                          label="Plan trab. metodológico"
                          class="d-flex"
                        ></v-file-input>
                      </v-col>
                      <!-------------------------------------------------- Carrera---------------------------------------------------->

                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          :items="carrera"
                          v-model="editedItem.idCarrera"
                          label="Carrera"
                          class="d-flex"
                          item-value="idCarrera"
                          :item-text="(item) => item.nombre_carrera"
                        ></v-select>
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
      <template v-slot:item.plan_trabajo_metodologico="{ item }">
        <a
          :href="item.plan_trabajo_metodologico_url"
          target="_blank"
          @click.prevent="downloadFile(item)"
          >{{ item.plan_trabajo_metodologico }}</a
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
const axios = require('axios')
export default {
  head() {
    return {
      title: 'Disciplina',
    }
  },
  data: () => ({
    textRules: [
      (v) => !!v || 'Campo requerido',
      (v) =>
        !v || /^[A-ZÁÉÍÓÚÑa-záéíóúñ ]+$/.test(v) || 'El campo es sólo letras',
    ],
    numberRules: [
      (v) => !!v || 'Campo requerido',
      (v) => !v || /^[0-9 -]+$/.test(v) || 'El campo es sólo números',
    ],

    search: '',
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Nombre Disciplina',
        align: 'start',
        sortable: true,
        value: 'nombre_disciplina',
      },
      { text: 'Plan trab. metodológico', value: 'plan_trabajo_metodologico' },
      { text: 'Carrera', value: 'idCarrera' },
      { text: 'Jefe', value: 'idTrabajador' },

      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    disciplina: [],
    carrera: {},
    profesor: {},

    editedIndex: -1,
    editedItem: {
      nombre_disciplina: null,
      plan_trabajo_metodologico: null,

      idCarrera: null,
      idTrabajador: null,
    },
    defaultItem: {
      nombre_disciplina: null,
      plan_trabajo_metodologico: null,

      idCarrera: null,
      idTrabajador: null,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Disciplina' : 'Disciplina'
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
    await Promise.all([this.getProfesor(), this.getCarrera()])
    await this.initialize()
  },

  methods: {
    async initialize() {
      try {
        const disciplinaUrl = await this.$axios.$get('/api/disciplina')
        this.disciplina = disciplinaUrl.map((item) => {
          const carreraAux = item.idCarrera
            ? this.carrera.find(
                (carrera) => carrera.idCarrera === item.idCarrera
              ).nombre_carrera
            : null
          const profAux = item.jefe
            .map((id) =>
              this.profesor.find((profesor) => profesor.idTrabajador === id)
            )
            .filter((profesor) => profesor !== undefined)
          return {
            idDisciplina: item.idDisciplina,
            nombre_disciplina: item.nombre_disciplina,
            plan_trabajo_metodologico: item.plan_trabajo_metodologico,
            idCarrera: carreraAux,
            idTrabajador: profAux.map(
              (trabajador) =>
                `${trabajador.nombre_trabajador} ${trabajador.apellido}`
            ),
            plan_trabajo_metodologico_url: `${this.$axios.defaults.baseURL}/download/disciplina/${item.idDisciplina}/plan_trabajo_metodologico/`,
          }
        })
      } catch (error) {
        console.error(error)
      }
    },
    downloadFile(item) {
      fetch(item.plan_trabajo_metodologico_url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `El archivo "${item.plan_trabajo_metodologico}" no se pudo encontrar`
            )
          }
          return response.blob()
        })
        .then((blob) => {
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = item.plan_trabajo_metodologico
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
        })
        .catch((error) => {
          alert(error.message)
        })
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
      this.editedIndex = this.disciplina.indexOf(item)
      this.editedItem = Object.assign({}, item)
      const carreraAux = this.carrera.find(
        (carrera) => this.editedItem.idCarrera === carrera.nombre_carrera
      )
      this.editedItem.idCarrera = carreraAux
      this.editedItem.plan_trabajo_metodologico = null
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.disciplina.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      const idDisciplina = this.disciplina[this.editedIndex].idDisciplina

      try {
        await this.$axios.$delete(`/api/disciplina/${idDisciplina}`)
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

      const { editedItem, editedIndex, disciplina } = this
      const url = '/api/disciplina/'
      console.log('editedItem.idCarrera', editedItem.idCarrera)
      const id =
        editedIndex >= 0 ? disciplina[editedIndex].idDisciplina + '/' : ''
      const formData = new FormData()

      formData.append('nombre_disciplina', editedItem.nombre_disciplina)

      if (editedItem.plan_trabajo_metodologico !== null) {
        formData.append(
          'plan_trabajo_metodologico',
          editedItem.plan_trabajo_metodologico
        )
      }
      formData.append(
        'idCarrera',
        editedItem.idCarrera
          ? editedItem.idCarrera.idCarrera || editedItem.idCarrera
          : null
      )

      try {
        if (editedIndex > -1) {
          await this.$axios.$put(`${url}${id}`, formData)
        } else {
          await this.$axios.$post(url, formData)
        }
      } catch (error) {
        console.error(error)
      }

      this.disciplina = []
      await this.initialize()
      this.close()
    },
  },
}
</script>
