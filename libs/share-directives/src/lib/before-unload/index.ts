import { BeforeunloadDirective } from "./before-unload.directive";
import { BeforeUnloadService } from "./before-unload.service";
import { BEFORE_UNLOAD_MESSAGE } from "./before-unload.token";

export function beforeUnloadDirective(): string {
  return 'before-unload-directive';
}

export { BeforeunloadDirective, BeforeUnloadService, BEFORE_UNLOAD_MESSAGE };

