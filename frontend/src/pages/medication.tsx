import {
  Avatar,
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { NavDrawer } from "../components/drawer";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { ethers } from "ethers";
import { medicalRecordJson } from "./login";
import { SigningKey } from "ethers/lib/utils";
import { helper } from "../helper";
import { MedicalRecordContractAdd } from "../contract";
import { useNavigate } from "react-router-dom";

export const Medication = (): JSX.Element => {
  const userType = sessionStorage.getItem("type");
  const [list, setList] = useState([]);
  const [userAddress, setUserAddress] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!(userType === "patient" || userType === "doctor")) {
      navigate("/");
    }
  }, [userType]);

  const [selectedDoc, setselectedDoc] = useState("");
  const [privateKey, setprivateKey] = useState("");

  const provider = new ethers.providers.Web3Provider(window?.ethereum);
  const signer = provider.getSigner();

  signer.getAddress().then((res) => setUserAddress(res));

  const MedicalRecordsContract = new ethers.Contract(
    // "0xe6eDd92F2677f0E561Db49Da2b979DC70D15546a",
    MedicalRecordContractAdd,
    medicalRecordJson,
    signer
  );

  const getList = async () => {
    if (userType === "patient") {
      const docCount = await MedicalRecordsContract.docterCount();

      for (let i = 0; i < docCount; i++) {
        const docterListAdd = await MedicalRecordsContract.docterList(i);

        setList((prev) => {
          if (prev.includes(docterListAdd.toString())) {
            return [...prev];
          } else {
            return [...prev, docterListAdd.toString()];
          }
        });
      }
    } else {
      const patCount = await MedicalRecordsContract.patientCount();

      for (let i = 0; i < patCount; i++) {
        const patientListAdd = await MedicalRecordsContract.patientList(i);

        setList((prev) => {
          if (prev.includes(patientListAdd.toString())) {
            return [...prev];
          } else {
            return [...prev, patientListAdd.toString()];
          }
        });
      }
    }
  };

  useEffect(() => {
    getList();
  }, [userType]);

  const handleFileInputChange = async (event) => {
    const doctorPublicKeyHex = await MedicalRecordsContract.publicKeys(
      // "0x1606Fdaef5Ca1620877775B0C6077Ca83260c047"
      selectedDoc
    );

    console.log(doctorPublicKeyHex, "doctorPublicKeyHex");

    // Convert the public key to a bytes array, which is what ethers.js expects
    const doctorPublicKeyBytes = ethers.utils.arrayify(doctorPublicKeyHex);

    console.log(doctorPublicKeyBytes, "doctorPublicKeyBytes");

    // Compute the shared secret
    const sharedSecret = new SigningKey(
      // "0xa44b6cb3bfa2a3dddc1bdb85b566156936ebdc7145e004ac25fe6ec269c9d52b"
      privateKey
    ).computeSharedSecret(doctorPublicKeyBytes);

    console.log(sharedSecret, "sharedSecret doctor");

    const file = event.target.files[0];
    const reader = new FileReader();
    console.log(file, "file");

    reader.onload = async (event) => {
      const content = event.target.result;
      // setFileContent(content);

      const FILE = await helper.compressPDF(content);
      console.log(FILE, "FILE");
      const encryptedFile = await helper.encrypt(FILE, sharedSecret);
      console.log(encryptedFile, "encryptedFile");

      const encryptedFileBytes = helper.base64ToBytes(encryptedFile);
      console.log(encryptedFileBytes, "encryptedFileBytes");

      // Save the file for doctor
      await MedicalRecordsContract.modifyAccess(
        // "0x1606Fdaef5Ca1620877775B0C6077Ca83260c047",
        selectedDoc,
        true,
        encryptedFileBytes
      );
    };

    reader.readAsArrayBuffer(file);
  };

  const signAndUpload = async (event) => {
    const message = "You are creating signature for medication file";
    const signature = await window?.ethereum.request({
      method: "personal_sign",
      params: [userAddress, message],
    });

    const KEY = ethers.utils.keccak256(signature);

    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      const content = event.target.result;

      const FILE = await helper.compressPDF(content);
      const encryptedFile = await helper.encrypt(FILE, KEY);
      const encryptedFileBytes = helper.base64ToBytes(encryptedFile);

      await MedicalRecordsContract.uploadMedicationRecord(encryptedFileBytes);
    };

    reader.readAsArrayBuffer(file);
  };

  const getMedication = async () => {
    const message = "You are creating signature for medication file";
    const signature = await window?.ethereum.request({
      method: "personal_sign",
      params: [userAddress, message],
    });

    const KEY = ethers.utils.keccak256(signature);

    const patientFile = await MedicalRecordsContract.getMedicationRecord();
    const encryptedFileBase64 = await helper.bytesToBase64(patientFile);
    const decryptedFileBase64 = await helper.decrypt(encryptedFileBase64, KEY); // Decompress the file

    await helper.decompressPDF(decryptedFileBase64, "read-medication");
  };

  return (
    <Box display="flex">
      <NavDrawer />

      <Box>
        <Box marginLeft="310px" marginTop="50px">
          <Typography variant="h6" fontWeight="800" color="black">
            Upload your medication.
          </Typography>

          <Typography
            variant="body1"
            fontWeight="800"
            color="black"
            marginTop="20px"
          >
            Step 1: Choose your pdf to upload
          </Typography>

          <input
            type="file"
            onChange={signAndUpload}
            style={{ marginTop: "5px" }}
            accept="application/pdf"
          />
        </Box>

        <Box marginLeft="310px" marginTop="50px">
          <Typography variant="h6" fontWeight="800" color="black">
            Get your medication.
          </Typography>

          <Typography
            variant="body1"
            fontWeight="800"
            color="black"
            marginTop="20px"
          >
            Step 1: Get you pdf
          </Typography>

          {/* <input
            type="file"
            onChange={signAndUpload}
            style={{ marginTop: "5px" }}
            accept="application/pdf"
          /> */}
          <Button variant="contained" onClick={getMedication}>
            Get your pdf
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
