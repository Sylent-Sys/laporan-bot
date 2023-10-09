import 'dotenv/config';

export default class EnvService {
  static localEnv: { [key: string]: number | string | boolean | [] | object } =
    {};
  static get(key: string): string | undefined {
    return process.env[key] ?? undefined;
  }
  static setLocalEnv(
    key: string,
    value: number | string | boolean | [] | object
  ) {
    this.localEnv[key] = value;
  }
  static deleteLocalEnv(key: string) {
    delete this.localEnv[key];
  }
}
