import { parse } from 'yaml';
import registerAppYaml from '../../../public/assets/config/register-app.yaml';

export interface RegisterAppConfig {
  imageTypes: string[];
}

export const registerAppConfig: RegisterAppConfig = parse(registerAppYaml);
