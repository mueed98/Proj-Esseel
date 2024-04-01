import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MedicalRecordsModule = buildModule("MedicalRecordsModule", (m) => {
	const MedicalRecords = m.contract("MedicalRecords");

	return { MedicalRecords };
});

export default MedicalRecordsModule;
