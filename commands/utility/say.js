const { SlashCommandBuilder, Permissions } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Repete uma mensagem em um canal específico")
    .addStringOption((option) =>
      option.setName("message").setDescription("Mensagem").setRequired(true)
    )
    .addChannelOption((option) =>
      option.setName("channel").setDescription("Canal").setRequired(true)
    ),
  async execute(interaction) {
    const allowedRole = "1233092008168652874";

    if (!interaction.member.roles.cache.has(allowedRole)) {
      return interaction.reply({
        content: "You no have permissions to use this command.",
        ephemeral: true,
      });
    }

    const message = interaction.options.getString("message");
    const channel = interaction.options.getChannel("channel");

    await channel.send(message);

    await interaction.reply({
      content: "Mensagem enviada com sucesso!",
      ephemeral: true,
    });
  },
};
