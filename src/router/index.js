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
export const constantRouterMap = [{
  path: '/login',
  component: () =>
      import('@/views/login/index'),
  hidden: true
},
{
  path: '/404',
  component: () =>
      import('@/views/404'),
  hidden: true
},
{
  path: '',
  component: Layout,
  redirect: 'dashboard',
  children: [{
    path: 'dashboard',
    component: () =>
        import('@/views/dashboard/index'),
    name: 'dashboard',
    meta: {
      title: 'dashboard',
      icon: 'example',
      noCache: true
    }
  }]
}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})

export const asyncRouterMap = [{
  path: '/company',
  component: Layout,
  redirect: '/company/basic',
  name: 'Company',
  meta: {
    title: 'company_manage',
    icon: 'example',
    roles: ['super_admin', 'admin', 'company_leader', 'department_leader', 'group_leader', 'isp', 'supervisor', 'supporter']
  },
  children: [{
    path: 'basic',
    name: 'Basic',
    component: () =>
          import('@/views/company/Basic'),
    meta: {
      title: 'company_basic',
      icon: 'tree',
      roles: ['super_admin', 'admin', 'company_leader']
    }
  },
  {
    path: 'subCompany',
    name: 'SubCompany',
    component: () =>
          import('@/views/company/SubCompany'),
    meta: {
      title: 'sub_company_manage',
      icon: 'tree',
      roles: ['super_admin', 'admin', 'company_leader', 'department_leader']
    }
  },
  {
    path: 'department',
    name: 'Department',
    component: () =>
          import('@/views/company/Department'),
    meta: {
      title: 'depart_manage',
      icon: 'tree',
      roles: ['super_admin', 'admin', 'company_leader', 'department_leader']
    }
  },
  {
    path: 'plan',
    name: 'Plan',
    component: () =>
          import('@/views/company/Plan'),
    meta: {
      title: 'plan_manage',
      icon: 'tree',
      roles: ['super_admin', 'admin', 'company_leader', 'department_leader']
    }
  },
  {
    path: 'user',
    name: 'User',
    component: () =>
          import('@/views/company/User'),
    meta: {
      title: 'user_manage',
      icon: 'tree',
      roles: ['super_admin', 'admin', 'company_leader']
    }
  }
  ]
},
  // {
  //   path: '/file',
  //   component: Layout,
  //   redirect: '/file/UploadPerson',
  //   name: 'File',
  //   meta: {
  //     title: 'file_manage',
  //     icon: 'example'
  //   },
  //   children: [
  // {
  //   path: 'uploadPerson',
  //   name: 'UploadPerson',
  //   component: () =>
  //         import('@/views/file/UploadPerson'),
  //   meta: {
  //     title: 'upload_person',
  //     icon: 'tree',
  //     roles: ['super_admin', 'admin', 'company_leader', 'department_leader', 'group_leader', 'isp', 'supervisor', 'supporter']
  //   }
  // },
  // {
  //   path: 'uploadOrganization',
  //   name: 'UploadOrganization',
  //   component: () =>
  //         import('@/views/file/UploadOrganization'),
  //   meta: {
  //     title: 'upload_organization',
  //     icon: 'tree',
  //     roles: ['super_admin', 'admin', 'company_leader', 'department_leader', 'group_leader', 'isp', 'supervisor', 'supporter']
  //   }
  // },
  //     {
  //       path: 'uploadActivity',
  //       name: 'UploadActivity',
  //       component: () =>
  //           import('@/views/file/UploadActivity'),
  //       meta: {
  //         title: 'upload_activity',
  //         icon: 'tree',
  //         roles: ['super_admin', 'admin', 'company_leader', 'department_leader', 'group_leader', 'isp', 'supervisor', 'supporter']
  //       }
  //     }
  //   ]
  // },
{
  path: '/person',
  component: Layout,
  redirect: '/person/serviceUser',
  name: 'Person',
  meta: {
    title: 'person_manage',
    icon: 'example',
    roles: ['super_admin', 'admin', 'company_leader', 'department_leader', 'group_leader', 'isp', 'supervisor', 'supporter']
  },
  children: [{
    path: 'serviceUser',
    name: 'ServiceUser',
    component: () =>
          import('@/views/person/ServiceUser'),
    meta: {
      title: 'person_manage',
      icon: 'example'
    }
  },
  {
    path: 'serviceUser/:id',
    name: 'index',
    component: () =>
          import('@/views/person/index'),
    meta: {
      title: '個案基本資料',
      noCache: true
    },
    hidden: true
  }
  ]
},

{
  path: '/team',
  component: Layout,
  redirect: '/team/basic',
  name: 'Team',
  meta: {
    title: 'team_manage',
    icon: 'example',
    roles: ['super_admin', 'admin', 'company_leader', 'department_leader', 'group_leader', 'isp', 'supervisor', 'supporter']
  },
  children: [{
    path: 'basic',
    name: 'TeamBasic',
    component: () =>
          import('@/views/team/TeamBasic'),
    meta: {
      title: 'team_basic',
      icon: 'table',
      roles: ['super_admin', 'admin', 'company_leader', 'department_leader', 'group_leader']
    }
  },
  {
    path: 'traitChart',
    name: 'TraitChart',
    component: () =>
          import('@/views/team/TraitChart'),
    meta: {
      title: 'trait_chart',
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
  },
  {
    path: 'developPlan',
    name: 'DevelopPlan',
    component: () =>
          import('@/views/team/DevelopPlan'),
    meta: {
      title: 'team_develop_plan',
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

{
  path: '/organization',
  component: Layout,
  redirect: '/organization/OEES',
  name: 'Organization',
  meta: {
    title: 'organization_manage',
    icon: 'example',
    roles: ['super_admin', 'admin', 'company_leader', 'department_leader', 'group_leader', 'oees']
  },
  children: [{
    path: 'oees',
    name: 'OEES',
    component: () =>
          import('@/views/organization/OEES'),
    meta: {
      title: 'oees',
      icon: 'table',
      roles: [
        'super_admin',
        'admin',
        'company_leader',
        'department_leader',
        'group_leader',
        'oees'
      ]
    }
  },
  {
    path: 'developPlan',
    name: 'DevelopPlans',
    component: () =>
          import('@/views/organization/DevelopPlans'),
    meta: {
      title: 'organization_develop_plan',
      icon: 'tree',
      roles: [
        'super_admin',
        'admin',
        'company_leader',
        'department_leader',
        'group_leader'
      ]
    }
  }
  ]
},

{
  path: '/work',
  component: Layout,
  redirect: '/example/table',
  name: 'Work',
  meta: {
    title: 'work_manage',
    icon: 'example'
  },
  children: [
    // {
    //   path: 'person',
    //   name: 'Table',
    //   component: () => import('@/views/table/index'),
    //   meta: { title: '個人層級', icon: 'table' }
    // },
    // {
    //   path: 'team',
    //   name: 'Tree',
    //   component: () => import('@/views/tree/index'),
    //   meta: { title: '團隊層級', icon: 'tree' }
    // },
    // {
    //   path: 'organization',
    //   name: 'Tree',
    //   component: () => import('@/views/tree/index'),
    //   meta: { title: '組織層級', icon: 'tree' }
    // }
  ]
},
{
  path: '/statistic',
  component: Layout,
  redirect: '/statistic/PersonStatistic',
  name: 'Statistic',
  meta: {
    title: 'statistic',
    icon: 'example'
  },
  children: [{
    path: 'personStatistic',
    name: 'PersonStatistic',
    component: () =>
          import('@/views/statistic/PersonStatistic'),
    meta: {
      title: 'person_statistic',
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
  },
  {
    path: 'teamStatistic',
    name: 'TeamStatistic',
    component: () =>
          import('@/views/statistic/TeamStatistic'),
    meta: {
      title: 'team_statistic',
      icon: 'tree',
      roles: [
        'super_admin',
        'admin',
        'company_leader',
        'department_leader',
        'group_leader'
      ]
    }
  },
  {
    path: 'organizationStatistic',
    name: 'OrganizationStatistic',
    component: () =>
          import('@/views/statistic/OrganizationStatistic'),
    meta: {
      title: 'organization_statistic',
      icon: 'tree',
      roles: [
        'super_admin',
        'admin',
        'company_leader',
        'department_leader',
        'group_leader'
      ]
    }
  }
  ]
}, {
  path: '*',
  redirect: '/404',
  hidden: true
}
]
