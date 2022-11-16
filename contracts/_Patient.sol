// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import './Doctor.sol';
import './_Attendant.sol';
import './Laboratory.sol';
import './Pharmacy.sol';
import './Nurse.sol';

contract _Patient{
    
    struct Attendant{
        uint id;
        string name;
        uint age;
        string gender;
        uint phone_no;
        address _address;
    }
    Attendant att;

    struct  Patient{
        uint id;
        string name;
        uint age;
        string gender;
        uint phone_no;
        string date;
        uint attendant_id;
        address _atten_address;
        address _Pat_address;
        bool exist;
    }
    Patient x;

    mapping(uint => Patient) Patients;
    mapping(uint => mapping(uint=>Patient)) Attendants;
    mapping(uint => Attendant) Attend;
    mapping(uint => mapping(string=>string[])) Visits;

    // Access Modifier
    mapping(address=>bool) pat_exists;
    // constructor() {pat_exists[0x5B38Da6a701c568545dCfcB03FcB875f56beddC4]=true;} // For Debugging
     modifier isPatient(){
         require(pat_exists[msg.sender]==true,"Access Denied, Not a Patient.");
         _;
     }

    // SET PATIENT DETAILS
     function addPatient(address _DoctorContract,address _AttendantContract, address _address,uint _pat_id, string memory Name, uint Age, string memory Gender, uint Phone_no, string memory Date) external{
        if(Patients[_pat_id].exist != true){
            x.id = _pat_id;
            x.age = Age;
            x.name = Name;
            x.gender = Gender;
            x.phone_no = Phone_no;
            x.date = Date;
            x.exist = true;
            x._Pat_address = _address;
            Patients[_pat_id]=x;
            pat_exists[_address] = true;
            _Attendant(_AttendantContract).setPatientExistence(_pat_id);
            Doctor(_DoctorContract).setPatientExistence(_pat_id);
       }else{revert("Patient ID already in use.");}
    }

    // Assigning Attendant
    function assignAttendant(address _address, uint _pat_id, uint _at_id,string memory _name, uint _age, string memory _gender, uint _phone_no) external{
        if(Patients[_pat_id]._atten_address != _address){
            att.id = _at_id;
            att.name = _name;
            att.age = _age;
            att.gender = _gender;
            att.phone_no = _phone_no;
            Attendants[_at_id][_pat_id] = Patients[_pat_id] ;
            Patients[_pat_id].attendant_id = _at_id;
            Patients[_pat_id]._atten_address = _address;
            Attend[_pat_id] = att;
        }else{revert("Already assigned to that patient ID.");}
    }
    //GET PATIENT DETAILS
    function getPatient(uint patient_id)public view returns(string memory,uint,string memory, uint, string memory, uint,string memory,uint){
        require(Patients[patient_id].exist == true, "No Data Available.");
        Patient memory pt = Patients[patient_id];
        Attendant memory at = Attend[patient_id];
        return(pt.name,pt.age,pt.gender,pt.phone_no,pt.date,pt.attendant_id,at.name,at.phone_no);
    }

    // Patient Specific GETTER //GET PATIENT DETAILS
    function getPurePatient(uint patient_id)public view returns(string memory,uint,string memory, uint, string memory, uint,string memory,uint){
        if(Patients[patient_id]._Pat_address == msg.sender){
            Patient memory pt = Patients[patient_id];
            Attendant memory at = Attend[patient_id];
            return(pt.name,pt.age,pt.gender,pt.phone_no,pt.date,pt.attendant_id,at.name,at.phone_no);
        }else{revert("Access Denied, Not a registered patient.");}
    }

    // Get Prescription from Doctor's Contract;
    function getPrescription(address _Contract, uint _pat_id,string memory _date, uint _pres_id) public view returns(uint,uint,string memory, string memory,string[] memory,uint){
        Doctor D = Doctor(_Contract);
        return(D.getPrescription(_pat_id,_date, _pres_id));
    }

    // Get Attendant Data
    function getAttenInfo(address _Contract, uint _atten_id)public view returns(uint,string memory,uint,string memory,uint,address){
        _Attendant At = _Attendant(_Contract);
        return(At.getAttendantInfo(_atten_id));
    }
    // Get Doctor Data
    function getDocDetails(address _Contract, uint _doc_id) public view returns(uint,string memory,uint, string memory, uint, string memory){
        Doctor D = Doctor(_Contract);
        return(D.getDocInfo(_doc_id));
    }
    // Get Administered Medicine Data
    function getMedData(address _Contract, uint _pat_id, string memory _date)public view returns(string memory,uint, string[] memory,string[] memory,string[] memory){
        _Attendant At = _Attendant(_Contract);
        return(At.get_MedData(_pat_id,_date));
    }

    // Get Lab Report
    function getLabReport(address _Contract, uint _pat_id)public view returns(string memory, uint,uint,uint,string memory,uint,string[] memory, string[] memory){
        Laboratory L = Laboratory(_Contract);
        return(L.get_report(_pat_id));
    }
    function getTestReport(address _Contract,uint _pat_id, string memory _test_id)public view returns(string memory, uint, string memory){
        Laboratory L = Laboratory(_Contract);
        return(L.get_test(_pat_id,_test_id));
    }
    //

    // Get Pharmacy Meds Data
    function getMedicines(address _Contract,uint _pat_id, string memory _date)public view returns(string memory, uint[] memory,string[] memory){
        Pharmacy Ph = Pharmacy(_Contract);
        return(Ph.get_meds(_pat_id,_date));
    }

    // Get Nurse Details
    function getNurseDetails(address _Contract,uint _pat_id)public view returns(uint, string memory, uint, string memory, uint, string memory){
        Nurse N = Nurse(_Contract);
        return(N.getNurseInfo(_pat_id));
    }

    //Get and Set Doctor Visits
    function setDocVisit(uint _pat_id, string memory _month, string memory _date)external{
        Visits[_pat_id][_month].push(_date);
    }
    function getDocVisit(uint _pat_id, string memory _month)public view returns(uint, string[] memory){
        return(Visits[_pat_id][_month].length, Visits[_pat_id][_month]);
    }
    //
}