export class MFlightmasterMst {
    flightNumber: string;
    migratedFlightNumber: string;
    airlineCode: string;
    airportofDeparture: string;
    airportofDestination: string;
    etd?: number;
    eta?: number;
    flightType: string;
    terminalCode: string;
    status: string;
    mcStatus: string;
    createdBy: string;
    createdOn?: string;
    lastUpDtBy: string;
    lastUpDtOn?: string;
}

export class GetFlightDetails {
    airportofDeparture: string;
    airportofDestination: string;
    airlineName: string;
    airlineId: number;
    eta: string;
    etd: string;
    airlineAccountingPrefix: string;
}
export class MCourierMst {
    courierCoId: number;
    courierCoCode: string;
    courierCoRegistrationNumber: string;
    courierCoRegistrationExpiryDt?: string;
    courierCoName: string;
    courierCoTallyName: string;
    courierCoMigratedName: string;
    contactPerson: string;
    courierEmail: string;
    courierContact: string;
    courierCoAddr1: string;
    courierCoAddr2: string;
    courierCoState: string;
    courierCoCity: string;
    courierCoPinCode?: number;
    courierType?: number;
    memberTypeId?: number;
    terminalCode: string;
    status: string;
    mcStatus: string;
    createdBy: string;
    createdOn?: string;
    lastUpDtBy: string;
    lastUpDtOn?: string;
}


export class GetForm1CheckStatus {
    flightNumber: string;
    dateOfArrival: string;
    timeOfArrival: number;
    igmNo: string;
    igmDate: string;
    formIMAWBNo: string;
    formIIMAWBNo: string;
    courierCompanyName: string;
    form1ActualNoofBags: number;
    form1ActualNoofPackages: number;
    form1ActualNoofShps: number;
    form1ActualWeight: number;
    form1NoofBags: number;
    form2NoofBags: number;
    form1NoofShps: number;
    form2NoofShps: number;
    form1NoofPkgs: number;
    form2NoofPkgs: number;
    form1Weight: number;
    form2Weight: number;
}
