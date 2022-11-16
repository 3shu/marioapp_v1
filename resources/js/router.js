import { createWebHistory, createRouter } from 'vue-router';
import home from './Pages/Home.vue';
import login from './Pages/Login.vue';
import register from './Pages/Signup.vue';
import favList from './Pages/Fav/List.vue';
import editFav from './Pages/Fav/Edit.vue';
import userList from './Pages/Users/List.vue';
import addUser from './Pages/Users/Add.vue';
import editUser from './Pages/Users/Edit.vue';
import profile from './Pages/Auth/Profile.vue';
import store from './store'

const routes = [
    {
        path : '/',
        name : 'Home',
        component : home
    },
    {
        path : '/login',
        name : 'Login',
        component : login,
        meta:{
            requiresAuth:false,
            requiresAdmin:false
        }
    },
    {
        path : '/signup',
        name : 'Signup',
        component : register,
        meta:{
            requiresAuth:false,
            requiresAdmin:false
        }
    },
    {
        path : '/fav',
        name : 'Fav',
        component : favList,
        meta:{
            requiresAuth:true,
            requiresAdmin:false
        }
    },
    {
        path : '/fav/edit/:id',
        name : 'EditFav',
        component : editFav,
        meta:{
            requiresAuth:true,
            requiresAdmin:false
        }
    },
    {
        path : '/users',
        name : 'userList',
        component : userList,
        meta:{
            requiresAuth:true,
            requiresAdmin:true

        }
    },
    {
        path : '/users/add',
        name : 'addUser',
        component : addUser,
        meta:{
            requiresAuth:true,
            requiresAdmin:true
        }
    },
    {
        path : '/users/edit/:id',
        name : 'editUser',
        component : editUser,
        meta:{
            requiresAuth:true,
            requiresAdmin:true
        }
    },
    {
        path : '/auth/profile',
        name : 'Profile',
        component : profile,
        meta:{
            requiresAuth:true,
            requiresAdmin:false

        }
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes
});


router.beforeEach((to,from) =>{
    let token = localStorage.getItem('tokenapp')
    let isAdmin = store.getters.getUser.rol
    if(to.meta.requiresAuth && token == null){
        return { name : 'Login'}
    }
    if(to.meta.requiresAuth == false && token != null){
        return { name : 'Home'}
    }

})

export default router;
