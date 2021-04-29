
import FormControl from "./model/FormControl";
import FormGroup from "./model/FormGroup";
import { GroupModel } from "./shared/defineModel";
import { omit } from "./shared/utils";

export { default as defineModel } from "./shared/defineModel";

const createForm = (
  formModel: any
) => {
  let root;

  if (formModel instanceof GroupModel) {
    root = transformTree(formModel);
  }
  const api = {
    root: root
  }

  return api
}
// model -> control
const transformTree = (formModel: any, opts = {}) => {
  const controls = {};
  const currentOpts = Object.assign(omit(opts, ['validator', 'asyncValidator']), formModel.opts);
  const dgOpts = omit(currentOpts, ['validator', 'asyncValidator'])
  Object.keys(formModel.controls).forEach(name => {
    const model = formModel.controls[name];
    if (Array.isArray(model)) {
      controls[name] = new FormControl(model[0], Object.assign(dgOpts, model[1]))
    } else if (model instanceof GroupModel) {
      controls[name] = transformTree(model, dgOpts);
    }
  })

  return new FormGroup(controls, currentOpts)
}

export default createForm;