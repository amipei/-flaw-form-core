# Flaw Form

这是一个基于Angular Forms 库改造的表单模型库

### 预设功能

- [x] 使用对象描述表单模型 
- [ ] 表单模型可以继承(复用)  
- [ ] 内置简单校验函数  
- [ ] 自定义校验使用函数扩展


### 使用方法

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

```