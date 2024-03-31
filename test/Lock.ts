const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MedicalRecords", function () {
	let MedicalRecords;
	let medicalRecords;
	let owner;
	let addr1;
	let addr2;
	let addrs;

	beforeEach(async function () {
		MedicalRecords = await ethers.getContractFactory("MedicalRecords");
		[owner, addr1, addr2, ...addrs] = await ethers.getSigners();
		medicalRecords = await MedicalRecords.deploy();
		await medicalRecords.deployed();
	});

	describe("Deployment", function () {
		it("Should set the right owner", async function () {
			expect(await medicalRecords.owner()).to.equal(owner.address);
		});
	});

	describe("User Registration", function () {
		it("Should register a user as a patient", async function () {
			await medicalRecords.connect(addr1).modifyUser([0x1, 0x2], 0);
			expect(await medicalRecords.userRoles(addr1.address)).to.equal(0);
		});

		it("Should register a user as a doctor", async function () {
			await medicalRecords.connect(addr2).modifyUser([0x1, 0x2], 1);
			expect(await medicalRecords.userRoles(addr2.address)).to.equal(1);
		});
	});

	describe("Access Modification", function () {
		it("Should give a doctor access to patient's record", async function () {
			await medicalRecords
				.connect(addr1)
				.modifyAccess(addr2.address, true, ethers.utils.toUtf8Bytes("file"));
			expect(
				await medicalRecords
					.patients(addr1.address)
					.doctorPermission(addr2.address)
			).to.equal(true);
		});

		it("Should revoke a doctor's access to patient's record", async function () {
			await medicalRecords
				.connect(addr1)
				.modifyAccess(addr2.address, false, ethers.utils.toUtf8Bytes("file"));
			expect(
				await medicalRecords
					.patients(addr1.address)
					.doctorPermission(addr2.address)
			).to.equal(false);
		});
	});
});
