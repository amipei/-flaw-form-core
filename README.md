1、使用
```
function required (context: any) {
  const value = context.value;
  return value != null && (typeof(value) === 'string' && value.trim().length !== 0)
    ? null : {'required': '这是必填项' }
}
function asyncCheckNumber (context: any) {
  return new Promise((resolve, reject) => {
    const value = parseInt(context.value);
    if (!isNaN(value) && typeof value === 'number') {
      setTimeout(() => {
        resolve(null)
      }, 1000)
    } else {
      resolve({ 'asyncCheckNumber': '这不是可识别的数'})
    }
  })
}
const useControl = () => {
  
}
function App() {
  const control = useRef(new Control(10, { validator: [required], asyncValidator: [asyncCheckNumber]}))
  const [inputValue, setValue] = useState<string>('10');
  const [errors, setErrors] = useState(null);
  const [status, setStatus] = useState(null)
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setValue(value);
    control.current.setValue(value, { emitModelToViewChange: false})
  }
  useEffect(() => {
    if (control.current) {
      control.current.registerValueChange((value: string) => {
        setValue(value)
      })
    }
  }, [])
  useEffect(() => {
    if (control.current) {
      control.current.subscribe((controlState: any) => {
        setErrors(controlState.errors)
        setStatus(controlState.status)
      }, {errors: true, status: true})
    }
    console.log(control)
  }, [])
  return (
    <div className="App">
      <input type="text" value={inputValue} onChange={handleChange}/>
      <hr/>
      实时值： {inputValue}
      <hr/>
      {errors ? JSON.stringify(errors) : '没有错误'}
      <hr/>
      {status}
    </div>
  );
}

export default App;
```