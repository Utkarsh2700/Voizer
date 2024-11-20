"use client";
import React, { useEffect, useState } from "react";
import Retell from "retell-sdk";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";

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

const client = new Retell({
  apiKey: `${process.env.NEXT_PUBLIC_API_KEY}`,
});

const page = (props: Props) => {
  let agentResponses;
  const [agents, setAgents] = useState<AgentListProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const agentsPerPage = 10;
  const router = useRouter();
  async function main() {
    try {
      agentResponses = await client.agent.list();
      //   console.log(agentResponses);
      setAgents(agentResponses);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    main();
  }, []);

  const indexOfLastAgent = currentPage * agentsPerPage;
  const indexofFirstAgent = indexOfLastAgent - agentsPerPage;
  const currentAgents = agents.slice(indexofFirstAgent, indexOfLastAgent);

  const handlePageChange = (pageNumber: number) => {
    // console.log(
    //   "Math.ceil(agents.length / agentsPerPage)",
    //   Math.ceil(agents.length / agentsPerPage)
    // );

    // if (
    //   pageNumber > 0 &&
    //   pageNumber < Math.ceil(agents.length / agentsPerPage)
    // ) {
    setCurrentPage(pageNumber);
    // console.log("currentPage", currentPage);
    // }
  };

  return (
    <div>
      <main>
        <h3>Agents List page</h3>
        <div>
          {/* <h1>{agent.agent_name}</h1> */}
          <Table>
            <TableCaption>Total Number of Agents {agents.length}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Agent Name</TableHead>
                <TableHead>Agent Type</TableHead>
                <TableHead>Agent Id</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentAgents?.map((agent) => (
                //   <div>
                <TableRow
                  className="cursor-pointer"
                  key={agent.agent_id}
                  onClick={() => router.push(`/agents/${agent.agent_id}`)}
                >
                  <TableCell className="font-medium">
                    {agent.agent_name}
                  </TableCell>
                  <TableCell>{agent.language}</TableCell>
                  <TableCell>{agent.agent_id}</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
                //   </div>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
      <footer>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                // href="#"
                onClick={() => handlePageChange(currentPage - 1)}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">{currentPage}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                // href="#"
                onClick={() => handlePageChange(currentPage + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </footer>
    </div>
  );
};

export default page;

//   const [users, setUsers] = useState([]);

// const response = await fetch("https://dummyjson.com/users");
// const data = await response.json();
// console.log(data.users);

// setUsers(data.users);
{
  /* {users?.map((agent) => (
  <div key={agent.id}>
  <h1>{agent.firstName}</h1>
  </div>
))} */
}
