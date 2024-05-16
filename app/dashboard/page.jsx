import UserInfo from "@/components/UserInfo";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/register");
  return <UserInfo  session={session}/>;
}
