import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { useDispatch } from "react-redux";
import { GetAllProjectThunk } from "./CreateProject";

export const store = configureStore({
  reducer: rootReducer,
});
store.dispatch(GetAllProjectThunk());
//tao Appdispatch
export type RootState = ReturnType<(typeof store)["getState"]>;
type Appdispatch = (typeof store)["dispatch"];
export const useAppDispatch: () => Appdispatch = useDispatch;
