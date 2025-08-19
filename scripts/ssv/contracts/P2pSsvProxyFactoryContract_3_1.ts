import { getContract } from 'viem'
import { publicClient, walletClient } from '../../common/helpers/clients'

export const P2pSsvProxyFactoryAbi_3_1 = [{
  'inputs': [{
    'internalType': 'address',
    'name': '_p2pOrgUnlimitedEthDepositor',
    'type': 'address'
  }, { 'internalType': 'address', 'name': '_feeDistributorFactory', 'type': 'address' }, {
    'internalType': 'address',
    'name': '_referenceFeeDistributor',
    'type': 'address'
  }], 'stateMutability': 'nonpayable', 'type': 'constructor'
}, {
  'inputs': [{ 'internalType': 'address', 'name': '_address', 'type': 'address' }, {
    'internalType': 'address',
    'name': '_operator',
    'type': 'address'
  }, { 'internalType': 'address', 'name': '_owner', 'type': 'address' }],
  'name': 'Access__AddressNeitherOperatorNorOwner',
  'type': 'error'
}, {
  'inputs': [{ 'internalType': 'address', 'name': '_caller', 'type': 'address' }, {
    'internalType': 'address',
    'name': '_operator',
    'type': 'address'
  }, { 'internalType': 'address', 'name': '_owner', 'type': 'address' }],
  'name': 'Access__CallerNeitherOperatorNorOwner',
  'type': 'error'
}, {
  'inputs': [{ 'internalType': 'address', 'name': '_operator', 'type': 'address' }],
  'name': 'Access__SameOperator',
  'type': 'error'
}, { 'inputs': [], 'name': 'Access__ZeroNewOperator', 'type': 'error' }, {
  'inputs': [{
    'internalType': 'address',
    'name': '_recipient',
    'type': 'address'
  }, { 'internalType': 'uint256', 'name': '_amount', 'type': 'uint256' }],
  'name': 'AssetRecoverer__TransferFailed',
  'type': 'error'
}, { 'inputs': [], 'name': 'Ownable2Step__CallerNotNewOwner', 'type': 'error' }, {
  'inputs': [],
  'name': 'Ownable2Step__NewOwnerShouldNotBeCurrentOwner',
  'type': 'error'
}, {
  'inputs': [{ 'internalType': 'address', 'name': '_caller', 'type': 'address' }, {
    'internalType': 'address',
    'name': '_owner',
    'type': 'address'
  }], 'name': 'OwnableBase__CallerNotOwner', 'type': 'error'
}, {
  'inputs': [],
  'name': 'P2pSsvProxyFactory__CannotRemoveZeroAllowedSsvOperatorOwners',
  'type': 'error'
}, { 'inputs': [], 'name': 'P2pSsvProxyFactory__CannotRemoveZeroSelectors', 'type': 'error' }, {
  'inputs': [],
  'name': 'P2pSsvProxyFactory__CannotSetZeroAllowedSsvOperatorOwners',
  'type': 'error'
}, {
  'inputs': [],
  'name': 'P2pSsvProxyFactory__CannotSetZeroSelectors',
  'type': 'error'
}, {
  'inputs': [{
    'internalType': 'uint256',
    'name': '_ssvValidatorsLength',
    'type': 'uint256'
  }, { 'internalType': 'uint256', 'name': '_signaturesLength', 'type': 'uint256' }, {
    'internalType': 'uint256',
    'name': '_depositDataRootsLength',
    'type': 'uint256'
  }], 'name': 'P2pSsvProxyFactory__DepositDataArraysShouldHaveTheSameLength', 'type': 'error'
}, {
  'inputs': [{ 'internalType': 'uint64', 'name': '_ssvOperatorId', 'type': 'uint64' }],
  'name': 'P2pSsvProxyFactory__DuplicateIdsNotAllowed',
  'type': 'error'
}, {
  'inputs': [{
    'internalType': 'address',
    'name': '_ssvOperatorOwner',
    'type': 'address'
  }, { 'internalType': 'uint64', 'name': '_ssvOperatorId1', 'type': 'uint64' }, {
    'internalType': 'uint64',
    'name': '_ssvOperatorId2',
    'type': 'uint64'
  }], 'name': 'P2pSsvProxyFactory__DuplicateOperatorOwnersNotAllowed', 'type': 'error'
}, {
  'inputs': [{ 'internalType': 'uint256', 'name': '_actualEthValue', 'type': 'uint256' }],
  'name': 'P2pSsvProxyFactory__EthValueMustBe32TimesValidatorCount',
  'type': 'error'
}, {
  'inputs': [],
  'name': 'P2pSsvProxyFactory__MaxSsvTokenAmountPerValidatorExceeded',
  'type': 'error'
}, { 'inputs': [], 'name': 'P2pSsvProxyFactory__MaxSsvTokenAmountPerValidatorNotSet', 'type': 'error' }, {
  'inputs': [],
  'name': 'P2pSsvProxyFactory__MaxSsvTokenAmountPerValidatorOutOfRange',
  'type': 'error'
}, {
  'inputs': [{ 'internalType': 'address', 'name': '_caller', 'type': 'address' }],
  'name': 'P2pSsvProxyFactory__NotAllowedSsvOperatorOwner',
  'type': 'error'
}, {
  'inputs': [{ 'internalType': 'uint256', 'name': '_needed', 'type': 'uint256' }, {
    'internalType': 'uint256',
    'name': '_paid',
    'type': 'uint256'
  }], 'name': 'P2pSsvProxyFactory__NotEnoughEtherPaidToCoverSsvFees', 'type': 'error'
}, {
  'inputs': [{ 'internalType': 'address', 'name': '_passedAddress', 'type': 'address' }],
  'name': 'P2pSsvProxyFactory__NotFeeDistributor',
  'type': 'error'
}, {
  'inputs': [{ 'internalType': 'address', 'name': '_passedAddress', 'type': 'address' }],
  'name': 'P2pSsvProxyFactory__NotFeeDistributorFactory',
  'type': 'error'
}, {
  'inputs': [{ 'internalType': 'address', 'name': '_passedAddress', 'type': 'address' }],
  'name': 'P2pSsvProxyFactory__NotP2pOrgUnlimitedEthDepositor',
  'type': 'error'
}, {
  'inputs': [{ 'internalType': 'address', 'name': '_passedAddress', 'type': 'address' }],
  'name': 'P2pSsvProxyFactory__NotP2pSsvProxy',
  'type': 'error'
}, {
  'inputs': [{ 'internalType': 'address', 'name': '_feeDistributorInstance', 'type': 'address' }],
  'name': 'P2pSsvProxyFactory__P2pSsvProxyDoesNotExist',
  'type': 'error'
}, {
  'inputs': [{ 'internalType': 'uint64', 'name': '_operatorId', 'type': 'uint64' }, {
    'internalType': 'address',
    'name': '_passedOwner',
    'type': 'address'
  }, { 'internalType': 'address', 'name': '_actualOwner', 'type': 'address' }],
  'name': 'P2pSsvProxyFactory__SsvOperatorIdDoesNotBelongToOwner',
  'type': 'error'
}, {
  'inputs': [{
    'internalType': 'address',
    'name': '_ssvOperatorOwner',
    'type': 'address'
  }, { 'internalType': 'uint64', 'name': '_ssvOperatorId', 'type': 'uint64' }],
  'name': 'P2pSsvProxyFactory__SsvOperatorNotAllowed',
  'type': 'error'
}, {
  'inputs': [{ 'internalType': 'address', 'name': '_ssvOperatorOwner', 'type': 'address' }],
  'name': 'P2pSsvProxyFactory__SsvOperatorOwnerAlreadyExists',
  'type': 'error'
}, {
  'inputs': [{ 'internalType': 'address', 'name': '_ssvOperatorOwner', 'type': 'address' }],
  'name': 'P2pSsvProxyFactory__SsvOperatorOwnerDoesNotExist',
  'type': 'error'
}, {
  'inputs': [{
    'internalType': 'uint256',
    'name': '_ssvOperatorOwnersLength',
    'type': 'uint256'
  }, { 'internalType': 'uint256', 'name': '_ssvOperatorIdsLength', 'type': 'uint256' }],
  'name': 'P2pSsvProxyFactory__SsvOperatorOwnersAndIdsMustHaveTheSameLength',
  'type': 'error'
}, {
  'inputs': [],
  'name': 'P2pSsvProxyFactory__SsvPerEthExchangeRateDividedByWeiNotSet',
  'type': 'error'
}, {
  'inputs': [],
  'name': 'P2pSsvProxyFactory__SsvPerEthExchangeRateDividedByWeiOutOfRange',
  'type': 'error'
}, { 'inputs': [], 'name': 'TokenRecoverer__NoBurn', 'type': 'error' }, {
  'anonymous': false,
  'inputs': [{ 'indexed': true, 'internalType': 'address', 'name': '_token', 'type': 'address' }, {
    'indexed': true,
    'internalType': 'address',
    'name': '_recipient',
    'type': 'address'
  }, { 'indexed': false, 'internalType': 'uint256', 'name': '_tokenId', 'type': 'uint256' }, {
    'indexed': false,
    'internalType': 'uint256',
    'name': '_amount',
    'type': 'uint256'
  }, { 'indexed': false, 'internalType': 'bytes', 'name': '_data', 'type': 'bytes' }],
  'name': 'ERC1155Transferred',
  'type': 'event'
}, {
  'anonymous': false,
  'inputs': [{ 'indexed': true, 'internalType': 'address', 'name': '_token', 'type': 'address' }, {
    'indexed': true,
    'internalType': 'address',
    'name': '_recipient',
    'type': 'address'
  }, { 'indexed': false, 'internalType': 'uint256', 'name': '_amount', 'type': 'uint256' }],
  'name': 'ERC20Transferred',
  'type': 'event'
}, {
  'anonymous': false,
  'inputs': [{ 'indexed': true, 'internalType': 'address', 'name': '_token', 'type': 'address' }, {
    'indexed': true,
    'internalType': 'address',
    'name': '_recipient',
    'type': 'address'
  }, { 'indexed': false, 'internalType': 'uint256', 'name': '_tokenId', 'type': 'uint256' }],
  'name': 'ERC721Transferred',
  'type': 'event'
}, {
  'anonymous': false,
  'inputs': [{
    'indexed': true,
    'internalType': 'address',
    'name': '_recipient',
    'type': 'address'
  }, { 'indexed': false, 'internalType': 'uint256', 'name': '_amount', 'type': 'uint256' }],
  'name': 'EtherTransferred',
  'type': 'event'
}, {
  'anonymous': false,
  'inputs': [{
    'indexed': true,
    'internalType': 'address',
    'name': '_previousOperator',
    'type': 'address'
  }, { 'indexed': true, 'internalType': 'address', 'name': '_newOperator', 'type': 'address' }],
  'name': 'OperatorChanged',
  'type': 'event'
}, {
  'anonymous': false,
  'inputs': [{
    'indexed': true,
    'internalType': 'address',
    'name': '_previousOwner',
    'type': 'address'
  }, { 'indexed': true, 'internalType': 'address', 'name': '_newOwner', 'type': 'address' }],
  'name': 'OwnershipTransferStarted',
  'type': 'event'
}, {
  'anonymous': false,
  'inputs': [{
    'indexed': true,
    'internalType': 'address',
    'name': '_previousOwner',
    'type': 'address'
  }, { 'indexed': true, 'internalType': 'address', 'name': '_newOwner', 'type': 'address' }],
  'name': 'OwnershipTransferred',
  'type': 'event'
}, {
  'anonymous': false,
  'inputs': [{ 'indexed': false, 'internalType': 'bytes4[]', 'name': '_selectors', 'type': 'bytes4[]' }],
  'name': 'P2pSsvProxyFactory__AllowedSelectorsForClientRemoved',
  'type': 'event'
}, {
  'anonymous': false,
  'inputs': [{ 'indexed': false, 'internalType': 'bytes4[]', 'name': '_selectors', 'type': 'bytes4[]' }],
  'name': 'P2pSsvProxyFactory__AllowedSelectorsForClientSet',
  'type': 'event'
}, {
  'anonymous': false,
  'inputs': [{ 'indexed': false, 'internalType': 'bytes4[]', 'name': '_selectors', 'type': 'bytes4[]' }],
  'name': 'P2pSsvProxyFactory__AllowedSelectorsForOperatorRemoved',
  'type': 'event'
}, {
  'anonymous': false,
  'inputs': [{ 'indexed': false, 'internalType': 'bytes4[]', 'name': '_selectors', 'type': 'bytes4[]' }],
  'name': 'P2pSsvProxyFactory__AllowedSelectorsForOperatorSet',
  'type': 'event'
}, {
  'anonymous': false,
  'inputs': [{
    'indexed': false,
    'internalType': 'address[]',
    'name': '_allowedSsvOperatorOwners',
    'type': 'address[]'
  }],
  'name': 'P2pSsvProxyFactory__AllowedSsvOperatorOwnersRemoved',
  'type': 'event'
}, {
  'anonymous': false,
  'inputs': [{
    'indexed': false,
    'internalType': 'address[]',
    'name': '_allowedSsvOperatorOwners',
    'type': 'address[]'
  }],
  'name': 'P2pSsvProxyFactory__AllowedSsvOperatorOwnersSet',
  'type': 'event'
}, {
  'anonymous': false,
  'inputs': [{ 'indexed': true, 'internalType': 'bytes32', 'name': '_depositId', 'type': 'bytes32' }, {
    'indexed': true,
    'internalType': 'address',
    'name': '_sender',
    'type': 'address'
  }, { 'indexed': true, 'internalType': 'address', 'name': '_p2pSsvProxy', 'type': 'address' }, {
    'indexed': false,
    'internalType': 'address',
    'name': '_feeDistributorInstance',
    'type': 'address'
  }, { 'indexed': false, 'internalType': 'uint256', 'name': '_ethAmountInWei', 'type': 'uint256' }],
  'name': 'P2pSsvProxyFactory__EthForSsvStakingDeposited',
  'type': 'event'
}, {
  'anonymous': false,
  'inputs': [{
    'indexed': false,
    'internalType': 'uint112',
    'name': '_maxSsvTokenAmountPerValidator',
    'type': 'uint112'
  }],
  'name': 'P2pSsvProxyFactory__MaxSsvTokenAmountPerValidatorSet',
  'type': 'event'
}, {
  'anonymous': false,
  'inputs': [{
    'indexed': true,
    'internalType': 'address',
    'name': '_p2pSsvProxy',
    'type': 'address'
  }, { 'indexed': true, 'internalType': 'address', 'name': '_client', 'type': 'address' }, {
    'indexed': true,
    'internalType': 'address',
    'name': '_feeDistributor',
    'type': 'address'
  }],
  'name': 'P2pSsvProxyFactory__P2pSsvProxyCreated',
  'type': 'event'
}, {
  'anonymous': false,
  'inputs': [{ 'indexed': true, 'internalType': 'address', 'name': '_referenceFeeDistributor', 'type': 'address' }],
  'name': 'P2pSsvProxyFactory__ReferenceFeeDistributorSet',
  'type': 'event'
}, {
  'anonymous': false,
  'inputs': [{ 'indexed': true, 'internalType': 'address', 'name': '_referenceP2pSsvProxy', 'type': 'address' }],
  'name': 'P2pSsvProxyFactory__ReferenceP2pSsvProxySet',
  'type': 'event'
}, {
  'anonymous': false,
  'inputs': [{ 'indexed': true, 'internalType': 'address', 'name': '_proxy', 'type': 'address' }],
  'name': 'P2pSsvProxyFactory__RegistrationCompleted',
  'type': 'event'
}, {
  'anonymous': false,
  'inputs': [{ 'indexed': true, 'internalType': 'address', 'name': '_ssvOperatorOwner', 'type': 'address' }],
  'name': 'P2pSsvProxyFactory__SsvOperatorIdsCleared',
  'type': 'event'
}, {
  'anonymous': false,
  'inputs': [{
    'indexed': true,
    'internalType': 'address',
    'name': '_ssvOperatorOwner',
    'type': 'address'
  }, { 'indexed': false, 'internalType': 'uint64[24]', 'name': '_operatorIds', 'type': 'uint64[24]' }],
  'name': 'P2pSsvProxyFactory__SsvOperatorIdsSet',
  'type': 'event'
}, {
  'anonymous': false,
  'inputs': [{
    'indexed': false,
    'internalType': 'uint112',
    'name': '_ssvPerEthExchangeRateDividedByWei',
    'type': 'uint112'
  }],
  'name': 'P2pSsvProxyFactory__SsvPerEthExchangeRateDividedByWeiSet',
  'type': 'event'
}, {
  'inputs': [],
  'name': 'acceptOwnership',
  'outputs': [],
  'stateMutability': 'nonpayable',
  'type': 'function'
}, {
  'inputs': [{
    'internalType': 'bytes32',
    'name': '_eth2WithdrawalCredentials',
    'type': 'bytes32'
  }, {
    'internalType': 'uint96',
    'name': '_ethAmountPerValidatorInWei',
    'type': 'uint96'
  }, {
    'components': [{
      'internalType': 'uint96',
      'name': 'basisPoints',
      'type': 'uint96'
    }, { 'internalType': 'address payable', 'name': 'recipient', 'type': 'address' }],
    'internalType': 'struct FeeRecipient',
    'name': '_clientConfig',
    'type': 'tuple'
  }, {
    'components': [{
      'internalType': 'uint96',
      'name': 'basisPoints',
      'type': 'uint96'
    }, { 'internalType': 'address payable', 'name': 'recipient', 'type': 'address' }],
    'internalType': 'struct FeeRecipient',
    'name': '_referrerConfig',
    'type': 'tuple'
  }, { 'internalType': 'bytes', 'name': '_extraData', 'type': 'bytes' }],
  'name': 'addEth',
  'outputs': [{ 'internalType': 'bytes32', 'name': '', 'type': 'bytes32' }, {
    'internalType': 'address',
    'name': '',
    'type': 'address'
  }, { 'internalType': 'address', 'name': '', 'type': 'address' }],
  'stateMutability': 'payable',
  'type': 'function'
}, {
  'inputs': [{ 'internalType': 'address', 'name': '_newOperator', 'type': 'address' }],
  'name': 'changeOperator',
  'outputs': [],
  'stateMutability': 'nonpayable',
  'type': 'function'
}, {
  'inputs': [{ 'internalType': 'address', 'name': '_address', 'type': 'address' }],
  'name': 'checkOperatorOrOwner',
  'outputs': [],
  'stateMutability': 'view',
  'type': 'function'
}, {
  'inputs': [{ 'internalType': 'address', 'name': '_ssvOperatorOwner', 'type': 'address' }],
  'name': 'clearSsvOperatorIds',
  'outputs': [],
  'stateMutability': 'nonpayable',
  'type': 'function'
}, {
  'inputs': [],
  'name': 'clearSsvOperatorIds',
  'outputs': [],
  'stateMutability': 'nonpayable',
  'type': 'function'
}, {
  'inputs': [{ 'internalType': 'address', 'name': '_feeDistributorInstance', 'type': 'address' }],
  'name': 'createP2pSsvProxy',
  'outputs': [{ 'internalType': 'address', 'name': 'p2pSsvProxyInstance', 'type': 'address' }],
  'stateMutability': 'nonpayable',
  'type': 'function'
}, {
  'inputs': [{
    'components': [{
      'internalType': 'bytes[]',
      'name': 'signatures',
      'type': 'bytes[]'
    }, { 'internalType': 'bytes32[]', 'name': 'depositDataRoots', 'type': 'bytes32[]' }],
    'internalType': 'struct DepositData',
    'name': '_depositData',
    'type': 'tuple'
  }, { 'internalType': 'address', 'name': '_withdrawalCredentialsAddress', 'type': 'address' }, {
    'components': [{
      'components': [{
        'internalType': 'address',
        'name': 'owner',
        'type': 'address'
      }, { 'internalType': 'uint64', 'name': 'id', 'type': 'uint64' }, {
        'internalType': 'bytes32',
        'name': 'snapshot',
        'type': 'bytes32'
      }, { 'internalType': 'uint256', 'name': 'fee', 'type': 'uint256' }],
      'internalType': 'struct SsvOperator[]',
      'name': 'ssvOperators',
      'type': 'tuple[]'
    }, {
      'components': [{ 'internalType': 'bytes', 'name': 'pubkey', 'type': 'bytes' }, {
        'internalType': 'bytes',
        'name': 'sharesData',
        'type': 'bytes'
      }], 'internalType': 'struct SsvValidator[]', 'name': 'ssvValidators', 'type': 'tuple[]'
    }, {
      'components': [{
        'internalType': 'uint32',
        'name': 'validatorCount',
        'type': 'uint32'
      }, { 'internalType': 'uint64', 'name': 'networkFeeIndex', 'type': 'uint64' }, {
        'internalType': 'uint64',
        'name': 'index',
        'type': 'uint64'
      }, { 'internalType': 'bool', 'name': 'active', 'type': 'bool' }, {
        'internalType': 'uint256',
        'name': 'balance',
        'type': 'uint256'
      }], 'internalType': 'struct ISSVNetworkCore.Cluster', 'name': 'cluster', 'type': 'tuple'
    }, { 'internalType': 'uint256', 'name': 'tokenAmount', 'type': 'uint256' }, {
      'internalType': 'bytes32',
      'name': 'ssvSlot0',
      'type': 'bytes32'
    }], 'internalType': 'struct SsvPayload', 'name': '_ssvPayload', 'type': 'tuple'
  }, {
    'components': [{
      'internalType': 'uint96',
      'name': 'basisPoints',
      'type': 'uint96'
    }, { 'internalType': 'address payable', 'name': 'recipient', 'type': 'address' }],
    'internalType': 'struct FeeRecipient',
    'name': '_clientConfig',
    'type': 'tuple'
  }, {
    'components': [{
      'internalType': 'uint96',
      'name': 'basisPoints',
      'type': 'uint96'
    }, { 'internalType': 'address payable', 'name': 'recipient', 'type': 'address' }],
    'internalType': 'struct FeeRecipient',
    'name': '_referrerConfig',
    'type': 'tuple'
  }],
  'name': 'depositEthAndRegisterValidators',
  'outputs': [{ 'internalType': 'address', 'name': 'p2pSsvProxy', 'type': 'address' }],
  'stateMutability': 'payable',
  'type': 'function'
}, {
  'inputs': [{
    'components': [{
      'internalType': 'bytes[]',
      'name': 'signatures',
      'type': 'bytes[]'
    }, { 'internalType': 'bytes32[]', 'name': 'depositDataRoots', 'type': 'bytes32[]' }],
    'internalType': 'struct DepositData',
    'name': '_depositData',
    'type': 'tuple'
  }, {
    'internalType': 'address',
    'name': '_withdrawalCredentialsAddress',
    'type': 'address'
  }, { 'internalType': 'address[]', 'name': '_operatorOwners', 'type': 'address[]' }, {
    'internalType': 'uint64[]',
    'name': '_operatorIds',
    'type': 'uint64[]'
  }, { 'internalType': 'bytes[]', 'name': '_publicKeys', 'type': 'bytes[]' }, {
    'internalType': 'bytes[]',
    'name': '_sharesData',
    'type': 'bytes[]'
  }, { 'internalType': 'uint256', 'name': '_amount', 'type': 'uint256' }, {
    'components': [{
      'internalType': 'uint32',
      'name': 'validatorCount',
      'type': 'uint32'
    }, { 'internalType': 'uint64', 'name': 'networkFeeIndex', 'type': 'uint64' }, {
      'internalType': 'uint64',
      'name': 'index',
      'type': 'uint64'
    }, { 'internalType': 'bool', 'name': 'active', 'type': 'bool' }, {
      'internalType': 'uint256',
      'name': 'balance',
      'type': 'uint256'
    }], 'internalType': 'struct ISSVNetworkCore.Cluster', 'name': '_cluster', 'type': 'tuple'
  }, {
    'components': [{
      'internalType': 'uint96',
      'name': 'basisPoints',
      'type': 'uint96'
    }, { 'internalType': 'address payable', 'name': 'recipient', 'type': 'address' }],
    'internalType': 'struct FeeRecipient',
    'name': '_clientConfig',
    'type': 'tuple'
  }, {
    'components': [{
      'internalType': 'uint96',
      'name': 'basisPoints',
      'type': 'uint96'
    }, { 'internalType': 'address payable', 'name': 'recipient', 'type': 'address' }],
    'internalType': 'struct FeeRecipient',
    'name': '_referrerConfig',
    'type': 'tuple'
  }],
  'name': 'depositEthAndRegisterValidators',
  'outputs': [{ 'internalType': 'address', 'name': 'p2pSsvProxy', 'type': 'address' }],
  'stateMutability': 'payable',
  'type': 'function'
}, {
  'inputs': [{ 'internalType': 'address', 'name': '_clusterOwner', 'type': 'address' }, {
    'internalType': 'uint256',
    'name': '_tokenAmount',
    'type': 'uint256'
  }, {
    'internalType': 'uint64[]',
    'name': '_operatorIds',
    'type': 'uint64[]'
  }, {
    'components': [{
      'internalType': 'uint32',
      'name': 'validatorCount',
      'type': 'uint32'
    }, { 'internalType': 'uint64', 'name': 'networkFeeIndex', 'type': 'uint64' }, {
      'internalType': 'uint64',
      'name': 'index',
      'type': 'uint64'
    }, { 'internalType': 'bool', 'name': 'active', 'type': 'bool' }, {
      'internalType': 'uint256',
      'name': 'balance',
      'type': 'uint256'
    }], 'internalType': 'struct ISSVNetworkCore.Cluster', 'name': '_cluster', 'type': 'tuple'
  }], 'name': 'depositToSSV', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'
}, {
  'inputs': [],
  'name': 'dismissOperator',
  'outputs': [],
  'stateMutability': 'nonpayable',
  'type': 'function'
}, {
  'inputs': [{ 'internalType': 'address', 'name': '_client', 'type': 'address' }],
  'name': 'getAllClientP2pSsvProxies',
  'outputs': [{ 'internalType': 'address[]', 'name': '', 'type': 'address[]' }],
  'stateMutability': 'view',
  'type': 'function'
}, {
  'inputs': [],
  'name': 'getAllP2pSsvProxies',
  'outputs': [{ 'internalType': 'address[]', 'name': '', 'type': 'address[]' }],
  'stateMutability': 'view',
  'type': 'function'
}, {
  'inputs': [{ 'internalType': 'address', 'name': '_ssvOperatorOwner', 'type': 'address' }],
  'name': 'getAllowedSsvOperatorIds',
  'outputs': [{ 'internalType': 'uint64[24]', 'name': '', 'type': 'uint64[24]' }],
  'stateMutability': 'view',
  'type': 'function'
}, {
  'inputs': [],
  'name': 'getAllowedSsvOperatorOwners',
  'outputs': [{ 'internalType': 'address[]', 'name': '', 'type': 'address[]' }],
  'stateMutability': 'view',
  'type': 'function'
}, {
  'inputs': [],
  'name': 'getFeeDistributorFactory',
  'outputs': [{ 'internalType': 'address', 'name': '', 'type': 'address' }],
  'stateMutability': 'view',
  'type': 'function'
}, {
  'inputs': [],
  'name': 'getMaxSsvTokenAmountPerValidator',
  'outputs': [{ 'internalType': 'uint112', 'name': '', 'type': 'uint112' }],
  'stateMutability': 'view',
  'type': 'function'
}, {
  'inputs': [{ 'internalType': 'uint256', 'name': '_tokenAmount', 'type': 'uint256' }],
  'name': 'getNeededAmountOfEtherToCoverSsvFees',
  'outputs': [{ 'internalType': 'uint256', 'name': '', 'type': 'uint256' }],
  'stateMutability': 'view',
  'type': 'function'
}, {
  'inputs': [],
  'name': 'getReferenceFeeDistributor',
  'outputs': [{ 'internalType': 'address', 'name': '', 'type': 'address' }],
  'stateMutability': 'view',
  'type': 'function'
}, {
  'inputs': [],
  'name': 'getReferenceP2pSsvProxy',
  'outputs': [{ 'internalType': 'address', 'name': '', 'type': 'address' }],
  'stateMutability': 'view',
  'type': 'function'
}, {
  'inputs': [],
  'name': 'getSsvPerEthExchangeRateDividedByWei',
  'outputs': [{ 'internalType': 'uint112', 'name': '', 'type': 'uint112' }],
  'stateMutability': 'view',
  'type': 'function'
}, {
  'inputs': [{ 'internalType': 'bytes4', 'name': '_selector', 'type': 'bytes4' }],
  'name': 'isClientSelectorAllowed',
  'outputs': [{ 'internalType': 'bool', 'name': '', 'type': 'bool' }],
  'stateMutability': 'view',
  'type': 'function'
}, {
  'inputs': [{ 'internalType': 'bytes4', 'name': '_selector', 'type': 'bytes4' }],
  'name': 'isOperatorSelectorAllowed',
  'outputs': [{ 'internalType': 'bool', 'name': '', 'type': 'bool' }],
  'stateMutability': 'view',
  'type': 'function'
}, {
  'inputs': [{ 'internalType': 'address', 'name': 'account', 'type': 'address' }, {
    'internalType': 'uint256',
    'name': '',
    'type': 'uint256'
  }],
  'name': 'isWhitelisted',
  'outputs': [{ 'internalType': 'bool', 'name': '', 'type': 'bool' }],
  'stateMutability': 'view',
  'type': 'function'
}, {
  'inputs': [{
    'internalType': 'bytes32',
    'name': '_eth2WithdrawalCredentials',
    'type': 'bytes32'
  }, { 'internalType': 'uint96', 'name': '_ethAmountPerValidatorInWei', 'type': 'uint96' }, {
    'internalType': 'address',
    'name': '_feeDistributorInstance',
    'type': 'address'
  }, {
    'components': [{
      'internalType': 'bytes[]',
      'name': 'signatures',
      'type': 'bytes[]'
    }, { 'internalType': 'bytes32[]', 'name': 'depositDataRoots', 'type': 'bytes32[]' }],
    'internalType': 'struct DepositData',
    'name': '_depositData',
    'type': 'tuple'
  }, { 'internalType': 'uint64[]', 'name': '_operatorIds', 'type': 'uint64[]' }, {
    'internalType': 'bytes[]',
    'name': '_publicKeys',
    'type': 'bytes[]'
  }, { 'internalType': 'bytes[]', 'name': '_sharesData', 'type': 'bytes[]' }, {
    'internalType': 'uint256',
    'name': '_amount',
    'type': 'uint256'
  }, {
    'components': [{
      'internalType': 'uint32',
      'name': 'validatorCount',
      'type': 'uint32'
    }, { 'internalType': 'uint64', 'name': 'networkFeeIndex', 'type': 'uint64' }, {
      'internalType': 'uint64',
      'name': 'index',
      'type': 'uint64'
    }, { 'internalType': 'bool', 'name': 'active', 'type': 'bool' }, {
      'internalType': 'uint256',
      'name': 'balance',
      'type': 'uint256'
    }], 'internalType': 'struct ISSVNetworkCore.Cluster', 'name': '_cluster', 'type': 'tuple'
  }],
  'name': 'makeBeaconDepositsAndRegisterValidators',
  'outputs': [{ 'internalType': 'address', 'name': 'p2pSsvProxy', 'type': 'address' }],
  'stateMutability': 'nonpayable',
  'type': 'function'
}, {
  'inputs': [],
  'name': 'operator',
  'outputs': [{ 'internalType': 'address', 'name': '', 'type': 'address' }],
  'stateMutability': 'view',
  'type': 'function'
}, {
  'inputs': [],
  'name': 'owner',
  'outputs': [{ 'internalType': 'address', 'name': '', 'type': 'address' }],
  'stateMutability': 'view',
  'type': 'function'
}, {
  'inputs': [],
  'name': 'pendingOwner',
  'outputs': [{ 'internalType': 'address', 'name': '', 'type': 'address' }],
  'stateMutability': 'view',
  'type': 'function'
}, {
  'inputs': [{
    'components': [{
      'internalType': 'uint96',
      'name': 'basisPoints',
      'type': 'uint96'
    }, { 'internalType': 'address payable', 'name': 'recipient', 'type': 'address' }],
    'internalType': 'struct FeeRecipient',
    'name': '_clientConfig',
    'type': 'tuple'
  }, {
    'components': [{
      'internalType': 'uint96',
      'name': 'basisPoints',
      'type': 'uint96'
    }, { 'internalType': 'address payable', 'name': 'recipient', 'type': 'address' }],
    'internalType': 'struct FeeRecipient',
    'name': '_referrerConfig',
    'type': 'tuple'
  }],
  'name': 'predictP2pSsvProxyAddress',
  'outputs': [{ 'internalType': 'address', 'name': '', 'type': 'address' }],
  'stateMutability': 'view',
  'type': 'function'
}, {
  'inputs': [{
    'internalType': 'address[]',
    'name': '_operatorOwners',
    'type': 'address[]'
  }, { 'internalType': 'uint64[]', 'name': '_operatorIds', 'type': 'uint64[]' }, {
    'internalType': 'bytes[]',
    'name': '_publicKeys',
    'type': 'bytes[]'
  }, { 'internalType': 'bytes[]', 'name': '_sharesData', 'type': 'bytes[]' }, {
    'internalType': 'uint256',
    'name': '_amount',
    'type': 'uint256'
  }, {
    'components': [{
      'internalType': 'uint32',
      'name': 'validatorCount',
      'type': 'uint32'
    }, { 'internalType': 'uint64', 'name': 'networkFeeIndex', 'type': 'uint64' }, {
      'internalType': 'uint64',
      'name': 'index',
      'type': 'uint64'
    }, { 'internalType': 'bool', 'name': 'active', 'type': 'bool' }, {
      'internalType': 'uint256',
      'name': 'balance',
      'type': 'uint256'
    }], 'internalType': 'struct ISSVNetworkCore.Cluster', 'name': '_cluster', 'type': 'tuple'
  }, {
    'components': [{
      'internalType': 'uint96',
      'name': 'basisPoints',
      'type': 'uint96'
    }, { 'internalType': 'address payable', 'name': 'recipient', 'type': 'address' }],
    'internalType': 'struct FeeRecipient',
    'name': '_clientConfig',
    'type': 'tuple'
  }, {
    'components': [{
      'internalType': 'uint96',
      'name': 'basisPoints',
      'type': 'uint96'
    }, { 'internalType': 'address payable', 'name': 'recipient', 'type': 'address' }],
    'internalType': 'struct FeeRecipient',
    'name': '_referrerConfig',
    'type': 'tuple'
  }],
  'name': 'registerValidators',
  'outputs': [{ 'internalType': 'address', 'name': 'p2pSsvProxy', 'type': 'address' }],
  'stateMutability': 'payable',
  'type': 'function'
}, {
  'inputs': [{ 'internalType': 'bytes4[]', 'name': '_selectors', 'type': 'bytes4[]' }],
  'name': 'removeAllowedSelectorsForClient',
  'outputs': [],
  'stateMutability': 'nonpayable',
  'type': 'function'
}, {
  'inputs': [{ 'internalType': 'bytes4[]', 'name': '_selectors', 'type': 'bytes4[]' }],
  'name': 'removeAllowedSelectorsForOperator',
  'outputs': [],
  'stateMutability': 'nonpayable',
  'type': 'function'
}, {
  'inputs': [{ 'internalType': 'address[]', 'name': '_allowedSsvOperatorOwnersToRemove', 'type': 'address[]' }],
  'name': 'removeAllowedSsvOperatorOwners',
  'outputs': [],
  'stateMutability': 'nonpayable',
  'type': 'function'
}, {
  'inputs': [{ 'internalType': 'bytes4[]', 'name': '_selectors', 'type': 'bytes4[]' }],
  'name': 'setAllowedSelectorsForClient',
  'outputs': [],
  'stateMutability': 'nonpayable',
  'type': 'function'
}, {
  'inputs': [{ 'internalType': 'bytes4[]', 'name': '_selectors', 'type': 'bytes4[]' }],
  'name': 'setAllowedSelectorsForOperator',
  'outputs': [],
  'stateMutability': 'nonpayable',
  'type': 'function'
}, {
  'inputs': [{ 'internalType': 'address[]', 'name': '_allowedSsvOperatorOwners', 'type': 'address[]' }],
  'name': 'setAllowedSsvOperatorOwners',
  'outputs': [],
  'stateMutability': 'nonpayable',
  'type': 'function'
}, {
  'inputs': [{ 'internalType': 'uint112', 'name': '_maxSsvTokenAmountPerValidator', 'type': 'uint112' }],
  'name': 'setMaxSsvTokenAmountPerValidator',
  'outputs': [],
  'stateMutability': 'nonpayable',
  'type': 'function'
}, {
  'inputs': [{ 'internalType': 'address', 'name': '_referenceFeeDistributor', 'type': 'address' }],
  'name': 'setReferenceFeeDistributor',
  'outputs': [],
  'stateMutability': 'nonpayable',
  'type': 'function'
}, {
  'inputs': [{ 'internalType': 'address', 'name': '_referenceP2pSsvProxy', 'type': 'address' }],
  'name': 'setReferenceP2pSsvProxy',
  'outputs': [],
  'stateMutability': 'nonpayable',
  'type': 'function'
}, {
  'inputs': [{ 'internalType': 'uint64[24]', 'name': '_operatorIds', 'type': 'uint64[24]' }],
  'name': 'setSsvOperatorIds',
  'outputs': [],
  'stateMutability': 'nonpayable',
  'type': 'function'
}, {
  'inputs': [{
    'internalType': 'uint64[24]',
    'name': '_operatorIds',
    'type': 'uint64[24]'
  }, { 'internalType': 'address', 'name': '_ssvOperatorOwner', 'type': 'address' }],
  'name': 'setSsvOperatorIds',
  'outputs': [],
  'stateMutability': 'nonpayable',
  'type': 'function'
}, {
  'inputs': [{ 'internalType': 'uint112', 'name': '_ssvPerEthExchangeRateDividedByWei', 'type': 'uint112' }],
  'name': 'setSsvPerEthExchangeRateDividedByWei',
  'outputs': [],
  'stateMutability': 'nonpayable',
  'type': 'function'
}, {
  'inputs': [{ 'internalType': 'bytes4', 'name': 'interfaceId', 'type': 'bytes4' }],
  'name': 'supportsInterface',
  'outputs': [{ 'internalType': 'bool', 'name': '', 'type': 'bool' }],
  'stateMutability': 'view',
  'type': 'function'
}, {
  'inputs': [{ 'internalType': 'address', 'name': '_token', 'type': 'address' }, {
    'internalType': 'address',
    'name': '_recipient',
    'type': 'address'
  }, { 'internalType': 'uint256', 'name': '_tokenId', 'type': 'uint256' }, {
    'internalType': 'uint256',
    'name': '_amount',
    'type': 'uint256'
  }, { 'internalType': 'bytes', 'name': '_data', 'type': 'bytes' }],
  'name': 'transferERC1155',
  'outputs': [],
  'stateMutability': 'nonpayable',
  'type': 'function'
}, {
  'inputs': [{ 'internalType': 'address', 'name': '_token', 'type': 'address' }, {
    'internalType': 'address',
    'name': '_recipient',
    'type': 'address'
  }, { 'internalType': 'uint256', 'name': '_amount', 'type': 'uint256' }],
  'name': 'transferERC20',
  'outputs': [],
  'stateMutability': 'nonpayable',
  'type': 'function'
}, {
  'inputs': [{ 'internalType': 'address', 'name': '_token', 'type': 'address' }, {
    'internalType': 'address',
    'name': '_recipient',
    'type': 'address'
  }, { 'internalType': 'uint256', 'name': '_tokenId', 'type': 'uint256' }],
  'name': 'transferERC721',
  'outputs': [],
  'stateMutability': 'nonpayable',
  'type': 'function'
}, {
  'inputs': [{ 'internalType': 'address', 'name': '_recipient', 'type': 'address' }, {
    'internalType': 'uint256',
    'name': '_amount',
    'type': 'uint256'
  }], 'name': 'transferEther', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'
}, {
  'inputs': [{ 'internalType': 'address', 'name': 'newOwner', 'type': 'address' }],
  'name': 'transferOwnership',
  'outputs': [],
  'stateMutability': 'nonpayable',
  'type': 'function'
}]

if (!process.env.P2P_SSV_PROXY_FACTORY_ADDRESS_3_1) {
  throw new Error('No P2P_SSV_PROXY_FACTORY_ADDRESS_3_1 in ENV')
}

export const P2pSsvProxyFactoryAddress_3_1 = process.env
  .P2P_SSV_PROXY_FACTORY_ADDRESS_3_1 as `0x${string}`

export const P2pSsvProxyFactoryContract_3_1 = getContract({
  address: P2pSsvProxyFactoryAddress_3_1,
  abi: P2pSsvProxyFactoryAbi_3_1,
  client: {
    public: publicClient,
    wallet: walletClient
  }
})
