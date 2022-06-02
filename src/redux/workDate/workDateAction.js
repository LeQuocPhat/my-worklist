import workDateAtionTypes from "./workDateActionType"

export const setWorkDate = (workdate)=>({
    type:workDateAtionTypes.SET_WORK_DATE, payload: workdate
})
export const setWorkDateData = (workdateData)=>({
    type:workDateAtionTypes.SET_WORK_DATE_DATA, payload: workdateData
})
export const serefreshWorkDateDataId = (id)=>({
    type:workDateAtionTypes.REFRESH_WORK_DATE_DATA_ID, payload: id
})

