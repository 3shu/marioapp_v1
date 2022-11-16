<template>
<section class="vh-100">
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-11">
        <div class="card text-black" style="border-radius: 25px;">
          <div class="card-body p-md-5">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                <button type="button" class="btn btn-labeled btn-light" @click="back()">
                        <span class="btn-label"><i class="fa fa-arrow-left" aria-hidden="true"></i></span>
                    </button>
                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">{{ form.name }}</p>
                <p class="text-danger" v-for="error in errors" :key="error">
                    <span v-for="err in error" :key="err">{{ err }}</span>
                </p>
                <form @submit.prevent="onSubmit">
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="name" placeholder="Full Name" v-model="form.name"/>
                        <label for="name">Full Name</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="email" class="form-control" id="email" placeholder="description" v-model="form.email" />
                        <label for="email">Email Address</label>
                    </div>
                    <div class="form-floating mb-3">
                        <select class="form-select" placeholder="rol" v-model="form.rol">
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                        <label for="rol">Rol</label>
                    </div>
                    <br>
                    <button class="w-100 btn btn-lg btn-primary" type="submit">Save</button>
                        <p class="mt-5 mb-3 text-muted">© MarioApp2022</p>
                </form>

              </div>
              <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="../../../img/usuarios.jpeg" class="img-fluid" :alt="form.name">

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
    import { reactive,ref } from 'vue'
    import { useRouter } from "vue-router"
    import { useStore } from 'vuex'
    export default{
        setup(){
            const router = useRouter()
            const store = useStore()

            let form = reactive({
                name: '',
                email: '',
                rol: 'user',
            })

            let errors = ref([])

            const onSubmit = async () => {
                await store.dispatch('addUser', form).then((response) => {
                    if (response.success) {
                        router.push({ name: 'userList' })
                    } else {
                        errors.value = response.data
                    }
                }).catch(() => {
                })
            }
            const back = () => {
                router.go(-1)
            }
            return{
                onSubmit,
                errors,
                form,
                back
            }
        }
    }
</script>
