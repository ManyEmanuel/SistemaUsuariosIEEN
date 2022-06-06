<template>
          <!-- Aqui inicia el template con la tabla -->
  <div class="row q-pa-sm q-gutter-md">
      <div class="col-12">
        <q-btn class="q-ma-sm" color="purple-ieen" icon-right="add_circle_outline" label="Agregar nuevo" @click="RegistroSistema = true"/>
          <q-table
              title="Registro de sistemas"
              :rows="rowssistema"
              :columns="columnssistema"
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
                  <q-btn v-if="col.name==='id'" flat round color="purple-ieen" icon="delete" @click="DeleteSistema(col.value)">
                    <q-tooltip>
                      Borrar registro
                    </q-tooltip>
                  </q-btn>
                  <q-btn v-if="col.name==='id'" flat round color="purple-ieen" icon="edit" @click="EditarSistemaMetodo(col.value)">
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
    <q-dialog v-model="RegistroSistema" persistent transition-show="scale" transition-hide="scale">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Registro de sistema</div>
        </q-card-section>
        <q-card-section>
          <q-form
            @submit="onSubmit"
            class="q-gutter-sm"
            >

              <div class="q-gutter-sm row items-start">
                <div class="col">
                  <q-input
                    filled
                    autogrow
                    v-model="nombreSistema"
                    label="Nombre del sistema"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Por favor ingresa un nombre para el sistema']"
                  />
                </div>
                 <div class="col">
                  <q-input
                    filled
                    v-model="siglasSistema"
                    label="Siglas"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Por favor ingresa las siglas del sistema']"
                  />
                </div>
              </div>
               <div class="q-gutter-sm row items-start">
                <div class="col">
                  <q-input
                    filled
                    autogrow
                    v-model="descripcionSistema"
                    label="Descripción"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Por favor ingresa una descripción']"
                  />
                </div>
                 <div class="col">
                  <q-file
                    filled
                      v-model="logoSistema"
                      label="Logo del sistema"
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
                <q-btn label="Cancelar" type="reset" color="negative"   @click="RegistroSistema = false" />
                <q-btn label="Guardar" type="submit" color="positive" class="q-ml-sm" />
              </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

       <!-- Dilog pata la edición del tipo de area -->
    <q-dialog v-model="EditarSistema" persistent transition-show="scale" transition-hide="scale">
        <q-card style="width: 700px; max-width: 80vw;">
          <q-card-section>
            <div class="text-h6">Editar datos del sistema</div>
          </q-card-section>
          <q-card-section>
            <q-form
                @submit="onEdit"
                class="q-gutter-md"
            >
              <q-input  v-show="false" v-model="idsistema" />
              <div class="q-gutter-sm row items-start">
                <div class="col">
                  <q-input
                    filled
                    autogrow
                    v-model="nombreSistema"
                    label="Nombre del sistema"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Por favor ingresa un nombre para el sistema']"
                  />
                </div>
                 <div class="col">
                  <q-input
                    filled
                    v-model="siglasSistema"
                    label="Siglas"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Por favor ingresa las siglas del sistema']"
                  />
                </div>
              </div>
               <div class="q-gutter-sm row items-start">
                <div class="col">
                  <q-input
                    filled
                    autogrow
                    v-model="descripcionSistema"
                    label="Descripción"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Por favor ingresa una descripción']"
                  />
                </div>
                 <div class="col">
                    <q-file
                    filled
                      v-model="logoSistema"
                      label="Cambiar logo del sistema"
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
                  <q-btn label="Cancelar" type="reset" color="negative"   @click="EditarSistema = false" />
                  <q-btn label="Guardar" type="submit" color="positive" class="q-ml-sm" />
                </q-card-actions>
              </q-form>
          </q-card-section>
        </q-card>
    </q-dialog>

</template>

<script>
import { defineComponent,ref,onBeforeMount} from 'vue';
import { exportFile, useQuasar} from 'quasar'
import {api} from '../../../boot/axios.js'
import { useStore } from 'vuex';



const columnssistema = [

                { name: 'nombre', align: 'center', label: 'Nombre del sistema', field: 'nombre', sortable: true, },
                { name: 'siglas', align: 'center', label: 'Siglas', field: 'siglas', sortable: true, },
                { name: 'descripcion', align: 'center', label: 'Descrición del sistema', field: 'descripcion', sortable: true, },
                { name: 'id', align: 'center', label: 'Opciones', field: 'id' },

            ]


