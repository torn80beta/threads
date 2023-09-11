import UserCard from "@/components/cards/UserCard";
import { fetchUsers } from "@/lib/actions/user.actions";
// import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
// import { profileTabs } from "@/constants";
// import Image from "next/image";
// import ThreadsTab from "@/components/shared/ThreadsTab";

async function Page() {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }

  // const userId = await JSON.parse(JSON.stringify(userInfo._id)); // server -> client component bug fix

  const result = await fetchUsers({
    userId: user.id, // or  userId?
    searchString: "",
    pageNumber: 1,
    pageSize: 25,
  });

  // console.log(result);

  return (
    <section>
      <h1>Search</h1>

      {/* Search bar */}

      <div className="mt-14 flex flex-col gap-9">
        {result.users.length === 0 ? (
          <p className="no-result">No users</p>
        ) : (
          <>
            {result.users.map((person) => (
              <UserCard
                key={person.id}
                id={person.id}
                name={person.name}
                username={person.username}
                imgUrl={person.image}
                personType="User"
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
}

export default Page;
