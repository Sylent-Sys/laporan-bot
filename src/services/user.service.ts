import { CommandInteraction } from 'discord.js';
import PrismaService from './prisma.service.js';

export default class UserService {
  constructor(private prismaService: PrismaService = new PrismaService()) {}
  async upsert(
    discordId: string,
    globalName: string,
    displayName: string,
    username: string
  ) {
    return await this.prismaService.user.upsert({
      create: {
        discordId,
        displayName,
        globalName,
        username,
        paymentCredential: '',
        paymentMethod: ''
      },
      update: {
        discordId,
        displayName,
        globalName,
        username
      },
      where: {
        discordId
      }
    });
  }
  async updatePaymentCredential(
    discordId: string,
    paymentCredential: string,
    paymentMethod: string
  ) {
    return await this.prismaService.user.update({
      data: {
        paymentCredential,
        paymentMethod
      },
      where: {
        discordId
      }
    });
  }
  async getByDiscordId(discordId: string) {
    return await this.prismaService.user.findFirst({
      where: {
        discordId
      }
    });
  }
  userHasRole(
    roleName: string,
    discordId: string,
    interaction: CommandInteraction
  ): boolean {
    const role = interaction.guild?.roles.cache.find((r) =>
      r.name.toLowerCase().includes(roleName)
    ) ?? { id: '' };
    const member = interaction.guild?.members.cache.get(discordId);
    if (member?.roles.cache.has(role.id)) {
      return true;
    }
    return false;
  }
  async checkUserExistByDiscordId(
    discordId: string,
    globalName: string,
    displayName: string,
    username: string
  ) {
    const user = await this.getByDiscordId(discordId);
    if (user == undefined) {
      const user = await this.upsert(
        discordId,
        globalName,
        displayName,
        username
      );
      return user;
    }
    return user;
  }
}
