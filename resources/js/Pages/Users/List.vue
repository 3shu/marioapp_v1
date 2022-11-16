<template>
  <div class="container">
    <h2>Usuarios</h2>
    <div>
      <button type="button" class="btn btn-labeled btn-primary" @click="addUser()">
        <span class="btn-label">
          <i class="fa fa-plus"></i>
        </span>
        Agregar
      </button>
    </div>
    <div class="row justify-content-center" id="usersList">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Rol</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in listUsers" :key="user.id">
            <th scope="row">{{ user.id }}</th>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.rol }}</td>
            <td>
              <button type="button" class="btn btn-sm btn-outline-primary" @click="editUser(user.id)">
                <span class="btn-label">
                  <i class="fa fa-edit"></i>
                </span>
              </button>
              <button type="button" class="btn btn-sm btn-outline-danger" @click="deleteUser(user.id)">
                <span class="btn-label">
                  <i class="fa fa-trash"></i>
                </span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
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

    const listUsers = ref([])

    let error = ref(false)

    onMounted(async () => {
      getUsers()
    })
    const getUsers = async () => {
      let response = await store.dispatch('getUsers')
      if (response.success) {
        listUsers.value = reactive(response.data)
      }
    }
    const editUser = async (id) => {
      router.push({ name: 'editUser', params: { id: id } })
    }
    const addUser = () => {
      router.push({ name: 'addUser' })
    }
    const deleteUser = async (id) => {
      let response = await store.dispatch('deleteUser', id)
      if (response.success) {
        getUsers()
      }
    }
    const close = () => {
      error.value = false
    }
    return {
      addUser,
      editUser,
      deleteUser,
      listUsers,
      getUsers,
    }
  },
}
</script>
