import type { CommandInteraction, GuildMember } from 'discord.js';
import { ApplicationCommandOptionType } from 'discord.js';
import { Discord, Guild, Slash, SlashOption } from 'discordx';
import EnvService from '../services/env.service.js';
import UserService from '../services/user.service.js';
import LaporanService from '../services/laporan.service.js';
import UtilService from '../services/util.service.js';

@Discord()
export class Staff {
  constructor(
    private userService: UserService = new UserService(),
    private laporanService: LaporanService = new LaporanService(),
    private utilService: UtilService = new UtilService()
  ) {}
  @Slash({ description: 'info' })
  @Guild(new EnvService().get('GUILD_ID') ?? '')
  async info(
    @SlashOption({
      name: 'user',
      type: ApplicationCommandOptionType.Mentionable,
      description: 'User'
    })
    user: GuildMember | undefined,
    interaction: CommandInteraction
  ) {
    if (
      this.userService.userHasRole('admin', interaction.user.id, interaction)
    ) {
      await this.userService.checkUserExistByDiscordId(
        interaction.user.id,
        interaction.user.globalName ?? '',
        interaction.user.displayName,
        interaction.user.username
      );
      if (user == undefined) {
        return await interaction.reply('Tolong Tag User!');
      }
      const userData = await this.userService.getByDiscordId(user.id);
      if (userData == undefined) {
        return await interaction.reply('User Belum Terdaftar!');
      }
      const data = await this.laporanService.getLaporan(userData.id);
      let totalPay = 0;
      for (const item of data) {
        totalPay += parseInt(item.laporanJob.PaymentAmount?.value ?? '0');
      }
      return await interaction.reply(`
\`\`\`
User: ${user.user.displayName || user.user.username || user.user.globalName}
Jobs: ${[
        ...new Set(
          data.map((laporan) => {
            return laporan.laporanJob.nama;
          })
        )
      ].join(', ')}
Total: ${this.utilService.formatCurrency(totalPay)}
Lis Laporan:
${data
  .map((laporan) => {
    return `${laporan.series.nama} - Chapter ${laporan.chapter} - ${
      laporan.laporanJob.nama
    } - ${this.utilService.formatCurrency(
      parseInt(laporan.laporanJob.PaymentAmount?.value ?? '0')
    )}`;
  })
  .join('\n')}
Payment Method: [${
        userData.paymentMethod == '' ? userData.paymentMethod : 'None'
      }] ${
        userData.paymentCredential == '' ? userData.paymentCredential : 'None'
      }
\`\`\`
`);
    }
    if (
      this.userService.userHasRole('staff', interaction.user.id, interaction)
    ) {
      await this.userService.checkUserExistByDiscordId(
        interaction.user.id,
        interaction.user.globalName ?? '',
        interaction.user.displayName,
        interaction.user.username
      );
      const userData = await this.userService.getByDiscordId(
        interaction.user.id
      );
      if (userData == undefined) {
        return await interaction.reply('User Belum Terdaftar!');
      }
      const data = await this.laporanService.getLaporan(userData.id);
      let totalPay = 0;
      for (const item of data) {
        totalPay += parseInt(item.laporanJob.PaymentAmount?.value ?? '0');
      }
      await interaction.reply('Info Sudah Terkirim');
      return await interaction.user.send(`
\`\`\`
User: ${
        interaction.user.displayName ||
        interaction.user.username ||
        interaction.user.globalName
      }
Jobs: ${[
        ...new Set(
          data.map((laporan) => {
            return laporan.laporanJob.nama;
          })
        )
      ].join(', ')}
Total: ${this.utilService.formatCurrency(totalPay)}
Lis Laporan:
${data
  .map((laporan) => {
    return `${laporan.series.nama} - Chapter ${laporan.chapter} - ${
      laporan.laporanJob.nama
    } - ${this.utilService.formatCurrency(
      parseInt(laporan.laporanJob.PaymentAmount?.value ?? '0')
    )}`;
  })
  .join('\n')}
Payment Method: [${
        userData.paymentMethod == '' ? userData.paymentMethod : 'None'
      }] ${
        userData.paymentCredential == '' ? userData.paymentCredential : 'None'
      }
\`\`\`
`);
    }
    return await interaction.reply('Lu Sapa Anj!');
  }
  @Slash({ description: 'edit_payment' })
  @Guild(new EnvService().get('GUILD_ID') ?? '')
  async edit_payment(
    @SlashOption({
      name: 'payment_credential',
      required: true,
      type: ApplicationCommandOptionType.String,
      description: 'Payment Credential -> XXXX XXXX XXXX XXXX'
    })
    paymentCredential: string | undefined,
    @SlashOption({
      name: 'payment_method',
      required: true,
      type: ApplicationCommandOptionType.String,
      description: 'Payment Method -> paypal, dana, ovo, gopay, linkaja, etc'
    })
    paymentMethod: string | undefined,
    interaction: CommandInteraction
  ) {
    if (
      this.userService.userHasRole('admin', interaction.user.id, interaction) ||
      this.userService.userHasRole('staff', interaction.user.id, interaction)
    ) {
      await this.userService.checkUserExistByDiscordId(
        interaction.user.id,
        interaction.user.globalName ?? '',
        interaction.user.displayName,
        interaction.user.username
      );
      if (paymentCredential == undefined || paymentMethod == undefined) {
        return await interaction.reply('Tolong Isi Semua!');
      }
      await this.userService.updatePaymentCredential(
        interaction.user.id,
        paymentCredential,
        paymentMethod
      );
      return await interaction.reply('Sukses Update!');
    }
    return await interaction.reply('Lu Sapa Anj!');
  }
}
