import { auth } from "../../auth";

// Make the component async
async function Dashboard() {
  // Fetch session directly in the component
  const session = await auth();

  if (!session?.user) return <div>Not authenticated</div>;

  return <div>{JSON.stringify(session, null, 2)}</div>;
}

export default Dashboard;

// import { auth } from "../../auth";

// export default function Dashboard({ session }) {
//   if (!session.user) return <div>Not authenticated</div>;

//   return <div>{JSON.stringify(session, null, 2)}</div>;
// }

// export async function getServerSideProps(ctx) {
//   const session = await auth(ctx);

//   return {
//     props: {
//       session,
//     },
//   };
// }
