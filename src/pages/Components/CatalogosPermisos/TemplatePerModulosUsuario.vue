<template>
          <!-- Aqui inicia el template con la tabla -->
  <div class="row q-pa-sm q-gutter-md">
      <div class="col-12">
        <q-btn v-show="PRegistrar" class="q-ma-sm" color="purple-ieen" icon-right="add_circle_outline" label="Agregar nuevo" @click="RegistrarPermiso"/>
          <q-table
              v-show="PLeer"
              title="Registro de usuarios con acceso a módulos de sistemas"
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
      <q-card style="width: 800px; max-width: 80vw;">
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
                    v-model="NombreEmpleado"
                    :options="itemsEmpleado"
                    @filter="filterFn"
                    label="Listado de usuarios"
                    lazy-rules
                    :rules="[val => !!val || 'Por favor seleccione un usuario']"
                  />
                </div>
                <div class="col">
                  <q-select
                    filled
                    v-model="NombreSistema"
                    :options="itemsSistema"
                    label="Listado de sistemas con acceso el usuario"
                    lazy-rules
                    :rules="[val => !!val || 'Por favor seleccione un sistema']"
                  />
                </div>
              </div>
               <div class="text-caption">{{EtiquetaUsuarioNoRegistrados}}</div>
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
                  <q-input v-show="false" v-model="item.modulo_id"/>
                  <!--<q-input v-show="false" v-model="item.idReg"/>-->
                </div>
              </div>
              <div class="text-caption">{{EtiquetaUsuarioRegistrados}}</div>
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
                  <q-input v-show="false" v-model="item.modulo_id"/>
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
               <div class="q-gutter-sm row items-start">
                <div class="col">
                  <q-select
                    filled
                    v-model="NombreSistema"
                    :options="itemsSistema"
                    label="Listado de sistemas con acceso el usuario"
                    lazy-rules
                    :rules="[val => !!val || 'Por favor seleccione un perfil']"
                  />
                </div>
              </div>
               <div class="text-caption">{{EtiquetaUsuarioNoRegistrados}}</div>
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
                  <q-input v-show="false" v-model="item.modulo_id"/>
                  <q-input v-show="false" v-model="item.usuario"/>
                  <!--<q-input v-show="false" v-model="item.idReg"/>-->
                </div>
              </div>
              <div class="text-caption">{{EtiquetaUsuarioRegistrados}}</div>
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
                  <q-input v-show="false" v-model="item.modulo_id"/>
                  <q-input v-show="false" v-model="item.idRegistro"/>
                  <q-input v-show="false" v-model="item.usuario"/>


                </div>
                <div class="col-1 q-pt-none">
                <q-btn  flat round color="purple-ieen" icon="delete" @click="DeletePerfil(item.idRegistro, item.usuario)">
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

                { name: 'empleado', align: 'center', label: 'Nombre de Empleado', field: 'empleado' },
                { name: 'usuario', align: 'center', label: 'Usuario', field: 'usuario', sortable: true, },
                { name: 'email', align: 'center', label: 'Email de usuario', field: 'email', sortable: true, },
                { name: 'foto', align: 'center', label: 'Foto del usuario', field: 'foto', sortable: true, },
                { name: 'id', align: 'center', label: 'Opciones', field: 'id' },

            ]


