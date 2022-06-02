import workDateAtionTypes from "./workDateActionType";


const initialState = {
    workDate: '',
    workDateData: null,
    serefreshWorkDateDataId:Math.random()
}
const workDateReducer = (state = initialState, { type, payload }) => {
  switch (type) {

  case workDateAtionTypes.SET_WORK_DATE:
    return { ...state,  workDate :payload };
  case workDateAtionTypes.SET_WORK_DATE_DATA:
    return { ...state,  workDateData :payload };
  case workDateAtionTypes.REFRESH_WORK_DATE_DATA_ID:
    return { ...state, serefreshWorkDateDataId : payload };

  default:
    return state
  }
}


export default workDateReducer
