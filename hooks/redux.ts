import { UnknownAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

import type { RootState } from "@mirror-map/redux";
import { WizardState } from "~/providers/redux/WizardSlice";

export type AppThunkDispatch<T> = ThunkDispatch<
  RootState<T>,
  any,
  UnknownAction
>;
export const useAppDispatch = () => useDispatch<AppThunkDispatch<any>>();
export const useAppSelector: TypedUseSelectorHook<RootState<WizardState>> =
  useSelector;
