<template>        <!-- Aqui inicia el template con la tabla -->
  <div class="row q-pa-sm q-gutter-md">
      <div class="col-12">
        <q-btn v-show="PRegistrar" class="q-ma-sm" color="purple-ieen" icon-right="add_circle_outline" label="Agregar nuevo" @click="RegistrarModulo"/>
          <q-table
              v-show="PLeer"
              title="Listado de sistemas"
              :rows="rowsistemas"
              :columns="columnsistemas"
              :filter="textbuscarI"
              row-key ="id"
              color="purple-ieen"
              :loading="loadingI"
              v-model:pagination="paginationI"
              no-data-label="No se encontraron registros"
              rows-per-page-label="Registros por página"
              >
              <template v-slot:top-right>
                <q-input v-model="textbuscarI" dense label="Buscar"  class="q-pr-md">
                  <template v-slot:append>
                    <q-icon v-if="textbuscarI !== ''" name="close" @click="textbuscarI = ''" class="cursor-pointer" />
                    <q-icon v-else name="search" />
                  </template>
                </q-input>
              </template >
              <template v-slot:body ="propsI">
                <q-tr :props="propsI">
                  <q-td
                    v-for="colI in propsI.cols"
                    :key="colI.name"
                    :props="propsI"
                  >
                   <q-btn v-if="colI.name==='ids'" v-show="PLeer" flat round color="purple-ieen" icon="visibility" @click="VerModulo(colI.value)">
                    <q-tooltip>
                      Ver integracion
                    </q-tooltip>
                  </q-btn>
                  <label v-else>{{colI.value}}</label>
                  </q-td>
                </q-tr>
              </template>
          </q-table>
      </div>
  </div>
       <!-- Dialog para el registro de  tipo de area -->
    <q-dialog v-model="RegistroModulo" persistent transition-show="scale" transition-hide="scale">
      <q-card style="width: 800px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Registro de área</div>
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
                    v-model="nombreSistemas"
                    :options="itemsSistema"
                    label="Selecciona sistema"
                     lazy-rules
                    :rules="[val => !!val || 'Por favor selecciona un sistema']"
                  />
                </div>
                <div class="col">
                  <q-input
                    filled
                    v-model="nombreModulo"
                    label="Nombre del modulo"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Por favor ingresa las siglas']"
                  />
                </div>
              </div>
              <div class="q-gutter-sm row items-start">
                <div class="col">
                  <q-input
                    filled
                    v-model="siglasModulo"
                    label="Siglas del modulo"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Por favor ingresa las siglas']"
                  />
                </div>
                <div class="col">
                  <q-input
                    filled
                    autogrow
                    v-model="descripcionModulo"
                    label="Descripción del modulo"
                    lazy-rules=""
                    :rules="[ val => val && val.length > 0 || 'Por favor ingresa las siglas']"
                  />
                </div>

              </div>
              <q-card-actions align="right">
                <q-btn label="Cancelar" type="reset" color="negative"   @click="RegistroModulo = false" />
                <q-btn label="Guardar" type="submit" color="positive" class="q-ml-sm" />
              </q-card-actions>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

       <!-- Dilog pata la edición del tipo de area -->
    <q-dialog v-model="EditarModulo" persistent transition-show="scale" transition-hide="scale">
        <q-card style="width: 700px; max-width: 80vw;">
          <q-card-section>
            <div class="text-h6">Editar tipo de área</div>
          </q-card-section>
          <q-card-section>
            <q-form
                @submit="onEdit"
                class="q-gutter-md"
            >
              <q-input  v-show="false" v-model="idmodulo" />
               <div class="q-gutter-sm row items-start">

                <div class="col">
                  <q-select
                    filled
                    v-model="nombreSistemas"
                    :options="itemsSistema"
                    label="Selecciona sistema"
                     lazy-rules
                    :rules="[val => !!val || 'Por favor selecciona un sistema']"
                  />
                </div>
                <div class="col">
                  <q-input
                    filled
                    v-model="nombreModulo"
                    label="Nombre del modulo"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Por favor ingresa las siglas']"
                  />
                </div>
              </div>
              <div class="q-gutter-sm row items-start">
                <div class="col">
                  <q-input
                    filled
                    v-model="siglasModulo"
                    label="Siglas del modulo"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Por favor ingresa las siglas']"
                  />
                </div>
                <div class="col">
                  <q-input
                    filled
                    autogrow
                    v-model="descripcionModulo"
                    label="Descripción del modulo"
                    lazy-rules=""
                    :rules="[ val => val && val.length > 0 || 'Por favor ingresa las siglas']"
                  />
                </div>

              </div>
                <q-card-actions align="right">
                  <q-btn label="Cancelar" type="reset" color="negative"   @click="EditarModulo = false" />
                  <q-btn label="Guardar" type="submit" color="positive" class="q-ml-sm" />
                </q-card-actions>
              </q-form>
          </q-card-section>
        </q-card>
    </q-dialog>
     <q-dialog v-model="VerModuloSistema" persistent transition-show="scale" transition-hide="scale">
       <q-card style="width: 900px; max-width: 80vw;">
         <div class="q-pa-xs">
            <h5 class="text-center">{{Etiqueta}}</h5>
         </div>
         <q-card-section class="q-pt-xs">

           <q-table
              v-show="PLeer"
              title="Registro de Modulo"
              :rows="rowsmodulos"
              :columns="columnsmodulos"
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
                  <q-btn v-if="col.name==='id'" v-show="PEliminar" flat round color="purple-ieen" icon="delete" @click="DeleteModulo(col.value)">
                    <q-tooltip>
                      Borrar registro
                    </q-tooltip>
                  </q-btn>
                  <q-btn v-if="col.name==='id'" v-show="PActualizar" flat round color="purple-ieen" icon="edit" @click="EditarModuloMetodo(col.value)">
                    <q-tooltip>
                      editar registro
                    </q-tooltip>
                  </q-btn>
                  <label v-else>{{col.value}}</label>
                  </q-td>
                </q-tr>
              </template>
          </q-table>
         </q-card-section>
          <q-card-actions align="right">
           <q-btn label="Cerrar" type="reset" color="negative"   @click="VerModuloSistema = false" />
          </q-card-actions>
       </q-card>
    </q-dialog>

