"use server"

import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";
import { role } from "@stream-io/video-react-sdk";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY ;
const apiToken = process.env.STREAM_TOKEN;

export const tokenProvider = async() => {
    const user = await currentUser();

    if(!apiKey || !apiToken || !user)   throw new Error("Info missing !");

    const streamClient = new StreamClient(apiKey, apiToken);

    const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;

    const issued = Math.floor(Date.now() / 1000) - 60 ;

    const token = streamClient.createToken(user?.id, exp, issued);

    return token;

}