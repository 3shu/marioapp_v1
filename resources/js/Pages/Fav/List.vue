<template>
    <div class="container">
        <h2>Favoritas</h2>
        <div class="row justify-content-center" id='moviesList'>
            <div id="listMovies" class="card movie_card" v-for="movie in listMovies" :key="movie.id">
                <img :src="'https://image.tmdb.org/t/p/original'+ movie.poster" class="card-img-top" :alt="movie.title">
                <div class="card-body">
                    <h5 class="card-title">{{ movie.title }}</h5>
                    <p class="card-text">Comentario: <br>{{ movie.overview }}</p>
                    <button type="button" class="btn btn-labeled btn-primary" @click="editMovie(movie.id)">
                        <span class="btn-label"><i class="fa fa-edit"></i></span>
                        Editar
                    </button>
                    <button type="button" class="btn btn-labeled btn-danger" @click="deleteMovie(movie.id)">
                        <span class="btn-label"><i class="fa fa-trash"></i></span>
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { reactive, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const router = useRouter()
    const store = useStore()

    const listMovies = ref([])

    let error = ref(false)

    onMounted(async () => {
      getFavMovies()
    });
    const getFavMovies = async () => {
        let response = await store.dispatch('getMovies')
      if (response.success) {
          listMovies.value = reactive(response.data)
      }
    }
    const editMovie = async (id) => {
        router.push({ name: 'EditFav', params: { id: id } })
    }
     const deleteMovie = async (id) => {
        let response = await store.dispatch('deleteMovie', id)
        if (response.success) {
          getFavMovies()
      }

     }
     const close = () => {
        error.value = false
     }
    return {
      editMovie,
      deleteMovie,
      listMovies,
      getFavMovies,
    }
  },
}
</script>
