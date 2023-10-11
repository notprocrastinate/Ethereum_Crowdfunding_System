//1）指定我们需要解锁的账户，并让其花费ether；2）指定我们要连接的外部API或外部节点
const HDWalletProvider=require('@truffle/hdwallet-provider');
const Web3=require('web3');
const compiledFactory=require('../ethereum/build/CampaignFactory.json');
//const {interface,bytecode}=require('./compile');

const provider=new HDWalletProvider(
    'retire debris mule category page float helmet sorry harsh elephant grape burden',
    'https://goerli.infura.io/v3/3334f86bff194f8ab1012a5b6c07355d'
);
const web3=new Web3(provider);

//进行两个call：1）获取我们有权访问的账户列表；2）创建和部署该合约
//两个异步操作
//但是我们不能在函数体以外使用await语法
const deploy=async()=>{
    try{
        const accounts=await web3.eth.getAccounts();

        console.log('Attempting to depoly from ',accounts[0]);

        const result=await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
                    .deploy({data:compiledFactory.bytecode})
                    .send({gas:1000000,from:accounts[0]});
        
        //console.log(interface);
        console.log('Contract deployed to ',result.options.address);
        //为了避免hanging deployment
        provider.engine.stop();
    }catch(error){

    }
    
};
deploy();

