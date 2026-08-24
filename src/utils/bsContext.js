import React from 'react';

// React 19 removed legacy context. These components used it to cascade $bs_*
// descriptors down the tree; this single context carries the same merged
// object, so every existing this.context.$bs_* read keeps working unchanged.
// Each provider merges the context it inherits, the way legacy context
// accumulated keys on the way down.
export default React.createContext({});
