
import FormArray from "./model/FormArray";
import FormControl from "./model/FormControl";
import FormGroup from "./model/FormGroup";
import { ArraySchema, GroupSchema } from "./schemas";
import AbstractContainerControl from "./shared/AbstractContainerControl";
import AbstractControl from "./shared/AbstractControl";

import { omit } from "./shared/utils";
export { default as defineSchema } from './schemas/index';

// schema -> control
const transformControlTree = (schemas: any, options = {}) => {
  //每次函数开始的配置
  const currentOptions = Object.assign(options, schemas.options);

  const nextOptions = omit(currentOptions, ['validator', 'asyncValidator']);

  if (schemas instanceof GroupSchema) {
    const controls: any = {};
    Object.keys(schemas.config).forEach(name => {
      const schema = schemas.config[name];
      controls[name] = transformControlTree(schema, nextOptions)
    })
    return new FormGroup(controls, currentOptions)
  } else if (schemas instanceof ArraySchema) {
    const controls: any = [];
    schemas.config.forEach(ele => {
      controls.push(transformControlTree(ele, nextOptions))
    });
    return new FormArray(schemas.config, currentOptions);
  } else {
    return new FormControl(schemas.config, currentOptions)
  }
}

const createForm = (
  schema: GroupSchema | ArraySchema
) => {
  const root = transformControlTree(schema) as AbstractContainerControl;

  const api = {
    registerControl: (name?: string): AbstractControl | null => {
      return name ? root.get(name) : root;
    },
    root
  }

  return api;
}

export {
  FormControl
}
export default createForm;
