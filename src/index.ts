import { Bot } from "grammy";

const { TG_API_TOKEN } = process.env;

if (!TG_API_TOKEN) throw new Error("Provide a Telegram token!");

const bot = new Bot(TG_API_TOKEN);

bot.on("message", (ctx) => {
  ctx.reply(`Your message says ${JSON.stringify(ctx.message.text)}`);
});

bot.start();
