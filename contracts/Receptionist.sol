// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import './Pharmacy.sol'; // To Access Pharmacy's Functions
import './Laboratory.sol';
import './Nurse.sol';
import './_Attendant.sol';
import './_Patient.sol';
import './Doctor.sol';


contract Receptionist{
    address receptionist;
    constructor() {
        receptionist= 0xd5f766E8F18E87F635D5C125dba0949078f71dc3;
    }
    modifier isRecep(){
        require(msg.sender == receptionist,"ACCESS DENIED, NOT RECEPTIONIST");
        _;
    }

    //  Add Patient
    function add_patient(address _Contract,address _DoctorContract, address _AttendantContract, address pat_address,uint _pat_id, string memory Name, uint Age, string memory Gender, uint Phone_no, string memory Date) public isRecep{
        _Patient P = _Patient(_Contract);
        P.addPatient(_DoctorContract,_AttendantContract,pat_address,_pat_id,Name,Age,Gender,Phone_no,Date);
    }

    // Add Attendant
    function add_attendant(address _Contract, address _adss, uint _id, string memory _name, uint _age, string memory _gender, uint _phone_no) public isRecep{
        _Attendant A = _Attendant(_Contract);
        A.addAttendant(_adss,_id,_name,_age,_gender,_phone_no);
    }
    // Assign Attendant
    function assign_attendant(address _Contract,address _address, uint _pat_id, uint _at_id,string memory _name, uint _age, string memory _gender, uint _phone_no ) public isRecep{
        _Patient P = _Patient(_Contract);
        P.assignAttendant(_address,_pat_id,_at_id,_name,_age,_gender,_phone_no);

    }

    // Add Doctor
    function add_doctor(address _Contract, address _address, uint _id, string memory _name, uint _age, string memory _gender, uint _phone_no, string memory _date)public isRecep{
        Doctor D = Doctor(_Contract);
        D.addDoc(_address,_id,_name,_age,_gender,_phone_no, _date);
    }

    // Add Pharmacy, We are passing Deployed Contract address and new pharmacy address.
    function add_pharma(address _Contract, address _address) public isRecep{
        Pharmacy P = Pharmacy(_Contract);
        P.setPharma(_address);
    }

    // Adding New Laboratory Address.
    function add_lab(address _Contract, address _address) public isRecep{
        Laboratory L = Laboratory(_Contract);
        L.addLab(_address);
    }

    // Adding New Nurse.
    function add_nurse(address _Contract, address _address,uint _id, string memory _name, uint _age, string memory _gender, uint _phone_no, string memory _date) public isRecep{
        Nurse N = Nurse(_Contract);
        N.addNurse(_address, _id, _name, _age, _gender, _phone_no, _date);
    }


}