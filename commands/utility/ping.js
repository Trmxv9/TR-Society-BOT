const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Mostra informações de ping"),
  async execute(interaction) {
    const clientPing = Math.round(interaction.client.ws.ping);
    const apiLatency = Date.now() - interaction.createdTimestamp;
    const userPermissions = interaction.member.permissions.toArray().join(", ");

    const embedMessage = {
      color: 0x0099ff,
      title: "Informações de Ping",
      fields: [
        {
          name: "Ping do Bot",
          value: `${clientPing}ms`,
        },
        {
          name: "Latência da API",
          value: `${apiLatency}ms`,
        },
        {
          name: "Permissões do Usuário",
          value: userPermissions || "Sem permissões",
        },
      ],
      timestamp: new Date(),
    };

    await interaction.reply({ embeds: [embedMessage], ephemeral: true });
  },
};
