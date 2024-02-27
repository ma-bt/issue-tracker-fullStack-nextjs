"use client";
import SimpleMDE from "react-simplemde-editor";
import { Button, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";

const NewIssuePage = () => {
  return (
    <div className="max-w-xl flex flex-col gap-3">
      <h3 className="text-xl font-medium">New Issue </h3>
      <TextField.Root color="grass">
        <TextField.Input placeholder="Tittle" />
      </TextField.Root>
      <SimpleMDE placeholder="Description" color="grass" />
      <Button size={"2"} className="max-w-28" color="green">
        Submit
      </Button>
    </div>
  );
};

export default NewIssuePage;
