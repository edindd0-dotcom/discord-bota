const { Client, GatewayIntentBits, PermissionsBitField } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once('ready', () => {
  console.log(`${client.user.tag} aktif!`);
});

client.on('messageCreate', async message => {
  if (!message.content.startsWith('!dmduyuru')) return;
  if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) 
    return message.reply("Admin değilsin.");

  const mesaj = message.content.split(' ').slice(1).join(' ');
  if (!mesaj) return message.reply("Mesaj yazmalısın.");

  const members = await message.guild.members.fetch();

  for (const [id, member] of members) {
    if (!member.user.bot) {
      try {
        await member.send(mesaj);
        await new Promise(r => setTimeout(r, 1500));
      } catch {}
    }
  }

  message.channel.send("Duyuru gönderildi.");
});

client.login(process.env.TOKEN);
