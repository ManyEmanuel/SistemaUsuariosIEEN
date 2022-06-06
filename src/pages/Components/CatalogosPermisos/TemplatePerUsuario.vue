<template>
          <!-- Aqui inicia el template con la tabla -->
  <div class="row q-pa-sm q-gutter-md">
      <div class="col-12">
        <q-btn v-show="PRegistrar" class="q-ma-sm" color="purple-ieen" icon-right="add_circle_outline" label="Agregar nuevo" @click="RegistrarPermiso"/>
          <q-table
              v-show="PLeer"
              title="Registro de permisos por usuario"
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

                  <q-btn v-if="col.name==='id'" v-show="PActualizar"  flat round color="purple-ieen" icon="edit" @click="EditarPerfilMetodo(col.value)">
                    <q-tooltip>
                      editar registro
                    </q-tooltip>
                  </q-btn>
                   <q-img v-else-if="col.name==='foto'"
                    :src="col.value"
                    spinner-color="white"
                    style="height: 70px; max-width: 60px"
                  />
                  <label v-else>{{col.value}}</label>
                  </q-td>
                </q-tr>
              </template>
          </q-table>
      </div>
  </div>
       <!-- Dialog para el registro de  tipo de area -->
    <q-dialog v-model="RegistroUsuario" persistent transition-show="scale" transition-hide="scale">
      <q-card style="width: 900px; max-width: 80vw;">
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
                    use-input
                    @filter="filterFn"
                    v-model="NombreEmpleado"
                    :options="itemsEmpleado"
                    label="Listado de empleados con usuario"
                    lazy-rules
                    :rules="[val => !!val || 'Por favor seleccione un empleado']"
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
                      <q-radio v-model="item.accede" :val="false" label="Sin Acceso" @click="item.estado = true"/>
                      <q-radio v-model="item.accede" :val="true" label="Acceso" @click="item.estado = false"/>

                    </div>
                  <q-input v-show="false" v-model="item.sistema_Id" />
                  <q-input v-show="false" v-model="item.idReg"/>


                </div>
                <div class="col">
                  <q-select
                    :disable="item.estado"
                    v-model="item.ModeloPerfil"
                    :options="itemPerfil"
                    label="Perfil dentro del sistema"
                    lazy-rules
                    :rules="[val => !!val || 'Por favor seleccione un perfil']"
                  />
                </div>
              </div>
              <div class="text-caption">{{EtiquetaPerfilRegistrados}}</div>
              <div class="q-gutter-sm q-gutter-y-sm row items-start" v-for=" item in itemSistema" :key="item.value">

                <div class="col q-pb-none">
                  {{item.sistema}}
                </div>
                <div class="col q-pt-none">
                   <div class="q-gutter-sm">
                      <q-radio v-model="item.accede" :val="false" label="Sin Acceso" @click="item.estado = true" />
                      <q-radio v-model="item.accede" :val="true" label="Acceso" @click="item.estado = false" />

                    </div>
                  <q-input v-show="false" v-model="item.sistema_Id"/>
                  <q-input v-show="false" v-model="item.idReg"/>


                </div>
                 <div class="col">
                  <q-select
                    :disable="item.estado"
                    v-model="item.ModeloPerfil"
                    :options="itemPerfil"
                    label="Perfil dentro del sistema"
                    lazy-rules
                    :rules="[val => !!val || 'Por favor seleccione un perfil']"
                  />
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
        <q-card style="width: 900px; max-width: 80vw;">
          <q-card-section class="q-pb-xs">
            <div class="text-h6">Editar permisos por usuario</div>
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
                      <q-radio v-model="item.accede" :val="false" label="Sin Acceso" @click="item.estado = true"/>
                      <q-radio v-model="item.accede" :val="true" label="Acceso" @click="item.estado = false"/>

                    </div>
                  <q-input v-show="false" v-model="item.sistema_Id" />
                  <q-input v-show="false" v-model="item.idReg"/>


                </div>
                <div class="col">
                  <q-select
                    :disable="item.estado"
                    v-model="item.ModeloPerfil"
                    :options="itemPerfil"
                    label="Perfil dentro del sistema"
                    lazy-rules
                    :rules="[val => !!val || 'Por favor seleccione un perfil']"
                  />
                </div>
              </div>
              <div class="text-caption">{{EtiquetaPerfilRegistrados}}</div>
              <div class="q-gutter-sm q-gutter-y-sm row items-start" v-for=" item in itemSistema" :key="item.value">

                <div class="col q-pb-none">
                  {{item.sistema}}
                </div>
                <div class="col q-pt-none">
                   <div class="q-gutter-sm">
                      <q-radio v-model="item.accede" :val="false" label="Sin Acceso" @click="item.estado = true" />
                      <q-radio v-model="item.accede" :val="true" label="Acceso" @click="item.estado = false" />

                    </div>
                  <q-input v-show="false" v-model="item.sistema_Id"/>
                  <q-input v-show="false" v-model="item.idReg"/>


                </div>
                 <div class="col">
                  <q-select
                    :disable="item.estado"
                    v-model="item.ModeloPerfil"
                    :options="itemPerfil"
                    label="Perfil dentro del sistema"
                    lazy-rules
                    :rules="[val => !!val || 'Por favor seleccione un perfil']"
                  >
                    <template v-slot:after>
                      <q-btn  flat round color="purple-ieen" icon="delete" @click="DeletePerfil(item.idReg, idsperfil)">
                      <q-tooltip>
                        Borrar registro
                      </q-tooltip>
                  </q-btn>
                    </template>
                  </q-select>

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

                { name: 'empleado', align: 'center', label: 'Nombre de Empleado', field: 'empleado' },
                { name: 'usuario', align: 'center', label: 'Usuario', field: 'usuario', sortable: true, },
                { name: 'email', align: 'center', label: 'Email de usuario', field: 'email', sortable: true, },
                { name: 'foto', align: 'center', label: 'Foto del usuario', field: 'foto', sortable: true, },
                { name: 'id', align: 'center', label: 'Opciones', field: 'id' },

            ]


