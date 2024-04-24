const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("delete")
    .setDescription("Deleta mensagens no chat")
    .addIntegerOption((option) =>
      option
        .setName("quantidade")
        .setDescription("Quantidade de mensagens para deletar")
        .setRequired(true)
    ),
  async execute(interaction) {
    if (!interaction.member.permissions.has("ADMINISTRATOR")) {
      return interaction.reply({
        content: "Você não tem permissão para executar este comando.",
        ephemeral: true,
      });
    }

    const quantidade = interaction.options.getInteger("quantidade");

    if (quantidade <= 0 || quantidade > 99) {
      return interaction.reply({
        content:
          "Você pode deletar no mínimo 1 e no máximo 99 mensagens por vez.",
        ephemeral: true,
      });
    }

    try {
      const messages = await interaction.channel.bulkDelete(quantidade, true);
      interaction
        .reply({
          content: `Deletadas ${messages.size} mensagens.`,
          ephemeral: true,
        })
        .then((msg) => setTimeout(() => msg.delete(), 5000));
    } catch (error) {
      console.error("Erro ao deletar mensagens:", error);
      interaction.reply({
        content: "Ocorreu um erro ao deletar as mensagens.",
        ephemeral: true,
      });
    }
  },
};
