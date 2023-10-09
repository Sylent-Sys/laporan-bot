import { LaporanStatus } from '@prisma/client';
import PrismaService from './prisma.service.js';
import UserService from './user.service.js';
import { Role } from 'discord.js';

export default class LaporanService {
  constructor(
    private prismaService: PrismaService = new PrismaService(),
    private userService: UserService = new UserService()
  ) {}
  async add({
    jobs,
    tagSeries,
    discordId,
    chapter,
    status
  }: {
    tagSeries: Role;
    jobs: string;
    discordId: string;
    chapter: string;
    status: LaporanStatus;
  }) {
    const laporanJob = await this.prismaService.laporanJob.findFirst({
      where: {
        nama: jobs
      }
    });
    if (laporanJob == undefined) {
      return false;
    }
    const series = await this.prismaService.series.upsert({
      where: {
        discordId: tagSeries.id
      },
      create: {
        discordId: tagSeries.id,
        nama: tagSeries.name,
        singkatan: tagSeries.name
      },
      update: {}
    });
    const user = await this.userService.getByDiscordId(discordId);
    await this.prismaService.laporan.create({
      data: {
        chapter,
        status,
        laporanJobId: laporanJob?.id ?? 0,
        seriesId: series?.id ?? 0,
        userId: user?.id ?? 0
      }
    });
    return true;
  }
  async getLaporan(userId: bigint | number) {
    const laporan = await this.prismaService.laporan.findMany({
      where: {
        userId,
        paymentDone: false,
        status: 'DONE'
      },
      include: {
        series: true,
        laporanJob: {
          include: {
            PaymentAmount: true
          }
        }
      }
    });
    return laporan;
  }
}
