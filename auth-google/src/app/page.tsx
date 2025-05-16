// app/page.tsx
// import { getUserSession } from "@/lib/session";

import { getUserSession } from "../../lib/session";

export default async function Home() {
  const user = await getUserSession();
  return (
    <main className="p-8">
      <h1>Welcome</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </main>
  );
}
