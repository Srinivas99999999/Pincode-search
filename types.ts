export interface PincodeResult {
  Message: string;
  Status: string | number;
  PostOffice: PostOffice[] | null;
}

export interface PostOffice {
  Name: string;
  Description: string;
  BranchType: string;
  DeliveryStatus: string;
  Circlename: string;
  District: string;
  Division: string;
  Region: string;
  Block: string;
  State: string;
  Country: string;
  Pincode: string;
}

export interface PostOfficeDisplay {
  name: string;
  branchType: string;
  deliveryStatus: string;
  district: string;
  state: string;
  region: string;
  block: string;
  country: string;
  pincode: string;
}
