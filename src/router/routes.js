//import { CargaPermisos } from 'src/store/auth/actions'
import  useStore  from '../store/index'
const routes = [
  {

    path: '/',
    name:'',
    /*beforeEnter: async (to, from, next) =>{
      const {success} =  await store.dispatch('auth/GeneraPermisos')
      console.log(success)
      if(success === true)
      {
        next()
      }

    },*/
    component: () => import('layouts/MainLayout.vue'),

    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '', name:'CatalogosPrincipal',component: () => import('src/pages/Principal/CatalogosPrincipal.vue') },
      //{ path: '', name:'TemplateUsuario',component: () => import('src/pages/Components/CatalogosPrincipal/TemplateUsuario.vue')},
      //{ path: '', name:'TemplateSistema',component: () => import('src/pages/Components/CatalogosPrincipal/TemplateSistema.vue')},
      //{ path: '', name:'TemplatePerfil',component: () => import('src/pages/Components/CatalogosPrincipal/TemplatePerfil.vue')},
      //{ path: '', name:'TemplateModulo',component: () => import('src/pages/Components/CatalogosPrincipal/TemplateModulo.vue') },

      { path: '', name:'CatalogosPermisos',component: () => import('src/pages/Principal/CatalogosPermisos.vue') },
     // { path: '', name:'TemplateUsuario',component: () => import('src/pages/Components/CatalogosPrincipal/TemplateUsuario.vue')},
     // { path: '', name:'TemplateRequisitos',component: () => import('src/pages/Components/CatalogosPrincipal/TemplateRequisitos.vue') },
     // { path: '', name:'TemplateTratamiento',component: () => import('src/pages/Components/CatalogosPrincipal/TemplateTratamiento.vue') },
     // { path: '', name:'TemplateTabuladorViatico',component: () => import('src/pages/Components/CatalogosPrincipal/TemplateTabuladorViatico.vue') },




      //{ path: 'Componentes', name:'botones', component: () => import('pages/Components/Botones.vue') },
      //{ path: 'Colores',name:'colores', component: () => import('pages/Components/Colores.vue') },
      //{ path: '', name:'ejemplo1',component: () => import('pages/Ejemplo1.vue') },
      //{ path: '', name:'ejemplo2', component: () => import('pages/Ejemplo2.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
