import 'dotenv/config';

export default class EnvService {
  localEnv: Record<
    string,
    number | string | boolean | [] | object | undefined
  > = {};
  get(key: string): string | undefined {
    return process.env[key] ?? undefined;
  }
  setLocalEnv(key: string, value: number | string | boolean | [] | object) {
    this.localEnv[key] = value;
  }
  deleteLocalEnv(key: string) {
    this.localEnv[key] = undefined;
  }
}
