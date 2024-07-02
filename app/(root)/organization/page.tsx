import { OrganizationProfile } from "@clerk/nextjs";

export default function OrganizationProfilePage() {
  return <OrganizationProfile />;
}

// ("use client");

import { useOrganization, useUser } from "@clerk/nextjs";
// import {
//   OrgDomainParams,
//   OrgInvitationsParams,
//   OrgMembershipRequestsParams,
//   OrgMembersParams,
// } from "@/utils/organizations"
import { useState } from "react";
import { OrganizationCustomRoleKey } from "@clerk/types";
// import { SelectRole } from "@/components/SelectRole"
const OrgMembersParams = {
  memberships: {
    pageSize: 5,
    keepPreviousData: true,
  },
};
// const OrgMembers = () => {
//   const { user } = useUser();
//   const { isLoaded, memberships } = useOrganization(OrgMembersParams);

//   if (!isLoaded) {
//     return <>Loading</>;
//   }

//   return (
//     <>
//       <table>
//         <thead>
//           <tr>
//             <th>User</th>
//             <th>Joined</th>
//             <th>Role</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {memberships?.data?.map((mem) => (
//             <tr key={mem.id}>
//               <td>
//                 {mem.publicUserData.firstName || mem.publicUserData.identifier}{" "}
//                 {mem.publicUserData.userId === user?.id && "(You)"}
//               </td>
//               <td>{mem.createdAt.toLocaleDateString()}</td>
//               <td>
//                 {/* <SelectRole
//                   defaultRole={mem.role}
//                   onChange={async (e) => {
//                     await mem.update({
//                       role: e.target.value as OrganizationCustomRoleKey,
//                     })
//                     await memberships?.revalidate()
//                   }}
//                 /> */}
//               </td>
//               <td>
//                 <button
//                   onClick={async () => {
//                     await mem.destroy();
//                     await memberships?.revalidate();
//                   }}
//                 >
//                   Remove
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className="flex">
//         <button
//           className="inline-block"
//           disabled={!memberships?.hasPreviousPage || memberships?.isFetching}
//           onClick={() => memberships?.fetchPrevious?.()}
//         >
//           Previous
//         </button>

//         <button
//           className="inline-block"
//           disabled={!memberships?.hasNextPage || memberships?.isFetching}
//           onClick={() => memberships?.fetchNext?.()}
//         >
//           Next
//         </button>
//       </div>
//     </>
//   );
// };

// export default OrgMembers;
