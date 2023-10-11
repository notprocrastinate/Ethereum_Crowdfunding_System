pragma solidity ^0.4.17;

contract CampaignFactory{
    address[] public deployedCampaign;

    function createCampaign(uint minimum) public{
        address newCampaign=new Campaign(minimum,msg.sender);
        deployedCampaign.push(newCampaign);
    }

    function getDeployedCampaign()public view returns(address[]){
        return deployedCampaign;
    }

}
contract Campaign{
    struct Request{
        string description;
        uint value;
        address recipient;
        bool complete;
        mapping(address=>bool) approvals;
        uint approvalCount;
    }

    address public manager;
    uint public minimumContribution;
    //address[] public approvers;
    mapping(address=>bool) public approvers;
    uint public approverCount;
    Request[] public requests;

    modifier restricted(){
        require(msg.sender==manager);
        _;
    }

    function Campaign(uint minimum,address creator) public {
        minimumContribution=minimum;
        manager=creator;
    }
    
    function contribute() public payable{
        require(msg.value>=minimumContribution);
        approvers[msg.sender]=true;
        approverCount++;
    }

    function createRequest(string description,uint value,address recipient) public restricted{
        Request memory newRequest=Request({
            description:description,
            value:value,
            recipient:recipient,
            complete:false,
            approvalCount:0
        });

        requests.push(newRequest);
    }

    function approveRequest(uint index) public {
        Request storage request=requests[index];
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender]=true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index)public{
        Request storage request=requests[index];
        require(request.approvalCount>(approverCount/2));
        require(!request.complete);
        request.complete=true;
        request.recipient.transfer(request.value);
    }

    function getSummary()public view returns(
        uint,uint,uint,uint,address
    ){
        return(
            minimumContribution,
            this.balance,
            requests.length,
            approverCount,
            manager
        );
    }

    function getRequestsCount() public view returns(uint){
        return requests.length;
    }
}