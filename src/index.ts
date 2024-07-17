import { Bot, Context } from "grammy";
import { EmojiFlavor, emojiParser } from "@grammyjs/emoji";

type MyContext = EmojiFlavor<Context>;

const { TG_API_TOKEN } = process.env;

if (!TG_API_TOKEN) throw new Error("Provide your Telegram bot token!");

const bot = new Bot<MyContext>(TG_API_TOKEN);

bot.use(emojiParser());

bot.command("hello", async (ctx) => {
  const msg = ctx.emoji`Hello to you too ${"weary_cat"}!`;
  await ctx.reply(msg);
});

bot.command("help", async (ctx) => {
  const msg = ctx.emoji`I'll happily help you ${"index_pointing_at_the_viewer_light_skin_tone"}`;
  await ctx.reply(msg);
});

bot.start({
  allowed_updates: ["message", "message_reaction", "message_reaction_count"],
});
