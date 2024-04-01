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

type ClientType = "Patient" | "Doctor";

declare global {
  interface Window {
    ethereum: any;
  }
}

export const Login = (): JSX.Element => {
  const [type, setType] = useState<ClientType>("Doctor");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const provider = new ethers.providers.Web3Provider(window?.ethereum);

  const [errorMessage, setErrorMessage] = useState("");
  const [defaultAccount, setDefaultAccount] = useState("");
  const [userBalance, setUserBalance] = useState("");

  const accountChangedHandler = async (newAccount) => {
    const address = await newAccount.getAddress();
    setDefaultAccount(address);
    // const balance = await newAccount.getBalance();
    // setUserBalance(ethers.utils.formatEther(balance));

    const message = "Hello, world!";
    const messageHash = ethers.utils.hashMessage(message);

    const signer = await provider.getSigner();
    const signature = await signer.signMessage(messageHash);
    console.log(signature);

    const signatureParts = ethers.utils.splitSignature(signature); // Get public key from the signed message

    const publicKey = ethers.utils.recoverPublicKey(
      messageHash,
      signatureParts
    );

    const MedicalRecordsContract = new ethers.Contract(
      "0x72bD6C0BCE7D547c2cC56A35dC2bEB3151cEE369",
      medicalRecordJson,
      signer
    );

    // v5ethers.utils.arrayify() converts the public key to a bytes
    const check = await MedicalRecordsContract.modifyUser(
      ethers.utils.arrayify(publicKey),
      1
    );

    console.log(check);

    // const address = await signer.getAddress();
  };

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
        height="255px"
      >
        <Box>
          <Typography>I am a:</Typography>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value as ClientType)}
            sx={{ height: "35px", width: "100%" }}
          >
            <MenuItem value={"Doctor"}>Doctor</MenuItem>
            <MenuItem value={"Patient"}>Patient</MenuItem>
          </Select>
        </Box>

        <Box>
          <Typography sx={{ paddingTop: "5px" }}>Username</Typography>
          <TextField
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            size="small"
          />
        </Box>

        <Box>
          <Typography sx={{ paddingTop: "5px" }}>Password</Typography>
          <TextField
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="small"
          />
        </Box>

        <Button variant="contained" onClick={connectwalletHandler}>
          Login
        </Button>
      </Box>
    </Box>
  );
};

const medicalRecordJson = [
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
