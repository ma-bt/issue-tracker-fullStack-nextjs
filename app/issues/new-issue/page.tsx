"use client";
import SimpleMDE from "react-simplemde-editor";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validation-schema";
import { z } from "zod";

// interface FormInput {
//   title: string;
//   description: string;
// }
type FormInput = z.infer<typeof createIssueSchema>;
const NewIssuePage = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: zodResolver(createIssueSchema),
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="crimson" className="my-4">
          <Callout.Icon>
            <MdErrorOutline />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className=" flex flex-col gap-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            return setError("An unexpected error occurred.... Retry !!!");
          }
        })}
      >
        <h3 className="text-xl font-medium">New Issue </h3>
        <TextField.Root color="grass">
          <TextField.Input placeholder="Tittle" {...register("title")} />
        </TextField.Root>
        {errors.title && (
          <Text color="red" size={"1"}>
            {errors.title?.message}
          </Text>
        )}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" color="grass" {...field} />
          )}
        />
        {errors.description && (
          <Text color="red" size={"1"}>
            {errors.description?.message}
          </Text>
        )}

        <Button type="submit" size={"2"} className="max-w-28" color="green">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
