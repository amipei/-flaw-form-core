import FormArray from "./models/FormArray";
import FormControl from "./models/FormControl";
import FormGroup from "./models/FormGroup";
import { ArraySchema, GroupSchema } from "./schemas";
import { omit } from "./shared/utils";
export { default as defineSchema } from './schemas/index' 

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
  const root = transformControlTree(schema);

  const api = {
    registerControl: (name: string) => {
      return root.getControl(name)
    }
  }

  return api;
}


export default createForm;
