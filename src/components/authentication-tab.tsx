import { useState } from "react";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";




const AuthenticationTab = () => {

  const [activeTab, setActiveTab] = useState('login');

  const changeTab = (tab: "login" | "register") => setActiveTab(tab);


  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col items-center" >
      <TabsList>
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Registrar</TabsTrigger>
      </TabsList>
      <TabsContent value="login" className="w-[30rem] flex justify-center">
        <LoginForm/>
      </TabsContent>
      <TabsContent value="register" className="w-[30rem] flex justify-center">
        <RegisterForm setActiveTab={changeTab}/>
      </TabsContent>
    </Tabs>
  );
};

export default AuthenticationTab;
