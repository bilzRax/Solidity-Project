// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import './_Patient.sol';
import './_Attendant.sol';
import './Laboratory.sol';

contract Doctor{

    struct doc_details{
        uint doctor_id;
        string name;
        uint age;
        string gender;
        uint phone_no;
        string join_date;
        bool exist;
    }
    doc_details D;

    struct prescription_Detail {
        uint doctor_id;
        uint patient_id;
        uint prescription_id;
        string prescription_date;
        string[] prescribed_meds;
        string time;
        bool exist;
    }
    prescription_Detail x;

    uint prescription_Count;
    mapping(uint=>doc_details) Doctors;
    mapping(uint =>mapping(string=>mapping(uint=>prescription_Detail))) Prescriptions;
    mapping(uint=>bool) pat_does_exist;

     // Access Modifier
    mapping(address => bool) Doc_exist;
    //constructor() {Doc_exist[0x5B38Da6a701c568545dCfcB03FcB875f56beddC4] = true;} //For Debugging
    function addDoc(address _address, uint _id, string memory _name, uint _age, string memory _gender, uint _phone_no, string memory _date) external isDoc{
            if(Doctors[_id].exist != true){
                Doc_exist[_address] = true;
                D.doctor_id = _id;
                D.name = _name;
                D.age = _age;
                D.gender = _gender;
                D.phone_no = _phone_no;
                D.join_date = _date;
                D.exist = true;
                Doctors[_id] = D;
            }else{revert("Doctor with that Id already exists.");}
        }
    modifier isDoc(){
        require(Doc_exist[msg.sender] == true,"ACCESS DENIED, NOT A DOCTOR");
        _;
    }

    function setPrescription(uint _patient_id, uint _pres_id,string memory _time, string memory _Date_of_Prescription,string memory _pres_meds, uint _DoctorId) public isDoc{
       require(pat_does_exist[_patient_id] == true, "Patient does not exist.");
       if(Prescriptions[_patient_id][_Date_of_Prescription][_pres_id].exist != true){
            prescription_Count++;
            x.patient_id = _patient_id;
            x.prescription_id = _pres_id;
            x.time = _time;
            x.prescription_date = _Date_of_Prescription;
            x.doctor_id = _DoctorId;
            x.exist = true;
            Prescriptions[_patient_id][_Date_of_Prescription][_pres_id] = x;
            Prescriptions[_patient_id][_Date_of_Prescription][_pres_id].prescribed_meds.push(_pres_meds);
       }else{
           Prescriptions[_patient_id][_Date_of_Prescription][_pres_id].prescribed_meds.push(_pres_meds);
        }
    }

    function getPrescription(uint _patient_id,string memory _date, uint _prescription_id)external view returns(uint,uint,string memory, string memory,string[] memory,uint){
         prescription_Detail memory pt = Prescriptions[_patient_id][_date][_prescription_id];
        return(pt.patient_id,pt.prescription_id,pt.time,pt.prescription_date,pt.prescribed_meds,pt.doctor_id);
    }

    function getDocInfo(uint _doc_id)external view returns(uint,string memory,uint, string memory, uint, string memory){
            require(Doctors[_doc_id].exist == true,"Patient Does Not Exist.");
            doc_details memory DD = Doctors[_doc_id];
            return(DD.doctor_id,DD.name,DD.age,DD.gender,DD.phone_no,DD.join_date);
    }

    //Get Patient Records; START
    function getPatientRecords(address _Contract,uint _pat_id)public view returns(string memory,uint,string memory, uint, string memory, uint,string memory,uint){
        _Patient P = _Patient(_Contract);
        return(P.getPatient(_pat_id));
    }

    function getMedicalRecords(address _Contract, uint _patient_id, string memory _date)public view returns(string memory,uint, string[] memory,string[] memory,string[] memory){
        _Attendant At = _Attendant(_Contract);
        return(At.get_MedData(_patient_id, _date));
    }
    //END OF FUNCTION

    // Get Patient Lab Results
    function getLabReport(address _Contract, uint _pat_id)public view returns(string memory, uint,uint,uint,string memory,uint,string[] memory, string[] memory){
        Laboratory L = Laboratory(_Contract);
        return(L.get_report(_pat_id));
    }
    function getTestReport(address _Contract,uint _pat_id, string memory _test_id)public view returns(string memory, uint, string memory){
        Laboratory L = Laboratory(_Contract);
        return(L.get_test(_pat_id,_test_id));
    }

    //Patient Existence;
     function setPatientExistence(uint _pat_id)external{
        pat_does_exist[_pat_id] = true;
    }

    // Set Doctor Visit
    function setVisits(address _Contract, uint pat_id, string memory _month, string memory _date)public isDoc{
        require(pat_does_exist[pat_id] == true, "Invalid Patient ID");
        _Patient P = _Patient(_Contract);
        P.setDocVisit(pat_id,_month,_date);
    }
      
}
