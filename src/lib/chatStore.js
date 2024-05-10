import { create } from "zustand";
import { useUserStore } from "./userStore";

export const useChatStore = create((set) => ({
    chatId: null,
    user: null,
    isCurrentUserBlocked: false,
    isReceiverBlocked: false,
    changeChat: (chatId, user)=> {
        const currentUser = useUserStore.getState().currentUser

        //check is user is blocked
        if (user.blocked.includes(currentUser.id)) {
            return set({
                chatId,
                user: null,
                isCurrentUserBlocked: true,
                isReceiverBlocked: false,
            });
        }

        //check is reviever is blocked
        if (currentUser.blocked.includes(user.id)) {
            return set({
                chatId,
                user: null,
                isCurrentUserBlocked: false,
                isReceiverBlocked: true,
            });
        } else {
            return set({
                chatId,
                user,
                isCurrentUserBlocked: false,
                isReceiverBlocked: false,
            });
        }

        
    },

    changeBlock: () => {
        set(state=>({...state,isReceiverBlocked: !state.isReceiverBlocked }))
    }

     
 }));