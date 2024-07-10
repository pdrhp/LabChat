import { useAuth } from "@/context/auth-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import RegisterForm from "./register-form";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const loginFormSchema = z.object({
  username: z.string(),
  password: z.string().min(5),
});


const LoginForm = () => {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  });

  const {login, userSession} = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (userSession) {
      navigate("/chat");
    }
  }, [navigate, userSession])


  const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
    await login({ username: data.username, password: data.password});
  };

  return (
    <Tabs defaultValue="login">
      <TabsList>
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Registrar</TabsTrigger>
      </TabsList>
      <TabsContent value="login" className="w-[30rem] flex justify-center">
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
              <Button className="w-full">Entrar</Button>
            </CardFooter>
          </form>
        </Form>
        </Card>
      </TabsContent>
      <TabsContent value="register" className="w-[30rem] flex justify-center">
        <RegisterForm/>
      </TabsContent>
    </Tabs>
  );
};

export default LoginForm;
