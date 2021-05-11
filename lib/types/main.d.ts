import FormControl from "./model/FormControl";
import { ArraySchema, GroupSchema } from "./schemas";
import AbstractContainerControl from "./shared/AbstractContainerControl";
import AbstractControl from "./shared/AbstractControl";
export { default as defineSchema } from './schemas/index';
declare const createForm: (schema: GroupSchema | ArraySchema) => {
    registerControl: (name?: string | undefined) => AbstractControl | null;
    root: AbstractContainerControl;
};
export { FormControl };
export default createForm;
