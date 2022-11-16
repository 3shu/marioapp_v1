<template>
<section class="vh-100" >
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-md-9 col-lg-7 col-xl-5">
        <div class="card" style="border-radius: 15px;">
          <div class="card-body p-4">
            <div class="d-flex text-black">
              <div class="flex-shrink-0">
                <img src="../../../img/Avatar.png"
                  alt="Generic placeholder image" class="img-fluid"
                  style="width: 180px; border-radius: 10px;">
              </div>
              <div class="flex-grow-1 ms-3">
                <h5 class="mb-1">{{ user.name }}</h5>
                <p class="mb-2 pb-1" style="color: #2b2a2a;">{{ user.rol }}</p>
                <div class="d-flex justify-content-start rounded-3 p-2 mb-2"
                  style="background-color: #efefef;">
                  <div>
                    <p class="small text-muted mb-1">{{ user.email }}</p>
                  </div>
                </div>
                <div class="d-flex pt-1">
                    <button type="button" class="btn btn-labeled btn-light" @click="back()">
                        <span class="btn-label"><i class="fa fa-arrow-left" aria-hidden="true"></i></span>
                        Back
                    </button>
                  <button type="button" class="btn btn-primary flex-grow-1" @click="changePass()">Change Password</button>
                </div>
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
    import { reactive,ref, onMounted } from 'vue'
    import { useRouter, useRoute } from "vue-router"
    import { useStore } from 'vuex'
    export default{
        setup(){
            const router = useRouter()
            const route = useRoute()
            const store = useStore()
            onMounted(async () => {
                let user =  store.getters.getUser
                getUser(user.id)
            });
            const user = ref({})
            const getUser = async (id) => {
                let response = await store.dispatch('getUser',id)
            if (response.success) {
                user.value = reactive(response.data)
            }
            }
            let errors = ref([])

            const onSubmit = async () => {
                await store.dispatch('editProfile', user.value).then((response) => {
                    if (response.success) {
                        router.go(-1)
                    } else {
                        errors.value = response.data
                    }
                }).catch(() => {
                })
            }
            const back = () => {
                router.go(-1)
            }
            const changePass = () => {
                alert('Proximamente...')
            }
            return{
                onSubmit,
                errors,
                getUser,
                user,
                back,
                changePass
            }
        }
    }
</script>
