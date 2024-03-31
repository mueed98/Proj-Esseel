// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// Contract to handle the storage of Medical Records
contract MedicalRecords {
    // Define roles for users
    enum Role {
        None,
        Patient,
        Doctor
    }

    // Patient struct
    struct Patient {
        bytes encryptedIPFSLink; // Encrypted IPFS link to the patient's medical record
        mapping(address => bool) doctorPermission; // Mapping to keep track of doctors authorized to access the medical record
        mapping(address => bytes) doctorFiles; // Mapping to keep track of files associated with each authorized doctor
    }

    // Mapping from user's address to their public keys
    mapping(address => bytes32[2]) public publicKeys;
    // Mapping from user's address to their roles
    mapping(address => Role) public userRoles;
    // Mapping from patient's address to their records
    mapping(address => Patient) public patients;

    // Modifier for role-based access control
    modifier onlyRole(Role _role) {
        require(userRoles[msg.sender] == _role, "Not authorized.");
        _;
    }

    // Empty constructor
    constructor() {}

    // Function to save encrypted IPFS link
    // This function allows a patient to save their encrypted IPFS link to their medical records
    function saveEncryptedIPFSLink(
        bytes calldata _encryptedLink
    ) public onlyRole(Role.Patient) {
        patients[msg.sender].encryptedIPFSLink = _encryptedLink;
    }

    // Function to store public keys and assign roles
    // This function allows a user to store their public key and assign their role
    function modifyUser(bytes32[2] memory publicKey, Role _role) public {
        require(_role == Role.Patient || _role == Role.Doctor, "Invalid role.");
        publicKeys[msg.sender] = publicKey;
        userRoles[msg.sender] = _role;
    }

    // Function to modify doctor access to patient's medical record
    // This function allows a patient to give or revoke a doctor's access to their medical records
    function modifyAccess(
        address _doctor,
        bool _giveAccess,
        bytes calldata _fileForDoctor
    ) public onlyRole(Role.Patient) {
        if (!_giveAccess) {
            delete patients[msg.sender].doctorPermission[_doctor];
            delete patients[msg.sender].doctorFiles[_doctor];
        } else {
            patients[msg.sender].doctorPermission[_doctor] = true;
            patients[msg.sender].doctorFiles[_doctor] = _fileForDoctor;
        }
    }

    // Function for doctor to read patient's encrypted IPFS link
    // This function allows an authorized doctor to read the encrypted IPFS link to a patient's medical record
    function readEncryptedIPFSLink(
        address _patient
    ) public view onlyRole(Role.Doctor) returns (bytes memory) {
        require(
            patients[_patient].doctorPermission[msg.sender],
            "You do not have access to this patient's medical record."
        );
        return patients[_patient].doctorFiles[msg.sender];
    }
}
