import {api} from 'src/boot/axios.js'
import { defineComponent,ref } from 'vue';
import {useQuasar } from 'quasar'
import {useStore} from 'vuex'
import { useRouter } from "vue-router";
import auth from '.'

const $q = useQuasar();
const store = useStore();


export const GeneraPermisos = async ({commit}) => {
  const valores = window.location.search
  const urlParams = new URLSearchParams(valores)
  const token = urlParams.get('token')
  const sistema = urlParams.get('sistema')
  localStorage.setItem("token", token)
  localStorage.setItem("sistema", sistema)
  const ListaPermisos = []
  const Modulos = await api.get('/Modulos/BySistema/'+sistema,{headers:{'Authorization': 'Bearer'+' '+ token}})
  let ListaModulos = Modulos.data.data
  const Acceso = await api.get('/PermisosModulosUsuarios/Bysuario/'+sistema,{headers:{'Authorization': 'Bearer'+' '+ token}})
  let ListadoAcceso = Acceso.data.data
  ListaModulos.forEach((item) => {
    let filtro = ListadoAcceso.find(elemento => elemento.modulo_Id === item.id)
    if(filtro != undefined){
      ListaPermisos.push({
        id: item.id,
        nombre: item.nombre,
        acceso: true,
        registrar: filtro.registrar,
        actualizar: filtro.actualizar,
        eliminar: filtro.eliminar,
        leer: filtro.leer
      })
    }else{
      ListaPermisos.push({
        id: item.id,
        nombre: item.nombre,
        acceso: false,
        registrar: false,
        actualizar: false,
        eliminar: false,
        leer: false
      })
    }
  })
    commit('PermisosUsuarios',ListaPermisos)
    const {CatalogosPermisos, CatalogosPrincipal} = await ListadoAccesos(ListaPermisos)
    commit('CatalogosPermisos',CatalogosPermisos)
    commit('CatalogosPrincipal', CatalogosPrincipal)
    return{success: true, msj: "Permisos Guardados"}
  }

  export const ListadoAccesos = async (Permisos) => {
    const CatalogosPermisos = []
    const CatalogosPrincipal = []
    Permisos.forEach((item) => {
      switch(item.nombre){
        case 'AccesoPerfil':
          CatalogosPermisos.push({
            id: item.id,
            nombre: item.nombre,
            acceso: item.acceso,
            label: "Acceso sistema por Perfil"
          })
          break;
        case 'AccesoUsuario':
          CatalogosPermisos.push({
            id: item.id,
            nombre: item.nombre,
            acceso: item.acceso,
            label: "Acceso sistema por Usuario"
          })
          break;
        case 'PermisosPerfil':
          CatalogosPermisos.push({
            id: item.id,
            nombre: item.nombre,
            acceso: item.acceso,
            label: "Permisos de modulos de sistemas por Perfil"
          })
          break;
        case 'PermisosUsuario':
          CatalogosPermisos.push({
            id: item.id,
            nombre: item.nombre,
            acceso: item.acceso,
            label: "Permisos de modulos de sistemas por Usuario"
          })
          break;
        case 'Usuarios':
          CatalogosPrincipal.push({
            id: item.id,
            nombre: item.nombre,
            acceso: item.acceso,
            label: "Registro de usuarios"
          })
          break;
        case 'Sistemas':
          CatalogosPrincipal.push({
            id: item.id,
            nombre: item.nombre,
            acceso: item.acceso,
            label: "Registro de sistemas"
          })
          break;
        case 'Perfiles':
          CatalogosPrincipal.push({
            id: item.id,
            nombre: item.nombre,
            acceso: item.acceso,
            label: "Registro de perfiles"
          })
          break;
        case 'Modulos':
          CatalogosPrincipal.push({
            id: item.id,
            nombre: item.nombre,
            acceso: item.acceso,
            label: "Registro de módulos"
          })
          break;

      }


    })
    return {CatalogosPermisos,CatalogosPrincipal}
  }
 // console.log(ListaPermisos.value);

  //let Mutacion = GuardarPermisos(ListaPermisos.value)
  //console.log(Mutacion)




export const checkToken = async ({commit}) => {
  const token = localStorage.getItem('token')
  if(!token){
    commit('removeToken')
    return {success: false}
  }
  try{
    const resp = await api.post('/Accesos/ValidarToken?token='+token)
    console.log(resp)
    return {success: true}

  }catch(error){
    console.log(error)
    commit('removeToken')
    return { success: false }
  }



}

export const signOut = ({commit}) => {
  commit('removeToken')
  return{success: true, data:'Sesión cerrada'}


}

export const getMe = async({commit,dispatch}, token) => {

}

export default GeneraPermisos
