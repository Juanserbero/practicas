<template>
  <v-container mt-5>
    <v-data-table
      :headers="headers"
      :items="profesor"
      sort-by="search"
      class="elevation-1 px-4"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title style="color: #01579b">Profesores</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <v-dialog v-model="dialog" max-width="900px">
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
                      <!-------------------------------------------------- nombre de profesor ---------------------------------------------------->
                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        class="my-n5"
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

                      <v-col cols="12" sm="6" md="3" class="my-n5" v-else>
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
                        md="3"
                        class="my-n5"
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

                      <v-col cols="12" sm="6" md="3" class="my-n5" v-else>
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
                        md="3"
                        class="my-n5"
                        v-if="desabilitado == false"
                      >
                        <v-text-field
                          v-model="editedItem.edad"
                          label="Edad"
                          maxlength="2"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="3" class="my-n5" v-else>
                        <v-card-title style="font-size: 16px">
                          Edad
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.edad }}
                        </v-card-subtitle>
                      </v-col>
                      <!--------------------------------------------------graduado_de ---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        class="my-n5"
                        v-if="desabilitado == false"
                      >
                        <v-text-field
                          v-model="editedItem.graduado_de"
                          label="Graduado de "
                          :rules="textRules"
                          maxlength="50"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="3" class="my-n5" v-else>
                        <v-card-title style="font-size: 16px">
                          Graduado de
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.agnos_exp_educ_superior }}
                        </v-card-subtitle>
                      </v-col>

                      <!-------------------------------------------------- titulo_academico---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        class="my-n5"
                        v-if="desabilitado == false"
                      >
                        <v-select
                          :items="titulo_academico"
                          v-model="editedItem.titulo_academico"
                          label="Título académico"
                          class="d-flex"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="3" class="my-n5" v-else>
                        <v-card-title style="font-size: 16px">
                          Título académico
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.titulo_academico }}
                        </v-card-subtitle>
                      </v-col>
                      <!-------------------------------------------------------ujc ---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        class="my-n5"
                        v-if="desabilitado == false"
                      >
                        <v-select
                          :items="boolean"
                          v-model="editedItem.ujc"
                          label="Miembro UJC"
                          class="d-flex"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="3" class="my-n5" v-else>
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
                        md="3"
                        class="my-n5"
                        v-if="desabilitado == false"
                      >
                        <v-select
                          :items="boolean"
                          v-model="editedItem.pcc"
                          label="Miembro PCC"
                          class="d-flex"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="3" class="my-n5" v-else>
                        <v-card-title style="font-size: 16px">
                          Miembro PCC
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.pcc }}
                        </v-card-subtitle>
                      </v-col>
                      <!--------------------------------------------------cargo_direccion ---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        class="my-n5"
                        v-if="desabilitado == false"
                      >
                        <v-select
                          :items="cargo_direccion"
                          v-model="editedItem.cargo_direccion"
                          label="Cargo de dirección"
                          class="d-flex"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="3" class="my-n5" v-else>
                        <v-card-title style="font-size: 16px">
                          Cargo dirección
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.cargo_direccion }}
                        </v-card-subtitle>
                      </v-col>
                      <!--------------------------------------------------doctor ---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        class="my-n5"
                        v-if="desabilitado == false"
                      >
                        <v-select
                          :items="boolean"
                          v-model="editedItem.doctor"
                          label="Grado científico"
                          class="d-flex"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="3" class="my-n5" v-else>
                        <v-card-title style="font-size: 16px">
                          Grado científico
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.doctor }}
                        </v-card-subtitle>
                      </v-col>
                      <!--------------------------------------------------categoria_docente ---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        class="my-n5"
                        v-if="desabilitado == false"
                      >
                        <v-select
                          :items="categoria_docente"
                          v-model="editedItem.categoria_docente"
                          label="Catégoria docente"
                          class="d-flex"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="3" class="my-n5" v-else>
                        <v-card-title style="font-size: 16px">
                          Categoría docente
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.categoria_docente }}
                        </v-card-subtitle>
                      </v-col>
                      <!--------------------------------------------------agnos_exp_educ_superior ---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        class="my-n5"
                        v-if="desabilitado == false"
                      >
                        <v-text-field
                          v-model="editedItem.agnos_exp_educ_superior"
                          label="Años experiencia MES"
                          :rules="numberRules"
                          maxlength="2"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="3" class="my-n5" v-else>
                        <v-card-title style="font-size: 16px">
                          Años exp. MES
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.agnos_exp_educ_superior }}
                        </v-card-subtitle>
                      </v-col>
                      <!--------------------------------------------------tiempo_parcial ---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        class="my-n5"
                        v-if="desabilitado == false"
                      >
                        <v-select
                          :items="boolean"
                          v-model="editedItem.tiempo_parcial"
                          label="Prof. tiempo parcial"
                          class="d-flex"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="3" class="my-n5" v-else>
                        <v-card-title style="font-size: 16px">
                          Prof. tiempo parcial
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.tiempo_parcial }}
                        </v-card-subtitle>
                      </v-col>
                      <!--------------------------------------------------ppa ---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        class="my-n5"
                        v-if="desabilitado == false"
                      >
                        <v-select
                          :items="boolean"
                          v-model="editedItem.ppa"
                          label="PPA"
                          class="d-flex"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="3" class="my-n5" v-else>
                        <v-card-title style="font-size: 16px">
                          PPA
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.ppa }}
                        </v-card-subtitle>
                      </v-col>
                      <!--------------------------------------------------guia ---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        class="my-n5"
                        v-if="desabilitado == false"
                      >
                        <v-select
                          :items="boolean"
                          v-model="editedItem.guia"
                          label="Guía"
                          class="d-flex"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="3" class="my-n5" v-else>
                        <v-card-title style="font-size: 16px">
                          Guía
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.guia }}
                        </v-card-subtitle>
                      </v-col>
                      <!--------------------------------------------------jefe_diciplina ---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        class="my-n5"
                        v-if="desabilitado == false"
                      >
                        <v-select
                          :items="boolean"
                          v-model="editedItem.jefe_diciplina"
                          label="Jefe disciplina"
                          class="d-flex"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="3" class="my-n5" v-else>
                        <v-card-title style="font-size: 16px">
                          Jefe disciplina
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.jefe_diciplina }}
                        </v-card-subtitle>
                      </v-col>
                      <!--------------------------------------------------jefe_carrera ---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        class="my-n5"
                        v-if="desabilitado == false"
                      >
                        <v-select
                          :items="boolean"
                          v-model="editedItem.jefe_carrera"
                          label="Jefe carrera"
                          class="d-flex"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="3" class="my-n5" v-else>
                        <v-card-title style="font-size: 16px">
                          Jefe carrera
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.jefe_carrera }}
                        </v-card-subtitle>
                      </v-col>
                      <!--------------------------------------------------jefe_departamento ---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        class="my-n5"
                        v-if="desabilitado == false"
                      >
                        <v-select
                          :items="boolean"
                          v-model="editedItem.jefe_departamento"
                          label="Jefe Dpto"
                          class="d-flex"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="3" class="my-n5" v-else>
                        <v-card-title style="font-size: 16px">
                          Jefe Dpto
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.jefe_departamento }}
                        </v-card-subtitle>
                      </v-col>
                      <!--------------------------------------------------otras_funciones ---------------------------------------------------->

                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        class="my-n5"
                        v-if="desabilitado == false"
                      >
                        <v-text-field
                          v-model="editedItem.otras_funciones"
                          label="Otras funciones"
                          :rules="textRules"
                          maxlength="100"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="3" class="my-n5" v-else>
                        <v-card-title style="font-size: 16px">
                          Otras funciones
                        </v-card-title>

                        <v-card-subtitle>
                          {{ editedItem.otras_funciones }}
                        </v-card-subtitle>
                      </v-col>
                      <!-- --------------------------------------- idCargo_metodologico--------------------------------------------------  -->
                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        class="my-n5"
                        v-if="desabilitado == true"
                      >
                        <v-card-title style="font-size: 16px"
                          >Cargo metodológico</v-card-title
                        >

                        <v-card-subtitle>
                          {{ editedItem.idCargo_metodologico.join(', ') }}
                        </v-card-subtitle>
                      </v-col>
                      <!-- --------------------------------------- idPosgrado-------------------------------------------------- -->
                      <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        class="my-n5"
                        v-if="desabilitado == true"
                      >
                        <v-card-title style="font-size: 16px"
                          >Postgrado</v-card-title
                        >

                        <v-card-subtitle>
                          {{ editedItem.idPosgrado.join(', ') }}
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
      title: 'Profesores',
    }
  },
  data: () => ({
    boolean: ['Si', 'No'],
    titulo_academico: ['Máster', 'Especialista', 'Ambos'],
    cargo_direccion: [
      'Rector',
      'Vicerector',
      'Decano',
      'Vicedecano',
      'Jefe Dpto',
    ],
    doctor: ['Master', 'Doctor'],
    categoria_docente: ['Instructor', 'Asistente', 'Auxiliar', 'Titular'],
    menu1: false,
    menu2: false,

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
        value: 'nombre_trabajador',
      },
      //   { text: 'Apellidos', value: 'apellido' },
      //   { text: 'Edad', value: 'edad' },
      //   { text: 'Título académico', value: 'titulo_academico' },
      //   { text: 'Militancia', value: 'militancia' },
      // { text: 'Cargo dirección', value: 'cargo_direccion' },
      { text: 'Grado científico', value: 'doctor' },
      { text: 'Categoría docente', value: 'categoria_docente' },
      // { text: 'Años experiencia MES', value: 'agnos_exp_educ_superior' },
      // { text: 'tiempo_parcial', value: 'tiempo_parcial' },
      { text: 'PPA', value: 'ppa' },
      // { text: 'Guía', value: 'guia' },
      { text: 'Jefe disciplina', value: 'jefe_diciplina' },
      // { text: 'Jefe carrera', value: 'jefe_carrera' },
      { text: 'Jefe Dpto', value: 'jefe_departamento' },
      // { text: 'Otras funciones', value: 'otras_funciones' },
      // { text: 'Cargo metodológico', value: 'idCargo_metodologico' },
      { text: 'Posgrado', value: 'idPosgrado' },

      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    profesor: [],
    mostrar_cargo_metodologico: [],
    mostrar_posgrado: [],
    cargo_metodologico: {},
    posgrado: {},

    editedIndex: -1,
    editedItem: {
      nombre_trabajador: null,
      apellido: null,
      edad: null,
      graduado_de: null,
      titulo_academico: null,
      cargo_direccion: null,
      doctor: null,
      categoria_docente: null,
      agnos_exp_educ_superior: null,
      tiempo_parcial: null,
      ppa: null,
      guia: null,
      jefe_diciplina: null,
      jefe_carrera: null,
      jefe_departamento: null,
      otras_funciones: null,
      idCargo_metodologico: null,
      idPosgrado: null,
    },
    defaultItem: {
      nombre_trabajador: null,
      apellido: null,
      edad: null,
      graduado_de: null,
      titulo_academico: null,
      cargo_direccion: null,
      doctor: null,
      categoria_docente: null,
      agnos_exp_educ_superior: null,
      tiempo_parcial: null,
      ppa: null,
      guia: null,
      jefe_diciplina: null,
      jefe_carrera: null,
      jefe_departamento: null,
      otras_funciones: null,
      idCargo_metodologico: null,
      idPosgrado: null,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Profesor' : 'Profesor'
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
    await Promise.all([this.getCargo_metodologico(), this.getPosgrado()])
    await this.initialize()
  },

  methods: {
    async initialize() {
      try {
        const profesorUrl = await this.$axios.$get('/api/profesor')
        this.profesor = profesorUrl.map((item) => {
          const cargoAux = item.idCargo_metodologico
            .map((id) =>
              this.cargo_metodologico.find(
                (cargo) => cargo.idCargo_metodologico === id
              )
            )
            .filter((cargo) => cargo !== undefined)

          const posgradoAux = item.idPosgrado
            .map((id) =>
              this.posgrado.find((posgrado) => posgrado.idPosgrado === id)
            )
            .filter((posgrado) => posgrado !== undefined)

          return {
            idTrabajador: item.idTrabajador,
            nombre_trabajador: item.nombre_trabajador,
            apellido: item.apellido,
            edad: item.edad,
            graduado_de: item.graduado_de,
            titulo_academico: item.titulo_academico,
            militancia: item.militancia,
            cargo_direccion: item.cargo_direccion,
            doctor: item.doctor,
            categoria_docente: item.categoria_docente,
            agnos_exp_educ_superior: item.agnos_exp_educ_superior,
            tiempo_parcial: item.tiempo_parcial,
            ppa: item.ppa,
            ujc: item.ujc,
            pcc: item.pcc,
            guia: item.guia,
            jefe_diciplina: item.jefe_diciplina,
            jefe_carrera: item.jefe_carrera,
            jefe_departamento: item.jefe_departamento,
            otras_funciones: item.otras_funciones,

            idCargo_metodologico: cargoAux.map((cargo) => cargo.cargo),
            idPosgrado: posgradoAux.map((posgrado) => posgrado.nombre_posgrado),
          }
        })
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
        console.log('cargo_metodologico,', this.cargo_metodologico)
      } catch (error) {
        console.error(error)
      }
    },
    async getPosgrado() {
      try {
        const response = await this.$axios.$get('/api/posgrado')
        this.posgrado = response.map((item) => ({
          idPosgrado: item.idPosgrado,
          nombre_posgrado: item.nombre_posgrado,
        }))
      } catch (error) {
        console.error(error)
      }
    },

    editItem(item) {
      this.editedIndex = this.profesor.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    showItem(item) {
      this.editedIndex = this.profesor.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
      this.desabilitado = true
    },

    deleteItem(item) {
      this.editedIndex = this.profesor.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      const idTrabajador = this.profesor[this.editedIndex].idTrabajador

      try {
        await this.$axios.$delete(`/api/profesor/${idTrabajador}`)
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

      let { editedItem, editedIndex, profesor } = this
      const url = '/api/profesor/'
      const id = editedIndex >= 0 ? profesor[editedIndex].idTrabajador : ''
      const requestData = {
        nombre_trabajador: editedItem.nombre_trabajador,
        apellido: editedItem.apellido,
        edad: editedItem.edad,
        graduado_de: editedItem.graduado_de,
        titulo_academico: editedItem.titulo_academico,
        ujc: editedItem.ujc,
        pcc: editedItem.pcc,
        cargo_direccion: editedItem.cargo_direccion,
        doctor: editedItem.doctor,
        categoria_docente: editedItem.categoria_docente,
        agnos_exp_educ_superior: editedItem.agnos_exp_educ_superior,
        tiempo_parcial: editedItem.tiempo_parcial,
        ppa: editedItem.ppa,
        guia: editedItem.guia,
        jefe_diciplina: editedItem.jefe_diciplina,
        jefe_carrera: editedItem.jefe_carrera,
        jefe_departamento: editedItem.jefe_departamento,
        otras_funciones: editedItem.otras_funciones,
      }
      try {
        if (editedIndex > -1) {
          await this.$axios.$put(`${url}${id}/`, requestData)
        } else await this.$axios.$post(url, requestData)
      } catch (error) {
        console.error(error)
      }
      profesor = []
      await this.initialize()
      this.close()
    },
  },
}
</script>
