import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import zh from 'vee-validate/dist/locale/zh_CN' // 引入中文文件

// 配置中文
Validator.addLocale(zh)

const config = {
  locale: 'zh_CN'
}

Vue.use(VeeValidate, config)

// 自定義validate
const dictionary = {
  zh_CN: {
    messages: {
      required: () => '欄位為必填',
      numeric: (field) => field + '必須為數字',
      email: (field) => field + '格式錯誤',
      min: (field, value) => field + '至少需輸入' + value + '個字'
    },
    attributes: {
      email: '信箱',
      password: '密碼',
      username: '帳號',
      phone: '電話'
    }
  }
}

Validator.updateDictionary(dictionary)

Validator.extend('phone', {
  messages: {
    zh_CN: field => field + '手機號碼必須為10碼'
  },
  validate: value => {
    return value.length === 10
    // && /^09\d{2}-?\d{3}-?\d{3}$/.test(value) 手機格式檢查
  }
})
