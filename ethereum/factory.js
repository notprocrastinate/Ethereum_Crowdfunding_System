import web3 from "./web3";
import CampaignFactory from './build/CampaignFactory.json';
//最近部署的工厂合约的地址
const instance=new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x7Bf2088F4336F9264B8132ACF33883FBcd9B75a0'
);

export default instance;
