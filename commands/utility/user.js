const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Mostra informações do usuário")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Selecione um usuário")
        .setRequired(true)
    ),
  async execute(interaction) {
    const targetUser = interaction.options.getUser("user") || interaction.user;
    const userCreatedAt = targetUser.createdAt.toLocaleDateString("pt-BR", {
      dateStyle: "full",
    });
    const userJoinedAt = targetUser.joinedAt
      ? targetUser.joinedAt.toLocaleDateString("pt-BR", { dateStyle: "full" })
      : "Não disponível";
    const avatarURL = targetUser.displayAvatarURL({
      format: "png",
      dynamic: true,
      size: 512,
    });

    let status = "Offline";
    if (targetUser.presence && targetUser.presence.status) {
      switch (targetUser.presence.status) {
        case "online":
          status = "Online";
          break;
        case "idle":
          status = "Ausente";
          break;
        case "dnd":
          status = "Não Perturbe";
          break;
      }
    }

    const embedMessage = {
      color: 65280,
      title: "Informações do Usuário",
      thumbnail: {
        url: avatarURL,
      },
      fields: [
        {
          name: "TAG",
          value: targetUser.tag,
          inline: true,
        },
        {
          name: "ID",
          value: targetUser.id,
          inline: true,
        },
        {
          name: "Data de Criação",
          value: userCreatedAt,
          inline: false,
        },
        {
          name: "Status",
          value: status,
          inline: true,
        },
      ],
    };

    await interaction.reply({ embeds: [embedMessage] });
  },
};
