import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { ethers } from "ethers";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type ClientType = 1 | 2;

declare global {
  interface Window {
    ethereum: any;
  }
}

export const Login = (): JSX.Element => {
  const [typeUser, setTypeUser] = useState<ClientType>(1);

  const [errorMessage, setErrorMessage] = useState("");
  const [defaultAccount, setDefaultAccount] = useState("");

  const provider = new ethers.providers.Web3Provider(window?.ethereum);
  let MedicalRecordsContract;
  const navigate = useNavigate();

  const checkPatDocExists = async (userAddress) => {
    if (typeUser === 1) {
      const patientCount = await MedicalRecordsContract.patientCount();

      for (let i = 0; i < patientCount; i++) {
        // const element = array[i];
        const patientListAdd = await MedicalRecordsContract.patientList(i);

        if (String(patientListAdd) === String(userAddress)) {
          return true;
        }
      }
    } else {
      const docCount = await MedicalRecordsContract.docterCount();

      for (let i = 0; i < docCount; i++) {
        // const element = array[i];
        const docterListAdd = await MedicalRecordsContract.docterList(i);

        if (String(docterListAdd) === String(userAddress)) {
          return true;
        }
      }
    }

    return false;
  };

  const accountChangedHandler = async (newAccount) => {
    const address = await newAccount.getAddress();
    setDefaultAccount(address);

    const signer = await provider.getSigner();

    MedicalRecordsContract = new ethers.Contract(
      "0xe6eDd92F2677f0E561Db49Da2b979DC70D15546a",
      medicalRecordJson,
      signer
    );

    const checkUserxists = await checkPatDocExists(address);

    if (checkUserxists) {
      if (typeUser === 1) {
        navigate("/MyPatients");
      } else {
        navigate("/DrPortal");
      }
    } else {
      const message = "Hello, world!";
      const messageHash = ethers.utils.hashMessage(message);

      // const signer = await provider.getSigner();
      // const signature = await signer.signMessage(messageHash);
      const signature = await window?.ethereum.request({
        method: "personal_sign",
        params: [address, message],
      });

      const signatureParts = ethers.utils.splitSignature(signature);

      const publicKey = ethers.utils.recoverPublicKey(
        messageHash,
        signatureParts
      );
      // MedicalRecordsContract; = new ethers.Contract(
      //   "0x72bD6C0BCE7D547c2cC56A35dC2bEB3151cEE369",
      //   medicalRecordJson,
      //   signer
      // );

      // v5ethers.utils.arrayify() converts the public key to a bytes
      const check = await MedicalRecordsContract.modifyUser(
        ethers.utils.arrayify(publicKey),
        typeUser
      );

      // console.log(publicKey, "publickey");
      // console.log(
      //   ethers.utils.computePublicKey(
      //     "0xa44b6cb3bfa2a3dddc1bdb85b566156936ebdc7145e004ac25fe6ec269c9d52b"
      //   ),
      //   "gen"
      // );

      if (typeUser === 1) {
        navigate("/MyPatients");
      } else {
        navigate("/DrPortal");
      }
    }

    // const address = await signer.getAddress();
  };

  //   async function comparePublicKeys() {
  //     // Connect to the MetaMask provider
  //     const provider = new providers.Web3Provider((window as any).ethereum);
  //     const signer = provider.getSigner();

  //     // Get the account's private key
  //     const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
  //     const account = accounts[0];
  //     const privateKey = "your private key here"; // replace with actual private key

  //     // Sign a message using MetaMask
  //     const message =
  // // Recover the public key from the signed message
  //     const messageHash = ethers.utils.hashMessage(message);
  //     const signatureParts = ethers.utils.splitSignature(signature);
  //     const publicKeyFromSignature = ethers.utils.recoverPublicKey(messageHash, signatureParts);

  //     // Compute the public key from the private key
  //     const publicKeyFromPrivateKey = ethers.utils.computePublicKey(privateKey);

  //     // Compare the two public keys
  //     // console.log(`Public key from signature: ${publicKeyFro
  //   }

  const connectwalletHandler = () => {
    if (window.ethereum) {
      provider.send("eth_requestAccounts", []).then(async () => {
        await accountChangedHandler(provider.getSigner());
      });
    } else {
      setErrorMessage("Please Install MetaMask!!!");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="98vh"
      width="98vw"
      sx={{ backgroundColor: "#f4f4f4" }}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        sx={{
          padding: "20px",
          borderRadius: "10px",
          backgroundColor: "white",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1);",
        }}
        width="195px"
        height="150px"
      >
        <Box>
          <Typography>I am a:</Typography>
          <Select
            value={typeUser}
            onChange={(e) => setTypeUser(e.target.value as ClientType)}
            sx={{ height: "35px", width: "100%" }}
          >
            <MenuItem value={2}>Doctor</MenuItem>
            <MenuItem value={1}>Patient</MenuItem>
          </Select>
        </Box>

        {/* <Box>
          <Typography sx={{ paddingTop: "5px" }}>Username</Typography>
          <TextField
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            size="small"
          />
        </Box> */}

        {/* <Box>
          <Typography sx={{ paddingTop: "5px" }}>Password</Typography>
          <TextField
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="small"
          />
        </Box> */}

        <Button variant="contained" onClick={connectwalletHandler}>
          Login with metamask
        </Button>
      </Box>
    </Box>
  );
};

export const medicalRecordJson = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "docterAccess",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "docterCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "docterList",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_patient",
        type: "address",
      },
      {
        internalType: "address",
        name: "_doctor",
        type: "address",
      },
    ],
    name: "getDoctorFiles",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_patient",
        type: "address",
      },
      {
        internalType: "address",
        name: "_doctor",
        type: "address",
      },
    ],
    name: "getDoctorPermission",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_doctor",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_giveAccess",
        type: "bool",
      },
      {
        internalType: "bytes",
        name: "_fileForDoctor",
        type: "bytes",
      },
    ],
    name: "modifyAccess",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "publicKey",
        type: "bytes",
      },
      {
        internalType: "enum MedicalRecords.Role",
        name: "_role",
        type: "uint8",
      },
    ],
    name: "modifyUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "patientCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "patientList",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "patients",
    outputs: [
      {
        internalType: "bool",
        name: "exists",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "publicKeys",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "userRoles",
    outputs: [
      {
        internalType: "enum MedicalRecords.Role",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
