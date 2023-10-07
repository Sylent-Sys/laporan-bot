import "dotenv/config"

export default class EnvService {
    static localEnv: { [key: string]: any } = {};
    static get(key: string): string | undefined {
        return process.env[key] ?? undefined
    }
    static setLocalEnv(key: string, value: any) {
        this.localEnv[key] = value
    }
    static deleteLocalEnv(key: string) {
        delete this.localEnv[key]
    }
}