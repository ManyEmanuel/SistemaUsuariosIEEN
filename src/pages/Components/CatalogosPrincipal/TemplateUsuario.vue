<template>
          <!-- Aqui inicia el template con la tabla -->
  <div class="row q-pa-sm q-gutter-md">
      <div class="col-12">
        <q-btn v-show="PRegistrar" class="q-ma-sm" color="purple-ieen" icon-right="add_circle_outline" label="Agregar nuevo" @click="RegistrarUsuario"/>
          <q-table
              v-show="PLeer"
              title="Registro de usuarios"
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
                <q-btn v-show="PLeer" flat round color="purple-ieen" icon="archive" @click="exportTable"/>
              </template >
              <template v-slot:body ="props">
                <q-tr :props="props">
                  <q-td
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                  >
                  <q-btn v-if="col.name==='id'" v-show="PActualizar" flat round color="purple-ieen" icon="edit" @click="EditarUsuarioMetodo(col.value)">
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
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Registro de usuario</div>
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
                    @filter ="filterFn"
                    label="Listado de empleados"
                    lazy-rules
                    :rules="[val => !!val || 'Por favor seleccione un empleado']"
                  />
                </div>
              </div>
              <div class="q-gutter-sm row items-start">
                <div class="col">
                  <q-input
                    filled
                    v-model="nombreUsuario"
                    label="Usuario"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Por favor ingresa un nombre']"
                  />
                </div>
                 <div class="col">
                  <q-input
                    filled
                    v-model="emailUsuario"
                    label="Email"
                    lazy-rules
                    type="email"
                    :rules="[ val => val && val.length > 0 || 'Por favor ingresa un Email']"
                  />
                </div>
              </div>
               <div class="q-gutter-sm row items-start">
                <div class="col">
                  <q-input
                    filled
                    v-model="telUsuario"
                    label="Telefono"
                    lazy-rules
                    type="tel"
                    :rules="[ val => val && val.length > 0 || 'Por favor ingresa un telefono']"
                  />
                </div>
                 <div class="col">
                  <q-file
                    filled
                      v-model="fotoUsuario"
                      label="Seleccione foto de usuario"
                      accept=".jpg, image/*"
                      @rejected="onRejected"
                    >
                    <template v-slot:append>
                      <q-icon name="add_photo_alternate" />
                    </template>
                  </q-file>
                </div>
              </div>
              <q-card-actions align="right">
                <q-btn label="Cancelar" type="reset" color="negative"   @click="RegistroUsuario = false, limpiarRegistro() " />
                <q-btn label="Guardar" type="submit" color="positive" class="q-ml-sm" />
              </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

       <!-- Dilog pata la edición del tipo de area -->
    <q-dialog v-model="EditarUsuario" persistent transition-show="scale" transition-hide="scale">
        <q-card style="width: 700px; max-width: 80vw;">

          <q-card-section class="q-pb-xs">
            <div class="text-h6">Editar información de usuario</div>
          </q-card-section>
          <div class="q-pa-xs">
            <h5 class="text-center">{{Etiqueta}}</h5>
         </div>
          <q-card-section>
            <q-form
                @submit="onEdit"
                class="q-gutter-md"
            >
              <q-input  v-show="false" v-model="idusuario" />
              <q-input  v-show="false" v-model="fotoUrl" />
              <div class="q-gutter-sm row items-start">
                <div class="col">
                  <q-input
                    filled
                    v-model="nombreUsuario"
                    label="Usuario"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Por favor ingresa un nombre']"
                  />
                </div>
                 <div class="col">
                  <q-input
                    filled
                    v-model="emailUsuario"
                    label="Email"
                    lazy-rules
                    type="email"
                    :rules="[ val => val && val.length > 0 || 'Por favor ingresa un Email']"
                  />
                </div>
              </div>
               <div class="q-gutter-sm row items-start">
                <div class="col">
                  <q-input
                    filled
                    v-model="telUsuario"
                    label="Telefono"
                    lazy-rules
                    type="tel"
                    :rules="[ val => val && val.length > 0 || 'Por favor ingresa un telefono']"
                  />
                </div>
                 <div class="col">
                  <q-img
                    :src="fotoUrl"
                    spinner-color="white"
                    style="height: 140px; max-width: 150px"
                  />
                </div>
              </div>
                <q-card-actions align="right">
                  <q-btn label="Cancelar" type="reset" color="negative"   @click="EditarUsuario = false" />
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
  name: 'TemplateUsuario',

  setup(){
    const $q = useQuasar()
    const store = useStore()
    //Variables de guardado y edición
    const idusuario = ref('')
    const NombreEmpleado = ref()
    const nombreUsuario = ref('')
    const nombreArea = ref('')
    const telUsuario = ref('')
    const emailUsuario = ref('')
    const fotoUsuario = ref()
    const itemsEmpleado = ref([])
    const OpcionesFiltro = ref([])
    const ListaPermiso = ref([])
    const idEmpleado = ref('')
    const fotoUrl = ref('')
    let Etiqueta = ref ('')
    //---------------------------------------------------------------------------//
    //
    const textbuscar = ref('')
    const rowsusuario = ref([])
    const idEditarArea = ref("")
    const editarArea = ref("")
    const loading = ref(true)
    const RegistroUsuario = ref(false)
    const PRegistrar = ref(false)
    const PActualizar = ref(false)
    const PEliminar = ref(false)
    const PLeer = ref(false)
    const EditarUsuario = ref(false)
    const pagination = ref({
        page: 1,
        rowsPerPage: 10,
        sortBy: 'name',
        descending: false,
        }
    )
    onBeforeMount (async() =>{
         const Lista= store.getters['auth/PermisosObtenidos']
         const filtro = Lista.find(elemento => elemento.nombre === "Usuarios")
         ListaPermiso.value= filtro
         console.log("Este es el listado de los permisos de este modulo", ListaPermiso.value)
         const {registrar,actualizar,eliminar,leer} = ListaPermiso.value
         PRegistrar.value = registrar
         PActualizar.value = actualizar
         PEliminar.value = eliminar
         PLeer.value = leer
         console.log("Este es el registro",registrar)
    })

    // Este es el metodo para listar en tabla
    const getAreas = async () => {
      var ListaEmpleados = await api.get('/Empleados',{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}
          })
      var Empleado = ListaEmpleados.data.data
      api.get('/Usuarios',{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}
          }).then(res => {
        let {data} = res.data
        data.forEach(reg => {
             let filtro = Empleado.find(elemento => elemento.id === reg.empleado_Id)
             if(filtro != undefined){
            let obj = {
              "id":reg.id,
              "usuario":reg.userName,
              "email":reg.email,
              "foto":reg.foto_Url,
              "empleado": filtro.nombres +" "+filtro.apellido_Paterno+" "+ filtro.apellido_Materno
            };
            rowsusuario.value.push(obj)
            }
        })
      })
      loading.value = false
    }
    getAreas()

    const RegistrarUsuario = async() => {
      RegistroUsuario.value = true
      itemsEmpleado.value =[]
      const respuesta = await api.get('/Empleados',{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
      let{data} = respuesta.data;
      const usua = await api.get('/Usuarios',{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
      let usuario = usua.data.data
      data.forEach((item)=>{
        let filtro = usuario.find(elemento => elemento.empleado_Id === item.id)
        if(filtro === undefined){
          itemsEmpleado.value.push({
            label: item.nombres +" "+item.apellido_Paterno +" "+ item.apellido_Materno ,
            value: item.id
          })
        }
      })
      OpcionesFiltro.value = itemsEmpleado.value
    }

    const EditarUsuarioMetodo = function(id){
       EditarUsuario.value = true
       let valor = 0
      api.get('/Usuarios/'+id,{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}
          }).then(function(res) {
        let {data} = res.data
            idusuario.value = data.id
            nombreUsuario.value = data.userName
            telUsuario.value = data.phoneNumber
            emailUsuario.value = data.email
            fotoUrl.value = data.foto_Url
            idEmpleado.value = data.empleado_Id
              api.get('/Empleados/'+data.empleado_Id, {headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}
          }).then(function(respuesta){
                let {data} = respuesta.data;
                console.log(data)
                Etiqueta.value = data.nombres +" " + data.apellido_Paterno + " " + data.apellido_Materno
              });
      })


    }


    const limpiarRegistro = function(){
      itemsEmpleado.value =[]
      idusuario.value = ""
      telUsuario.value=""
      emailUsuario.value=""
      fotoUsuario.value=""
      nombreUsuario.value =""
      NombreEmpleado.value = ""
    }

    watch(NombreEmpleado,(nuevoValor, viejoValor) => {
      if(nuevoValor != null){
        if(nuevoValor.value != undefined){
           api.get('/Empleados/'+nuevoValor.value,{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}}).then(function(res) {
            let {data} = res.data
            let cadenaNombre = data.nombres
            let firstname = cadenaNombre.split(" ")
            let apellido = data.apellido_Paterno
            let recorte = apellido.replace(/\s+/g,'');
            nombreUsuario.value = firstname[0] + "." + recorte + "." + data.id
            emailUsuario.value = data.email
            telUsuario.value = data.telefono
          });
        }
      }
      else{
        idusuario.value = ""
        telUsuario.value=""
        emailUsuario.value=""
        fotoUsuario.value=""
        nombreUsuario.value =""
      }
    })

    return{
       // Variables de guardado y edición
       nombreArea,
       nombreUsuario,
       telUsuario,
       emailUsuario,
       fotoUsuario,
       idusuario,
       idEmpleado,
       NombreEmpleado,
       itemsEmpleado,
       textbuscar,
       editarArea,
       idEditarArea,
       columnsusuario,
       rowsusuario,
       RegistroUsuario,
       EditarUsuario,
       RegistrarUsuario,
       fotoUrl,
       PRegistrar,
       PActualizar,
       PEliminar,
       PLeer,
       //DeleteUsuario,
       pagination,
       loading,
       limpiarRegistro,
       EditarUsuarioMetodo,
       Etiqueta,
       OpcionesFiltro,

      //MEtodo submit para guardar registro
       onSubmit(){
          $q.loading.show()
          const{value} = NombreEmpleado.value
          const formData = new FormData();
            formData.append("UserName", nombreUsuario.value)
            formData.append("Email", emailUsuario.value)
            formData.append("PhoneNumber", telUsuario.value)
            formData.append("Foto", fotoUsuario.value)
            formData.append("Empleado_Id", value)
          api.post("/Usuarios",formData,{headers:{'Content-Type': 'multipart/form-data','Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}
          }).then(function (respuesta){
            console.log(respuesta)
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
                limpiarRegistro()
              $q.loading.hide()

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
       },


      //Metodo edit para editar los registros
        onEdit(){
          $q.loading.show()

          const idT = idusuario.value;
          api.put("/Usuarios/"+idT,{
              userName : nombreUsuario.value,
              email: emailUsuario.value,
              phoneNumber : telUsuario.value,
              foto: fotoUrl.value,
              empleado_Id: idEmpleado.value,
          },{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}}).then(function (respuesta){
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
              EditarUsuario.value = false
              limpiarRegistro()
             $q.loading.hide()
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

    }
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
