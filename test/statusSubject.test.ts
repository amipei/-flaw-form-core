import StatusSubject from '../src/StatusSubject'

describe('测试template', () => {
  const status = new StatusSubject()
  
  test('正常订阅', () => {
    status.subscribe((status)=> {

    }, { value: true })
  })
})
