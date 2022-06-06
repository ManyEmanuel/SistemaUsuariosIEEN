<template>
  <div class="q-pa-md">
    <h4 class="text-center">Catálogos Principales</h4><br>

    <q-card>

      <q-tabs
        v-model="tab"
        dense
        class="text-purple-ieen"
        active-color="purple-ieen-1"
        indicator-color="pink-ieen-1"
        align="justify"
      >
      <q-tab v-for="item in ListaPermisos" :key="item.id" :name="item.nombre" :label="item.label" v-show="item.acceso"/>

      <!--
      <div class="q-pr-xs" v-for="item in ListaPermisos" :key="item.id">
        <q-tab v-if="item.nombre === 'Usuarios' && item.acceso === true"  name="Usuarios" label="Usuarios" />
        <q-tab v-if="item.nombre === 'Sistemas' && item.acceso === true"  name="Sistemas" label="Sistemas" />
        <q-tab v-if="item.nombre === 'Perfiles' && item.acceso === true"  name="Perfiles" label="Perfiles" />
        <q-tab v-if="item.nombre === 'Modulos' && item.acceso === true"  name="Modulos" label="Modulos" />


        <q-tab v-if="item.nombre === 'Usuarios'" v-show="item.acceso" name="Usuarios" label="Usuarios" />
        <q-tab v-if="item.nombre === 'Sistemas'" v-show="item.acceso" name="Sistemas" label="Sistemas" />
        <q-tab v-if="item.nombre === 'Perfiles'" v-show="item.acceso" name="Perfiles" label="Perfiles" />
        <q-tab v-if="item.nombre === 'Modulos'" v-show="item.acceso" name="Modulos" label="Modulos" />



      </div>-->

      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated class="text-right">
          <q-tab-panel name="Usuarios">
            <TemplateUsuario/>
        </q-tab-panel>
        <q-tab-panel name="Sistemas">
            <TemplateSistema/>
        </q-tab-panel>

        <q-tab-panel name="Perfiles">
            <TemplatePerfil/>
        </q-tab-panel>

        <q-tab-panel name="Modulos">
            <TemplateModulo/>
        </q-tab-panel>


      </q-tab-panels>
    </q-card>
  </div>

</template>

<script>
import { defineComponent,ref,onBeforeMount } from 'vue';
import {api} from "../../boot/axios.js";
import { useQuasar } from 'quasar';
import { useStore } from 'vuex';
import TemplateUsuario from '../Components/CatalogosPrincipal/TemplateUsuario.vue';
import TemplateSistema from '../Components/CatalogosPrincipal/TemplateSistema.vue';
import TemplatePerfil from '../Components/CatalogosPrincipal/TemplatePerfil.vue';
import TemplateModulo from '../Components/CatalogosPrincipal/TemplateModulo.vue';
//import TemplateRequisitos from '../Components/CatalogosPrincipal/TemplateRequisitos.vue'
//import TemplateTratamiento from '../Components/CatalogosPrincipal/TemplateTratamiento.vue'





export default defineComponent({
  name: 'CatalogosPrincipal',
  components : {
      TemplateUsuario,
      TemplateSistema,
      TemplatePerfil,
      TemplateModulo,
      //TemplatePuestos,
      //TemplateRequisitos,
      //TemplateTratamiento,
  },
  setup(){
    const $q = useQuasar();
    const token = $q.localStorage.getItem("token");
    const sistemaId = $q.localStorage.getItem("sistema")
    const store = useStore()
    const ListaPermisos = ref([])
       onBeforeMount( async() =>{
      ListaPermisos.value = store.getters['auth/CatalogosPrincipal']
     /* AccesoPerfil.value = ListaPermisos.value.find(elemento => elemento.nombre === "AccesoPerfil")
      AccesoUsuario.value = ListaPermisos.value.find(elemento => elemento.nombre === "AccesoUsuario")
      PermisosPerfil.value = ListaPermisos.value.find(elemento => elemento.nombre === "PermisosPerfil")
      PermisosUsuario.value = ListaPermisos.value.find(elemento => elemento.nombre === "PermisosUsuario")

      console.log("Este es el resultado del permiso", AccesoPerfil.value.acceso)*/
    })
    return{
       tab: ref('Usuarios'),
       token,
       sistemaId,
       ListaPermisos,

    }
  }

})

</script>
