# Flaw Form

这是一个基于 Angular Forms 库改造的表单模型库。
用于 Flaw Form low Code 平台的核心表单引擎库。

# 预设功能

- [x] 使用对象描述表单模型
- [] 完备的 FormArray
- [ ] 表单模型可以继承(复用)  
- [ ] 内置简单校验函数  
- [ ] 自定义校验使用函数扩展
- [] ....

# 特征
* UI独立。
* 零依赖性。
* 支持嵌套表单。
* 控件的 state 可以进行订阅。
* 使用 defineSchema 创建可复用的表单模型。
* 校验器可自定义。

# 安装

```
npm i flaw-form-core
```




# 基本示例

```
function userCheck (control: AbstrolControl): { [key: string]: ang} | null {
  /* ... */
}

function passCheck (control) {
  /* ... */
}

const loginSchema = defineSchema({
  username: ['', { validator: userCheck }],
  password: ['', { validator: passChecl }]
})

const loginForm = createForm(loginSchema);

const username = loginForm.registerControl('username');

username.setValue('value');

username.subscriber(state => {
  console.log(state)
})

```