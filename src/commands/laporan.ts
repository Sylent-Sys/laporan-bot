import type { CommandInteraction, Role } from "discord.js";
import { ApplicationCommandOptionType } from "discord.js";
import { Discord, Guild, Slash, SlashChoice, SlashOption } from "discordx";
import { LaporanStatus } from "@prisma/client";
import EnvService from "../services/env.service";
import UserService from "../services/user.service";
import LaporanService from "../services/laporan.service";

@Discord()
export class Laporan {
    constructor(private userService: UserService = new UserService(), private laporanService: LaporanService = new LaporanService()) { }
    @Slash({ description: "lapor" })
    @Guild(EnvService.get('GUILD_ID') as string)
    async lapor(
        @SlashOption({
            name: "tag_series",
            required: true,
            type: ApplicationCommandOptionType.Role,
            description: "Tag Series",
        }) tagSeries: Role,
        @SlashOption({
            name: "chapter",
            required: true,
            type: ApplicationCommandOptionType.String,
            description: "Chapter",
        }) chapter: string,
        @SlashOption({
            name: "jobs",
            required: true,
            type: ApplicationCommandOptionType.String,
            description: "Job",
        }) jobs: string,
        @SlashChoice({
            name: "Done",
            value: LaporanStatus.DONE
        }, {
            name: "Hold",
            value: LaporanStatus.HOLD
        }, {
            name: "Proses",
            value: LaporanStatus.PROSES
        })
        @SlashOption({
            name: "status",
            required: true,
            type: ApplicationCommandOptionType.String,
            description: "Status",
        }) status: string,
        interaction: CommandInteraction
    ) {
        if (await this.userService.userHasRole('staff', interaction.user.id, interaction) == true) {
            await this.userService.checkUserExistByDiscordId(interaction.user.id)
            await this.laporanService.add({
                tagSeries,
                jobs,
                chapter,
                discordId: interaction.user.id,
                status: status as LaporanStatus
            })
            return await interaction.reply("Sukses Membuat Laporan");
        }
        return await interaction.reply("Lu Sapa Anj!");
    }
}