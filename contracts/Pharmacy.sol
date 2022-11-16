// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import './Doctor.sol';

contract Pharmacy{
    
    // Patient Object
    struct Patient_Meds{
        string name; // for testing
        uint patient_id;
        uint doc_id;
        string date;
        string[] medicines; //= new string[](0);
        uint[] prices; //= new uint[](0);
        bool exist;
    }
    Patient_Meds x;
    mapping(uint=>mapping(string=>Patient_Meds)) Medicines;
    // Setting Up Pharmacy Addresses;
    mapping(address => bool) mapPharma;
   // constructor(){mapPharma[0x5B38Da6a701c568545dCfcB03FcB875f56beddC4] = true;} // For Debugging

    function setPharma(address _address) external{
        mapPharma[_address] = true;
    }
    // Access Modifiers
    modifier isPharma(){
        require(mapPharma[msg.sender]==true,"Access Denied, Not A Pharmacy.");
        _;
    }
 
    function patient_details(string memory _name, uint _pat_id, uint _doc_id,string memory _date) public isPharma{
          if(Medicines[_pat_id][_date].exist != true){
                x.name = _name;
                x.patient_id = _pat_id;
                x.doc_id = _doc_id;
                x.date = _date;
                x.exist = true;
                Medicines[_pat_id][_date] = x;
        }else{revert("Patient ID already exists.");}
   }
    function add_meds(uint _pat_id, string memory _med, uint _price, string memory _date) public isPharma{
        require(Medicines[_pat_id][_date].exist == true, "Patient Not Found.");
        Patient_Meds storage pt = Medicines[_pat_id][_date];
        pt.medicines.push(_med);
        pt.prices.push(_price);
    }
    function get_meds(uint _pat_id,string memory _date) public view returns(string memory, uint[] memory,string[] memory){
        require(Medicines[_pat_id][_date].exist == true, "No Data Found.");
        Patient_Meds memory pt = Medicines[_pat_id][_date];
        return (pt.name,pt.prices, pt.medicines);
    }
    
    // Get Patient Prescription
    function getPrescription(address _Contract,uint _pat_id,string memory _date, uint _prescription_id)public view returns(uint,uint,string memory, string memory,string[] memory,uint){
        Doctor D = Doctor(_Contract);
        return(D.getPrescription(_pat_id,_date,_prescription_id));
    }
}