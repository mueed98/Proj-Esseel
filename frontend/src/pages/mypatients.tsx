// @ts-nocheck
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { NavDrawer } from "../components/drawer";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { ethers } from "ethers";
import { medicalRecordJson } from "./login";
import { SigningKey } from "ethers/lib/utils";
import { helper } from "../helper";

export const MyPatients = (): JSX.Element => {
  const [search, setSearch] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [compressedPDF, setCompressedPDF] = useState(null);
  const [fileContent, setFileContent] = useState<any>();

  const provider = new ethers.providers.Web3Provider(window?.ethereum);
  const signer = provider.getSigner();

  signer.getAddress().then((res) => setUserAddress(res));

  const MedicalRecordsContract = new ethers.Contract(
    "0xe6eDd92F2677f0E561Db49Da2b979DC70D15546a",
    medicalRecordJson,
    signer
  );

  // const saveFile = async () => {
  // const doctorPublicKeyHex = await MedicalRecordsContract.publicKeys(
  //   "0x1606Fdaef5Ca1620877775B0C6077Ca83260c047"
  // );

  // Convert the public key to a bytes array, which is what ethers.js expects
  // const doctorPublicKeyBytes = ethers.utils.arrayify(doctorPublicKeyHex);

  // Compute the shared secret
  // const sharedSecret = new SigningKey(
  //   "a44b6cb3bfa2a3dddc1bdb85b566156936ebdc7145e004ac25fe6ec269c9d52b"
  // ).computeSharedSecret(doctorPublicKeyBytes);

  // Encrypt the file with the shared secret
  // const FILE = await helper.compressPDF();
  // const encryptedFile = await helper.encrypt(FILE, sharedSecret);
  // const encryptedFileBytes = helper.base64ToBytes(encryptedFile);

  // Save the file for doctor
  //   await MedicalRecordsContract.modifyAccess(
  //     "0x1606Fdaef5Ca1620877775B0C6077Ca83260c047",
  //     true,
  //     encryptedFileBytes
  //   );
  // };

  // Use a file input to allow the user to select a PDF file
  const handleFileInputChange = async (event) => {
    const doctorPublicKeyHex = await MedicalRecordsContract.publicKeys(
      "0x1606Fdaef5Ca1620877775B0C6077Ca83260c047"
    );

    console.log(doctorPublicKeyHex, "doctorPublicKeyHex");

    // Convert the public key to a bytes array, which is what ethers.js expects
    const doctorPublicKeyBytes = ethers.utils.arrayify(doctorPublicKeyHex);

    console.log(doctorPublicKeyBytes, "doctorPublicKeyBytes");

    // Compute the shared secret
    const sharedSecret = new SigningKey(
      "0xa44b6cb3bfa2a3dddc1bdb85b566156936ebdc7145e004ac25fe6ec269c9d52b"
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
        "0x1606Fdaef5Ca1620877775B0C6077Ca83260c047",
        true,
        encryptedFileBytes
      );
    };

    reader.readAsArrayBuffer(file);
  };

  const getFile = async () => {
    const PATIENTPublicKeyHex = await MedicalRecordsContract.publicKeys(
      "0x1e6d684046f7d99f78639562bB17d53d3CEFc937"
    );
    console.log(PATIENTPublicKeyHex, "PATIENTPublicKeyHex");

    // const patientPublicKeyBytes = ethers.utils.arrayify(PATIENTPublicKeyHex);

    const sharedSecret = new SigningKey(
      "0x88d8b9f5044e81b0a31a9667cedef95358c18ee97a264482517d50992bc53970"
    ).computeSharedSecret(PATIENTPublicKeyHex);
    // ).computeSharedSecret(patientPublicKeyBytes);

    console.log(sharedSecret, "sharedSecret patient");

    const doctorFile = await MedicalRecordsContract.getDoctorFiles(
      "0x1e6d684046f7d99f78639562bB17d53d3CEFc937",
      "0x1606Fdaef5Ca1620877775B0C6077Ca83260c047"
    ); // Convert the encrypted file from bytes to base64

    console.log(doctorFile, "doctorFile");

    const encryptedFileBase64 = await helper.bytesToBase64(doctorFile); // Decrypt the base64 file

    console.log(encryptedFileBase64, "encryptedFileBase64");

    const decryptedFileBase64 = await helper.decrypt(
      encryptedFileBase64,
      sharedSecret
    ); // Decompress the file

    console.log(decryptedFileBase64, "decryptedFileBase64");

    await helper.decompressPDF(decryptedFileBase64, "doctor");
  };

  const checkSharedSecret = async () => {
    const doctorAdd = "0x1606Fdaef5Ca1620877775B0C6077Ca83260c047";
    const doctorPri =
      "0x88d8b9f5044e81b0a31a9667cedef95358c18ee97a264482517d50992bc53970";

    const patientAdd = "0x1e6d684046f7d99f78639562bB17d53d3CEFc937";
    const patientPri =
      "0xa44b6cb3bfa2a3dddc1bdb85b566156936ebdc7145e004ac25fe6ec269c9d52b";

    const doctorPublicKeyHex = await MedicalRecordsContract.publicKeys(
      doctorAdd
    );
    const doctorPublicKeyBytes = ethers.utils.arrayify(doctorPublicKeyHex);
    const patientPublicKeyHex = await MedicalRecordsContract.publicKeys(
      patientAdd
    );
    const patientPublicKeyBytes = ethers.utils.arrayify(patientPublicKeyHex);

    // console.log(doctorPublicKeyHex,patientPublicKeyHex,"publickey");
    // console.log(doctorPublicKeyHex,patientPublicKeyHex,"publickey");

    console.log(
      ethers.utils.computePublicKey(patientPri),
      patientPublicKeyHex,
      "patient"
    );
    console.log(
      ethers.utils.computePublicKey(doctorPri),
      doctorPublicKeyHex,
      "doctor"
    );

    const sharedSecret_P = new SigningKey(patientPri).computeSharedSecret(
      doctorPublicKeyBytes
    );

    const sharedSecret_D = new SigningKey(doctorPri).computeSharedSecret(
      patientPublicKeyBytes
    );
    // console.log(sharedSecret_P,sharedSecret_D,"shared sector");
  };

  return (
    // console.log(fileContent, "fileCOntent"),
    <Box display="flex">
      <NavDrawer />

      <Box marginLeft="210px" marginTop="20px">
        <Typography variant="h6" fontWeight="800" color="black">
          My Patients
        </Typography>

        {/* <TextField
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        size="small"
        sx={{ width: "70vw", marginTop: "20px" }}
        placeholder="Search for patients."
        InputProps={{
          sx: { borderRadius: "50px", backgroundColor: "white" },
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      /> */}

        <div>
          <input type="file" onChange={handleFileInputChange} />
          {compressedPDF && (
            <a
              href={`data:application/pdf;base64,${compressedPDF}`}
              download="compressed_pdf.pdf"
            >
              Download Compressed PDF
            </a>
          )}
        </div>

        <Button variant="contained" onClick={getFile}>
          Login
        </Button>
      </Box>
    </Box>
  );
};
