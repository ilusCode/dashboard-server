import { parse } from 'yaml';
import registerAppYaml from './register-app.yaml';

export interface RegisterAppConfig {
  imageTypes: string[];
}

export const registerAppConfig: RegisterAppConfig = parse(registerAppYaml);
