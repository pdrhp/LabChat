import { useAuth } from "@/context/auth-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

const registerFormSchema = z.object({
  Nome: z.string(),
  Username: z.string(),
  Password: z.string().min(5),
  RePassword: z.string().min(5),
});

type RegisterFormProps = {
  setActiveTab: (tab: "login" | "register") => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({setActiveTab}) => {
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
  });

  const { register } = useAuth();


  const {mutate: registerMutate, isPending} = useMutation({
    mutationFn: register,
    onError: (error: AxiosError) => {
      const serviceError = error.response.data as {flag: boolean, message: string, statusCode: number};
      console.log(serviceError);
      toast.error('Erro ao registrar', {
        description: serviceError.message,
        style: {
          backgroundColor: '#ff0000',
          color: '#fff',
        }
      })
    },
    onSuccess: () => {
      toast.success('Registrado com sucesso', {
        description: 'Faça login para acessar sua conta.',
        style: {
          backgroundColor: '#249E24',
          color: '#fff',
        }
      })
      setActiveTab("login");
    }
  })

  const onSubmit = async (data: z.infer<typeof registerFormSchema>) => {
    await registerMutate({ Nome: data.Nome, Username: data.Username, Password: data.Password, ConfirmPassword: data.RePassword });
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Registro</CardTitle>
        <CardDescription>Se cadastre no nosso site!</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4">
          <div className="grid gap-2">
              <FormField
                control={form.control}
                name="Nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Fulano da Silva" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="Username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome de usuário</FormLabel>
                    <FormControl>
                      <Input placeholder="fulaninho123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="Password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="RePassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Repita a senha</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              {isPending ? <Loader2 className="h-4 w-4 animate-spin"/> : 'Registrar'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default RegisterForm;
