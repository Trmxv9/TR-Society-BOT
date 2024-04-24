const {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  DiscordAPIError,
  Collection,
} = require("discord.js");
const fs = require("fs");
const path = require("path");
const { token, clientId } = require("./config.json");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
  ],
});

client.commands = new Collection();

const commandFiles = fs
  .readdirSync(path.join(__dirname, "commands", "utility"))
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(path.join(__dirname, "commands", "utility", file));
  client.commands.set(command.data.name, command);
}

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

const rest = new REST({ version: "10" }).setToken(token);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    const commands = client.commands.map((command) => command.data.toJSON());

    await rest.put(Routes.applicationCommands(clientId), { body: commands });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    if (error instanceof DiscordAPIError && error.errors?.application_id) {
      console.error(
        `Invalid Form Body: ${error.errors.application_id.value} is not a snowflake`
      );
    } else {
      console.error(error);
    }
  }
})();

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

client.login(token);
