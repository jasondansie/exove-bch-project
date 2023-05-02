import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
  Reducer,
} from "@reduxjs/toolkit";
import employeeSlice from "../features/user/userListSlice";
import loginSlice from "../features/login/loginSlice";
import surveySlice from "../features/survey/surveySlice";
import surveysSlice from "../features/survey/surveysSlice";
// import selectedEmployeesSlice from "../features/survey/paticipantsSlice";
import surveyPackSlice from "../features/survey/surveyPackSlice";
import userSlice from "../features/user/userSlice";
import questionSlice from "../features/form/QuestionSlice";

type AppAction = Action<string> | { payload: unknown; type: string };

const rootReducer: Reducer = combineReducers({
  loginUser: loginSlice,
  user: userSlice,
  employees: employeeSlice,
  survey: surveySlice,
  surveys: surveysSlice,
  question: questionSlice,
  surveyPack: surveyPackSlice,
  // selectedParticipants: selectedEmployeesSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AppAction
>;