</template>

<script>
import { defineComponent,ref,onBeforeMount } from 'vue';
import { exportFile, useQuasar} from 'quasar'
import {api} from '../../../boot/axios.js'
import { useStore } from 'vuex';


const columnsmodulos = [

                { name: 'nombreM', align: 'center', label: 'Nombre del modulo', field: 'nombreM', sortable: true, },
                { name: 'siglasM', align: 'center', label: 'Siglas del modulo', field: 'siglasM', sortable: true, },
                { name: 'descripcionM', align: 'center', label: 'Descripción de modulo', field: 'descripcionM', sortable: true, },
                { name: 'id', align: 'center', label: 'Opciones', field: 'id' },

            ]

const columnsistemas = [

                { name: 'nombre', align: 'center', label: 'Nombre del sistema', field: 'nombre', sortable: true, },
                { name: 'siglas', align: 'center', label: 'Siglas del Área', field: 'siglas', sortable: true, },
                { name: 'ids', align: 'center', label: 'Opciones', field: 'ids' },

            ]


export default defineComponent({
  name: 'TemplateModulo',

  setup(){
    const $q = useQuasar()
    const store = useStore()
    //Variables de guardado y edición
    const idmodulo = ref('')
    const nombreSistemas = ref()
    const siglasModulo = ref('')
    const nombreModulo = ref('')
    const descripcionModulo = ref('')
    const itemsSistema = ref([])
    const PRegistrar = ref(false)
    const PActualizar = ref(false)
    const PEliminar = ref(false)
    const PLeer = ref(false)
    //---------------------------------------------------------------------------//
    //
    const textbuscar = ref('')
    const VerModuloSistema = ref(false)
    const ListaPermiso = ref([])
    const textbuscarI = ref('')
    const rowsmodulos = ref([])
    const rowsistemas = ref([])
    const idEditarArea = ref("")
    const editarArea = ref("")
    let Etiqueta = ref("")
    const loading = ref(true)
    const RegistroModulo = ref(false)
    const EditarModulo = ref(false)
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
         const filtro = Lista.find(elemento => elemento.nombre === "Modulos")
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
      const res = await api.get('/Sistemas',{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
        let {data} = res.data
        data.forEach(reg => {
            let obj = {
              "ids":reg.id,
              "nombre":reg.nombre,
              "siglas":reg.siglas,
            };
            rowsistemas.value.push(obj)
        })
      loading.value = false
    }
    getAreas()

    const Modulos = function(id){
      const getModulos = async () => {
       const res = await  api.get('/Modulos/BySistema/'+id,{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
          let {data} = res.data
          data.forEach(reg => {
              let obj = {
                "id":reg.id,
                "nombreM":reg.nombre,
                "siglasM": reg.siglas,
                "descripcionM": reg.descripcion
              };
              rowsmodulos.value.push(obj)
          })
        }
      getModulos()
    }

    const RegistrarModulo = async() => {
      RegistroModulo.value = true
      itemsSistema.value =[]
      const respuesta = await api.get('/Sistemas',{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
        let{data} = respuesta.data;
        data.forEach((item)=>{
          itemsSistema.value.push({
            label: item.nombre,
            value: item.id
          });
        })
    }

    const EditarModuloMetodo = async(id) =>{
      EditarModulo.value = true
      itemsSistema.value =[]
      const respuesta = await api.get('/Sistemas',{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
        let{data} = respuesta.data;
        data.forEach((item)=>{
          itemsSistema.value.push({
            label: item.nombre,
            value: item.id
          });
        })
      const res = await api.get('/Modulos/'+id,{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
        let datos = res.data.data
            idmodulo.value = datos.id
            siglasModulo.value = datos.siglas
            nombreModulo.value = datos.nombre
            descripcionModulo.value = datos.descripcion
            const filtro1 = itemsSistema.value
            let valor = filtro1.find(elemento => elemento.value === datos.sistema_Id)
            nombreSistemas.value = valor


    }

    // Este es el metodo para eliminar registro
    const DeleteModulo = function(id){

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
        let sisid = 0
         $q.loading.show()
          api.get('/Modulos/'+id,{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}}).then(function(res) {
                let {data} = res.data
                 sisid = data.sistema_Id
              })
          api.delete('/Modulos/'+id,{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}}).then(function (respuesta){
            let{data,success} = respuesta.data
            if(respuesta.status == 200 && success == true){
              $q.notify({
                type: 'positive',
                message: data,
                position: 'top-right',
                progress: true,
              })

              loading.value = true
              rowsmodulos.value = [  ]
              Modulos(sisid)
              loading.value = false
              RegistroModulo.value = false
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
    const EditarTipoAreaMetodo = async (id) => {
      EditarModulo.value = true;
      const res = await api.get('/TiposAreas/'+id)
        let {data} = res.data
            editarArea.value = data.tipo
            idEditarArea.value = data.id

    }

     const VerModulo = async (id) => {
      rowsmodulos.value = []
      const res = await api.get('/Sistemas/'+id,{headers:{'Authorization': 'Bearer'+' '+ $q.localStorage.getItem("token")}})
      let {data} = res.data
      Etiqueta.value = data.nombre
      Modulos(id)
      VerModuloSistema.value = true;
    }

    const limpiarRegistro = function(){
      idmodulo.value = ""
      siglasModulo.value=""
      nombreModulo.value=""
      descripcionModulo.value=""
      nombreSistemas.value =""
    }
    return{
       // Variables de guardado y edición
       siglasModulo,
       nombreModulo,
       descripcionModulo,
       idmodulo,
       nombreSistemas,
       itemsSistema,
       textbuscar,
       textbuscarI,
       editarArea,
       idEditarArea,
       columnsmodulos,
       rowsmodulos,
       columnsistemas,
       rowsistemas,
       RegistroModulo,
       EditarModulo,
       VerModulo,
       VerModuloSistema,
       RegistrarModulo,
       EditarTipoAreaMetodo,
       DeleteModulo,
       pagination,
       Etiqueta,
       loading,
       limpiarRegistro,
       EditarModuloMetodo,
       ListaPermiso,
       PRegistrar,
       PActualizar,
       PEliminar,
       PLeer,
      //MEtodo submit para guardar registro
       onSubmit(){
          $q.loading.show()
          const{value} = nombreSistemas.value
          console.log(value)
          api.post("/Modulos",{
             sistema_Id: value,
                   siglas: siglasModulo.value,
                   nombre: nombreModulo.value,
                   descripcion: descripcionModulo.value,
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
                rowsistemas.value = [  ]
                getAreas()
                loading.value = false
                RegistroModulo.value = false
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
          const idT = idmodulo.value;
          const{value} = nombreSistemas.value
          console.log(value)
          api.put("/Modulos/"+idT,{
              sistema_Id: value,
              siglas: siglasModulo.value,
              nombre: nombreModulo.value,
              descripcion: descripcionModulo.value,
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
              rowsmodulos.value = [  ]
              Modulos(value)
              loading.value = false
              EditarModulo.value = false
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
          const content = [columnsmodulos.map(col => wrapCsvValue(col.label))].concat(
          rowsmodulos.value.map(row => columnsmodulos.map(col => wrapCsvValue(
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
