import RegisterForm from "@/components/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Register() {
  const session = await getServerSession(authOptions);
  console.log(session + "session in register page"); 
  if (session) redirect("/dashboard");

  return <RegisterForm />;
}
