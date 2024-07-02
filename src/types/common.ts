import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
export type TMeta = {
    page: number;
    limit: number;
    total: number;
  };
  
  
  export interface TDrawerItem {
    title: string;
    path: string;
    parentPath?: string;
    icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
    child?: TDrawerItem[];
  }
  
  export type ResponseSuccessType = {
    data: any;
    meta?: TMeta;
  };
  
  export type IGenericErrorResponse = {
    statusCode: number;
    message: string;
    errorMessages: IGenericErrorMessage[];
  };
  
  export type IGenericErrorMessage = {
    path: string | number;
    message: string;
  };