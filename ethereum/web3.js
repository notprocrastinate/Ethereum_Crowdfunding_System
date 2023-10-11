import Web3 from "web3";

//const web3=new Web3(window.web3.currentProvider);
let web3;
if(typeof window!=='undefined'&&typeof window.ethereum!=='undefined'){
    //在浏览器中，并且metamask正在运行
    window.ethereum.request({ method: "eth_requestAccounts" });
    web3 = new Web3(window.ethereum);
}else{
    //在服务器或者用户没有运行metamask
    const provider=new Web3.providers.HttpProvider(
        'https://goerli.infura.io/v3/3334f86bff194f8ab1012a5b6c07355d'
    );
    web3=new Web3(provider);
}
export default web3;