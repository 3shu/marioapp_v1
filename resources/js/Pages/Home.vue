<template>
<section>
  <div class="container">
        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <div class="col-sm-6 mt-4">
                <div class="text-end">
                    <form @submit.prevent="onSubmit" class="d-flex">
                        <input type="search" class="form-control me-2" placeholder="Buscar peliculas..." aria-label="Search" id="query" v-model="form.query" required>
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </div>
        <div class="row justify-content-center" id='moviesList'>
            <div id="alert-login" v-if="error">
                <br>
                <div class="alert alert-info alert-dismissible" role="alert">
                    <div><router-link :to="{name :'Login' }" class="alert-link">Loguéate</router-link> ó <router-link :to="{name : 'Signup' }" class="alert-link">crea una cuenta</router-link></div>
                    <button type="button" class="btn-close" @click="close(0)" aria-label="Close"></button>
                </div>
            </div>
            <div id="alert-success" v-if="valid">
                <br>
                <div class="alert alert-success alert-dismissible" role="alert">
                    <div>Película agregada a <router-link :to="{name : 'Fav' }" class="alert-link">favoritas</router-link></div>
                    <button type="button" class="btn-close" @click="close(1)" aria-label="Close"></button>
                </div>
            </div>
            <div :id="'movie-'+movie.id" class="card movie_card" v-for="movie in listMovies" :key="movie.id">
                <img :src="'https://image.tmdb.org/t/p/original'+ movie.poster_path" class="card-img-top" :alt="movie.title">
                <div class="card-body">
                    <i class="fa fa-heart fav_button" data-toggle="tooltip" data-placement="bottom" title="Favotita" @click="add(movie)"></i>
                    <h5 class="card-title">{{ movie.title }}</h5>
                    <p class="card-text">{{ movie.overview }}</p>
                    <!-- <span class="movie_info"><i class="fa fa-user"></i>{{ movie.director }}</span> -->
                    <span class="movie_info float-right"><i class="fa fa-star"></i> {{ movie.vote_average }}</span>
                </div>
            </div>
        </div>
    </div>
</section>
</template>
<script>
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
export default {
  setup() {
    // const router = useRouter()
    const store = useStore()

    const listMovies = ref([])

    let error = ref(false)
    let valid = ref(false)
    let form = reactive({
        query: '',
        page: 1,
    })
    const onSubmit = async () => {
        let response = await store.dispatch('searchMovies', form)
        // form.page = reactive(response.data.total_pages)
        listMovies.value = reactive(response.data.results)
    }
     const add = async (movie) => {
        // console.log('['+store.getters.getToken+']');
        if (store.getters.getToken == 0) {
            error.value = true
            window.scrollTo(0,0);
            return
            // document.getElementById('liveAlertPlaceholder')
        }
        // const formMovie = useForm(movie)
        let response = await store.dispatch('addMovie', movie)
        if (response.success) {
            document.getElementById('movie-'+movie.id).style.display = "none"
            valid.value = true
            window.scrollTo(0,0);
        }
     }
     const close = (type) => {
        if (type == 0) {
            error.value = false
        } else {
            valid.value = false
        }
     }
    return {
      form,
      onSubmit,
      error,
      valid,
      listMovies,
      add,
      close
    }
  },
}
</script>
