import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import zh from 'vee-validate/dist/locale/zh_CN' // 引入中文文件

// 配置中文
// Validator.addLocale(zh)

const config = {
  locale: 'zh_CN'
}

// 自定義validate
const dictionary = {
  zh_CN: {
    messages: {
      required: () => '欄位為必填',
      numeric: () => '必須為數字',
      email: (field) => field + '格式錯誤',
      min: (value) => '至少需輸入' + value + '個字',
      max: (value) => '最多只能輸入' + value + '個字'
    },
    attributes: {
      email: '信箱',
      password: '密碼',
      username: '帳號',
      phone: '手機'
    }
  }
}

Validator.extend('tel', {
  messages: {
    zh_CN: field => field + '號碼必須為10碼'
  },
  validate: value => {
    return value.length === 10
    // && /^09\d{2}-?\d{3}-?\d{3}$/.test(value) 手機格式檢查
  }
})

Validator.localize({ zh_CN: zh })
Validator.localize(dictionary)
Vue.use(VeeValidate, config)