export default defineComponent({
  name: 'TemplatePerUsuario',

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
    const OpcionesFiltro = ref([])
    const SistemasPerfil = ref([])
    const SistemasTotal = ref([])
    const itemSistema = ref([])
    const itemPerfil = ref([])
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
         const filtro = Lista.find(elemento => elemento.nombre === "AccesoUsuario")
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
      var ListaEmpleados = await api.get('/Empleados',{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
      var Empleado = ListaEmpleados.data.data
      var ListaUsuarios = await api.get('/Usuarios',{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
      var Usuario = ListaUsuarios.data.data
      Usuario.forEach (async resultado => {
        var ListaPermisos = await api.get('/SistemasUsuarios/ByUsuario/'+resultado.id,{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
        var Permisos = ListaPermisos.data.data
        if(Permisos.length != 0){
           let filtro = Empleado.find(elemento => elemento.id === resultado.empleado_Id)
             if(filtro != undefined){
            let obj = {
              "id":resultado.id,
              "usuario":resultado.userName,
              "email":resultado.email,
              "foto":resultado.foto_Url,
              "empleado": filtro.nombres +" "+filtro.apellido_Paterno+" "+ filtro.apellido_Materno
            };
            rowsusuario.value.push(obj)
            }
        }
      })
      loading.value = false
    }
    getAreas()


    const EditarPerfilMetodo = async (id) =>{

      EditarPerfil.value = true
      idsperfil.value = id
      const emp = await api.get('/Empleados',{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
      let emple = emp.data.data
      const usu = await api.get('/Usuarios/'+id,{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
      let usua = usu.data.data
      let name = emple.find(elemento=> elemento.id === usua.empleado_Id)
      Etiqueta.value = name.nombres +' ' +name.apellido_Paterno +' ' + name.apellido_Materno
      itemSistema.value = []
      itemSistemaNuevo.value = []
      itemPerfil.value=[]
      EtiquetaPerfilRegistrados.value = ""
      EtiquetaPerfilNoRegistrados.value = ""
       const perfil = await api.get('/perfiles',{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
        let perf = perfil.data.data;
        perf.forEach((item)=>{
          itemPerfil.value.push({
              label: item.nombre,
              value: item.id
          });
        })
      const resp = await api.get('/SistemasUsuarios/ByUSuario/'+id,{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
      let{data} = resp.data
      console.log(data.value)
      let disab = false
      const filtro1 = itemPerfil.value
          data.forEach((item)=>{
            if(item.accede === false){
              disab = true
            }
            let valor = filtro1.find(elemento => elemento.value === item.perfil_Id)
            console.log("Este es el modelo del select de perfiles",valor)
            itemSistema.value.push({
               idReg: item.id,
               sistema_Id: item.sistema_Id,
               perfil_Id: item.perfil_Id,
               accede: item.accede,
               sistema: item.sistema,
               perfil: item.perfil,
               ModeloPerfil: valor,
               estado: disab

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
               perfil: 0,
               ModeloPerfil: "",
               estado: true
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
            for(var i = 0; i < tamano; i++ ){
              let filtro = filtroNuevo.find(elemento => elemento.sistema_Id === NuevosSistemas[i].sistema_Id)

              if(filtro === undefined){
                 itemSistemaNuevo.value.push({
               idReg: 0,
               sistema_Id: NuevosSistemas[i].sistema_Id,
               perfil_Id: 0,
               accede: false,
               sistema: NuevosSistemas[i].sistema,
               perfil: 0,
               ModeloPerfil: "",
               estado: true
              })

              }
              else{

              }
            }
          }

        }

     const RegistrarPermiso = async()=>{
      RegistroUsuario.value = true
      itemsEmpleado.value =[]
      var ListaEmpleados = await api.get('/Empleados',{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
      var Empleado = ListaEmpleados.data.data
      const respuesta = await api.get('/Usuarios',{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
      let{data} = respuesta.data;
      var ListaRegistro = await api.get('/SistemasUsuarios',{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
      var registro = ListaRegistro.data.data
      data.forEach((item)=>{
        let primerFiltro = registro.find(elemento => elemento.usuario_Id === item.id)
        if(primerFiltro === undefined){
          let filtro = Empleado.find(elemento => elemento.id === item.empleado_Id)
            if(filtro != undefined){
              itemsEmpleado.value.push({
              label: filtro.nombres +" "+filtro.apellido_Paterno+" "+ filtro.apellido_Materno,
              value: item.id,
              });
            }
          }
        })
        OpcionesFiltro.value = itemsEmpleado.value
      }



    watch(NombreEmpleado,(nuevoValor, viejoValor) => {
      console.log(nuevoValor)
      if(nuevoValor != null){
        if(nuevoValor.value != undefined){
          metodoPrueba(nuevoValor.value);
        }
      }else{
        itemSistema.value = []
        itemSistemaNuevo.value = []
        itemPerfil.value=[]
        EtiquetaPerfilRegistrados.value = ""
        EtiquetaPerfilNoRegistrados.value = ""
      }
    })

    const metodoPrueba = async (id) =>  {
      itemSistema.value = []
      itemSistemaNuevo.value = []
      itemPerfil.value=[]
      EtiquetaPerfilRegistrados.value = ""
      EtiquetaPerfilNoRegistrados.value = ""
      const perfil = await api.get('/perfiles',{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
        let perf = perfil.data.data;
        perf.forEach((item)=>{
          itemPerfil.value.push({
              label: item.nombre,
              value: item.id
          });
      })
      const resp = await api.get('/SistemasUsuarios/ByUSuario/'+id,{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
      let{data} = resp.data
      console.log(data.value)
      let disab = false
      const filtro1 = itemPerfil.value
          data.forEach((item)=>{
            if(item.accede === false){
              disab = true
            }
            let valor = filtro1.find(elemento => elemento.value === item.perfil_Id)
            console.log("Este es el modelo del select de perfiles",valor)
            itemSistema.value.push({
               idReg: item.id,
               sistema_Id: item.sistema_Id,
               perfil_Id: item.perfil_Id,
               accede: item.accede,
               sistema: item.sistema,
               perfil: item.perfil,
               ModeloPerfil: valor,
               estado: disab
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
               perfil: 0,
               ModeloPerfil: "",
               estado: true
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
            for(var i = 0; i < tamano; i++ ){
              let filtro = filtroNuevo.find(elemento => elemento.sistema_Id === NuevosSistemas[i].sistema_Id)

              if(filtro === undefined){
                 itemSistemaNuevo.value.push({
               idReg: 0,
               sistema_Id: NuevosSistemas[i].sistema_Id,
               perfil_Id: 0,
               accede: false,
               sistema: NuevosSistemas[i].sistema,
               perfil: 0,
               ModeloPerfil: "",
               estado: true
              })

              }
              else{
              }
            }
          }
        }

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
          api.delete('/SistemasUsuarios/'+id,{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}}).then(function (respuesta){
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
       itemPerfil,
       nameModelo,
       SistemasPerfil,
       SistemasTotal,
       totalPerfil,
       EtiquetaPerfilRegistrados,
       EtiquetaPerfilNoRegistrados,
       OpcionesFiltro,
       PRegistrar,
        PActualizar,
        PEliminar,
        PLeer,
        ListaPermiso,
      //MEtodo submit para guardar registro

      filterFn (val, update) {
        if (val === '') {
          update(() => {
            itemsEmpleado.value = OpcionesFiltro.value

            // here you have access to "ref" which
            // is the Vue reference of the QSelect
          })
          return
        }

        update(() => {
          const needle = val.toLowerCase()
          itemsEmpleado.value = OpcionesFiltro.value.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
        })
      },

       onSubmit(){
          $q.loading.show()
          const {value} = NombreEmpleado.value
          console.log(value)
          if(itemSistemaNuevo.value.length === 0){
             for(var i=0; i < itemSistema.value.length; i++){
              const sistema = itemSistema.value[i].sistema_Id
              const modelo = itemSistema.value[i].accede
               const perfil = itemSistema.value[i].ModeloPerfil.value
             api.put("/SistemasUsuarios/"+itemSistema.value[i].idReg,{
                  sistema_Id: sistema,
                  usuario_Id: value,
                  accede: modelo,
                  perfil_Id: perfil
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
            limpiarRegistro()
            $q.loading.hide()
            loading.value = true
            rowsusuario.value = [  ]
            getAreas()
            loading.value = false

          }
          else
          {
            if(itemSistema.value.length != 0)
            {
               for(var i=0; i < itemSistema.value.length; i++){
              const sistema = itemSistema.value[i].sistema_Id
              const modelo = itemSistema.value[i].accede
              const perfil = itemSistema.value[i].ModeloPerfil.value
             api.put("/SistemasUsuarios/"+itemSistema.value[i].idReg,{
               sistema_Id: sistema,
                usuario_Id: value,
                accede: modelo,
                perfil_Id: perfil
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
              const perfil = itemSistemaNuevo.value[i].ModeloPerfil.value
              if(modelo === true){

                api.post("/SistemasUsuarios",{
                  sistema_Id: sistema,
                  usuario_Id: value,
                  accede: modelo,
                  perfil_Id: perfil
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

      //Metodo edit para editar los registros
        onEdit(){
          $q.loading.show()
         const value = idsperfil.value
          console.log(value)
          if(itemSistemaNuevo.value.length === 0){
             for(var i=0; i < itemSistema.value.length; i++){
              const sistema = itemSistema.value[i].sistema_Id
              const modelo = itemSistema.value[i].accede
               const perfil = itemSistema.value[i].ModeloPerfil.value
             api.put("/SistemasUsuarios/"+itemSistema.value[i].idReg,{
                  sistema_Id: sistema,
                  usuario_Id: value,
                  accede: modelo,
                  perfil_Id: perfil
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
            EditarPerfil.value = false
            limpiarRegistro()
            $q.loading.hide()
            loading.value = true
            rowsusuario.value = [  ]
            getAreas()
            loading.value = false

          }
          else
          {
            if(itemSistema.value.length != 0)
            {
               for(var i=0; i < itemSistema.value.length; i++){
              const sistema = itemSistema.value[i].sistema_Id
              const modelo = itemSistema.value[i].accede
              const perfil = itemSistema.value[i].ModeloPerfil.value
             api.put("/SistemasUsuarios/"+itemSistema.value[i].idReg,{
               sistema_Id: sistema,
                usuario_Id: value,
                accede: modelo,
                perfil_Id: perfil
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
              const perfil = itemSistemaNuevo.value[i].ModeloPerfil.value
              if(modelo === true){

                api.post("/SistemasUsuarios",{
                  sistema_Id: sistema,
                  usuario_Id: value,
                  accede: modelo,
                  perfil_Id: perfil
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
