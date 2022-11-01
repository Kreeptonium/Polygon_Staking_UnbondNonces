import Web3 from 'web3';
import dotenv from 'dotenv';
import {config} from "../../../settings";
import { funcGetValidatorContractAddress } from './GetValidators';
import BN from 'bignumber.js'
import { ICheckBalanceOptions, ICheckBalanceRetValues } from '../Model/ResultUnbondNonces';
dotenv.config();

export const checkUnbondNonce = async (params:ICheckBalanceOptions): Promise<Array<ICheckBalanceRetValues>> => 
{

    const web3 = new Web3(new Web3.providers.HttpProvider(config.MumbaiTestnet.providerURL));
    const buyDelegateABI = require('../../abi/ValidatorShareContract.json');
    
    try {
         //Call Validators Array
        const validatorArrayObj = await funcGetValidatorContractAddress();
        let balanceInfo:Array<ICheckBalanceRetValues>=new Array<ICheckBalanceRetValues>();
        
        for (const valObj of validatorArrayObj) {
         // Get contract instance
        const validatorShareContract = new web3.eth.Contract(buyDelegateABI, valObj.contractAddress);
        //Capturing the receipt for "Encoded ABI"
        try {
        let nonce :number= await validatorShareContract.methods.unbondNonces(params.stakedAddress).call();
        balanceInfo.push({
            myNonce:new BN(nonce).toNumber(),
            validatorContract:valObj.contractAddress,
            validatorName:valObj.validatorName
        })
        } catch (error) {
        }
        
        }

        return balanceInfo;
    }
    catch (error) {
        throw (error);
    }

    

};
checkUnbondNonce({stakedAddress:'0xA70db639f26d907B7744e72c44e9f0562f6fb6Ce'}).then((result)=>(console.log("Result: ",JSON.stringify(result))))