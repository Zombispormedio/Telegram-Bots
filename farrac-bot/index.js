const TelegramBot = require("node-telegram-bot-api");
const config = require("./farrac.config");

const {welcomeMessages} = require ("./resources/welcome-messages");

const { FarrantController } = require("./controllers");

const database = require("./database");

const bot = new TelegramBot(config.botToken, { polling: true });

database.connect(err => {
  if (err) {
    console.error(
      `It's not possible to connect with database because: ${err.message}`
    );
    return process.exit();
  }
  console.log("Database connected!");
});

bot.on('message', (msg) => {
  console.log(msg);

});


bot.onText(/\/farrant@Farrac_bot/i, msg => FarrantController.farrant(bot, msg));

bot.onText(/\/add_farrant@Farrac_bot/i, msg => FarrantController.addFarrant(bot, msg));

bot.onText(/\/delete_farrant@Farrac_bot/i, msg => FarrantController.deleteFarrant(bot, msg));

bot.onText(/\/delete_all_farrants@Farrac_bot/i, msg => FarrantController.deleteAllFarrants(bot, msg));


bot.on("polling_error", error => {
  console.log(error); // => 'EFATAL'
});


bot.on("pinned_message", msg => {
  bot.sendMessage(msg.chat.id, "¿Desde cuándo fijamos mensajes aquí?");
});

bot.on("new_chat_members", msg => {
  bot.sendMessage(msg.chat.id,  welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)]);
});


bot.on("left_chat_member", msg => {
  bot.sendMessage(msg.chat.id, "Me pregunto por qué se habrá ido...");
});

bot.on("new_chat_title", msg => {
  bot.sendMessage(msg.chat.id, "El de antes era mejor.");
});

bot.on("new_chat_photo", msg => {
  bot.sendMessage(msg.chat.id, "La de antes estaba mejor.");
});


process.on("SIGINT", () => {
  database.close();
});
