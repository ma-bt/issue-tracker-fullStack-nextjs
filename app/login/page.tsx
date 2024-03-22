"use client";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { loginSchema } from "../validation-schema";
import { z } from "zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdErrorOutline } from "react-icons/md";
import { useMutation } from "react-query";

const LoginPage = () => {
  type LoginInput = z.infer<typeof loginSchema>;
  const router = useRouter();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const { mutateAsync, isLoading } = useMutation((data: LoginInput) =>
    axios.post("/api/login", data)
  );


  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        console.log(data, "data");
        try {
          const response = await mutateAsync(data);
          const { token } = response.data;
          localStorage.setItem("token", token);
          console.log(token);
          if (token !== undefined) {
            router.push("/");
          } else setError("User not found");
        } catch (error) {
          return setError("Something went Wrong");
        }
      })}
      className="flex flex-col gap-3  justify-center items-center my-4"
    >
      <div className="max-w-[600px] min-w-[500px]  border-2 rounded-md p-6 flex flex-col gap-3">
        <h3 className="text-3xl font-medium py-2 flex justify-center">Login</h3>
        {error && (
          <Callout.Root color="crimson" className="my-1">
            <Callout.Icon>
              <MdErrorOutline />
            </Callout.Icon>
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}
        <div className="flex flex-col gap-1  ">
          <label className="text-sm">Email:</label>
          <TextField.Root color="violet">
            <TextField.Input {...register("email")} />
          </TextField.Root>
          {errors.email && (
            <Text color="red" size={"1"}>
              {errors.email?.message}
            </Text>
          )}
        </div>

        <div className="flex flex-col gap-1  ">
          <label className="text-sm">Password:</label>
          <TextField.Root color="violet">
            <TextField.Input {...register("password")} />
          </TextField.Root>
          {errors.password && (
            <Text color="red" size={"1"}>
              {errors.password?.message}
            </Text>
          )}
        </div>
        <Button type="submit" size={"2"} className="px-3" color="violet">
          {isLoading ? "loading" : "Submit"}
        </Button>
        <p className="flex justify-center text-sm">
          Don't have an account?
          <span className="font-medium" onClick={() => router.push("/sign-up")}>
            Sign Up
          </span>
        </p>
      </div>
    </form>
  );
};

export default LoginPage;
