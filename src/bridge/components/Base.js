// Helpers
import {
  validateMnemonic,
  validateNotEmpty,
  validateEthereumAddress,
  validateGalaxy,
  validatePoint,
  validateTicket,
  validateNetworkKey,
  validateNetworkSeed,
  validateShard
} from '../lib/validators';

import {
  prependSig,
} from '../lib/transformers';

// Buttons
import Button from './Button';
import UploadButton from './UploadButton';
// import Checkbox from './Checkbox';
import CheckboxButton from './CheckboxButton';
import Anchor from './Anchor';
// import ToggleButton from './ToggleButton';

// Input
import Form from './Form'
import Label from './Label';
import InnerLabel from './InnerLabel';
import InputCaption from './InputCaption';
import Input from './Input';
import Textarea from './Textarea';
import advancedInput from './advancedInput';

// Dropdowns
import DropdownItem from './DropdownItem';
import DropdownDivider from './DropdownDivider';
import InnerLabelDropdown from './InnerLabelDropdown';

// Path Control
import Breadcrumb from './Breadcrumb';
import BreadcrumbItem from './BreadcrumbItem';

// Layout
import Container from './Container';
import Col from './Col';
import Row from './Row';
// import FlexRow from './FlexRow';
// import FlexCol from './FlexCol';
import Spacing from './Spacing';

// Type
import H1 from './H1';
import H2 from './H2';
import H3 from './H3';
import H4 from './H4';
import P from './P';
import Code from './Code'
import Warning from './Warning'

// Misc
import ValidatedSigil from './ValidatedSigil';
import ValidatedBlockie from './ValidatedBlockie';
import Chevron from './icons/Chevron'
import ShowBlockie from './ShowBlockie'

// HOC validated form components

const RequiredInput = advancedInput({
  WrappedComponent: Input,
  validators: [
    validateNotEmpty,
  ],
});


const NetworkKeyInput = advancedInput({
  WrappedComponent: Input,
  validators: [
    validateNotEmpty,
    validateNetworkKey
  ],
});


const NetworkSeedInput = advancedInput({
  WrappedComponent: Input,
  validators: [
    validateNotEmpty,
    validateNetworkSeed
  ],
});


const AddressInput = advancedInput({
  WrappedComponent: Input,
  validators: [
    validateEthereumAddress,
    validateNotEmpty,
  ],
});


const MnemonicInput = advancedInput({
  WrappedComponent: Textarea,
  validators: [
    validateMnemonic,
    validateNotEmpty,
  ],
});

const GalaxyInput = advancedInput({
  WrappedComponent: Input,
  validators: [
    validateGalaxy,
    validateNotEmpty,
  ],
  transformers: [
    prependSig,
  ]
});

const PointInput = advancedInput({
  WrappedComponent: Input,
  validators: [
    validatePoint,
    validateNotEmpty,
  ],
  transformers: [
    prependSig,
  ]
});

const TicketInput = advancedInput({
  WrappedComponent: Input,
  validators: [
    validateTicket,
    validateNotEmpty,
  ],
  transformers: [
    prependSig,
  ]
});

const ShardInput = advancedInput({
  WrappedComponent: Input,
  validators: [
    validateShard
  ],
  transformers: [
  ]
});

export {
  Button,
  CheckboxButton,
  UploadButton,
  Anchor,
  InputCaption,

  Form,
  Label,
  Input,
  InnerLabel,
  Textarea,
  AddressInput,
  MnemonicInput,
  GalaxyInput,
  PointInput,
  TicketInput,
  ShardInput,
  RequiredInput,
  NetworkKeyInput,
  NetworkSeedInput,

  advancedInput,

  ValidatedSigil,
  ValidatedBlockie,
  ShowBlockie,

  DropdownItem,
  DropdownDivider,
  InnerLabelDropdown,

  Breadcrumb,
  BreadcrumbItem,

  Container,
  Col,
  Row,
  // FlexRow,
  // FlexCol,
  Spacing,

  H1,
  H2,
  H3,
  H4,
  P,
  Code,
  Warning,

  Chevron,
};
