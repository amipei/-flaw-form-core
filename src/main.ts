

class A {
  #a = 10
  static AC: (a: number) => number;
}
const AC = (a: number) => {
  return 10
}
A.AC = AC
console.log(A)
export default A;