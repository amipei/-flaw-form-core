

export class GroupModel {
  constructor(
    private controls: any,
    private opts: any
  ) {
  }
}

function defineModel(
  controlsConfig: { [key: string]: any},
  opts: any
) {
  const controls = {};
  Object.keys(controlsConfig).forEach(controlName => {
    controls[controlName] = createFullControlConfig(controlsConfig[controlName]);
  })
  return Object.freeze(new GroupModel(controls, opts))
}

function createFullControlConfig (controlConfig: any) {
  if (controlConfig instanceof GroupModel) {
    return controlConfig
  } else if (Array.isArray(controlConfig)) {
    const value = controlConfig[0];
    const opts = controlConfig.length > 1 ? controlConfig[1]: {};
    return [value, opts]
  } else {
    return [controlConfig, {}]
  }
}

export default defineModel;