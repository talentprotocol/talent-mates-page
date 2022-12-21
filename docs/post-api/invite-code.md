# Invite code

Invite tokens should be generated with `crypto.uuid()` and should be concatenated with a prefix `invite-`.

This code will be passed by the frontend and checked on the `setTokenURI` step.
If the prefix is present on the code, the `Community Level` assigned to the metadata will be `0`

Having this behavior will allow us to offer minting codes to external people.