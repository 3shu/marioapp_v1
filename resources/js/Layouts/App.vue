<template>
    <header class="p-3 text-bg-dark">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><router-link :to="{name :'Home' }" class="nav-link px-2 text-secondary">Home</router-link></li>
          <li><router-link :to="{name : 'Fav' }" class="nav-link px-2 text-white" v-if="$store.getters.getToken != 0">Favoritas</router-link></li>
          <li><router-link :to="{name : 'userList' }" class="nav-link px-2 text-white" v-if="$store.getters.getUser.rol == 'admin'">Usuarios</router-link></li>
        </ul>

        <div class="text-end">
            <div class="dropdown text-end" v-if="$store.getters.getToken != 0">
                <a href="#" class="d-block link-light text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="../../img/Avatar.png" alt="mdo" width="32" height="32" class="rounded-circle">
                </a>
                <ul class="dropdown-menu text-small">
                    <li><router-link class="dropdown-item" :to="{name : 'Profile' }">Profile</router-link></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><button class="dropdown-item" @click="logout">Sign out</button></li>
                </ul>
            </div>
          <router-link  type="button" class="btn btn-outline-light me-2" :to="{name : 'Login' }" v-if="$store.getters.getToken == 0">Login</router-link>
          <router-link  type="button" class="btn btn-warning" :to="{name : 'Signup' }" v-if="$store.getters.getToken == 0">Sign-up</router-link>
        </div>
      </div>
    </div>
  </header>

    <router-view></router-view>
</template>
<script>
    import { ref } from 'vue'
    import { useRouter } from "vue-router"
    import { useStore } from 'vuex'
    export default{
        setup(){
            const router = useRouter();
            const store = useStore();
            let error = ref('')

            const logout = async () => {
                await store.dispatch('logout').then((response) => {
                        if (response.success) {
                            store.dispatch('removeToken',0);
                            store.dispatch('removeUser',{});
                            router.push({name:'Home'})
                        } else {
                            error.value = response.message
                        }
                    }).catch(() => {
                    })
            }

            return {
                logout
            }
        }
    }
</script>
