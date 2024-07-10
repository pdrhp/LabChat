import { useAuth } from "@/context/auth-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const loginFormSchema = z.object({
  username: z.string({ required_error: "O nome de usuário é obrigatório"}).nonempty("O nome de usuário é obrigatório"),
  password: z.string({ required_error: "A senha é obrigatória"}).min(5, "A senha deve ter no mínimo 5 caracteres"),
});

const LoginForm = () => {

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
      });

  const {login} = useAuth();

  const {mutate: mutateLogin, isPending} = useMutation({
    mutationFn: login,
    onError: (error: AxiosError) => {
      const serviceError = error.response.data as {flag: boolean, message: string, statusCode: number};
      console.log(serviceError);
      toast.error('Erro ao se autenticar', {
        description: serviceError.message,
        style: {
          backgroundColor: '#aa1b1b',
          color: '#fff',
        }
      })
    },
    onSuccess: () => {
      toast.success('Autenticado com sucesso', {
        style: {
          backgroundColor: '#249E24',
          color: '#fff',
        }
      })
      
    }
  })



  const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
    await mutateLogin({ username: data.username, password: data.password });
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Insira seu e-mail para acessar sua conta.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="username"
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
                name="password"
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
          </CardContent>
          <CardFooter>
            <Button className="w-full">
               {isPending ? <Loader2 className=" animate-spin h-4 w-4"/> : 'Entrar'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default LoginForm;
