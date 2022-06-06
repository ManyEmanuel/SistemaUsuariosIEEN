<template>
  <q-layout view="lHh Lpr lff" class="shadow-2 rounded-borders">
    <q-header elevated style="background-color: rgb(103,62,132)">
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          icon="menu"
          aria-label="Menu"
          @click="drawer = !drawer"
        />
        <q-toolbar-title>
          Sistema de Usuarios
        </q-toolbar-title>

        <div><q-btn flat label="Cerrar Sesión" text-color="white" @click="LogOut()" /></div>
      </q-toolbar>
    </q-header>
    <q-footer elevated class="bg-purple-ieen">
        <q-toolbar>
          <q-toolbar-title>Unidad Técnica de Informática y Estadística</q-toolbar-title>
        </q-toolbar>
      </q-footer>

    <q-drawer
      v-model="drawer"
      show-if-above
      :width="250"
      :breakpoint="1024"
      class="text-black"
    >

      <q-scroll-area style="height: calc(100% - 130px); margin-top: 130px; border-right: 1px solid #ddd">
        <q-list style="border-right: 1px solid #ddd">
          <EssentialLink
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          />
        </q-list>
      </q-scroll-area>
      <q-img class="absolute-top" src="~assets/Fondo.png" style="height: 130px" >
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="~assets/usuario.png">
            </q-avatar>
            <div class="text-weight-bold  text-black">{{$q.localStorage.getItem("user")}}</div>
            <div class=" text-black">Puesto en IEEN </div>
          </div>
        </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<style lang="scss">
    .text-purple-ieen{
        color:#673E84 !important;
    }
    .bg-purple-ieen{
        background: #673E84 !important;
    }
    .text-purple-ieen-1{
        color:#863399 !important;
    }
    .bg-purple-ieen-1{
        background: #863399 !important;
    }
    .text-purple-ieen-2{
        color:#a25eb5 !important;
    }
    .bg-purple-ieen-2{
        background: #a25eb5 !important;
    }
    .text-purple-ieen-3{
        color:#bb83ca !important;
    }
    .bg-purple-ieen-3{
        background: #bb83ca !important;
    }
    .text-pink-ieen-1{
        color:#b32572 !important;
    }
    .bg-pink-ieen-1{
        background: #b32572 !important;
    }
    .text-pink-ieen-2{
        color:#cc5599 !important;
    }
    .bg-pink-ieen-2{
        background: #cc5599 !important;
    }
    .text-pink-ieen-3{
        color:#dd85ba !important;
    }
    .bg-pink-ieen-3{
        background: #dd85ba !important;
    }
    .text-gray-ieen-1{
        color:#76777a !important;
    }
    .bg-gray-ieen-1{
        background: #76777a !important;
    }
    .text-gray-ieen-2{
        color:#98989a !important;
    }
    .bg-gray-ieen-2{
        background: #98989a !important;
    }
    .text-gray-ieen-3{
        color:#b1b1b1 !important;
    }
    .bg-gray-ieen-3{
        background: #b1b1b1 !important;
    }

</style>
<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [

 {
    title: 'CATÁLOGOS PRINCIPALES',
    icon: 'menu_book',
    link: {name:'CatalogosPrincipal'}
  },
  {
    title: 'CATÁLOGOS DE PERMISOS',
    icon: 'menu_book',
    link: {name:'CatalogosPermisos'}
  },

]
import { defineComponent, ref } from 'vue'
import {api} from 'src/boot/axios.js'
import { useQuasar, Cookies } from 'quasar'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const $q = useQuasar()
    const store = useStore()
    const router = useRouter()
    //const valores = window.location.search
    //const urlParams = new URLSearchParams(valores)
    //const token = urlParams.get('token')
    //const sistema = urlParams.get('sistema')
    //$q.localStorage.set("token", token)
    //$q.localStorage.set("sistema", sistema)
    const leftDrawerOpen = ref(false)

    const Permisos = async()=>{
    const {success} =  await store.dispatch('auth/GeneraPermisos')
    console.log(success)
    }
    Permisos()
    const LogOut = async () => {
      $q.dialog({
        title: '¿Que acción desea realizar?',
        icon: 'Warning',
        ok:{
          color: 'purple-6',
          label: 'Cerrar sesión'
        },
        cancel:{
          color: 'purple-6',
          label: 'Ir a universo IEEN'
        },
        persistent: true
      }).onOk(() => {
        $q.localStorage.remove("token")
        window.location = "http://192.168.0.134:8081?return=false"
      })
      .onCancel(()=>{
        window.location = "http://192.168.0.134:8081?return=true"
      })



      /*const exit = await store.dispatch('auth/signOut')
      console.log(exit.success)
      setTimeout(() => {
            router.push({ name: 'auth' })
      }, 200);
      $q.notify({
            type: 'negative',
            message: exit.data
        })
*/


    }
    return {
      leftDrawerOpen,
      essentialLinks: linksList,
       drawer: ref(false),
       miniState: ref(false),
       LogOut,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value

      }
    }
  }
})
</script>
