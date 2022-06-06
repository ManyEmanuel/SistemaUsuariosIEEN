<template>
  <div class="q-pa-md" >
    <h4 class="text-center">Catálogos de permisos</h4><br>

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
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated class="text-right">
          <q-tab-panel name="AccesoPerfil">
            <TemplatePerPerfil/>
        </q-tab-panel>
        <q-tab-panel name="AccesoUsuario">
            <TemplatePerUsuario/>
        </q-tab-panel>

        <q-tab-panel name="PermisosPerfil">
            <TemplatePerModulosPerfil/>
        </q-tab-panel>

        <q-tab-panel name="PermisosUsuario">
            <TemplatePerModulosUsuario/>
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
import TemplatePerPerfil from '../Components/CatalogosPermisos/TemplatePerPerfil.vue';
import TemplatePerUsuario from '../Components/CatalogosPermisos/TemplatePerUsuario.vue';
import TemplatePerModulosPerfil from '../Components/CatalogosPermisos/TemplatePerModulosPerfil.vue';
import TemplatePerModulosUsuario from '../Components/CatalogosPermisos/TemplatePerModulosUsuario.vue';

//import TemplateRequisitos from '../Components/CatalogosPrincipal/TemplateRequisitos.vue'
//import TemplateTratamiento from '../Components/CatalogosPrincipal/TemplateTratamiento.vue'





export default defineComponent({
  name: 'CatalogosPermisos',
  components : {
      TemplatePerPerfil,
      TemplatePerUsuario,
      TemplatePerModulosPerfil,
      TemplatePerModulosUsuario,
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
      ListaPermisos.value = store.getters['auth/CatalogosPermisos']
    })

    return{
       tab: ref('AccesoPerfil'),
       token,
       sistemaId,
       ListaPermisos,


    }
  }

})


</script>
