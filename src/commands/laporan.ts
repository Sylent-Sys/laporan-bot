import type { CommandInteraction, Role } from 'discord.js';
import { ApplicationCommandOptionType } from 'discord.js';
import { Discord, Guild, Slash, SlashChoice, SlashOption } from 'discordx';
import { LaporanStatus } from '@prisma/client';
import EnvService from '../services/env.service.js';
import UserService from '../services/user.service.js';
import LaporanService from '../services/laporan.service.js';

@Discord()
export class Laporan {
  constructor(
    private userService: UserService = new UserService(),
    private laporanService: LaporanService = new LaporanService()
  ) {}
  @Slash({ description: 'lapor' })
  @Guild(new EnvService().get('GUILD_ID') ?? '')
  async lapor(
    @SlashOption({
      name: 'tag_series',
      required: true,
      type: ApplicationCommandOptionType.Role,
      description: 'Tag Series'
    })
    tagSeries: Role,
    @SlashOption({
      name: 'chapter',
      required: true,
      type: ApplicationCommandOptionType.Integer,
      description: 'Chapter'
    })
    chapter: number,
    @SlashOption({
      name: 'jobs',
      required: true,
      type: ApplicationCommandOptionType.String,
      description: 'Job'
    })
    jobs: string,
    @SlashChoice(
      {
        name: 'Done',
        value: LaporanStatus.DONE
      },
      {
        name: 'Hold',
        value: LaporanStatus.HOLD
      },
      {
        name: 'Proses',
        value: LaporanStatus.PROSES
      }
    )
    @SlashOption({
      name: 'status',
      required: true,
      type: ApplicationCommandOptionType.String,
      description: 'Status'
    })
    status: string,
    interaction: CommandInteraction
  ) {
    if (
      this.userService.userHasRole('staff', interaction.user.id, interaction)
    ) {
      await this.userService.checkUserExistByDiscordId(
        interaction.user.id,
        interaction.user.globalName ?? '',
        interaction.user.displayName,
        interaction.user.username
      );
      if (
        !(await this.laporanService.add({
          tagSeries,
          jobs,
          chapter: chapter.toString(),
          discordId: interaction.user.id,
          status: status as LaporanStatus
        }))
      ) {
        return await interaction.reply('Job yang anda tulis tidak terdaftar');
      }
      return await interaction.reply('Laporan berhasil disimpan');
    }
    return await interaction.reply('Lu Sapa Anj!');
  }
}
