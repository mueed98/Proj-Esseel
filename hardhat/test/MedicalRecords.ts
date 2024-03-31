import { expect } from "chai";
import hre from "hardhat";
import { MedicalRecords } from "../typechain-types";
import { Signer, ethers as v5ethers } from "v5ethers";

describe("MedicalRecords Contract", function () {
	let CONTRACT: MedicalRecords;
	let DOCTOR: any;
	let PATIENT: any;

	before(async () => {
		CONTRACT = await hre.ethers.deployContract("MedicalRecords");
		await CONTRACT.waitForDeployment();

		// signer 1 is doctor
		PATIENT = (await hre.ethers.getSigners())[1];
		// signer 2 is doctor
		DOCTOR = (await hre.ethers.getSigners())[2];
	});

	it("User Registration - Register user as a patient", async function () {
		const message = "Hello, world!";
		const messageHash = v5ethers.utils.hashMessage(message); // Sign the message

		const signature = await PATIENT.signMessage(message); // Split signature into r, s, v

		const signatureParts = v5ethers.utils.splitSignature(signature); // Get public key from the signed message

		const publicKey = v5ethers.utils.recoverPublicKey(
			messageHash,
			signatureParts
		);

		// v5ethers.utils.arrayify() converts the public key to a bytes
		await CONTRACT.connect(PATIENT).modifyUser(
			v5ethers.utils.arrayify(publicKey),
			1
		);
		expect(await CONTRACT.userRoles(PATIENT.address)).to.equal(1);

		const _key = await CONTRACT.connect(PATIENT).publicKeys(PATIENT.address);
		expect(v5ethers.utils.hexlify(_key)).to.equal(publicKey);
	});

	it("User Registration - Register a user as a doctor", async function () {
		// Create a message
		const message = "Hello, world!";
		const messageHash = v5ethers.utils.hashMessage(message);

		// Sign the message
		const signature = await DOCTOR.signMessage(message);

		// Split signature into r, s, v
		const signatureParts = v5ethers.utils.splitSignature(signature);

		// Get public key from the signed message
		const publicKey = v5ethers.utils.recoverPublicKey(
			messageHash,
			signatureParts
		);

		// v5ethers.utils.arrayify() converts the public key to a bytes
		await CONTRACT.connect(DOCTOR).modifyUser(
			v5ethers.utils.arrayify(publicKey),
			2
		);
		expect(await CONTRACT.userRoles(DOCTOR.address)).to.equal(2);

		const _key = await CONTRACT.connect(DOCTOR).publicKeys(DOCTOR.address);
		expect(v5ethers.utils.hexlify(_key)).to.equal(publicKey);
	});

	// it("Access Modification - Grant a doctor access to patient's record", async function () {
	// 	const signers = await ethers.getSigners();
	// 	await CONTRACT
	// 		.connect(signers[1])
	// 		.modifyAccess(signers[2].address, true, ethers.utils.toUtf8Bytes("file"));
	// 	expect(
	// 		(await CONTRACT.patients(signers[1].address))
	// 			.doctorPermission[signers[2].address]
	// 	).to.equal(true);
	// });

	// it("Access Modification - Revoke a doctor's access to patient's record", async function () {
	// 	const signers = await ethers.getSigners();
	// 	await CONTRACT
	// 		.connect(signers[1])
	// 		.modifyAccess(
	// 			signers[2].address,
	// 			false,
	// 			ethers.utils.toUtf8Bytes("file")
	// 		);
	// 	expect(
	// 		(await CONTRACT.patients(signers[1].address))
	// 			.doctorPermission[signers[2].address]
	// 	).to.equal(false);
	// });
});