export default defineComponent({
  name: 'TemplateSistema',

  setup(){
    const $q = useQuasar()
    const store = useStore()
    //Variables de guardado y edición
    const idsistema = ref('')
    const nombreSistema = ref('')
    const siglasSistema = ref('')
    const logoSistema = ref()
    const descripcionSistema = ref('')

    //---------------------------------------------------------------------------//
    //
    const PRegistrar = ref(false)
    const PActualizar = ref(false)
    const PEliminar = ref(false)
    const PLeer = ref(false)
    const ListaPermiso = ref([])
    const textbuscar = ref('')
    const rowssistema = ref([])
    const idEditarArea = ref("")
    const editarArea = ref("")
    const loading = ref(true)
    const RegistroSistema = ref(false)
    const EditarSistema = ref(false)
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
         const filtro = Lista.find(elemento => elemento.nombre === "Sistemas")
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
      const res = await api.get('/sistemas',{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
        let {data} = res.data
        data.forEach(reg => {
          let obj = {
            "id":reg.id,
            "nombre":reg.nombre,
            "siglas":reg.siglas,
            "descripcion":reg.descripcion,
          };
          rowssistema.value.push(obj)
        })
      loading.value = false
    }
    getAreas()


    const EditarSistemaMetodo = async(id) => {
      EditarSistema.value = true
      const res = await api.get('/Sistemas/'+id,{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
        let {data} = res.data
          idsistema.value = data.id
          nombreSistema.value = data.nombre
          siglasSistema.value = data.siglas
          descripcionSistema.value = data.descripcion
    }

    // Este es el metodo para eliminar registro
    const DeleteSistema = function(id){
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
        message: '¿Esta seguro de eliminar esta área?',
        persistent: true
      }).onOk(() => {
         $q.loading.show()
          api.delete('/Sistemas/'+id,{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}}).then(function (respuesta){
            let{data,success} = respuesta.data
            if(respuesta.status == 200 && success == true){
              $q.notify({
                type: 'positive',
                message: data,
                position: 'top-right',
                progress: true,
              })

              loading.value = true
              rowssistema.value = [  ]
              getAreas()
              loading.value = false
              RegistroSistema.value = false
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
      })
    }

    //Este es el metodo para editar registro

    const limpiarRegistro = function(){
      idsistema.value = ""
      nombreSistema.value=""
      siglasSistema.value=""
      descripcionSistema.value=""
      logoSistema.value=""
    }


    return{
       // Variables de guardado y edición

       idsistema,
       textbuscar,
       nombreSistema,
       siglasSistema,
       logoSistema,
       descripcionSistema,
       columnssistema,
       rowssistema,
       RegistroSistema,
       EditarSistema,
       DeleteSistema,
       pagination,
       loading,
       limpiarRegistro,
       EditarSistemaMetodo,
       PRegistrar,
        PActualizar,
        PEliminar,
        PLeer,
        ListaPermiso,
      //MEtodo submit para guardar registro
       onSubmit(){
          $q.loading.show()
          const formData = new FormData();
          formData.append("nombre", nombreSistema.value)
          formData.append("siglas", siglasSistema.value)
          formData.append("descripcion", descripcionSistema.value)
          formData.append("logo", logoSistema.value)
          api.post("/Sistemas",formData,{headers:{'Content-Type': 'multipart/form-data','Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}}).then(function (respuesta){
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
                rowssistema.value = [  ]
                getAreas()
                loading.value = false
                RegistroSistema.value = false
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
          const idT = idsistema.value;
          const formData = new FormData();
          formData.append("nombre", nombreSistema.value)
          formData.append("siglas", siglasSistema.value)
          formData.append("descripcion", descripcionSistema.value)
          formData.append("logo", logoSistema.value)
          api.put("/Sistemas/"+idT,formData,{headers:{'Content-Type': 'multipart/form-data','Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
          .then(function (respuesta){
            let{data,success} = respuesta.data
            if(respuesta.status == 200 && success == true){
              $q.notify({
                type: 'positive',
                message: data,
                position: 'top-right',
                progress: true,
              })
              loading.value = true
              rowssistema.value = [  ]
              getAreas()
              loading.value = false
              EditarSistema.value = false
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
          const content = [columnssistema.map(col => wrapCsvValue(col.label))].concat(
          rowssistema.value.map(row => columnssistema.map(col => wrapCsvValue(
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
