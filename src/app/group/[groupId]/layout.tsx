import { onAuthenticateUser } from "@/actions/auth";
import {
    onGetAllGroupMembers,
    onGetGroupChannels,
    onGetGroupInfo,
    onGetGroupSubscriptions,
    onGetUserGroups,
} from "@/actions/groups";
import SideBar from "@/components/global/sidebar";
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";

type Props = {
    children: React.ReactNode;
    params: { groupId: string };
};

const GroupLayout: React.FC<Props> = async ({ children, params }) => {
    const query = new QueryClient();
    const user = await onAuthenticateUser();
    if (!user.id) redirect("/sign-in");
    //* Group Info
    await query.prefetchQuery({
        queryKey: ["group-info"],
        queryFn: () => onGetGroupInfo(params.groupId),
    });
    //* Get all the groups for this logged in user
    await query.prefetchQuery({
        queryKey: ["user-groups"],
        queryFn: () => onGetUserGroups(user.id as string),
    });
    //* Get the channel for current group
    await query.prefetchQuery({
        queryKey: ["group-channels"],
        queryFn: () => onGetGroupChannels(params.groupId),
    });
    //* Group subscriptions
    await query.prefetchQuery({
        queryKey: ["group-subscriptions"],
        queryFn: () => onGetGroupSubscriptions(params.groupId),
    });
    //* Member chats
    await query.prefetchQuery({
        queryKey: ["member-chats"],
        queryFn: () => onGetAllGroupMembers(params.groupId),
    });
    return (
        <HydrationBoundary state={dehydrate(query)}>
            <div className="flex h-screen md:pt-5">
                <SideBar groupid={params.groupId} userid={user.id} />
                <div className="md:ml-[300px] flex flex-col flex-1 bg-[#101011] md:rounded-tl-xl overflow-y-auto border-l-[1px] border-t-[1px] border-[#28282D]">
                    <Navbar groupid={params.groupId} userid={user.id} />
                    {children}
                    <MobileNav groupid={params.groupId} />
                </div>
            </div>
        </HydrationBoundary>
    );
};

export default GroupLayout;
