import "dotenv/config";
import {
  createPublicClient,
  createWalletClient,
  getContract,
  http,
  publicActions,
  parseAbi,
  formatEther,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { arbitrumSepolia } from "viem/chains";

const ERC721_ADDRESS = "0x405a199a637b246575483c94d6e5f1de5a5e3e6c"; // Arbitrum Sepolia
const WALLET_ADDRESS = "0x20c6F9006d563240031A1388f4f25726029a6368";

const main = async () => {
  const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`);

  const walletClient = createWalletClient({
    account,
    chain: arbitrumSepolia,
    transport: http(process.env.RPC_URL),
  }).extend(publicActions);

  const address = await walletClient.getAddresses();
  console.log(`The wallet address is ${address}`);

  const erc721Abi = parseAbi([
    "function tokenUri(uint256 token_id) external view returns (string memory)",
    "function totalSupply() external view returns (uint256)",
    "function mintToken(address to, string calldata token_uri) external",
    "function ownerOf(uint256 token_id) external view returns (address)",
  ]);

  /* const receipt = await walletClient.writeContract({
    address: ERC721_ADDRESS,
    abi: erc721Abi,
    functionName: "mintToken",
    args: [WALLET_ADDRESS, "URI of the token 1"],
    chain: arbitrumSepolia,
    account: account,
  });

  console.log(`Receipt: ${receipt}`); */

  const TOKEN_ID = 1n;

  const totalSupply = await walletClient.readContract({
    address: ERC721_ADDRESS,
    abi: erc721Abi,
    functionName: "totalSupply",
  });

  console.log(`The total supply is ${totalSupply}`);

  const tokenUri = await walletClient.readContract({
    address: ERC721_ADDRESS,
    abi: erc721Abi,
    functionName: "tokenUri",
    args: [TOKEN_ID],
  });

  console.log(`The token URI of the Token ${TOKEN_ID} is ${tokenUri}`);

  const ownerOf = await walletClient.readContract({
    address: ERC721_ADDRESS,
    abi: erc721Abi,
    functionName: "ownerOf",
    args: [TOKEN_ID],
  });

  console.log(`The owner of the Token ${TOKEN_ID} is ${ownerOf}`);
};

main();
