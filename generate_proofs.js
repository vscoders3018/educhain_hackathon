const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

// Example data: addresses and corresponding allocations
const addresses = [
  "0x342638f600571FeD792335040F8F0f77797150B2",  // Address 1
  "0x8143db5170b7b54f8011b4da16114a4d0cc798b23",  // Address 2
  "0x6b6c51b5e1321e944921ae5f1f8f321cc25c60559",  // Address 3
];
const allocations = [
  "100000000000000000000", // 100e18
  "200000000000000000000", // 200e18
  "500000000000000000000", // 500e18
];

// Generate leaf nodes (address + allocation)
const leaves = addresses.map((address, i) => {
  return keccak256(Buffer.concat([
    Buffer.from(address.slice(2), 'hex'),
    Buffer.from(BigInt(allocations[i]).toString(16).padStart(64, '0'), 'hex')
  ]));
});

// Create Merkle tree
const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });

// Get Merkle root (this will be used in the smart contract)
const merkleRoot = merkleTree.getHexRoot();
console.log("Merkle Root:", merkleRoot);

// Generate proofs for each leaf
const proofs = addresses.map((address, i) => {
  const leaf = leaves[i];
  const proof = merkleTree.getProof(leaf).map(p => `0x${p.data.toString('hex')}`);
  return proof;
});

// Output results
allocations.forEach((allocation, index) => {
  console.log(`Proof for allocation ${allocation}:`, proofs[index]);
  console.log(`Leaf for allocation ${allocation}:`, `0x${leaves[index].toString('hex')}`);
});
