"use client";
import SideNav from "@/components/shared/SideNav";
import { createUser } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

const EmpSideNav = ({ links }) => {
  const router = useRouter();

  async function createUserDB(user: CreateUserParams) {
    try {
      const newUser = await createUser(user);
      console.log(newUser);
      router.push(`/generate/employees/${newUser._id}`);
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddEmployee = (data) => {
    const name = data.name.split(" ");
    console.log(data);
    createUserDB({
      firstName: name[0],
      lastName: name[1],
      organization_clerkId: orgId,
    });
  };

  return (
    <SideNav
      navLinks={links}
      onAddItem={handleAddEmployee}
      addLabel={"new employee name"}
    />
  );
};

export default EmpSideNav;
