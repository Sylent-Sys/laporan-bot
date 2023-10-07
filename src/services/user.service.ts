import { CommandInteraction } from "discord.js";
import PrismaService from "./prisma.service";

export default class UserService {
    constructor(private prismaService: PrismaService = new PrismaService()) { }
    async add(discordId: string) {
        await this.prismaService.user.create({
            data: {
                discordId,
                paymentCredential: "",
                paymentMethod: ""
            }
        })
    }
    async getByDiscordId(discordId: string) {
        return await this.prismaService.user.findFirst({
            where: {
                discordId
            }
        })
    }
    async userHasRole(roleName: string, discordId: string, interaction: CommandInteraction): Promise<boolean> {
        const role = interaction.guild?.roles.cache.find(r => r.name.toLowerCase().search(roleName)) ?? { id: "" };
        const member = interaction.guild?.members.cache.get(discordId);
        if (member?.roles.cache.has(role.id)) {
            return true
        }
        return false
    }
    async checkUserExistByDiscordId(discordId: string) {
        const user = this.getByDiscordId(discordId)
        if (user == undefined) {
            await this.add(discordId)
        }
    }
}