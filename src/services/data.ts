import request from '@/utils/request';

export interface LoginParamsType {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
}

export interface configRulesProps {
  icpId: number   //点Id
  ruleFrom: string  //excel表中的列名*
  ruleId: number   //规则Id
  ruleTo: string   //Base_ImportConfigRules表中的列名*
  sheetName: string  //*
}
export interface configPointsProps {
  configRules: configRulesProps[]
  excelName: string  //Excel名称*
  icpId: number    // SheetId
  icpImportOrNot: boolean  //是否导入该sheet*
  icpPoint: string  //*
  icpPointId: number
  icpSheet: string   //Sheet名称*
  icpStartRow: number   //起始行*
  importId: number   //ExcelId
}

interface configExcelProps {
  configPoints: configPointsProps[]
  importContent:string
  importName:string  // ExcelName*
  importId:number    // ExcelId
  importPointNum:number
  importRemark:string
  importType:number
  importUpdatetime:string  //Excel更新事件
  multipartFile: FormData
  projectID:number  //工程id
  updateConfig:boolean
}

export async function insertExcelApi(params:configExcelProps) {
  return request('/api/excel/insert', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
