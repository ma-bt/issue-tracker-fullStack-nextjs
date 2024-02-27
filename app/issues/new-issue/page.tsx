"use client";
import SimpleMDE from "react-simplemde-editor";
import { Button, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface FormInput {
  title: string;
  description: string;
}
const NewIssuePage = () => {
  const router = useRouter();

  const { register, control, handleSubmit } = useForm<FormInput>();

  return (
    <form
      className="max-w-xl flex flex-col gap-3"
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/issues", data);
        router.push("/issues");
      })}
    >
      <h3 className="text-xl font-medium">New Issue </h3>
      <TextField.Root color="grass">
        <TextField.Input placeholder="Tittle" {...register("title")} />
      </TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" color="grass" {...field} />
        )}
      />

      <Button type="submit" size={"2"} className="max-w-28" color="green">
        Submit
      </Button>
    </form>
  );
};

export default NewIssuePage;
