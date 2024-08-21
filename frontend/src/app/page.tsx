import {
  getKindeServerSession,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Home() {
  const { getAccessTokenRaw, getUser } = getKindeServerSession();
  const token = await getAccessTokenRaw();
  const user = await getUser();
  const response = await fetch("http://localhost:5001/api/v1", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.ok) {
    const data = await response.json();
    console.log("ALl is well", data);
  } else {
    console.log("Error", response.statusText);
  }

  return (
    <>
      welcome:-
      <p>{user?.email}</p>
      <LogoutLink>Log out</LogoutLink>
    </>
  );
}
