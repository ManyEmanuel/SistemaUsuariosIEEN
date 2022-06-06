<template>
          <!-- Aqui inicia el template con la tabla -->
  <div class="row q-pa-sm q-gutter-md">
      <div class="col-12">
        <q-btn v-show="PRegistrar" class="q-ma-sm" color="purple-ieen" icon-right="add_circle_outline" label="Agregar nuevo" @click="RegistrarPermiso"/>
          <q-table
              v-show="PLeer"
              title="Registro de sistemas"
              :rows="rowsusuario"
              :columns="columnsusuario"
              :filter="textbuscar"
              row-key ="id"
              color="purple-ieen"
              :loading="loading"
              v-model:pagination="pagination"
              no-data-label="No se encontraron registros"
              rows-per-page-label="Registros por página"
              >
              <template v-slot:top-right>
                <q-input v-model="textbuscar" dense label="Buscar"  class="q-pr-md">
                  <template v-slot:append>
                    <q-icon v-if="textbuscar !== ''" name="close" @click="textbuscar = ''" class="cursor-pointer" />
                    <q-icon v-else name="search" />
                  </template>
                </q-input>
                <q-btn flat round color="purple-ieen" icon="archive" @click="exportTable"/>
              </template >
              <template v-slot:body ="props">
                <q-tr :props="props">
                  <q-td
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                  >

                  <q-btn v-if="col.name==='id'" v-show="PActualizar" flat round color="purple-ieen" icon="edit" @click="EditarPerfilMetodo(col.value)">
                    <q-tooltip>
                      editar registro
                    </q-tooltip>
                  </q-btn>
                  <label v-else>{{col.value}}</label>
                  </q-td>
                </q-tr>
              </template>
          </q-table>
      </div>
  </div>
       <!-- Dialog para el registro de  tipo de area -->
    <q-dialog v-model="RegistroUsuario" persistent transition-show="scale" transition-hide="scale">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Registro de permisos por modulos por perfil</div>
        </q-card-section>
        <q-card-section>
          <q-form
            @submit="onSubmit"
            class="q-gutter-sm"
            >
              <div class="q-gutter-sm row items-start">
                <div class="col">
                  <q-select
                    filled
                    v-model="NombreEmpleado"
                    :options="itemsEmpleado"
                    label="Listado de perfiles"
                    lazy-rules
                    :rules="[val => !!val || 'Por favor seleccione un perfil']"
                  />
                </div>
                <div class="col">
                  <q-select
                    filled
                    v-model="NombreSistema"
                    :options="itemsSis"
                    label="Listado de sistemas con acceso al perfil"
                    lazy-rules
                    :rules="[val => !!val || 'Por favor seleccione un sistema']"
                  />
                </div>
              </div>
              <div class="text-caption">{{EtiquetaPerfilNoRegistrados}}</div>
              <div class="q-gutter-sm q-gutter-y-sm row items-start" v-for=" item in itemModuloNuevo" :key="item.value">

                <div class="col-4 q-pb-none">
                  {{item.modulo}}
                </div>
                <div class="col q-pt-none">
                   <div class="q-gutter-sm">
                     <q-checkbox left-label v-model="item.create" label="Registrar" checked-icon="task_alt" unchecked-icon="highlight_off" :true-value="true" :false-value="false"/>
                     <q-checkbox left-label v-model="item.update" label="Actualizar" checked-icon="task_alt" unchecked-icon="highlight_off" :true-value="true" :false-value="false"/>
                     <q-checkbox left-label v-model="item.delete" label="Eliminar" checked-icon="task_alt" unchecked-icon="highlight_off" :true-value="true" :false-value="false"/>
                     <q-checkbox left-label v-model="item.read" label="Lectura" checked-icon="task_alt" unchecked-icon="highlight_off" :true-value="true" :false-value="false"/>
                    </div>
                  <q-input v-show="false" v-model="item.modulo_Id"/>

                </div>
              </div>
              <div class="text-caption">{{EtiquetaPerfilRegistrados}}</div>
              <div class="q-gutter-sm q-gutter-y-sm row items-start" v-for=" item in itemModulo" :key="item.value">

                <div class="col-4 q-pb-none">
                  {{item.modulo}}
                </div>
                <div class="col q-pt-none">
                   <div class="q-gutter-sm">
                     <q-checkbox left-label v-model="item.create" label="Registrar" checked-icon="task_alt" unchecked-icon="highlight_off" :true-value="true" :false-value="false"/>
                     <q-checkbox left-label v-model="item.update" label="Actualizar" checked-icon="task_alt" unchecked-icon="highlight_off" :true-value="true" :false-value="false"/>
                     <q-checkbox left-label v-model="item.delete" label="Eliminar" checked-icon="task_alt" unchecked-icon="highlight_off" :true-value="true" :false-value="false"/>
                     <q-checkbox left-label v-model="item.read" label="Lectura" checked-icon="task_alt" unchecked-icon="highlight_off" :true-value="true" :false-value="false"/>
                    </div>
                  <q-input v-show="false" v-model="item.modulo_Id"/>
                  <q-input v-show="false" v-model="item.idRegistro"/>

                </div>
              </div>
              <q-card-actions align="right">
                <q-btn label="Cancelar" type="reset" color="negative"   @click="RegistroUsuario = false, limpiarRegistro()" />
                <q-btn label="Guardar" type="submit" color="positive" class="q-ml-sm" />
              </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

       <!-- Dilog pata la edición del tipo de area -->
    <q-dialog v-model="EditarPerfil" persistent transition-show="scale" transition-hide="scale">
        <q-card style="width: 700px; max-width: 80vw;">
          <q-card-section class="q-pb-xs">
            <div class="text-h6">Editar permisos por perfil</div>
          </q-card-section >
          <div class="q-pa-xs">
            <h5 class="text-center">{{Etiqueta}}</h5>
         </div>
          <q-card-section class="q-pb-xs q-pt-xs">
            <q-form
                @submit="onEdit"
                class="q-gutter-md"
            >
             <div class="q-gutter-sm row items-start">
                <div class="col">
                  <q-select
                    filled
                    v-model="NombreSistema"
                    :options="itemsSis"
                    label="Listado de sistemas con acceso el perfil"
                    lazy-rules
                    :rules="[val => !!val || 'Por favor seleccione un sistema']"
                  />
                </div>
              </div>
              <div class="text-caption">{{EtiquetaPerfilNoRegistrados}}</div>
              <div class="q-gutter-sm q-gutter-y-sm row items-start" v-for=" item in itemModuloNuevo" :key="item.value">

                <div class="col-3 q-pb-none">
                  {{item.modulo}}
                </div>
                <div class="col q-pt-none">
                   <div class="q-gutter-sm">
                     <q-checkbox left-label v-model="item.create" label="Registrar" checked-icon="task_alt" unchecked-icon="highlight_off" :true-value="true" :false-value="false"/>
                     <q-checkbox left-label v-model="item.update" label="Actualizar" checked-icon="task_alt" unchecked-icon="highlight_off" :true-value="true" :false-value="false"/>
                     <q-checkbox left-label v-model="item.delete" label="Eliminar" checked-icon="task_alt" unchecked-icon="highlight_off" :true-value="true" :false-value="false"/>
                     <q-checkbox left-label v-model="item.read" label="Lectura" checked-icon="task_alt" unchecked-icon="highlight_off" :true-value="true" :false-value="false"/>
                    </div>
                  <q-input v-show="false" v-model="item.modulo_Id"/>
                  <!--<q-input v-show="false" v-model="item.idReg"/>-->


                </div>
              </div>
               <div class="text-caption">{{EtiquetaPerfilRegistrados}}</div>
              <div class="q-gutter-sm q-gutter-y-sm row items-start" v-for=" item in itemModulo" :key="item.value">
                <div class="col-3 q-pb-none">
                  {{item.modulo}}
                </div>
                <div class="col q-pt-none">
                   <div class="q-gutter-sm">
                     <q-checkbox left-label v-model="item.create" label="Registrar" checked-icon="task_alt" unchecked-icon="highlight_off" :true-value="true" :false-value="false"/>
                     <q-checkbox left-label v-model="item.update" label="Actualizar" checked-icon="task_alt" unchecked-icon="highlight_off" :true-value="true" :false-value="false"/>
                     <q-checkbox left-label v-model="item.delete" label="Eliminar" checked-icon="task_alt" unchecked-icon="highlight_off" :true-value="true" :false-value="false"/>
                     <q-checkbox left-label v-model="item.read" label="Lectura" checked-icon="task_alt" unchecked-icon="highlight_off" :true-value="true" :false-value="false"/>
                    </div>
                  <q-input v-show="false" v-model="item.modulo_Id"/>
                  <q-input v-show="false" v-model="item.idRegistro"/>
                </div>
                <div class="col-1 q-pt-none">
                <q-btn  flat round color="purple-ieen" icon="delete" @click="DeletePerfil(item.idRegistro, item.perfil)">
                      <q-tooltip>
                        Borrar registro
                      </q-tooltip>
                </q-btn>
                </div>
              </div>
                <q-card-actions align="right">
                  <q-btn label="Cancelar" type="reset" color="negative"   @click="EditarPerfil = false, limpiarRegistro()" />
                  <q-btn label="Guardar" type="submit" color="positive" class="q-ml-sm" />
                </q-card-actions>
              </q-form>
          </q-card-section>
        </q-card>
    </q-dialog>