export default defineComponent({
  name: 'TemplatePerModulosUsuario',

  setup(){
    const $q = useQuasar()
    const store = useStore()
    //Variables de guardado y edición
    const idsperfil = ref('')
    const nombrePerfil = ref('')
    const descripcionPerfil = ref('')
    const NombreEmpleado = ref()
    const itemsEmpleado = ref([])
    var OpcionesFiltro = ref([])
    const NombreSistema = ref()
    const itemsSistema = ref([])
    const SistemasPerfil = ref([])
    const SistemasTotal = ref([])
    const itemModulo = ref([])
    const itemModuloNuevo = ref([])
    const ListaSistema = ref([])
    const UsuariosRe = ref([])
    let Etiqueta = ref ('')
    let EtiquetaUsuarioRegistrados = ref('')
    let EtiquetaUsuarioNoRegistrados = ref('')
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
         const filtro = Lista.find(elemento => elemento.nombre === "PermisosUsuario")
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
      var ListaEmpleados = await api.get('/Empleados',{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
      var Empleado = ListaEmpleados.data.data
      var ListaUsuarios = await api.get('/Usuarios',{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
      var Usuario = ListaUsuarios.data.data
      Usuario.forEach (async resultado => {
        var ListaPermisos = await api.get('/PermisosModulosUsuarios/Bysuario/'+resultado.id,{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
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
      idsperfil.value = id
      Etiqueta.value = ""
      itemsSistema.value = []
      NombreSistema.value = []
      ListaSistema.value = []
      itemModulo.value = []
      itemModuloNuevo.value = []
      EtiquetaUsuarioNoRegistrados.value = ""
      EtiquetaUsuarioRegistrados.value = ""
      BuscaSistemas(id)
      const usuario = await api.get('/Usuarios/'+id,{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
      let listUsuario = usuario.data.data
      const empleados = await api.get('/Empleados/'+listUsuario.empleado_Id,{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
      let listEmpleados = empleados.data.data
      Etiqueta.value = listEmpleados.nombres+" "+ listEmpleados.apellido_Paterno+" "+ listEmpleados.apellido_Materno
      EditarPerfil.value = true
    }

     const RegistrarPermiso = async()=>{
      RegistroUsuario.value = true
      itemsEmpleado.value =[]
       var ListaEmpleados = await api.get('/Empleados',{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
       var Empleado = ListaEmpleados.data.data
       var listaPermisos = await api.get('/PermisosModulosUsuarios',{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
       var Permiso = listaPermisos.data.data
       var respuesta = await api.get('/Usuarios',{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
        let{data} = respuesta.data;
        data.forEach((item)=>{
          let filtro = Empleado.find(elemento => elemento.id === item.empleado_Id)
            if(filtro != undefined){
              let filtronuevo = Permiso.find(elemento => elemento.usuario_Id === item.id)
              if(filtronuevo === undefined){
                itemsEmpleado.value.push({
                    label: filtro.nombres +" "+filtro.apellido_Paterno+" "+ filtro.apellido_Materno,
                    value: item.id,
                  });
              }
          }
        })
      OpcionesFiltro.value = itemsEmpleado.value
    }
/* ------------------------------------------------------------------------------------------------------------ */
    watch(NombreEmpleado,(nuevoValor, viejoValor) => {
      console.log(nuevoValor)
      if(nuevoValor != null){
        if(nuevoValor.value != undefined){
          BuscaSistemas(nuevoValor.value);
        }else{
          EtiquetaUsuarioRegistrados.value = ""
          EtiquetaUsuarioNoRegistrados.value = ""
          itemModulo.value = []
          itemModuloNuevo.value = []
          itemsSistema.value = []
          ListaSistema.value = []
          NombreSistema.value = ""
        }
      }else{
        EtiquetaUsuarioRegistrados.value = ""
        EtiquetaUsuarioNoRegistrados.value = ""
        itemModulo.value = []
        itemModuloNuevo.value = []
        itemsSistema.value = []
        ListaSistema.value = []
        NombreSistema.value = ""
      }
    })

    const BuscaSistemas = async (id) =>{
      itemsSistema.value = []
      ListaSistema.value = []
      EtiquetaUsuarioRegistrados.value = ""
      EtiquetaUsuarioNoRegistrados.value = ""
      itemModulo.value = []
      itemModuloNuevo.value = []
      NombreSistema.value = ""
      const Sistem = await api.get('/Sistemas',{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
      let listSis = Sistem.data.data
      const SistemUsuario = await api.get('/SistemasUsuarios/ByUSuario/'+id,{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
      let listUsu = SistemUsuario.data.data
      console.log("Estos son los sistemas del usuario",listUsu)
      listSis.forEach((item)=>{
        let filtro = listUsu.find(elemento => elemento.sistema_Id === item.id && elemento.accede === true)
        console.log(filtro)
        if(filtro != undefined){
          itemsSistema.value.push({
            label: item.nombre,
            value: item.id,
            perfil: filtro.perfil_Id,
            usuario: id
          })
        }
      })
    }

/* ------------------------------------------------------------------------------------------------------------ */

    watch(NombreSistema,(nuevoValor, viejoValor) => {
      if(nuevoValor.value != undefined){
          BuscaPerfil(nuevoValor.value, nuevoValor.perfil, nuevoValor.usuario)
          console.log (itemsSistema.value)
      }
    })

    const BuscaPerfil = async (Sistema, Perfil, Usuario) =>{
        EtiquetaUsuarioRegistrados.value = ""
        EtiquetaUsuarioNoRegistrados.value = ""
        itemModulo.value = []
        itemModuloNuevo.value = []
        const modulos = await api.get('/Modulos/BySistema/'+Sistema,{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
        let listModulos = modulos.data.data
        console.log("Listado de modulos", listModulos)
        const Acceso = await api.get('/Permisos_Modulos_Perfiles/ByPerfil/'+Perfil,{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
        let listAcceso = Acceso.data.data
        console.log("Este es el listado de accesos", listAcceso)
        const Permiso = await api.get('/PermisosModulosUsuarios/Bysuario/'+Usuario,{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
        let listPermiso = Permiso.data.data
        console.log("Este es el listado de Permisos", listPermiso)
        listModulos.forEach((item)=>{
          let filtro = listPermiso.find(elemento => elemento.modulo_Id === item.id)
          if(filtro != undefined){
            itemModulo.value.push({
              modulo_id: item.id,
              modulo: item.nombre,
              create: filtro.registrar,
              update: filtro.actualizar,
              delete: filtro.eliminar,
              read: filtro.leer,
              idRegistro: filtro.id,
              usuario: Usuario
            })

          }
          else
          {
            let filtroNuevo = listAcceso.find(elemento => elemento.modulo_Id === item.id)
            if(filtroNuevo != undefined){
              itemModuloNuevo.value.push({
                modulo_id: item.id,
                modulo: item.nombre,
                create: filtroNuevo.registrar,
                update: filtroNuevo.actualizar,
                delete: filtroNuevo.eliminar,
                read: filtroNuevo.leer,
                idRegistro: 0,
                usuario: Usuario
              })
            }
          }
        })
        if(itemModuloNuevo.value.length === 0)
        {
          if(itemModulo.value.length != 0)
          {
            EtiquetaUsuarioRegistrados.value = "Permisos asignados a este usuario"
          }
          else{
            EtiquetaUsuarioRegistrados.value = "Este sistema no tiene modulos registrados"
          }
        }
        else
        {
          EtiquetaUsuarioNoRegistrados.value =  "Permisos aún sin asignar a este usuario (Se cargan por defecto los registrados con su perfil)"
          if(itemModulo.value.length != 0)
          {
            EtiquetaUsuarioRegistrados.value = "Permisos asignados a este usuario"
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
        message: '¿Esta seguro de eliminar este permiso?',
        persistent: true
      }).onOk(() => {
         $q.loading.show()
          api.delete('/PermisosModulosUsuarios/'+id,{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}}).then(function (respuesta){
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
        itemModulo.value = []
        itemModuloNuevo.value = []
        EtiquetaUsuarioNoRegistrados.value = ""
        EtiquetaUsuarioRegistrados.value = ""
        NombreEmpleado.value=""
        itemsSistema.value = []
        NombreSistema.value = []
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
       NombreSistema,
       itemsSistema,
       limpiarRegistro,
       EditarPerfilMetodo,
       RegistrarPermiso,
       itemModulo,
       itemModuloNuevo,
       UsuariosRe,
       Etiqueta,
       nameModelo,
       ListaSistema,
       SistemasPerfil,
       SistemasTotal,
       EtiquetaUsuarioRegistrados,
       EtiquetaUsuarioNoRegistrados,
       OpcionesFiltro,
        PRegistrar,
        PActualizar,
        PEliminar,
        PLeer,
        ListaPermiso,


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
      //MEtodo submit para guardar registro
       onSubmit(){
          $q.loading.show()
          const {value} = NombreEmpleado.value
          console.log(value)
          console.log("Este es el tamaño de los ya registrados",itemModulo.value.length)
          console.log("Este es el tamaño de los no registrados",itemModuloNuevo.value.length)
          if(itemModuloNuevo.value.length === 0)
          {
            if(itemModulo.value.length != 0){
              for(var i=0; i < itemModulo.value.length; i++){
                if(itemModulo.value[i].create === true || itemModulo.value[i].update === true || itemModulo.value[i].delete === true || itemModulo.value[i].read === true ){
                api.put('/PermisosModulosUsuarios/'+ itemModulo.value[i].idRegistro,{
                  modulo_Id: itemModulo.value[i].modulo_Id,
                  usuario_Id: value,
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
                }else{
                  api.delete('/PermisosModulosUsuarios/'+itemModulo.value[i].idRegistro,{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}}).then(function (respuesta){
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
                RegistroUsuario.value = false
                loading.value = true
                rowsusuario.value = [  ]
                getAreas()
                loading.value = false
                limpiarRegistro()
                $q.loading.hide()
                }
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
                console.log("Este es el usuario", value)
                console.log("Este es el modelo de los registros nuevos",itemModuloNuevo.value)
               if(itemModuloNuevo.value[i].create === true || itemModuloNuevo.value[i].update === true || itemModuloNuevo.value[i].delete === true || itemModuloNuevo.value[i].read === true ){
                  api.post("/PermisosModulosUsuarios",{
                  modulo_Id: itemModuloNuevo.value[i].modulo_id,
                  usuario_Id: value,
                  registrar: itemModuloNuevo.value[i].create,
                  actualizar: itemModuloNuevo.value[i].update,
                  eliminar: itemModuloNuevo.value[i].delete,
                  leer: itemModuloNuevo.value[i].read
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
                  api.put('/PermisosModulosUsuarios/'+ itemModulo.value[i].idRegistro,{
                    modulo_Id: itemModulo.value[i].modulo_Id,
                    usuario_Id: value,
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
                  api.delete('/PermisosModulosUsuarios/'+itemModulo.value[i].idRegistro,{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}}).then(function (respuesta){
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
          if(itemModuloNuevo.value.length === 0)
          {
            if(itemModulo.value.length != 0){
              for(var i=0; i < itemModulo.value.length; i++){
                if(itemModulo.value[i].create === true || itemModulo.value[i].update === true || itemModulo.value[i].delete === true || itemModulo.value[i].read === true ){
                  api.put('/PermisosModulosUsuarios/'+ itemModulo.value[i].idRegistro,{
                    modulo_Id: itemModulo.value[i].modulo_Id,
                    usuario_Id: itemModulo.value[i].usuario,
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
                  api.delete('/PermisosModulosUsuarios/'+itemModulo.value[i].idRegistro,{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}}).then(function (respuesta){
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
                api.post("/PermisosModulosUsuarios",{
                modulo_Id: itemModuloNuevo.value[i].modulo_id,
                usuario_Id: itemModuloNuevo.value[i].usuario,
                registrar: itemModuloNuevo.value[i].create,
                actualizar: itemModuloNuevo.value[i].update,
                eliminar: itemModuloNuevo.value[i].delete,
                leer: itemModuloNuevo.value[i].read
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
                  api.put('/PermisosModulosUsuarios/'+ itemModulo.value[i].idRegistro,{
                    modulo_Id: itemModulo.value[i].modulo_Id,
                    usuario_Id: itemModulo.value[i].usuario,
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
                  api.delete('/PermisosModulosUsuarios/'+itemModulo.value[i].idRegistro,{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}}).then(function (respuesta){
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
