import { supabaseClient } from "@/lib/utils";
import { onOnline } from "@/redux/slices/online-member-slice";
import { AppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { onClearSearch, onSearch } from "@/redux/slices/search-slice";
import { useQuery } from "@tanstack/react-query";
import { onSearchGroups } from "@/actions/groups";

export const useGroupChatOnline = (userid: string) => {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        const channel = supabaseClient.channel("tracking");

        channel
            .on("presence", { event: "sync" }, () => {
                const state: any = channel.presenceState();
                console.log(state);
                for (const user in state) {
                    dispatch(
                        onOnline({
                            members: [{ id: state[user][0].member.userid }],
                        }),
                    );
                }
            })
            .subscribe(async (status) => {
                if (status === "SUBSCRIBED") {
                    await channel.track({
                        member: {
                            userid,
                        },
                    });
                }
            });

        return () => {
            channel.unsubscribe();
        };
    }, []);
};

export const useSearch = (search: "POSTS" | "GROUPS") => {
    const [query, setQuery] = useState<string>("");
    const [debounce, setDebounce] = useState<string>("");

    const dispatch: AppDispatch = useDispatch();

    //* Set search input value to query
    const onSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    useEffect(() => {
        const delayInputTimeoutId = setTimeout(() => {
            setDebounce(query);
        }, 1000);
        return () => clearTimeout(delayInputTimeoutId);
    }, [query, 1000]);

    const { refetch, data, isFetched, isFetching } = useQuery({
        queryKey: ["search-data", debounce],
        queryFn: async ({ queryKey }) => {
            if (search === "GROUPS") {
                const groups = await onSearchGroups(search, queryKey[1]);
                return groups;
            }
        },
        enabled: false,
    });

    if (isFetching) {
        dispatch(
            onSearch({
                isSearching: true,
                data: data?.groups || [],
            }),
        );
    }

    if (isFetched) {
        dispatch(
            onSearch({
                isSearching: true,
                status: data?.status as number,
                data: data?.groups || [],
                debounce,
            }),
        );
    }

    useEffect(() => {
        if (debounce) refetch();
        if (!debounce) dispatch(onClearSearch());
        return () => {
            debounce;
        };
    }, [debounce]);

    return {
        query,
        onSearchQuery,
    };
};
