let fs = require('fs')
let solc = require('solc')
let Web3 = require('web3')

let contract = compileContract();
let web3 = createWeb3();let senderHelloWorldRopstenTestNetwork = '0xf821142CC270dAb63767cFAae15dC36D1b043348'
let sender = senderHelloWorldRopstenTestNetwork;

deployContract(web3, contract, sender)
    .then
    (function() {
        console.log('Deployment finished')
    })
    .catch(function (error){
        console.log(`Failed to deploy contract: ${error}`)
    })
function compileContract()
{           
            const fname = 'Voter.sol'
            let compilerInput = {
                'Voter': fs.readFileSync(fname,'utf8')
            };
            console.log('Compiling the contract')
            //Compile and Optimize the contract
            let compiledContract = solc.compile({sources: compileContract},1);
    
            //Get compiled contract
            let contract = compiledContract.contracts['Voter:Voter']
            //Save contract's ABI
            let abi = contract.interface;
            fs.writeFileSync('abi.json',abi);
    
            return contract;
}
    const networkUrl = 'https://eth-ropsten.alchemyapi.io/v2/-NLy1niAJ7eW9aDIhmiKoXmXxOHqrq6P';
function createWeb3()
{
            let weby3 = new Web3();
            weby3.setProvider(
                new Web3.providers.HtpProvider(networkUrl)
            )
            return weby3;
}
async function deployContract(web3, contract, sender)
{
            let Voter = new web3.eth.Contract(JSON.parse(contract.interface));
            let bytecode = '0x' + contract.bytecode;
            let gasEstimate = await web3.eth.estimateGas({data: bytecode});
    
            console.log('Deploying the contract')
            const constractInstance = await Voter.deploy({
                data: bytecode
            })
            .send({
                from: sender,
                gas: gasEstimate
            })
            .on('transactionHash', function(transactionHash){
                console.log(`Transaction hash: ${transactionHash}`);
            })
            .on('confirmation', function(confirmationNnumber, receipt){
                console.log(`confirmation Number: ${confirmationNnumber}`);
            })
            console.log(`Contract address : ${constractInstance.options.address}`);
}

