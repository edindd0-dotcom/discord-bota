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
  if (!message.content.startsWith('+dmduyuru')) return;

  if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator))
    return message.reply("Admin değilsin.");

  const mesaj = message.content.slice(10).trim();
  if (!mesaj) return message.reply("Mesaj yazmalısın.");

  const members = await message.guild.members.fetch();

  let sayac = 0;

  for (const [id, member] of members) {
    if (!member.user.bot) {
      try {
        await member.send(mesaj);
        sayac++;
        await new Promise(r => setTimeout(r, 1500)); // 1.5 saniye gecikme
      } catch {}
    }
  }

  message.channel.send(`✅ ${sayac} kişiye duyuru gönderildi.`);
});

client.login(process.env.TOKEN);
