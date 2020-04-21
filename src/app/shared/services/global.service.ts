import { Injectable } from '@angular/core';
import { GlobalConfig } from 'src/app/_interfaces/UserManagement/userInfo.modal';

@Injectable()
export class GlobalValue {

globalConfig: GlobalConfig = new GlobalConfig();

constructor() {

}

setGV(_globalConfig: any) {
    console.log(_globalConfig[0].tokenString);
    this.globalConfig.tokenString = _globalConfig[0].tokenString;
    this.globalConfig.loginID = _globalConfig[0].loginID;
    this.globalConfig.validUser = _globalConfig[0].validUser;
    this.globalConfig.validPwd = _globalConfig[0].validPwd;
    this.globalConfig.userMstID = _globalConfig[0].userMstID;
    this.globalConfig.userName = _globalConfig[0].userName;
    this.globalConfig.roleID = _globalConfig[0].roleID;
    this.globalConfig.roleSName = _globalConfig[0].roleSName;
    this.globalConfig.roleDName = _globalConfig[0].roleDName;
    this.globalConfig.lastLoginTime = _globalConfig[0].lastLoginTime;
    this.globalConfig.appPath = _globalConfig[0].appPath;
    this.globalConfig.lastPasswordChangeDate = _globalConfig[0].lastPasswordChangeDate;
    this.globalConfig.loginStatus = _globalConfig[0].loginStatus;
    this.globalConfig.cultureID = _globalConfig[0].cultureID;
    this.globalConfig.iPAddress = _globalConfig[0].iPAddress;
    this.globalConfig.officeID = _globalConfig[0].officeID;
    this.globalConfig.terminalCode = _globalConfig[0].terminalCode;
    this.globalConfig.financialYear = _globalConfig[0].financialYear;
    this.globalConfig.userTypeEICI = _globalConfig[0].userTypeEICI;
    this.globalConfig.airlineCode = _globalConfig[0].airlineCode;
    this.globalConfig.serviceTaxPerc = _globalConfig[0].serviceTaxPerc;
    this.globalConfig.primaryEduCessPerc = _globalConfig[0].primaryEduCessPerc;
    this.globalConfig.secondaryEduCessPerc = _globalConfig[0].secondaryEduCessPerc;
    this.globalConfig.saleLotAutoMode = _globalConfig[0].saleLotAutoMode;
    this.globalConfig.reportPreview = _globalConfig[0].reportPreview;
    this.globalConfig.validGracePeriod = _globalConfig[0].validGracePeriod;
    this.globalConfig.daysLeft = _globalConfig[0].daysLeft;
    this.globalConfig.period = _globalConfig[0].period;
    this.globalConfig.passwordRetry = _globalConfig[0].passwordRetry;
    this.globalConfig.pwdRetryCount = _globalConfig[0].pwdRetryCount;
}

getGV() {
    return this.globalConfig;
}

clearGV() {
  this.globalConfig = {};
}

}


