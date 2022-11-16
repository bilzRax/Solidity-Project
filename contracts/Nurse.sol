// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Nurse{

       struct nurse_details{
        uint nurse_id;
        string name;
        uint age;
        string gender;
        uint phone_no;
        string join_date;
        bool exist;
    }
    nurse_details N;

    struct patient_status{
        uint patient_id;
        uint nurse_id;
        string date;
        string patient_symptoms;
        string status;
        string note;
        bool exist;
    }
    patient_status x;

    mapping(uint => mapping(string=>patient_status)) PatientStats;
    mapping(uint => nurse_details) Nurses;

    //Access Modifier
    mapping(address=>bool) reg_nurse;
    function addNurse(address _address, uint _id, string memory _name, uint _age, string memory _gender, uint _phone_no, string memory _date)external {
        if(Nurses[_id].exist != true){
            reg_nurse[_address] = true;
            N.nurse_id = _id;
            N.name = _name;
            N.age = _age;
            N.gender = _gender;
            N.phone_no = _phone_no;
            N.join_date = _date;
            N.exist = true;
        }else{revert("Nurse with that ID already exists.");}
    }
    // constructor() {reg_nurse[0x5B38Da6a701c568545dCfcB03FcB875f56beddC4] = true;} //For Debugging
    modifier isNurse(){
        require(reg_nurse[msg.sender]==true,"Access Denied, Not a Nurse");
        _;
    }
    //set patient_status
    function patient_Status(uint _patient_id, uint _nurse_id, string memory _date, string memory _patient_symptoms, string memory _status, string memory _note) public isNurse{
        if(PatientStats[_patient_id][_date].exist != true){
        x.patient_id= _patient_id;
        x.nurse_id= _nurse_id;
        x.date = _date;
        x.patient_symptoms = _patient_symptoms;
        x.status=_status;
        x.note = _note;
        x.exist = true;
        PatientStats[_patient_id][_date] = x;
        }else{revert("Patient Record already exists.");}
    }
    //get patient_status
    function getPatient_status(uint _patient_id, string memory _date)public view returns(uint,uint,string memory,string memory,string memory,string memory){
        patient_status memory pt= PatientStats[_patient_id][_date];
        return(pt.patient_id,pt.nurse_id,pt.date,pt.patient_symptoms,pt.status,pt.note);
    }

    //get nurse info
    function getNurseInfo(uint _id)external view returns(uint, string memory, uint, string memory, uint, string memory){
        nurse_details memory nd = Nurses[_id];
        return(nd.nurse_id, nd.name, nd.age, nd.gender, nd.phone_no, nd.join_date);

    }
}