</template>

<script>
import { defineComponent,ref,watch,onBeforeMount} from 'vue';
import { exportFile, useQuasar} from 'quasar'
import {api} from '../../../boot/axios.js'
import { useStore } from 'vuex';


const columnsusuario = [
                { name: 'nombre', align: 'center', label: 'Nombre del perfil', field: 'nombre', sortable: true, },
                { name: 'descripcion', align: 'center', label: 'Descrición del perfil', field: 'descripcion', sortable: true, },
                { name: 'id', align: 'center', label: 'Opciones', field: 'id' },

            ]


export default defineComponent({
  name: 'TemplatePerModulosPerfil',

  setup(){
    const $q = useQuasar()
    const store = useStore()
    //Variables de guardado y edición
    const idsperfil = ref('')
    const nombrePerfil = ref('')
    const siglasSistema = ref('')
    const logoSistema = ref()
    var totalPerfil = 1
    const descripcionPerfil = ref('')
    const NombreEmpleado = ref()
    const itemsEmpleado = ref([])
    const NombreSistema = ref()
    const itemsSis = ref([])
    const SistemasPerfil = ref([])
    const SistemasTotal = ref([])
    const itemSistema = ref([])
    const itemModuloNuevo = ref([])
    const itemModulo = ref([])
    const UsuariosRe = ref([])
    let Etiqueta = ref ('')
    let EtiquetaPerfilRegistrados = ref('')
    let EtiquetaPerfilNoRegistrados = ref('')
    let conteo = 0
    const nameModelo = ref([])


    //---------------------------------------------------------------------------//
    //
    const PRegistrar = ref(false)
    const PActualizar = ref(false)
    const PEliminar = ref(false)
    const PLeer = ref(false)
    const ListaPermiso = ref([])
    const textbuscar = ref('')
    const rowsusuario = ref([])
    const loading = ref(true)
    const RegistroUsuario = ref(false)
    const EditarPerfil = ref(false)
    const pagination = ref({
        page: 1,
        rowsPerPage: 10,
        sortBy: 'name',
        descending: false,
        }
    )
    // Este es el metodo para listar en tabla

     onBeforeMount (async() =>{
         const Lista= store.getters['auth/PermisosObtenidos']
         const filtro = Lista.find(elemento => elemento.nombre === "PermisosPerfil")
         ListaPermiso.value= filtro
         console.log("Este es el listado de los permisos de este modulo", ListaPermiso.value)
         const {registrar,actualizar,eliminar,leer} = ListaPermiso.value
         PRegistrar.value = registrar
         PActualizar.value = actualizar
         PEliminar.value = eliminar
         PLeer.value = leer
         console.log("Este es el registro",registrar)
    })
    const getAreas = async () => {
      loading.value = true
        const res = await api.get('/Perfiles',{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
        let {data} = res.data
        data.forEach(reg => {
          let obj = {
            "id":reg.id,
            "nombre":reg.nombre,
            "descripcion":reg.descripción,
          };
          rowsusuario.value.push(obj)
        })
      loading.value = false
    }
    getAreas()


    const EditarPerfilMetodo = async (id) =>{
      EditarPerfil.value = true
      idsperfil.value = id
      itemsSis.value = []
      NombreEmpleado.value = ""
      const perf = await api.get('/perfiles/'+id,{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
      let perfil = perf.data.data;
      Etiqueta.value = perfil.nombre
      NombreEmpleado.value = perfil.id
      NombreSistema.value = ""
      const resp = await api.get('/SistemasPerfiles/ByPerfil/'+id,{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
      let{data} = resp.data;
      const respuesta = await api.get('/Sistemas',{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
      let datos = respuesta.data.data;
      datos.forEach((item)=>{
        let filtro = data.find(elemento => elemento.sistema_Id === item.id)
        if(filtro != undefined){
          itemsSis.value.push({
            value: item.id,
            label: item.nombre
          })
        }
      })
    }

     const RegistrarPermiso = async  () => {
      RegistroUsuario.value = true
      itemsEmpleado.value =[]
      const respuesta = await api.get('/perfiles',{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
        let{data} = respuesta.data;
        data.forEach((item)=>{
          itemsEmpleado.value.push({
              label: item.nombre,
              value: item.id
          });
        })
    }

    watch(NombreEmpleado,(nuevoValor, viejoValor) => {
      if(nuevoValor.value != undefined){
          itemModuloNuevo.value = []
          itemModulo.value = []
          EtiquetaPerfilRegistrados.value = ""
          EtiquetaPerfilNoRegistrados.value = ""
          metodoSistema(nuevoValor.value);
      }


    })

    const metodoSistema = async (id) =>  {
      itemsSis.value = []
      NombreSistema.value = ""
      const resp = await api.get('/SistemasPerfiles/ByPerfil/'+id,{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
      let{data} = resp.data;
      const respuesta = await api.get('/Sistemas',{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
      let datos = respuesta.data.data;
      datos.forEach((item)=>{
        let filtro = data.find(elemento => elemento.sistema_Id === item.id)
        if(filtro != undefined){
          itemsSis.value.push({
            value: item.id,
            label: item.nombre
          })
        }
      })
    }

    watch(NombreSistema,(nuevoValor, viejoValor) => {
      if(nuevoValor.value != undefined){
        MetodoModulos(nuevoValor.value);
      }
    })
    const MetodoModulos = async (id) =>  {
      console.log("Este es el valor del empleado ",NombreEmpleado.value)
      let {value} = NombreEmpleado.value
      if(value === undefined){
          value = NombreEmpleado.value
      }
      itemModuloNuevo.value = []
      itemModulo.value = []
      EtiquetaPerfilRegistrados.value = ""
      EtiquetaPerfilNoRegistrados.value = ""
      const resp = await api.get('/Modulos/BySistema/'+id,{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
      let{data} = resp.data;
      const modu = await api.get('/Permisos_Modulos_Perfiles/ByPerfil/'+value,{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
      let perfilmodulo = modu.data.data
        data.forEach((item)=>{
          let filtro = perfilmodulo.find(elemento => elemento.modulo_Id === item.id)
          if(filtro != undefined){
            itemModulo.value.push({
                modulo_Id: filtro.modulo_Id,
                modulo: filtro.modulo,
                create: filtro.registrar,
                update: filtro.actualizar,
                delete: filtro.eliminar,
                read: filtro.leer,
                perfil: filtro.perfil_Id,
                idRegistro: filtro.id
            })
          }
          else{
            itemModuloNuevo.value.push({
              modulo_Id: item.id,
              modulo: item.nombre,
              create: false,
              update: false,
              delete: false,
              read: false,
              perfil: 0,
              idRegistro: 0
            })
          }
        })
      if(itemModuloNuevo.value.length === 0)
      {
        if(itemModulo.value.length != 0)
        {
          EtiquetaPerfilRegistrados.value = "Permisos asignados a este pérfil"
        }
        else{
          EtiquetaPerfilRegistrados.value = "Este sistema no tiene modulos registrados"
        }
      }
      else
      {
        EtiquetaPerfilNoRegistrados.value =  "Permisos aún sin asignar a este pérfil"
        if(itemModulo.value.length != 0)
        {
          EtiquetaPerfilRegistrados.value = "Permisos asignados a este pérfil"
        }
      }
    }

    // Este es el metodo para eliminar registro
    const DeletePerfil = function(id,reg){
      $q.dialog({
        title: 'Eliminar registro',
        icon: 'Warning',
        ok:{
          color: 'positive',
          label: 'Aceptar'
        },
        cancel:{
          color: 'negative',
          label: 'Cancelar'
        },
        message: '¿Esta seguro de eliminar este perfil?',
        persistent: true
      }).onOk(() => {
         $q.loading.show()
          api.delete('/Permisos_Modulos_Perfiles/'+id,{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}}).then(function (respuesta){
            let{data,success} = respuesta.data
            if(respuesta.status == 200 && success == true){
              $q.notify({
                type: 'positive',
                message: data,
                position: 'top-right',
                progress: true,
              })

              loading.value = true
              rowsusuario.value = [  ]
              getAreas()
              loading.value = false
              RegistroUsuario.value = false
               $q.loading.hide()
               EditarPerfilMetodo(reg)


            }else{
              $q.notify({
                type: 'negative',
                message: data,
                position: 'top-right',
                progress: true
              })
               $q.loading.hide()
            }
          })
      })
    }

    //Este es el metodo para editar registro

    const limpiarRegistro = function(){
        idsperfil.value = ""
        itemSistema.value = []
        itemModuloNuevo.value = []
        itemModulo.value = []
        EtiquetaPerfilNoRegistrados.value = ""
        EtiquetaPerfilRegistrados.value = ""
        NombreEmpleado.value=""
        NombreSistema.value =""
        itemsSis.value = []
    }


    return{
       // Variables de guardado y edición

       idsperfil,
       textbuscar,
       nombrePerfil,
       descripcionPerfil,
       columnsusuario,
       rowsusuario,
       RegistroUsuario,
       EditarPerfil,
       DeletePerfil,
       pagination,
       NombreEmpleado,
       itemsEmpleado,
       NombreSistema,
       itemsSis,
       loading,
       limpiarRegistro,
       EditarPerfilMetodo,
       RegistrarPermiso,
       itemSistema,
       itemModuloNuevo,
       itemModulo,
       UsuariosRe,
       Etiqueta,
       nameModelo,
       SistemasPerfil,
       SistemasTotal,
       totalPerfil,
       EtiquetaPerfilRegistrados,
       EtiquetaPerfilNoRegistrados,
        PRegistrar,
        PActualizar,
        PEliminar,
        PLeer,
        ListaPermiso,
      //MEtodo submit para guardar registro
       onSubmit(){
         $q.loading.show()
         const {value} = NombreEmpleado.value
          console.log(value)
          if(itemModuloNuevo.value.length === 0){
            if(itemModulo.value.length != 0){
              for(var i=0; i < itemModulo.value.length; i++){
                if(itemModulo.value[i].create === true || itemModulo.value[i].update === true || itemModulo.value[i].delete === true || itemModulo.value[i].read === true ){
                  api.put('/Permisos_Modulos_Perfiles/'+ itemModulo.value[i].idRegistro, {
                    modulo_Id: itemModulo.value[i].modulo_Id,
                    perfil_Id: itemModulo.value[i].perfil,
                    registrar: itemModulo.value[i].create,
                    actualizar: itemModulo.value[i].update,
                    eliminar: itemModulo.value[i].delete,
                    leer: itemModulo.value[i].read
                  },{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}}).then(function (respuesta){
                    let{data,success} = respuesta.data
                      if(respuesta.status == 200 && success == true){
                          $q.notify({
                            type: 'positive',
                            message: data,
                            position: 'top-right',
                            progress: true,
                          })
                      }
                      else{
                        $q.notify({
                          type: 'negative',
                          message: data,
                          position: 'top-right',
                          progress: true
                          })
                        }
                      })
                }else
                {
                  api.delete('/Permisos_Modulos_Perfiles/'+itemModulo.value[i].idRegistro,{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}}).then(function (respuesta){
                    let{data,success} = respuesta.data
                    if(respuesta.status == 200 && success == true){
                      $q.notify({
                        type: 'positive',
                        message: data,
                        position: 'top-right',
                        progress: true,
                      })
                    }
                  })
                }
              }
              RegistroUsuario.value = false
            loading.value = true
            rowsusuario.value = [  ]
            getAreas()
            loading.value = false
            limpiarRegistro()
            $q.loading.hide()
            }
            else
            {
              $q.notify({
                type: 'negative',
                message: 'Registro vacio, llene datos por favor',
                position: 'top-right',
                progress: true
              })
              $q.loading.hide()
            }
          }
          else
          {
            for(var i=0; i < itemModuloNuevo.value.length; i++){
              if(itemModuloNuevo.value[i].create === true || itemModuloNuevo.value[i].update === true || itemModuloNuevo.value[i].delete === true || itemModuloNuevo.value[i].read === true ){
                api.post("/Permisos_Modulos_Perfiles",{
                modulo_Id: itemModuloNuevo.value[i].modulo_Id,
                perfil_Id: value,
                registrar: itemModuloNuevo.value[i].create,
                actualizar: itemModuloNuevo.value[i].update,
                eliminar: itemModuloNuevo.value[i].delete,
                leer: itemModuloNuevo.value[i].read,
                },{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}}).then(function (respuesta){
                  let{data,success} = respuesta.data
                  if(respuesta.status == 200 && success == true){

                      $q.notify({
                        type: 'positive',
                        message: data,
                        position: 'top-right',
                        progress: true,
                      })
                  }
                  else{
                    $q.notify({
                      type: 'negative',
                      message: data,
                      position: 'top-right',
                      progress: true
                      })
                  }
                })
              }
            }
            if(itemModulo.value.length != 0){
              for(var i=0; i < itemModulo.value.length; i++){
                 if(itemModulo.value[i].create === true || itemModulo.value[i].update === true || itemModulo.value[i].delete === true || itemModulo.value[i].read === true ){
                  api.put('/Permisos_Modulos_Perfiles/'+ itemModulo.value[i].idRegistro,{
                    modulo_Id: itemModulo.value[i].modulo_Id,
                    perfil_Id: itemModulo.value[i].perfil,
                    registrar: itemModulo.value[i].create,
                    actualizar: itemModulo.value[i].update,
                    eliminar: itemModulo.value[i].delete,
                    leer: itemModulo.value[i].read
                  },{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}}).then(function (respuesta){
                    let{data,success} = respuesta.data
                      if(respuesta.status == 200 && success == true){
                          $q.notify({
                            type: 'positive',
                            message: data,
                            position: 'top-right',
                            progress: true,
                          })
                      }
                      else{
                        $q.notify({
                          type: 'negative',
                          message: data,
                          position: 'top-right',
                          progress: true
                          })
                        }
                      })
                }
              }
            }

            RegistroUsuario.value = false
            loading.value = true
            rowsusuario.value = [  ]
            getAreas()
            loading.value = false
            limpiarRegistro()
            $q.loading.hide()

          }
       },

      //Metodo edit para editar los registros
        onEdit(){
          $q.loading.show()
         const value = idsperfil.value
         if(itemModuloNuevo.value.length === 0){
            if(itemModulo.value.length != 0){
              for(var i=0; i < itemModulo.value.length; i++){
                if(itemModulo.value[i].create === true || itemModulo.value[i].update === true || itemModulo.value[i].delete === true || itemModulo.value[i].read === true ){
                  api.put('/Permisos_Modulos_Perfiles/'+ itemModulo.value[i].idRegistro,{
                    modulo_Id: itemModulo.value[i].modulo_Id,
                    perfil_Id: itemModulo.value[i].perfil,
                    registrar: itemModulo.value[i].create,
                    actualizar: itemModulo.value[i].update,
                    eliminar: itemModulo.value[i].delete,
                    leer: itemModulo.value[i].read
                  },{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}}).then(function (respuesta){
                    let{data,success} = respuesta.data
                      if(respuesta.status == 200 && success == true){
                          $q.notify({
                            type: 'positive',
                            message: data,
                            position: 'top-right',
                            progress: true,
                          })
                      }
                      else{
                        $q.notify({
                          type: 'negative',
                          message: data,
                          position: 'top-right',
                          progress: true
                          })
                        }
                      })
                }
                else
                {
                  api.delete('/Permisos_Modulos_Perfiles/'+itemModulo.value[i].idRegistro,{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}}).then(function (respuesta){
                    let{data,success} = respuesta.data
                    if(respuesta.status == 200 && success == true){
                      $q.notify({
                        type: 'positive',
                        message: data,
                        position: 'top-right',
                        progress: true,
                      })
                    }
                  })
                }
              }
              EditarPerfil.value = false
            loading.value = true
            rowsusuario.value = [  ]
            getAreas()
            loading.value = false
            limpiarRegistro()
            $q.loading.hide()
            }
            else
            {
              $q.notify({
                type: 'negative',
                message: 'Registro vacio, llene datos por favor',
                position: 'top-right',
                progress: true
              })
              $q.loading.hide()
            }
          }
          else
          {
            for(var i=0; i < itemModuloNuevo.value.length; i++){
               if(itemModuloNuevo.value[i].create === true || itemModuloNuevo.value[i].update === true || itemModuloNuevo.value[i].delete === true || itemModuloNuevo.value[i].read === true ){
                    api.post("/Permisos_Modulos_Perfiles",{
                    modulo_Id: itemModuloNuevo.value[i].modulo_Id,
                    perfil_Id: value,
                    registrar: itemModuloNuevo.value[i].create,
                    actualizar: itemModuloNuevo.value[i].update,
                    eliminar: itemModuloNuevo.value[i].delete,
                    leer: itemModuloNuevo.value[i].read,
                    },{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}}).then(function (respuesta){
                    let{data,success} = respuesta.data
                  if(respuesta.status == 200 && success == true){

                      $q.notify({
                        type: 'positive',
                        message: data,
                        position: 'top-right',
                        progress: true,
                      })
                  }
                  else{
                    $q.notify({
                      type: 'negative',
                      message: data,
                      position: 'top-right',
                      progress: true
                      })
                    }
                })
              }
            }
            if(itemModulo.value.length != 0){
              for(var i=0; i < itemModulo.value.length; i++){
                 if(itemModulo.value[i].create === true || itemModulo.value[i].update === true || itemModulo.value[i].delete === true || itemModulo.value[i].read === true ){
                  api.put('/Permisos_Modulos_Perfiles/'+ itemModulo.value[i].idRegistro,{
                    modulo_Id: itemModulo.value[i].modulo_Id,
                    perfil_Id: itemModulo.value[i].perfil,
                    registrar: itemModulo.value[i].create,
                    actualizar: itemModulo.value[i].update,
                    eliminar: itemModulo.value[i].delete,
                    leer: itemModulo.value[i].read
                  },{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}}).then(function (respuesta){
                    let{data,success} = respuesta.data
                      if(respuesta.status == 200 && success == true){
                          $q.notify({
                            type: 'positive',
                            message: data,
                            position: 'top-right',
                            progress: true,
                          })
                      }
                      else{
                        $q.notify({
                          type: 'negative',
                          message: data,
                          position: 'top-right',
                          progress: true
                          })
                        }
                      })
                }
                else{
                   api.delete('/Permisos_Modulos_Perfiles/'+itemModulo.value[i].idRegistro,{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}}).then(function (respuesta){
                    let{data,success} = respuesta.data
                    if(respuesta.status == 200 && success == true){
                      $q.notify({
                        type: 'positive',
                        message: data,
                        position: 'top-right',
                        progress: true,
                      })
                    }
                  })
                }
              }
            }

            EditarPerfil.value = false
            loading.value = true
            rowsusuario.value = [  ]
            getAreas()
            loading.value = false
            limpiarRegistro()
            $q.loading.hide()

          }

          },

       exportTable () {
          const content = [columnsusuario.map(col => wrapCsvValue(col.label))].concat(
          rowsusuario.value.map(row => columnsusuario.map(col => wrapCsvValue(
              typeof col.field === 'function'
              ? col.field(row)
              : row[ col.field === void 0 ? col.name : col.field ],
              col.format
          )).join(','))
          ).join('\r\n')

          const status = exportFile(
          'table-export.csv',
          content,
          'text/csv'
          )

          if (status !== true) {
          $q.notify({
              message: 'Archivo no se pudo descargar...',
              color: 'negative',
              icon: 'warning',
              position: 'top-right'
          })
          }
      },
    }
    methods
    function wrapCsvValue (val, formatFn) {
      let formatted = formatFn !== void 0
          ? formatFn(val)
          : val

      formatted = formatted === void 0 || formatted === null
          ? ''
          : String(formatted)

      formatted = formatted.split('"').join('""')
      /**
       * Excel accepts \n and \r in strings, but some other CSV parsers do not
       * Uncomment the next two lines to escape new lines
       */
      // .split('\n').join('\\n')
      // .split('\r').join('\\r')

      return `"${formatted}"`
    }

  },

})
</script>
