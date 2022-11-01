export interface ICheckBalanceOptions{
    stakedAddress:string; //They can send validator Id rather than address
}
export interface ICheckBalanceRetValues{
    myNonce:number;
    validatorContract?:string;
    validatorName:string;
}
