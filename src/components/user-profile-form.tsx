import { useAuth } from "@/context/auth-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormInput from "./form-input";
import { Button } from "./ui/button";
import { Form } from "./ui/form";

const UserProfileSchema = z.object({
  Nome: z.string(),
  Email: z.string().email(),
  Username: z.string(),
});

const UserProfileForm = () => {
  const { userSession } = useAuth();

  const UserProfileForm = useForm({
    resolver: zodResolver(UserProfileSchema),
    defaultValues: {
      Nome: userSession?.nome,
      Email: userSession?.email,
      Username: userSession?.username,
    },
  });

  const { control } = UserProfileForm;

  const inputClassName = "w-full";

  return (
    <Form {...UserProfileForm}>
      <form className="w-full flex justify-center items-center">
        <div className="flex w-[70%] gap-5 items-center flex-col">
          <FormInput
            formItemClassName={inputClassName}
            control={control}
            formControlName="Nome"
            label="Nome"
            type="text"
          />
          <FormInput
            formItemClassName={inputClassName}
            control={control}
            formControlName="Email"
            label="Email"
            type="text"
          />
          <FormInput
            formItemClassName={inputClassName}
            control={control}
            formControlName="Username"
            label="Username"
            type="text"
          />

          <Button className="w-[50%]" type="submit">Atualizar</Button>
        </div>
      </form>
    </Form>
  );
};

export default UserProfileForm;
