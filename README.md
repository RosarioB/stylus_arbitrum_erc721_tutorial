# stylus_arbitrum_erc721_tutorial
This is the source code of this [Youtube video](https://www.youtube.com/watch?v=jEBY_U2scJc).

The folder `stylus` containes the code code of the Stylus project to compile and deploy the smart contract.

The folder `viem_project` contains a Node.js project with Typescript and viem to interact with the smart contract.

Add a `.env` file inside `viem_project` with

```
PRIVATE_KEY=your_private_key
RPC_URL=your_rpc_url
```
Install dependencies with `pnpm i`

Run with `pnpm run dev`