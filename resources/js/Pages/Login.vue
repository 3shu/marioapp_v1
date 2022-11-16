<template>
<section class="vh-100">
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-11">
        <div class="card text-black" style="border-radius: 25px;">
          <div class="card-body p-md-5">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Log in</p>
                <p class="text-danger" v-if="error">{{ error }}</p>
                <p class="text-danger" v-for="error in errors" :key="error">
                    <span v-for="err in error" :key="err">{{ err }}</span>
                </p>
                <form @submit.prevent="onSubmit">
                    <div class="form-floating mb-3">
                        <input type="email" class="form-control" id="email" placeholder="name@example.com" v-model="form.email" >
                        <label for="email">Email Address</label>
                    </div>
                    <div class="input-group mb-3">
                        <div class="form-floating flex-grow-1">
                            <input :type="passwordFieldType" class="form-control" onfocus="let value = this.value; this.value = null; this.value=value" id="password" v-model="form.password" placeholder="Password">
                            <label for="password">Password</label>
                        </div>
                        <span class="input-group-text" @click="showPass()"><i class="fa" :class="passwordFieldClass" aria-hidden="true"></i></span>
                    </div>
                    <br>
                    <button class="w-100 btn btn-lg btn-primary" type="submit">Log in</button>
                        <p class="mt-5 mb-3 text-muted">© MarioApp2022</p>
                </form>

              </div>
              <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                  class="img-fluid" alt="Sample image">
                  <!-- <img src="../../img/signup.jpeg" class="img-fluid" alt="Sample image"> -->

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>
<script>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  setup() {
    const router = useRouter()
    const store = useStore()

    let form = reactive({
      email: '',
      password: '',
    })
    let error = ref('')
    let errors = ref([])
    let showPassword = ref(false)
    let passwordFieldType = ref('password')
    let passwordFieldClass = ref('fa-eye-slash')

    const onSubmit = async () => {
      await store.dispatch('login', form).then((response) => {
        if (response.success) {
            store.dispatch('setToken', response.data.token)
            store.dispatch('setUser', response.data.user)
            router.push({ name: 'Home' })
        } else {
            error.value = response.message
        }
      }).catch(() => {
      })
    }
    const showPass = () => {
        showPassword.value = !showPassword.value
        passwordFieldType.value = passwordFieldType.value === "password" ? "text" : "password";
        passwordFieldClass.value = passwordFieldClass.value === "fa-eye-slash" ? "fa-eye" : "fa-eye-slash";
    }
    return {
      form,
      onSubmit,
      error,
      errors,
      showPassword,
      showPass,
      passwordFieldType,
      passwordFieldClass
    }
  },
}
</script>
