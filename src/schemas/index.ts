export class GroupSchema {
  constructor(
    public config: any,
    public options: any
  ) { }
}

export class ArraySchema {
  constructor(
    public config: any,
    public options: any
  ) { }
}

export class BaseSchema {
  constructor(
    public config: any,
    public options: any
  ) { }
}

const createSchemaByConfig = (config: any) => {
  if (config instanceof GroupSchema || config instanceof ArraySchema) {
    return config;
  } else if (Array.isArray(config)) {
    //return [config[0], config.length > 1 ? config[1] : {}];
    return new BaseSchema(config[0], config.length > 1 ? config[1] : {})
  } else {
    //return [config, {}]
    return new BaseSchema(config, {})
  }
}

const defineSchema = (
  config: any,
  options: any = {}
) => {
  if (Array.isArray(config)) {
    const arrayConfig: any[] = [];
    config.forEach(ele => {
      arrayConfig.push(createSchemaByConfig(ele));
    })
    return Object.freeze(new ArraySchema(arrayConfig, options))
  } else {
    const groupConfig = {};
    Object.keys(config).forEach(name => {
      groupConfig[name] = createSchemaByConfig(config[name]);
    })
    return Object.freeze(new GroupSchema(groupConfig, options))
  }
}

export default defineSchema