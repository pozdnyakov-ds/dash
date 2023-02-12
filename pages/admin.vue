<template>
    <div>
        <h1>{{ $t('admin.title') }}</h1>
        <br>
        <p><b>Add new user </b></p>
        <v-card style="margin: 10px 0 20px 0; border: 1px solid #ccc; padding: 10px;">
            <v-form v-model="valid">
                <v-container>
                    <v-row>
                        <v-col style="margin-right: 30px;">
                            <div class="input-group mb-3">
                                <v-text-field v-model="userInfo.name" label="Name" type="text" counter=64 outlined />
                            </div>
                        </v-col>
                        <v-col>
                            <div class="input-group mb-3">
                                <v-text-field v-model="userInfo.email" label="Email" type="email" counter=64 outlined />
                            </div>
                        </v-col>
                    </v-row>                    
                    <v-row>
                        <v-col style="margin-right: 30px;">
                            <v-text-field v-model="userInfo.surname" label="Surname" type="text" counter=64 outlined />
                        </v-col>
                        <v-col>
                            <div class="input-group mb-3">
                                <v-text-field v-model="userInfo.password" label="Password" type="password" counter=64 outlined />
                            </div>
                        </v-col>
                    </v-row>
                    <v-row>
                        <div class="col-3" style="padding: 0px; margin-bottom: 0px;">
                            <v-btn style="background-color: #119DFF; color: #fff;" block @click.prevent="submitForm(userInfo)" :disabled="!valid">Add</v-btn>
                        </div>
                    </v-row>
                </v-container>    
            </v-form>    
        </v-card>

        <p><b>Registered Users </b></p>
        <v-card style="margin-top: 10px;">
            <v-table>
                <thead style="background-color: #eee;">
                    <tr>
                      <th class="text-left">Name</th>
                      <th class="text-left">Email</th>
                      <th class="text-left">Rights</th>
                      <th class="text-left">Docs</th>
                      <th class="text-left">Status</th>
                      <th class="text-left"><i style="font-size: 150%; cursor: pointer;" class="mdi mdi-delete"></i></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in users" :key="item.email">
                      <td>{{ item.name }}</td>
                      <td>{{ item.email }}</td>
                      <td><UserRights v-bind="item" /></td>
                      <td><ButtonDocs v-bind="item" /></td>
                      <td><CheckboxStatus v-bind="item" /></td>
                      <td><i style="font-size: 150%; cursor: pointer;" class="mdi mdi-delete-forever" @click="deleteUser(item.id)"></i></td>
                    </tr>
                  </tbody>
            </v-table>
        </v-card>

        <v-row justify="center">
            <v-dialog v-model="dialog_delete" persistent width="auto">
              <v-card>
                <v-card-title class="text-h5">
                  Удалить пользователя?
                </v-card-title>
                <v-card-text>Удаление пользователя приведет к удалению всех <br>связанных с ним документов!</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="green-darken-1"
                    variant="text"
                    @click="dialog_delete_yes"
                  >
                    Да
                  </v-btn>
                  <v-btn
                    color="green-darken-1"
                    variant="text"
                    @click="dialog_delete_no"
                  >
                    Нет
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>

    </div>
</template>

<script setup>
    definePageMeta({
        middleware: ['auth','admin']
    })

    let userInfo = reactive({
		name: '',
	    email: '2903015@gmail.com',
        password: '',
		scope: ''
	})

    const valid = ref(true)
    var users = {}
    const dialog_delete = ref(false)
    const id_to_delete = ref('')

    const dialog_delete_yes = () => {
        dialog_delete.value = false

        const { data, pending, error, refresh } = useFetch('/api/users', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                action: 'users.delete',
                id: id_to_delete.value
            }
        })  

        if (data) {
            useNuxtApp().$toast.success('User has deleted');
        } else {
            useNuxtApp().$toast.error('User deleting error!');
        }

        id_to_delete.value = 0
        const router = useRouter()
		router.go()
    }

    const dialog_delete_no = () => {
        dialog_delete.value = false
        id_to_delete.value = 0
    }

    const loadUsers = () => {
        const { data, pending, error, refresh } = useFetch('/api/users', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                action: 'users.list'
            }
        })
        users = data && data.value && data.value.data ? JSON.parse(JSON.stringify(data.value.data)) : []
    }    
    
    // Загрузить юзеров
    loadUsers()

    const submitForm = (user) => {
        console.log("Add user: ", user)

        const { data, pending, error, refresh } = useFetch('/api/users', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                action: 'users.add',
                name: userInfo.name,
                surname: userInfo.surname,
	            email: userInfo.email,
                password: userInfo.password,
            }
        })  

        if (data) {
            useNuxtApp().$toast.success('User has added');
        } else {
            useNuxtApp().$toast.error('User adding error!');
        }

        const router = useRouter()
		router.go()
    }

    // Удаление юзеров
    const deleteUser = (id) => {
        dialog_delete.value = true
        id_to_delete.value = id
    }

</script>

<style lang="scss" scoped>
.v-col {
    padding: 0
}
</style>