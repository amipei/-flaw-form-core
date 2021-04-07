
/**
 *  模型存在的状态
 */
export const enum ModelState {
  VALID = 'VALID',       //表示字段处于校验通过或者还没校验阶段。
  INVALID = 'INVALID',   //表示字段处于校验失败阶段.
  PENDING = 'PENDING',   //表示字段处于异步校验阶段.
  DISABLED = 'DISABLED', //表示字段处于禁用阶段。
  PREVIEW = 'PREVIEW',   //表示字段处于预览阶段。
  HIDDEN = 'HIDDEN'      // 表示字段处于隐藏阶段。
}