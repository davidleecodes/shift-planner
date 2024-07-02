import { ClerkLoading, CreateOrganization } from "@clerk/nextjs";

export default function CreateOrganizationPage() {
  return (
    <main
      className={
        "col-span-2 m-auto flex h-full w-full max-w-md items-center justify-center space-y-6 pt-6"
      }
    >
      <div className={"flex w-full flex-col"}>
        <h1>UI Component</h1>
        <ClerkLoading>Loading ...</ClerkLoading>
        <CreateOrganization skipInvitationScreen={true} />
      </div>
    </main>
  );
}
