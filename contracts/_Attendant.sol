// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import './_Patient.sol' as PatientContract;

contract _Attendant {

    struct Attendant{
        uint id;
        string name;
        uint age;
        string gender;
        uint phone_no;
        address _address;
    }
    Attendant att;

    struct AtWork{
        uint patient_id;
        string patient_name;
        string attendent_id;
        string[] medicine;
        string[] quantity;
        string[] time;
        bool exist;
    }
    AtWork x;
    mapping(uint=>Attendant) attendant_list;
    mapping(uint => AtWork) Patients;
    mapping(uint=>mapping(string=>AtWork)) Med_Taken;
    mapping(uint=>bool) pat_does_exist;

    // Access Modifier
    mapping(address=>bool) Attendants;
    function addAttendant(address _adss, uint _id, string memory _name, uint _age, string memory _gender, uint _phone_no)external{
        if(Attendants[_adss] != true){
        Attendants[_adss] = true;
        att.id = _id;
        att.name = _name;
        att.age = _age;
        att.gender = _gender;
        att.phone_no = _phone_no;
        att._address = _adss;
        attendant_list[_id] = att;
        }else{revert("Attendant ID is already in use.");}
    }
   //  constructor(){ Attendants[0x5B38Da6a701c568545dCfcB03FcB875f56beddC4]=true;} //For Debugging.
    modifier isAttendant(){
        require(Attendants[msg.sender]==true,"Access Denied, Not an Attendant.");
        _;
    }

    function attendPatient(uint _patient_id,string memory _patient_name, string memory _attendent_id)public isAttendant{
        require(pat_does_exist[_patient_id]==true, "Patient Does Not Exist.");
        if(Patients[_patient_id].exist != true){
            x.patient_id = _patient_id;
            x.patient_name = _patient_name;
            x.attendent_id = _attendent_id;
            x.exist = true;
            Patients[_patient_id]=x;
        }else{revert("User With That ID Already Exists.");}

    }
    function medTime(uint _patient_id, string memory _medicine, string memory _quantity,string memory _time,string memory _date) public isAttendant{
        require(Patients[_patient_id].exist == true, "Patient Not Found.");
        AtWork storage bilz = Med_Taken[_patient_id][_date];
        bilz.medicine.push(_medicine);
        bilz.quantity.push(_quantity);
        bilz.time.push(_time);
    }
    function get_MedData(uint _patient_id, string memory _date) external view returns(string memory,uint, string[] memory,string[] memory,string[] memory){
        require(Patients[_patient_id].exist == true,"Patient Not Found.");
        AtWork memory bilz = Patients[_patient_id];
        AtWork memory bilz2 = Med_Taken[_patient_id][_date];
        return (bilz.patient_name,bilz.patient_id,bilz2.medicine, bilz2.quantity, bilz2.time);
    }
    function getAttendantInfo(uint _attendant_id) external view returns(uint,string memory,uint,string memory,uint,address){
        Attendant memory At = attendant_list[_attendant_id];
        return(At.id,At.name,At.age,At.gender,At.phone_no,At._address);
    }

    //Set Patient Existence
    function setPatientExistence(uint _pat_id)external{
        pat_does_exist[_pat_id] = true;
    }
}
