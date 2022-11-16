```mermaid
    sequenceDiagram
    actor user
    participant backend
    participant contract
    participant ipfs
    user->>+backend: creates NFT
    backend->>+contract: checks if combination is available
    backend->>+ipfs: stores NFT
    backend->>contract: set's metadata
    backend-->>-user: returns high quality NFT
```
