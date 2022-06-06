<template>
          <!-- Aqui inicia el template con la tabla -->
  <div class="row q-pa-sm q-gutter-md">
      <div class="col-12">
        <q-btn v-show="PRegistrar" class="q-ma-sm" color="purple-ieen" icon-right="add_circle_outline" label="Agregar nuevo" @click="RegistroPerfil = true"/>
          <q-table
              v-show="Pleer"
              title="Registro de perfiles"
              :rows="rowsperfil"
              :columns="columnsperfil"
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
                  <q-btn v-if="col.name==='id'" v-show="PEliminar" flat round color="purple-ieen" icon="delete" @click="DeletePerfil(col.value)">
                    <q-tooltip>
                      Borrar registro
                    </q-tooltip>
                  </q-btn>
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
    <q-dialog v-model="RegistroPerfil" persistent transition-show="scale" transition-hide="scale">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Registro de perfil</div>
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
                    v-model="nombrePerfil"
                    label="Nombre del perfil"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Por favor ingresa un nombre para el perfil']"
                  />
                </div>
                 <div class="col">
                   <q-input
                    filled
                    autogrow
                    v-model="descripcionPerfil"
                    label="Descripción del perfil"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Por favor ingresa una descripción']"
                  />
                </div>
              </div>
              <q-card-actions align="right">
                <q-btn label="Cancelar" type="reset" color="negative"   @click="RegistroPerfil = false" />
                <q-btn label="Guardar" type="submit" color="positive" class="q-ml-sm" />
              </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

       <!-- Dilog pata la edición del tipo de area -->
    <q-dialog v-model="EditarPerfil" persistent transition-show="scale" transition-hide="scale">
        <q-card style="width: 700px; max-width: 80vw;">
          <q-card-section>
            <div class="text-h6">Editar perfil</div>
          </q-card-section>
          <q-card-section>
            <q-form
                @submit="onEdit"
                class="q-gutter-md"
            >
              <q-input  v-show="false" v-model="idsperfil" />
               <div class="q-gutter-sm row items-start">
                <div class="col">
                  <q-input
                    filled
                    autogrow
                    v-model="nombrePerfil"
                    label="Nombre del perfil"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Por favor ingresa un nombre para el perfil']"
                  />
                </div>
                 <div class="col">
                   <q-input
                    filled
                    autogrow
                    v-model="descripcionPerfil"
                    label="Descripción del perfil"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Por favor ingresa una descripción']"
                  />
                </div>
              </div>
                <q-card-actions align="right">
                  <q-btn label="Cancelar" type="reset" color="negative"   @click="EditarPerfil = false" />
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


const columnsperfil = [

                { name: 'nombre', align: 'center', label: 'Nombre del perfil', field: 'nombre', sortable: true, },
                { name: 'descripcion', align: 'center', label: 'Descrición del perfil', field: 'descripcion', sortable: true, },
                { name: 'id', align: 'center', label: 'Opciones', field: 'id' },

            ]


export default defineComponent({
  name: 'TemplatePerfil',

  setup(){
    const $q = useQuasar()
    const store = useStore()
    //Variables de guardado y edición
    const idsperfil = ref('')
    const nombrePerfil = ref('')
    const siglasSistema = ref('')
    const logoSistema = ref()
    const descripcionPerfil = ref('')
    const PRegistrar = ref(false)
    const PActualizar = ref(false)
    const PEliminar = ref(false)
    const PLeer = ref(false)
    const ListaPermiso = ref([])

    //---------------------------------------------------------------------------//
    //
    const textbuscar = ref('')
    const rowsperfil = ref([])
    const loading = ref(true)
    const RegistroPerfil = ref(false)
    const EditarPerfil = ref(false)
    const pagination = ref({
        page: 1,
        rowsPerPage: 10,
        sortBy: 'name',
        descending: false,
        }
    )

    onBeforeMount (async() =>{
         const Lista= store.getters['auth/PermisosObtenidos']
         const filtro = Lista.find(elemento => elemento.nombre === "Perfiles")
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
      const res = await api.get('/Perfiles',{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
        let {data} = res.data
        data.forEach(reg => {
            let obj = {
              "id":reg.id,
              "nombre":reg.nombre,
              "descripcion":reg.descripción,
            };
          rowsperfil.value.push(obj)
        })

      loading.value = false
    }
    getAreas()


    const EditarPerfilMetodo = async (id) => {
      EditarPerfil.value = true
      const res = await api.get('/Perfiles/'+id,{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
        let {data} = res.data
        idsperfil.value = data.id
        nombrePerfil.value = data.nombre
        descripcionPerfil.value = data.descripción
    }

    // Este es el metodo para eliminar registro
    const DeletePerfil = function(id){
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
          api.delete('/Perfiles/'+id,{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}}).then(function (respuesta){
            let{data,success} = respuesta.data
            if(respuesta.status == 200 && success == true){
              $q.notify({
                type: 'positive',
                message: data,
                position: 'top-right',
                progress: true,
              })

              loading.value = true
              rowsperfil.value = [  ]
              getAreas()
              loading.value = false
              RegistroPerfil.value = false
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
        idsperfil.value = ""
        nombrePerfil.value=""
        descripcionPerfil.value=""
        item
    }


    return{
       // Variables de guardado y edición

       idsperfil,

       textbuscar,
       nombrePerfil,
       descripcionPerfil,
       columnsperfil,
       rowsperfil,
       RegistroPerfil,
       EditarPerfil,
       DeletePerfil,
       pagination,
       loading,
       limpiarRegistro,
       EditarPerfilMetodo,
        PRegistrar,
        PActualizar,
        PEliminar,
        PLeer,
        ListaPermiso,
      //MEtodo submit para guardar registro
       onSubmit(){
          $q.loading.show()

          api.post("/Perfiles",{
              nombre: nombrePerfil.value,
              descripción: descripcionPerfil.value
          },{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}}).then(function (respuesta){
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
                rowsperfil.value = [  ]
                getAreas()
                loading.value = false
                RegistroPerfil.value = false
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
          const idT = idsperfil.value;

          api.put("/Perfiles/"+idT,{
            nombre: nombrePerfil.value,
            descripción: descripcionPerfil.value
          },{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
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
              rowsperfil.value = [  ]
              getAreas()
              loading.value = false
              EditarPerfil.value = false
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
          const content = [columnsperfil.map(col => wrapCsvValue(col.label))].concat(
          rowsperfil.value.map(row => columnsperfil.map(col => wrapCsvValue(
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
