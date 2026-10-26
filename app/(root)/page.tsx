import { getPosts, isUserAuthenticated } from "@/lib/actions";
import ClientView from "./_component/ClientView";


export default async function HomePage() {
  await isUserAuthenticated();
  const posts = await getPosts();
  return <ClientView posts={posts}/>
}
