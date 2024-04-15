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

        //Fetches information about bot
        await interaction.client.application.fetch();

        const url = "http://ipv4.icanhazip.com";
        const settings = { method: "GET"};
        if(interaction.client.application.owner === interaction.user){
            await interaction.deferReply({ephemeral:true})
            await fetch(url, settings).then(res => res.text().then(async (ip) => {
                await successEmbed.setDescription("My IP is: " + ip)
                    .setFooter({text:`You're welcome, ${interaction.user.username}.`, iconURL: interaction.user.avatarURL()})
                await interaction.editReply({embeds: [successEmbed]});
            }))
        }
        else{
            await interaction.deferReply({ephemeral:true})
            await fetch(url, settings).then(res => res.text().then(async (ip) => {
                await successEmbed.setDescription("You're not the owner of this bot, so I cannot give you the IP.")
                    .setColor(Colors.Red)
                    .setTitle("Oops!")
                    .setFooter({text:`You're welcome, ${interaction.user.username}.`, iconURL: interaction.user.avatarURL()})
                await interaction.editReply({embeds: [successEmbed]});
            }))
        }

    },
};