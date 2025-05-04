import { getValidatedFormData, useRemixForm } from "remix-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { LoginFormSchema, type LoginFormType } from "~/schema/login";
import type { Route } from "./+types/login";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Login" }, { name: "description", content: "Login" }];
}

const resolver = zodResolver(LoginFormSchema);
export async function action({ request }: Route.ActionArgs) {
  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData<LoginFormType>(request, resolver);

  if (errors) {
    return { errors, defaultValues };
  }

  return data;
}

export default function LoginForm({}: Route.ComponentProps) {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useRemixForm<LoginFormType>({
    mode: "onSubmit",
    resolver,
  });

  return (
    <div className="mt-4 flex justify-center">
      <div className="w-1/3">
        <h1 className="mb-4 text-center text-3xl">Login</h1>
        <Form onSubmit={handleSubmit} method="POST">
          <div className="mb-3">
            <Label className="mb-1" htmlFor="email">
              Email
            </Label>
            <Input {...register("email")} id="email" type="text"></Input>
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Label className="mb-1" htmlFor="password">
              Password
            </Label>
            <Input
              {...register("password")}
              id="password"
              type="password"
            ></Input>
            {errors.password && (
              <p className="mt-1 text-sm text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex justify-center">
            <Button className="mt-4" type="submit">
              Login
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
