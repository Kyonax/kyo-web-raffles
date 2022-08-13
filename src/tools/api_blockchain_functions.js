const theblockchainapi = require('theblockchainapi');
const Api = require("./functions");
//Keys 
let defaultClient = theblockchainapi.ApiClient.instance;

let APIKeyID = defaultClient.authentications['APIKeyID'];
APIKeyID.apiKey = 'Jg7gGpZ7E0qjtJ2';

let APISecretKey = defaultClient.authentications['APISecretKey'];
APISecretKey.apiKey = 'Pr9iSo0eIoProXA';

let apiInstance = new theblockchainapi.SolanaNFTApi();
let apiInstanceToken = new theblockchainapi.TokenApi();
let blockchain = "solana"; // only supported for Solana     
let network = 'mainnet-beta'; // String | The network ID (devnet, mainnet-beta)
//Functions of APP - Everything Important

export async function getNFTData(address) {

    let data_api = null
    await apiInstance.solanaGetNFT(network, address).then((data) => {
        data_api = data;
    }, (error) => {
        console.error(error);
    });
    return data_api
}

export async function getTokenMetadata(address) {

    let tokenBlockchainIdentifier = address;
    const token = await apiInstanceToken.getTokenMetadata(blockchain, network, tokenBlockchainIdentifier);

    return token;
}


export async function getTokenMetadataSolscan(address) {

    let url = `https://public-api.solscan.io/token/meta?tokenAddress=${address}`, _token = Api.axiosGet(url);
    return _token;
}

export async function getDataStaking(key) {

    let url = `https://floppylabs.io/api/staked?key=${key}`, _data = Api.axiosGet(url);
    return _data
}

