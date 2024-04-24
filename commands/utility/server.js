const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Mostra informações do servidor"),
  async execute(interaction) {
    const serverName = interaction.guild.name;
    const totalMembers = interaction.guild.memberCount;
    const serverIconURL = interaction.guild.iconURL({ dynamic: true, size: 256 });

    const embedMessage = {
      color: 0x0099ff,
      title: "Informações do Servidor",
      thumbnail: {
        url: serverIconURL,
      },
      fields: [
        {
          name: "Nome do Servidor",
          value: serverName,
        },
        {
          name: "Total de Membros",
          value: totalMembers.toString(),
        },
      ],
      timestamp: new Date(),
    };

    await interaction.reply({ embeds: [embedMessage], ephemeral: true });
  },
};
