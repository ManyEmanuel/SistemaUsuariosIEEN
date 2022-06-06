import { useQuasar } from 'quasar'

const $q = useQuasar()
export const setToken = (state,{ token, userName}) => {
  state.token = token
  state.userName = userName
  localStorage.setItem('token', token)
  localStorage.setItem('user',userName)
  state.isAuthenticated = true

}

export const removeToken = (state) => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  state.token = null
  state.isAuthenticated = false
  state.userName = null

}

export const PermisosUsuarios = (state,ListaPermiso) => {
  
  state.Permisos = ListaPermiso

}

export const CatalogosPermisos = (state,Accesos) => {
  state.CatalogosPermisos = Accesos

}

export const CatalogosPrincipal = (state,Accesos) => {
  state.CatalogosPrincipal = Accesos

}



export const setMe = (state, me) => {
  state.me = me
}
