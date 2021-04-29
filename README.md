# Flaw Form

这是一个受Angular Forms影响而开发的表单库。

### 预设功能

- [ ] 使用对象描述表单模型 
- [ ] 表单模型可以继承(复用)  
- [ ] 内置简单校验函数  
- [ ] 自定义校验使用函数扩展

//需求1：使用长度为2的数组描述基本控件模型
const emailControl = ['', { validator: ['email'] }] // isArray
//需求2：使用Schema.group接口描述控件组
//2.1、参数 1 接受基础控件数组
//2.2、参数 2 接口控件组的选项信息，由上至下传递到基础控件，校验选项不会传递。
const Schema: any = {}
const loginForm = Schema.group({
  username: '',
  password: ''
}, { validator: ['requird'] })

// username: ''
// password: ''
// { validator: ['required'] }

//需求3：支持继承/扩展控件组
//3.1、重名的控件会直接覆盖原有控件
//3.2、各控件组的选项会进行合并， 策略相关以现有控件组为先，校验规则会进行合并。
const loginCodeForm = Schema.group({
  phone: '',
  code: ''
}, { validator: ['codeChck'] }).extends(loginForm)
//需求4：支持嵌套控件组
const 个人基本信息 = Schema.group({
  name: '',
  '证件类型': '',
  '证件号码': ''
})
const 个人健康申报表 = Schema.group({
  '申报方式': '本人填写',
  '代填人信息': 个人基本信息.reset({ disabled: true }),
  '申报人信息': Schema.group({
    phone: '',
    address: ''
  }).extends(个人基本信息)
}, { trigger: 'submit' })

