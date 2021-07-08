const {
    MessageEmbed,
    Client,
} = require('discord.js');


const Discord = require('discord.js');
const UserIDCount = new Set();
const UsedPlan = new Set();


module.exports = {
    name: "plan",
    run: async (client, message, PREFIX) => {

        let args = message.content.substring(PREFIX.length).split(" ");

        let time = args.slice(1).join(" ");

        let avatar = message.author.displayAvatarURL({
            format: 'png',
            dynamic: true
        })

        if (!time) return message.channel.send('Time missing!');

        var i = 0;

        let pugsembed = new MessageEmbed()
            .setTitle(`${message.author.username}'s unoffical pugs`)
            .setDescription('React below to enter the Pugs')
            .addField('Time', time)
            .setFooter(`${message.author.username}`, avatar)
            .setTimestamp()
            .setColor('GREEN')

        UsedPlan.add(message.author.id);

        message.channel.send(pugsembed)
            .then(m => {
                m.react('✅');
                m.react('❌');
                m.react('🧨');

                const filter = (reaction, user) => reaction.emoji.name === '✅'; // && user.id === message.author.id;
                const collector = m.createReactionCollector(filter, {
                    max: 100,
                });

                collector.on('collect', async (reaction, user) => {

                    if (user.id === "830087071413567519") return;
                    reaction.users.remove(user.id);
                    if (UserIDCount.has(user.id)) return;

                    i = i + 1 * 1

                    const editpugs = new MessageEmbed()
                        .setTitle(`${message.author.username}'s unoffical pugs`)
                        .setDescription(`Available users : ${i}`)
                        .addField('Time', time)
                        .setTimestamp()
                        .setColor('GREEN')

                    UserIDCount.add(user.id);
                    m.edit(editpugs);

                    //One hour in milliseconds = 3,600,000!

                });

                const crossfilter = (reaction, user) => reaction.emoji.name === '❌';
                const crosscollector = m.createReactionCollector(crossfilter, {
                    max: 100,
                });

                crosscollector.on('collect', async (reaction, user) => {

                    if (user.id === "830087071413567519") return;
                    reaction.users.remove(user.id);
                    if (!UserIDCount.has(user.id)) return;

                    i = i - 1 * 1

                    if (i < 0) {

                        i = 0;
                    }

                    const editpugs = new MessageEmbed()
                        .setTitle(`${message.author.username}'s unoffical pugs`)
                        .setDescription(`Available users : ${i}`)
                        .addField('Time', time)
                        .setTimestamp()
                        .setColor('GREEN')

                    UserIDCount.delete(user.id);
                    m.edit(editpugs);

                });


                const crashfilter = (reaction, user) => reaction.emoji.name === '🧨';
                const crashcollector = m.createReactionCollector(crashfilter, {
                    max: 100,
                });

                crashcollector.on('collect', async (reaction, user) => {

                    if (user.id === "830087071413567519") return;

                    await reaction.users.remove(user.id);

                    if (!user.id == message.author.id) {

                        return message.channel.send('Only the creator of the Pug can collaps this message');

                    } else {

                        message.channel.send('Closing...');

                    }

                });

            })
            .catch(err => console.error(err));

    }
}