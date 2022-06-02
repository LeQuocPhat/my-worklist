import userActionType from "./userActionType";

export const setUser = (user)=>({
    type:userActionType.SET_USER,payload:user
})
export const clearUser = ()=>({
    type:userActionType.CLEAR_USER
})