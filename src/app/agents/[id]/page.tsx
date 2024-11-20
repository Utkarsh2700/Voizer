"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Retell from "retell-sdk";
import { EnglishBots, SpanishBots, FrenchBots } from "../../../constants/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {};

type ResponseEngine = {
  llm_id?: string | undefined;
  type?: string | undefined;
};

type AgentListProps = {
  agent_id: string;
  agent_name?: string | null | undefined;
  interruption_sensitivity?: number | undefined;
  language?: string | undefined;
  last_modification_timestamp?: number | undefined;
  //   llm_websocket_url: string;
  max_call_duration_ms?: number | undefined;
  opt_out_sensitive_data_storage?: boolean | undefined;
  response_engine: ResponseEngine;
  voice_id: string;
  voicemail_detection_timeout_ms?: number | undefined;
};

const page = (props: Props) => {
  const params = useParams();
  const agentId = params.id;
  //   console.log("agentId", agentId);

  const [agent, setAgent] = useState<AgentListProps>();

  const client = new Retell({
    apiKey: `${process.env.NEXT_PUBLIC_API_KEY}`,
  });

  async function main() {
    const agentResponse = await client.agent.retrieve(
      //   "16b980523634a6dc504898cda492e939"
      `${agentId}`
    );
    console.log(agentResponse);
    setAgent(agentResponse);
  }

  useEffect(() => {
    main();
  }, []);

  return (
    <>
      <header className="bg-[#5F4EE1] text-white flex items-center justify-center py-7 px-0 text-[36px] font-semibold  h-[44px] w-[1920px] ">
        {agent?.agent_name}
      </header>
      <div className="flex w-[1920px]">
        <aside className="flex w-[484px] shrink-0">
          <div className="icons pt-[10px] border-r border-[#000000]/50 h-[1033px]">
            <ul className="flex flex-col items-center space-y-8 mx-4">
              <li>
                <img src="/Group.svg" alt="" />
              </li>
              <li>
                <img src="/Group (1).svg" alt="" />
              </li>
              <li>
                <img src="/ic_round-settings.svg" alt="" />
              </li>
              <li>
                <img src="/ic_round-tag.svg" alt="" />
              </li>
            </ul>
          </div>
          <div className="flex-col flex items-center voices w-full">
            <h4 className="text-center text-[24px] font-semibold m-[10px]">
              Select Voice
            </h4>
            <div className="search w-[305px] h-[46px] border-[#000000]/50 border rounded-[10px] flex items-center justify-start m-[10px]">
              <img
                className="h-[24px] px-2"
                src="/iconamoon_search-bold.svg"
                alt=""
              />
              <input
                type="text"
                placeholder="Search Voice/Languge"
                className="text-[16px] font-medium text-[#000000]/50 outline-none"
              ></input>
            </div>
            <>
              <div className=" flex items-center m-2">
                <hr className="border-[#000000]/50 border-[2px] w-[125px]" />
                <p className="px-2 text-[#000000]/50 text-[16px] font-semibold">
                  English
                </p>
                <hr className="border-[#000000]/50 border-[2px] w-[125px]" />
              </div>
              <ul className="space-y-2 mx-4">
                {EnglishBots.map((eng) => (
                  <div
                    className="flex justify-between items-center bg-[#D7D2F7]/50 h-[48px] w-[317px] rounded-[10px] shrink-0"
                    key={eng.id}
                  >
                    <li className="text-[24px] font-semibold mx-4">
                      {eng.name}
                    </li>
                    <li className="text-[12px] font-medium mx-4 bg-[#5F4EE1] w-[68px] h-[23px] shrink-0 rounded-[10px] flex items-center justify-center text-white">
                      {eng.gender}
                    </li>
                  </div>
                ))}
              </ul>
              <div className=" flex items-center m-2">
                <hr className="border-[#000000]/50 border-[2px] w-[125px]" />
                <p className="px-2 text-[#000000]/50 text-[16px] font-semibold">
                  Spanish
                </p>
                <hr className="border-[#000000]/50 border-[2px] w-[125px]" />
              </div>
              <ul className="space-y-2 mx-4">
                {SpanishBots.map((esp) => (
                  <div
                    className="flex justify-between items-center bg-[#D7D2F7]/50 h-[48px] w-[317px] rounded-[10px] shrink-0"
                    key={esp.id}
                  >
                    <li className="text-[24px] font-semibold mx-4">
                      {esp.name}
                    </li>
                    <li className="text-[12px] font-medium mx-4 bg-[#5F4EE1] w-[68px] h-[23px] shrink-0 rounded-[10px] flex items-center justify-center text-white">
                      {esp.gender}
                    </li>
                  </div>
                ))}
              </ul>
              <div className=" flex items-center m-2">
                <hr className="border-[#000000]/50 border-[2px] w-[125px]" />
                <p className="px-2 text-[#000000]/50 text-[16px] font-semibold">
                  French
                </p>
                <hr className="border-[#000000]/50 border-[2px] w-[125px]" />
              </div>
              <ul className="space-y-2 mx-4">
                {FrenchBots.map((fr) => (
                  <div
                    className="flex justify-between items-center bg-[#D7D2F7]/50 h-[48px] w-[317px] rounded-[10px] shrink-0"
                    key={fr.id}
                  >
                    <li className="text-[24px] font-semibold mx-4">
                      {fr.name}
                    </li>
                    <li className="text-[12px] font-medium mx-4 bg-[#5F4EE1] w-[68px] h-[23px] shrink-0 rounded-[10px] flex items-center justify-center text-white">
                      {fr.gender}
                    </li>
                  </div>
                ))}
              </ul>
            </>
          </div>
        </aside>
        <main className="bg-[#F0F1F5] flex">
          <form
            className="flex flex-col items-center space-y-6 w-[991px] shrink-0 "
            action=""
            method="post"
          >
            <div className="flex-col flex">
              <label className="text-[32px] font-semibold" htmlFor="Name">
                Name
              </label>
              <input
                className="w-[869px] h-[70px] shrink-0 rounded-[15px] border-[#000000]/50 border outline-none"
                type="text"
                name="Name"
                id=""
              />
            </div>
            <div className="flex flex-col">
              <label className="text-[32px] font-semibold" htmlFor="Prompt">
                Prompt
              </label>
              <input
                type="text"
                name="Prompt"
                className="shrink-0 w-[869px] h-[613px] rounded-[25px] outline-none border border-[#000000]/50"
                id=""
              />
            </div>
          </form>
          <div className="bg-white w-[445px] pt-4 flex justify-center">
            <Tabs defaultValue="Test Call" className="w-[400px]">
              <TabsList className="w-full">
                <TabsTrigger
                  className="text-[24px] font-medium  bg-[#5F4EE1]/25 w-full"
                  value="Test Call"
                >
                  Test Call
                </TabsTrigger>
                <TabsTrigger
                  className="text-[24px] font-medium bg-[#5F4EE1]/25 w-full"
                  value="Test Chat"
                >
                  Test Chat
                </TabsTrigger>
              </TabsList>
              <TabsContent value="Test Call">
                <form className="space-y-6" action="" method="post">
                  <select
                    className="w-[376px] h-[51px] mt-2 text-[20px] font-medium border outline-none bg-[#5F4EE1]/25 rounded-[10px]"
                    name="numbers"
                    id="number"
                  >
                    <option
                      className="text-[20px] font-medium h-[51px] w-[376px] rounded-[10px] shrink-0 bg-[#5F4EE1]/25"
                      value="Select Phone Number"
                    >
                      Select Phone Number
                    </option>
                  </select>
                  <input
                    placeholder="Enter Name"
                    className="text-[20px] font-medium h-[51px] w-[376px] rounded-[10px] shrink-0 bg-[#5F4EE1]/25 px-2"
                    type="text"
                    name="Enter Name"
                    id=""
                  />
                  <input
                    placeholder="Enter Phone Number"
                    className="text-[20px] font-medium h-[51px] w-[376px] rounded-[10px] shrink-0 bg-[#5F4EE1]/25 px-2"
                    type="text"
                    name="Enter Phone Number"
                    id=""
                  />
                  <button
                    className="text-[24px] font-semibold text-white h-[51px] w-[376px] flex-shrink-0 rounded-[10px] border outline-none bg-[#5F4EE1]"
                    type="submit"
                  >
                    Call Me
                  </button>
                </form>
              </TabsContent>
              <TabsContent value="Test Chat">
                Change your password here.
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </>
  );
};

export default page;
