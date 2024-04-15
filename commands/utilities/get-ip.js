const { SlashCommandBuilder, EmbedBuilder, Colors} = require('discord.js');

let successEmbed = new EmbedBuilder()
    .setColor(Colors.Green)
    .setTitle("Here's my IP!")
    .setTimestamp()
    .setFooter({ text: "Request from Unknown"})

module.exports = {
    data: new SlashCommandBuilder()
        .setName('get-ip')
        .setDescription('Gets your IP!'),
    async execute(interaction) {
        const url = "http://ipv4.icanhazip.com";
        const settings = { method: "GET"};
        //await interaction.reply({text:"Hold on... Fetching...", ephemeral:true});

        await interaction.deferReply({ephemeral:true})
        await fetch(url, settings).then(res => res.text().then(async (ip) => {
            await successEmbed.setDescription("My IP is: " + ip)
                .setFooter({text:`You're welcome, ${interaction.user.username}.`, iconURL: interaction.user.avatarURL()})
            await interaction.editReply({embeds: [successEmbed]});
        }))
    },
};