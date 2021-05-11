import FormControl from '../src/models/FormControl';

describe('FormControl', () => {
  it('should default the value to null', () => {
    const c = new FormControl();
    expect(c.value).toBe(null);
  });

})