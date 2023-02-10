<template>
	<div>
	<nuxt-link to="/"><v-img src="img/dash-logo-stripe.svg"></v-img></nuxt-link>

    <div style="background: #fff; border: 1px solid #ccc; border-radius: 5px; padding: 10px; min-width: 350px;">
	
		<v-form v-model="valid">
			<v-container>
				<p style="text-align: center; margin-bottom: 10px;"><b>{{ $t('login.enter') }}</b></p>

				<div class="input-group mb-3">
					<v-text-field v-model="userInfo.email" :label="iEmail" type="email" append-icon="mdi-mail" counter=64
						outlined :rules="[required('Email'), minLength('Email', 5), maxLength('Email', 64)]" />
				</div>

				<div class="input-group mb-3">
					<v-text-field @keyup.enter="submitForm(userInfo)" v-model="userInfo.password" :label="iPassword" :type="showPassword ? 'text' : 'password'"
						:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword = !showPassword"
						counter=16 outlined 
						:rules="[required('Пароль'), minLength('Пароль', 3), maxLength('Пароль', 16)]" />
				</div>

				<div class="col-12" style="padding: 0px; margin-bottom: 0px;">
					<v-btn style="background-color: #119DFF; color: #fff;" block @click.prevent="submitForm(userInfo)" :disabled="!valid">{{ $t('login.go') }}</v-btn>
				</div>

				<!-- <div class="col-12" style="text-align: center;">
					<nuxt-link to="/register" style="text-decoration: none;">{{ $t('login.registration') }}</nuxt-link>
				</div>

				<div class="col-12" style="text-align: center; padding: 0px; padding-buttom: 0px;">
					<nuxt-link to="/forgot" style="text-decoration: none;">{{ $t('login.forgot') }}</nuxt-link>
				</div> -->

				<div v-if="message" class="row" style="text-align: center; margin-top: 10px; color: red;">
					<div class='col-12'><span>{{ message }}</span></div>
				</div>

			</v-container>
		</v-form>
	</div>
	</div>
</template>

<script setup>
    let valid = ref(false)
    let error = ref(0)
    let message = ref('')
    let showPassword = ref(false)

	let iEmail = ref(getCurrentInstance().proxy.$t('login.email'))
	let iPassword = ref(getCurrentInstance().proxy.$t('login.password'))
	let iEnter = ref(getCurrentInstance().proxy.$t('login.enter'))

    let userInfo = reactive({
		id: null,
		name: '',
		surname: '',
		email: '2903015@gmail.com',
        password: '',
		scope: ''
	})

    definePageMeta({
        layout: "login",
    })

    const required = (propertyType) => {
	    return v => v && v.length > 0 || `Нужно указать ${propertyType}`
	}
    const minLength = (propertyType, minLength) => {
        return v => v && v.length >= minLength || `${propertyType} должно быть минимум ${minLength} символов!`
    }
	const maxLength = (propertyType, maxLength) => {
		return v => v && v.length <= maxLength || `${propertyType} должно быть меньше ${maxLength} символов!`
	}

	watch(valid, (n, o) => {
			if (o === false && n === null && userInfo.password.length > 0) {
				valid.value = true
			}
	})

	const userStore = useUserStore()

	const submitForm = (userInfo) => {
		try {
			$fetch('/api/users', { 
				method: 'post', 
				body: { 
					email: userInfo.email,
					password: userInfo.password	
				} 
			})
			.then(async (response) => {
				console.log("DATA: ", response)
				error.value = response.data.error
				message.value = response.data.error > 0 ? response.data.message : ''
				
				if (error.value == 0) {
					try {
						const user = { ...response.data.user }
						let scope = user.scope.split(',') || []
						user.scope = scope
						
						userStore.loggedIn = true
						userStore.name = user.name
        				userStore.surname = user.surname
        				userStore.email = user.email
        				userStore.phone = user.phone
						userStore.scope = scope
						
						const router = useRouter()
						router.push("/")

					} catch (e) {
  						userStore.loggedIn = false
					}
				} else {
					userStore.loggedIn = false
				}
			}).catch(e => {
				userStore.loggedIn = false
			});

		} catch (e) {
			userStore.loggedIn = false;
		}
	}	
</script>

<style lang="scss" scoped>
.error--text {
	color: red;
}
</style>