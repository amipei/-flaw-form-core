import { ArraySchema, GroupSchema } from "./schemas";
export { default as defineSchema } from './schemas/index';
declare const createForm: (schema: GroupSchema | ArraySchema) => {
    registerControl: (name: string) => import("./shared/AbstractControl").default | null;
};
export default createForm;
