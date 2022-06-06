<template>
          <!-- Aqui inicia el template con la tabla -->
  <div class="row q-pa-sm q-gutter-md">
      <div class="col-12">
        <q-btn v-show="PRegistrar" class="q-ma-sm" color="purple-ieen" icon-right="add_circle_outline" label="Agregar nuevo" @click="RegistrarPermiso"/>
          <q-table
              v-show="PLeer"
              title="Registro de Permisos por perfil"
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
          <div class="text-h6">Registro de permiso de usuario</div>
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
              </div>
              <div class="text-caption">{{EtiquetaPerfilNoRegistrados}}</div>
              <div class="q-gutter-sm q-gutter-y-sm row items-start" v-for=" item in itemSistemaNuevo" :key="item.value">

                <div class="col q-pb-none">
                  {{item.sistema}}
                </div>
                <div class="col q-pt-none">
                   <div class="q-gutter-sm">
                      <q-radio v-model="item.accede" :val="false" label="Sin Acceso" />
                      <q-radio v-model="item.accede" :val="true" label="Acceso" />

                    </div>
                  <q-input v-show="false" v-model="item.sistema_Id"/>
                  <q-input v-show="false" v-model="item.idReg"/>


                </div>
                <div class="col">

                </div>
              </div>
              <div class="text-caption">{{EtiquetaPerfilRegistrados}}</div>
              <div class="q-gutter-sm q-gutter-y-sm row items-start" v-for=" item in itemSistema" :key="item.value">

                <div class="col q-pb-none">
                  {{item.sistema}}
                </div>
                <div class="col q-pt-none">
                   <div class="q-gutter-sm">
                      <q-radio v-model="item.accede" :val="false" label="Sin Acceso" />
                      <q-radio v-model="item.accede" :val="true" label="Acceso" />

                    </div>
                  <q-input v-show="false" v-model="item.sistema_Id"/>
                  <q-input v-show="false" v-model="item.idReg"/>


                </div>
                <div class="col">

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
              <q-input  v-show="false" v-model="idsperfil" />
               <div class="text-caption">{{EtiquetaPerfilNoRegistrados}}</div>
              <div class="q-gutter-sm q-gutter-y-sm row items-start" v-for=" item in itemSistemaNuevo" :key="item.value">

                <div class="col q-pb-none">
                  {{item.sistema}}
                </div>
                <div class="col q-pt-none">
                   <div class="q-gutter-sm">
                      <q-radio v-model="item.accede" :val="false" label="Sin Acceso" />
                      <q-radio v-model="item.accede" :val="true" label="Acceso" />

                    </div>

                  <q-input v-show="false" v-model="item.sistema_Id"/>
                  <q-input v-show="false" v-model="item.idReg"/>


                </div>
                <div class="col">

                </div>
              </div>
              <div class="text-caption">{{EtiquetaPerfilRegistrados}}</div>
              <div class="q-gutter-sm q-gutter-y-sm row items-start" v-for=" items in itemSistema" :key="items.value">

                <div class="col q-pb-none">
                  {{items.sistema}}
                </div>
                <div class="col q-pt-none">
                   <div class="q-gutter-sm">
                      <q-radio v-model="items.accede" :val="false" label="Sin Acceso"  />
                      <q-radio v-model="items.accede" :val="true" label="Acceso" />

                    </div>
                  <q-input v-show="false" v-model="items.sistema_Id"/>
                  <q-input v-show="false" v-model="items.idReg"/>
                </div>
                <div class="col q-pt-none">
                <q-btn  flat round color="purple-ieen" icon="delete" @click="DeletePerfil(items.idReg, items.perfil_Id)">
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
  name: 'TemplatePerPerfil',

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
    const SistemasPerfil = ref([])
    const SistemasTotal = ref([])
    const itemSistema = ref([])
    const itemSistemaNuevo = ref([])
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
         const filtro = Lista.find(elemento => elemento.nombre === "AccesoPerfil")
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
      itemSistema.value = []
      itemSistemaNuevo.value = []
      EtiquetaPerfilRegistrados.value = ""
      EtiquetaPerfilNoRegistrados.value = ""
      const resp = await api.get('/SistemasPerfiles/ByPerfil/'+id, {headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
      let{data} = resp.data;
      Etiqueta.value = data[0].perfil
          data.forEach((item)=>{
            itemSistema.value.push({
               idReg: item.id,
               sistema_Id: item.sistema_Id,
               perfil_Id: item.perfil_Id,
               accede: item.accede,
               sistema: item.sistema,
               perfil: item.perfil

            })
          })
      const respuesta = await api.get('/Sistemas',{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
      let datos = respuesta.data.data;
          datos.forEach((item)=>{
            itemSistemaNuevo.value.push({
               idReg: 0,
               sistema_Id: item.id,
               perfil_Id: 0,
               accede: false,
               sistema: item.nombre,
               perfil: 0
            })
          })

          if(itemSistema.value.length === 0){
            EtiquetaPerfilNoRegistrados.value = "Sistemas sin permisos definidos para este perfil"
            itemSistema.value = []

          } else if(itemSistema.value.length === itemSistemaNuevo.value.length){
            EtiquetaPerfilRegistrados.value = "Sistemas con permisos definidos, pueden ser editados"
            let filtroNuevo = itemSistemaNuevo.value
            console.log(filtroNuevo)
            console.log(itemSistema.value)

            for(var i = 0; i < itemSistema.value.length; i++ ){
              console.log(itemSistema.value[i].sistema_Id)
              let filtro = filtroNuevo.find(elemento => elemento.sistema_Id === itemSistema.value[i].sistema_Id)
              console.log(filtro)
              }
              itemSistemaNuevo.value =[]

          }else{
            EtiquetaPerfilNoRegistrados.value = "Sistemas sin permisos definidos para este perfil"
            EtiquetaPerfilRegistrados.value = "Sistemas con permisos definidos, pueden ser editados"
            let filtroNuevo = itemSistema.value
            let NuevosSistemas = itemSistemaNuevo.value
            let tamano = itemSistemaNuevo.value.length
            itemSistemaNuevo.value = []
            console.log("Este es el largo del arreglo del sistema",tamano)
            for(var i = 0; i < tamano; i++ ){
              let filtro = filtroNuevo.find(elemento => elemento.sistema_Id === NuevosSistemas[i].sistema_Id)
              console.log(filtro)
              if(filtro === undefined){
                 itemSistemaNuevo.value.push({
               idReg: 0,
               sistema_Id: NuevosSistemas[i].sistema_Id,
               perfil_Id: 0,
               accede: false,
               sistema: NuevosSistemas[i].sistema,
               perfil: 0
            })

              }
              else{
              }
            }
          }
    }

     const RegistrarPermiso = async() =>{
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
        metodoPrueba(nuevoValor.value);
      }


    })

    const metodoPrueba = async (id) =>  {
      itemSistema.value = []
      itemSistemaNuevo.value = []
      EtiquetaPerfilRegistrados.value = ""
      EtiquetaPerfilNoRegistrados.value = ""
      const resp = await api.get('/SistemasPerfiles/ByPerfil/'+id,{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
      let{data} = resp.data;
          data.forEach((item)=>{
            itemSistema.value.push({
               idReg: item.id,
               sistema_Id: item.sistema_Id,
               perfil_Id: item.perfil_Id,
               accede: item.accede,
               sistema: item.sistema,
               perfil: item.perfil

            })
          })
      const respuesta = await api.get('/Sistemas',{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
      let datos = respuesta.data.data;
          datos.forEach((item)=>{
            itemSistemaNuevo.value.push({
               idReg: 0,
               sistema_Id: item.id,
               perfil_Id: 0,
               accede: false,
               sistema: item.nombre,
               perfil: 0
            })
          })

          if(itemSistema.value.length === 0){
            EtiquetaPerfilNoRegistrados.value = "Sistemas sin permisos definidos para este perfil"
            itemSistema.value = []

          } else if(itemSistema.value.length === itemSistemaNuevo.value.length){
            EtiquetaPerfilRegistrados.value = "Sistemas con permisos definidos, pueden ser editados"
              itemSistemaNuevo.value =[]

          }else{
            EtiquetaPerfilNoRegistrados.value = "Sistemas sin permisos definidos para este perfil"
            EtiquetaPerfilRegistrados.value = "Sistemas con permisos definidos, pueden ser editados"
            let filtroNuevo = itemSistema.value
            let NuevosSistemas = itemSistemaNuevo.value
            let tamano = itemSistemaNuevo.value.length
            itemSistemaNuevo.value = []
            console.log("Este es el largo del arreglo del sistema",tamano)
            for(var i = 0; i < tamano; i++ ){
              let filtro = filtroNuevo.find(elemento => elemento.sistema_Id === NuevosSistemas[i].sistema_Id)
              console.log(filtro)
              if(filtro === undefined){
                 itemSistemaNuevo.value.push({
               idReg: 0,
               sistema_Id: NuevosSistemas[i].sistema_Id,
               perfil_Id: 0,
               accede: false,
               sistema: NuevosSistemas[i].sistema,
               perfil: 0
                })

              }
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
          api.delete('/SistemasPerfiles/'+id,{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}}).then(function (respuesta){
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
        itemSistemaNuevo.value = []
        EtiquetaPerfilNoRegistrados.value = ""
        EtiquetaPerfilRegistrados.value = ""
        NombreEmpleado.value=""
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
       loading,
       limpiarRegistro,
       EditarPerfilMetodo,
       RegistrarPermiso,
       itemSistema,
       itemSistemaNuevo,
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
          if(itemSistemaNuevo.value.length === 0){
             for(var i=0; i < itemSistema.value.length; i++){
              const sistema = itemSistema.value[i].sistema_Id
              const modelo = itemSistema.value[i].accede
             api.put("/SistemasPerfiles/"+itemSistema.value[i].idReg,{
              sistema_Id: sistema,
              perfil_Id: value,
              accede: modelo,
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
          else
          {
            if(itemSistema.value.length != 0)
            {
              console.log("itemsistema es diferente a 0")
               for(var i=0; i < itemSistema.value.length; i++){
              const sistema = itemSistema.value[i].sistema_Id
              const modelo = itemSistema.value[i].accede

             api.put("/SistemasPerfiles/"+itemSistema.value[i].idReg,{
              sistema_Id: sistema,
              perfil_Id: value,
              accede: modelo,
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

             for(var i=0; i < itemSistemaNuevo.value.length; i++){
              const sistema = itemSistemaNuevo.value[i].sistema_Id
              const modelo = itemSistemaNuevo.value[i].accede
              if(modelo === true){
                api.post("/SistemasPerfiles",{
                  sistema_Id: sistema,
                  perfil_Id: value,
                  accede: modelo,
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
            limpiarRegistro()
            $q.loading.hide()
            loading.value = true
            rowsusuario.value = [  ]
            getAreas()
            loading.value = false

       },

      //Metodo edit para editar los registros
        onEdit(){
          $q.loading.show()
         const value = idsperfil.value
          console.log(value)
          if(itemSistemaNuevo.value.length === 0){
             for(var i=0; i < itemSistema.value.length; i++){
              const sistema = itemSistema.value[i].sistema_Id
              const modelo = itemSistema.value[i].accede
             api.put("/SistemasPerfiles/"+itemSistema.value[i].idReg,{
              sistema_Id: sistema,
              perfil_Id: value,
              accede: modelo,
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
            if(itemSistema.value.length != 0)
            {
               for(var i=0; i < itemSistema.value.length; i++){
              const sistema = itemSistema.value[i].sistema_Id
              const modelo = itemSistema.value[i].accede
             api.put("/SistemasPerfiles/"+itemSistema.value[i].idReg,{
              sistema_Id: sistema,
              perfil_Id: value,
              accede: modelo,
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
             loading.value = true
                rowsusuario.value = [  ]
                getAreas()
                loading.value = false

            }
            for(var i=0; i < itemSistemaNuevo.value.length; i++){
            const sistema = itemSistemaNuevo.value[i].sistema_Id
            const modelo = itemSistemaNuevo.value[i].accede
              if(modelo === true){
                api.post("/SistemasPerfiles",{
                  sistema_Id: sistema,
                  perfil_Id: value,
                  accede: modelo,
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
            RegistroUsuario.value = false
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
    function wrapCsvValue (val, formatFn) {
      let formatted = formatFn !== void 0
          ? formatFn(val)
          : val

      formatted = formatted === void 0 || formatted === null
          ? ''
          : String(formatted)

      formatted = formatted.split('"').join('""')
      return `"${formatted}"`
    }
  },
})
</script>
