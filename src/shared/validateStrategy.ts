export const validate = (context: any, validators: any[]) => {
  const errors = {}
  validators.forEach(validator => Object.assign(errors, validator(context)))

  return Object.keys(errors).length ? errors : null;
}

export const validateFirst = (context: any, validators: any[]) => {
  for (const validator of validators) {
    const result = validator(context)
    if (result) return result;
  }

  return null;
}

export const asyncValidate = (context: any, validators: any[]) => {
  //let cancelFn;

  const resultPromise = new Promise((resolve, reject) => {
    //cancelFn = () => reject(null);
    Promise.allSettled(validators.map(validator => validator(context)))
      .then(results => {
        const errors = {};
        results.forEach(result => {
          if (result.status === 'fulfilled' && result.value !== null) {
            Object.assign(errors, result.value);
          }
        })
        Object.keys(errors).length === 0 ? resolve(null) : resolve(errors)
      })
  })

  return resultPromise
  //resultPromise.then(cb);

  //return cancelFn;
}


export const asyncValidateFirst = (context: any, validators: any[]) => {
  //let cancelFn;

  const resultPromise = new Promise(async (resolve, reject) => {
    //cancelFn = () => reject(null);
    const validatorsPromise = validators.map(validator => validator(context))
    let errors = null;
    for await (const error of validatorsPromise) {
      if (error) {
        errors = error;
        break;
      }
    }
    resolve(errors);
  })

  return resultPromise
  //resultPromise.then(cb);

  //return cancelFn;
}

export const filterByTrigger = (map: Map<any, any>, currentTrigger: string) => {
  const validators = [] as any[];
  if (currentTrigger === 'all') {
    map.forEach((trigger, validator) => { validators.push(validator) })
    return validators;
  }
  map.forEach((trigger, validator) => {
    if (currentTrigger === trigger) {
      validators.push(validator)
    }
  })

  return validators;
}