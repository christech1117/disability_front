import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/company',
    component: Layout,
    redirect: '/company/basic',
    name: 'Company',
    meta: { title: '組織管理', icon: 'example' },
    children: [
      {
        path: 'basic',
        name: 'Basic',
        component: () => import('@/views/company/Basic'),
        meta: { title: '組織基本資料', icon: 'table' }
      },
      {
        path: 'department',
        name: 'Department',
        component: () => import('@/views/company/department'),
        meta: { title: '單位管理', icon: 'tree' }
      },
      {
        path: 'plan',
        name: 'Plan',
        component: () => import('@/views/company/Plan'),
        meta: { title: '方案管理', icon: 'tree' }
      },
      {
        path: 'file',
        name: 'File',
        component: () => import('@/views/company/File'),
        meta: { title: '檔案管理', icon: 'tree' }
      }
    ]
  },

  {
    path: '/person',
    component: Layout,
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/person/User'),
        meta: { title: '個人層級', icon: 'form' }
      }
    ]
  },

  {
    path: '/team',
    component: Layout,
    redirect: '/team/basic',
    name: 'Team',
    meta: { title: '團隊層級', icon: 'example' },
    children: [
      {
        path: 'basic',
        name: 'Basic',
        component: () => import('@/views/team/basic'),
        meta: { title: '團隊管理', icon: 'table' }
      },
      {
        path: 'personTeam',
        name: 'PersonTeam',
        component: () => import('@/views/team/PersonTeam'),
        meta: { title: '個人與團隊特質量表', icon: 'tree' }
      },
      {
        path: 'developPlan',
        name: 'DevelopPlan',
        component: () => import('@/views/team/DevelopPlan'),
        meta: { title: '發展計畫', icon: 'tree' }
      },
      {
        path: 'CFIstatistic',
        name: 'CFIstatistic',
        component: () => import('@/views/team/CFIstatistic'),
        meta: { title: 'CFI統計', icon: 'tree' }
      }
    ]
  },

  {
    path: '/organization',
    component: Layout,
    redirect: '/example/table',
    name: 'Organization',
    meta: { title: '組織層級', icon: 'example' },
    children: [
      {
        path: 'oees',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '組織效益效率量表(OEES)', icon: 'table' }
      },
      {
        path: 'developPlan',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '發展計畫', icon: 'tree' }
      },
      {
        path: 'statistic',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '統計分析', icon: 'tree' }
      }
    ]
  },

  {
    path: '/work',
    component: Layout,
    redirect: '/example/table',
    name: 'Work',
    meta: { title: '工作管理', icon: 'example' },
    children: [
      {
        path: 'person',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '個人層級', icon: 'table' }
      },
      {
        path: 'team',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '團隊層級', icon: 'tree' }
      },
      {
        path: 'organization',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '組織層級', icon: 'tree' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

