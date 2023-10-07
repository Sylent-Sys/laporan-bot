import type { CommandInteraction, Role } from "discord.js";
import { ApplicationCommandOptionType } from "discord.js";
import { Discord, Slash, SlashChoice, SlashOption } from "discordx";

@Discord()
export class Laporan {
    @Slash({ description: "lapor" })
    lapor(
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
            description: "Tag Series",
        }) chapter: string,
        @SlashOption({
            name: "jobs",
            required: true,
            type: ApplicationCommandOptionType.String,
            description: "Tag Series",
        }) jobs: string,
        @SlashOption({
            name: "status",
            required: true,
            type: ApplicationCommandOptionType.String,
            description: "Tag Series",
        }) status: string,
        interaction: CommandInteraction
    ): void {
        console.log(tagSeries);
        interaction.reply("sadsa");
    }
}