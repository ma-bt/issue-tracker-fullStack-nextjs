"use client";
import { Button, Table } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const IssuesPage = () => {
  const router = useRouter();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("/api/issues");
        setData(res.data.data);
        console.log(res.data.data, "res");
      } catch (error) {
        return "something went wrong";
      }
    };
    fetch();
  }, []);

  type IssueData = {
    id: number;
    title: string;
    description: string;
    createdAt: string;
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-xl">Issue Table</h3>
        <Button
          className="flex  justify-end items-center px-3"
          onClick={() => router.push("issues/new-issue")}
        >
          Add New Issue
        </Button>
      </div>

      <div>
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Id</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Created At</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data?.map((a: IssueData) => {
              console.log(a, "a");
              return (
                <Table.Row key={a.id}>
                  <Table.RowHeaderCell>{a.id}</Table.RowHeaderCell>
                  <Table.Cell>{a.title}</Table.Cell>
                  <Table.Cell width={600}>{a.description}</Table.Cell>
                  <Table.Cell>{a.createdAt}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Root>
      </div>
    </div>
  );
};

export default IssuesPage;
