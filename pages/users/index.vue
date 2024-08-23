<template>
	<v-container mt-5>
		<v-data-table :headers="headers"
									:items="user"
									sort-by="search"
									class="elevation-1 px-4">
			<template v-slot:top>
				<v-toolbar flat>
					<v-toolbar-title>GESTIONAR USUARIOS</v-toolbar-title>
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
									<v-row>
										<v-col cols="12" sm="6" md="4">
											<v-text-field v-model="editedItem.username"
																		label="Usuario"></v-text-field>
										</v-col>

										<v-col cols="12" sm="6" md="4">
											<v-select :items="rol"
																v-model="editedItem.rol"
																label="Rol"></v-select>
										</v-col>

										<v-col cols="12" sm="6" md="4">
											<v-text-field v-model="editedItem.email"
																		label="Correo"></v-text-field>
										</v-col>
										<v-col cols="12" sm="6" md="4">
											<v-text-field v-model="editedItem.name"
																		label="Nombre"></v-text-field>
										</v-col>
										<v-col cols="12" sm="6" md="4">
											<v-text-field v-model="editedItem.last_name"
																		label="Apellidos"></v-text-field>
										</v-col>
										<v-col cols="12" sm="6" md="4">
											<v-text-field v-model="editedItem.password"
																		label="Contraseña" type="password"></v-text-field>
										</v-col>
									</v-row>
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
							<v-card-title class="text-h6 pl-11">¿Seguro que desea eliminar este elemento?</v-card-title>
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
								<v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
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
				<v-icon color="primary" @click="initialize"> mdi-restart </v-icon>
</template>
		</v-data-table>
	</v-container>
</template>

<script>
	import { mapState } from 'vuex'
	const axios = require('axios')
	export default {
		head(){
			return{
				title:'Gestión de usuarios',

			}

		},
		data: () => ({

			rol: ['administrador', 'usuario'],
			textRules: [
				(v) => !!v || "Campo requerido",
				(v) =>
					(!v || /^[A-ZÁÉÍÓÚÑ]{1}[a-záéíóúñ, ]+$/.test(v)) || "El campo es sólo letras y debe comenzar con mayúsculas",
			],
			search: '',
			dialog: false,
			dialogDelete: false,
			// eslint-disable-next-line no-sparse-arrays
			headers: [
				{
					text: 'Usuario',
					align: 'start',
					sortable: true,
					value: 'username',
				},
				{ text: 'Nombre', value: 'name' },
				{ text: 'Apellidos', value: 'last_name' },
				{ text: 'Rol', value: 'rol' },
				{ text: 'Correo', value: 'email' },
				{ text: 'Acciones', value: 'actions', sortable: false },
			],
			user: [],
			editedIndex: -1,
			editedItem: {
				username: null,
				rol: null,
				email: null,
				name: null,
				last_name: null,
			},
			defaultItem: {
				username: null,
				rol: null,
				email: null,
				name: null,
				last_name: null,
			},
		}),

		computed: {
			formTitle() {
				return this.editedIndex === -1
					? 'Usuario'
					: 'Usuario'
			},
			username() {
				console.log('hola');
				console.log(this.$auth.$storage.getUniversal('user').username);
				return this.$auth.$storage.getUniversal('user').rol

			},
			...mapState('auth', ['loggedIn']),
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
				// eslint-disable-next-line no-unused-vars
				await axios
					.get('http://localhost:8000/users')
					.then((response) => {
						/*            console.log("hola",response)*/
						response.data.forEach((item) => {
							this.user.push({
								id: item.id,
								username: item.username,
								rol: item.rol,
								email: item.email,
								name: item.name,
								last_name: item.last_name,
							})
						})
					})
					.catch((error) => {
						console.error(error)
					})
			},

			editItem(item) {
				this.editedIndex = this.user.indexOf(item)
				this.editedItem = Object.assign({}, item)
				this.dialog = true
			},

			deleteItem(item) {
				this.editedIndex = this.user.indexOf(item)
				this.editedItem = Object.assign({}, item)
				this.dialogDelete = true
			},

			async deleteItemConfirm() {
				await axios
					.delete(
						'http://localhost:8000/users/' +
						this.user[this.editedIndex].id +
						'/'
					)
					.then((response) => console.log(response))
					.catch((error) => console.log('Error: ' + error))
				this.user = []
				await this.initialize()
				this.closeDelete()
			},

			close() {
				this.dialog = false
				this.$nextTick(() => {
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
				if (this.editedIndex > -1) {
					console.log(this.user[this.editedIndex].user_id)
					await axios
						.put(
							'http://localhost:8000/users/' +
							this.user[this.editedIndex].id +
							'/',

							{
								username: this.editedItem.username,
								rol: this.editedItem.rol,
								email: this.editedItem.email,
								name: this.editedItem.name,
								last_name: this.editedItem.last_name,
								password: this.editedItem.password,
							}
						)
						.then((response) => {
							console.log(response)
						})
						.catch((error) => {
							console.error(error)
						})
				} else {
					console.log('this.editedItem.rol',this.editedItem.rol)
					await axios
						.post('http://localhost:8000/users/', {
							username: this.editedItem.username,
							rol: this.editedItem.rol,
							email: this.editedItem.email,
							name: this.editedItem.name,
							last_name: this.editedItem.last_name,
							password: this.editedItem.password,
						})
						.then((response) => {
							console.log(response)
						})
						.catch((error) => {
							console.error(error)
						})
				}
				this.user = []
				await this.initialize()
				this.close()
			},
		},
	}
</script>
