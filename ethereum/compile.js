const path=require('path');
const solc=require('solc');
const fs=require('fs-extra');

const buildPath=path.resolve(__dirname,'build');
fs.removeSync(buildPath);

const CampaignPath=path.resolve(__dirname,'contracts','Campaign.sol');
const source=fs.readFileSync(CampaignPath,'utf8');
const output=solc.compile(source,1).contracts;

//console.log(output);

fs.ensureDirSync(buildPath);

for(let contract in output){
    fs.outputJSONSync(
        path.resolve(buildPath,contract.replace(':','')+'.json'),//文件名
        output[contract]//文件内容
    );
}