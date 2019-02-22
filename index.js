const Discord = require('discord.js');
const prefix = '***';
var client = new Discord.Client();


client.on('ready', () => {
    console.log(client.user.username + ' is on');
	client.user.setActivity('cloudmatic.atshop.io', {type: "PLAYING"});
});

client.on('message', message => {

    if(message.content.startsWith(prefix + 'dm')) {

        let messageArray = message.content.split(" ");
        let args = messageArray.slice(1);
        if(message.channel.type === "dm") {
            return;
        }
        
        if(!message.member.hasPermission("ADMINISTRATOR")) {
			return message.channel.send('No perms :*');
		}
        
        if(!args.join(" ")) {
            return message.channel.send('Include a message to send');
        }

        message.guild.members.forEach(member => {
            if (member.id !== client.user.id) {
                try {
                    member.send(args.join(" "));
                } catch (e) {
                    console.log('Someone cannot be dmed sorry.')
                }
            }
        });

        message.channel.send('Message `' + args.join(" ") + '` was successfully sent to all members in this discord.').catch(() => console.log('Someone have his DM locked or he blocked me L'));
    }
});

client.login(process.env.BOT_TOKEN);
