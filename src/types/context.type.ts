import { showPassType } from "./showPass.type";

export interface PasswordContextType  {
  showPass: showPassType;
  ShowPassandHide: (key: keyof showPassType) => void; 
};