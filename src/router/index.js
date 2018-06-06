import Vue from 'vue'
import Router from 'vue-router'

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
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'dashboard',
      meta: { title: '首頁', icon: 'example', noCache: true }
    }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/company',
    component: Layout,
    redirect: '/company/basic',
    alwaysShow: true,
    name: 'Company',
    meta: {
      title: '組織管理',
      icon: 'example',
      roles: ['super_admin', 'admin', 'company_leader', 'department_leader', 'group_leader', 'isp', 'supervisor', 'supporter']
    },
    children: [
      {
        path: 'basic',
        name: 'Basic',
        component: () => import('@/views/company/Basic'),
        meta: {
          title: '組織基本資料',
          roles: ['super_admin', 'admin', 'company_leader']
        }
      },
      {
        path: 'department',
        name: 'Department',
        component: () => import('@/views/company/department'),
        meta: {
          title: '部門/單位管理',
          icon: 'tree',
          roles: [
            'super_admin',
            'admin',
            'company_leader',
            'department_leader'
          ]
        }
      },
      {
        path: 'plan',
        name: 'Plan',
        component: () => import('@/views/company/Plan'),
        meta: {
          title: '方案管理',
          icon: 'tree',
          roles: [
            'super_admin',
            'admin',
            'company_leader',
            'department_leader'
          ]
        }
      },
      {
        path: 'member',
        name: 'Member',
        component: () => import('@/views/company/Member'),
        meta: {
          title: '人員管理',
          icon: 'tree',
          roles: [
            'super_admin',
            'admin',
            'company_leader'
          ]
        }
      },
      {
        path: 'file',
        name: 'File',
        component: () => import('@/views/company/File'),
        meta: {
          title: '檔案管理',
          icon: 'tree',
          roles: [
            'super_admin',
            'admin',
            'company_leader',
            'department_leader',
            'group_leader',
            'isp',
            'supervisor',
            'supporter'
          ]
        }
      }
    ]
  },

  // {
  //   path: '/person',
  //   component: Layout,
  //   redirect: '/person/basic/User',
  //   name: 'Person',
  //   meta: { title: '個人層級', icon: 'example' },
  //   children: [
  //     {
  //       path: 'user',
  //       name: 'User',
  //       component: () => import('@/views/person/User'),
  //       meta: { title: '個人層級', icon: 'form' }
  //     },
  //     {
  //       path: 'basic',
  //       name: 'PersonBasic',
  //       component: () => import('@/views/person/PersonBasic'),
  //       meta: { title: '個案基本資料', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: '/team',
  //   component: Layout,
  //   redirect: '/team/basic',
  //   name: 'Team',
  //   meta: { title: '團隊層級', icon: 'example' },
  //   children: [
  //     {
  //       path: 'basic',
  //       name: 'TeamBasic',
  //       component: () => import('@/views/team/TeamBasic'),
  //       meta: {
  //         title: '團隊管理',
  //         icon: 'table',
  //         roles: [
  //           'super_admin',
  //           'admin',
  //           'company_leader',
  //           'department_leader',
  //           'group_leader'
  //         ]
  //       }
  //     },
  //     {
  //       path: 'traitChart',
  //       name: 'TraitChart',
  //       component: () => import('@/views/team/TraitChart'),
  //       meta: {
  //         title: '團隊特質量表-CFI',
  //         icon: 'tree',
  //         roles: [
  //           'super_admin',
  //           'admin',
  //           'company_leader',
  //           'department_leader',
  //           'group_leader',
  //           'isp',
  //           'supervisor',
  //           'supporter'
  //         ]
  //       }
  //     },
  //     {
  //       path: 'developPlan',
  //       name: 'DevelopPlan',
  //       component: () => import('@/views/team/DevelopPlan'),
  //       meta: {
  //         title: '團隊發展計畫',
  //         icon: 'tree',
  //         roles: [
  //           'super_admin',
  //           'admin',
  //           'company_leader',
  //           'department_leader',
  //           'group_leader',
  //           'isp',
  //           'supervisor',
  //           'supporter'
  //         ]
  //       }
  //     },
  //     {
  //       path: 'CFIstatistic',
  //       name: 'CFIstatistic',
  //       component: () => import('@/views/team/CFIstatistic'),
  //       meta: {
  //         title: '統計分析',
  //         icon: 'tree',
  //         roles: [
  //           'super_admin',
  //           'admin',
  //           'company_leader',
  //           'department_leader',
  //           'group_leader',
  //           'isp',
  //           'supervisor',
  //           'supporter'
  //         ]
  //       }
  //     }
  //   ]
  // },

  // {
  //   path: '/organization',
  //   component: Layout,
  //   redirect: '/organization/OEES',
  //   name: 'Organization',
  //   meta: { title: '組織層級', icon: 'example' },
  //   children: [
  //     {
  //       path: 'oees',
  //       name: 'OEES',
  //       component: () => import('@/views/organization/OEES'),
  //       meta: {
  //         title: '組織效益效率-OEES',
  //         icon: 'table',
  //         roles: [
  //           'super_admin',
  //           'admin',
  //           'company_leader',
  //           'department_leader',
  //           'group_leader',
  //           'isp',
  //           'supervisor',
  //           'supporter'
  //         ]
  //       }
  //     },
  //     {
  //       path: 'developPlan',
  //       name: 'DevelopPlans',
  //       component: () => import('@/views/organization/DevelopPlans'),
  //       meta: {
  //         title: '組織發展計畫',
  //         icon: 'tree',
  //         roles: [
  //           'super_admin',
  //           'admin',
  //           'company_leader',
  //           'department_leader',
  //           'group_leader',
  //           'isp',
  //           'supervisor',
  //           'supporter'
  //         ]
  //       }
  //     },
  //     {
  //       path: 'statistic',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: {
  //         title: '統計分析',
  //         icon: 'tree',
  //         roles: [
  //           'super_admin',
  //           'admin',
  //           'company_leader',
  //           'department_leader',
  //           'group_leader',
  //           'isp',
  //           'supervisor',
  //           'supporter'
  //         ]
  //       }
  //     }
  //   ]
  // },

  // {
  //   path: '/work',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Work',
  //   meta: { title: '工作管理', icon: 'example' },
  //   children: [
  //     {
  //       path: 'person',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: '個人層級', icon: 'table' }
  //     },
  //     {
  //       path: 'team',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: '團隊層級', icon: 'tree' }
  //     },
  //     {
  //       path: 'organization',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: '組織層級', icon: 'tree' }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
]

