import { Bot } from "grammy";

let messageCount = 0;

const { TG_API_TOKEN } = process.env;

if (!TG_API_TOKEN) throw new Error("Provide a Telegram token!");

const bot = new Bot(TG_API_TOKEN);

bot.on("message:photo", (ctx) =>
  ctx.reply("I'll pretend I didn't see anything")
);

bot.on("message_reaction", async (ctx) => {
  try {
    await bot.api.sendMessage(
      ctx.chatId,
      `You reacted ${ctx.messageReaction.new_reaction
        .map((r) => ("emoji" in r ? r.emoji : "x"))
        .join(", ")} to`,
      {
        reply_parameters: {
          message_id: ctx.messageReaction.message_id,
        },
      }
    );
  } catch {
    console.error("Sorry");
  }
});

bot.command("hello", (ctx) => ctx.reply("Hello to you too"));

bot.on("message", async (ctx) => {
  messageCount++;
  await ctx.react("👀");
  await bot.api.sendMessage(
    ctx.chatId,
    `
    <pre>${messageCount}</pre> <b>${ctx.message.from.first_name}</b> says: ${ctx.message.text}
    `,
    {
      parse_mode: "HTML",
    }
  );
});

bot.start({
  allowed_updates: ["message", "message_reaction", "message_reaction_count"],
});
