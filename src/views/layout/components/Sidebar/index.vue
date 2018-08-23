<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu mode="vertical" :show-timeout="200" :default-active="$route.path" :collapse="isCollapse" background-color="#fd8209" text-color="#fff" active-text-color="#522112">
      <div class="brand row text-center">
        <div class="col">
          <el-tooltip effect="dark" :content="companyBasic.company_name" placement="right">
            <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif" alt="">
          </el-tooltip>
        </div>
      </div>
      <sidebar-item :routes="permission_routers "></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters(['permission_routers', 'sidebar', 'companyBasic', 'id']),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  mounted() {
    this.GetCompanyBasic(this.id)
    console.log(this.companyBasic)
  },
  methods: {
    ...mapActions(['GetCompanyBasic'])
  }
}
</script>
