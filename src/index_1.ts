import axios from "axios";

const { TG_API_TOKEN } = process.env;

if (!TG_API_TOKEN) {
  console.error("Can't find token for Telegram API");
  throw new Error("Can't find token for Telegram API");
}

const API_ENDPOINT = `https://api.telegram.org/bot${TG_API_TOKEN}/`;

const getMe = "getMe";

interface GetMeResponse {
  ok: boolean;
  result: {
    [key: string]: unknown;
  };
}

const instance = axios.create({
  baseURL: API_ENDPOINT,
});

const response = await instance.get<GetMeResponse>(getMe);
const { data, status, headers } = response;

console.log({ data, status, headers });
