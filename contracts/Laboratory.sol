// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Laboratory{
    
    struct Test{
        string test_name;
        uint cost;
        string note;
        bool exist;
    }

    struct Lab_details{
        string patient_name;
        uint patient_id;
        uint doctor_id;
        uint Lab_id;
        string date;
        uint total_test;
        string[] test_names;
        string[] test_id;
        Test[] Lab_report;
        bool exist;
    }

    Lab_details x;
    uint customer_count;
    mapping(uint=>mapping(string=>Test)) Patient_Tests; //Nested-Mapping
    mapping(uint=>Lab_details) Details;

    // Access Modifier
        mapping(address => bool) Lab_exists;
        //constructor() {Lab_exists[0x5B38Da6a701c568545dCfcB03FcB875f56beddC4] = true;} //For Debugging
        function addLab(address _address) external{
            Lab_exists[_address] = true;
        }

        modifier isLab(){
            require(Lab_exists[msg.sender]==true,"Access Denied, Not a registered Pharmacy.");
            _;
        }
    //

    function add_details(string memory _name, uint _patient_id, uint _doctor_id, uint _lab_id, string memory _date) public isLab{
        if(Details[_patient_id].exist != true){
            customer_count++;
            x.patient_name = _name;
            x.patient_id = _patient_id;
            x.doctor_id = _doctor_id;
            x.Lab_id = _lab_id;
            x.date = _date;
            x.total_test++;
            x.exist = true;
            Details[_patient_id] = x;
        }else{revert("Patient Already Exists.");}
  
    }

    function add_tests(uint _pat_id, string memory _test_name, string memory _test_id,uint _cost, string memory _note)public isLab{
        Lab_details storage ld = Details[_pat_id];
        if(Patient_Tests[_pat_id][_test_id].exist != true){
            Patient_Tests[_pat_id][_test_id] = Test({
                test_name: _test_name,
                cost: _cost,
                note: _note,
                exist: true
        });
            ld.test_names.push(_test_name);
            ld.test_id.push(_test_id);
            ld.Lab_report.push(Patient_Tests[_pat_id][_test_id]);
        }else{revert("Test ID already exists.");}
     
    }

    function get_report(uint _pat_id)public view returns(string memory, uint,uint,uint,string memory,uint,string[] memory, string[] memory){
        Lab_details memory ld = Details[_pat_id];
        return(ld.patient_name,ld.patient_id,ld.doctor_id,ld.Lab_id,ld.date,ld.total_test,ld.test_names,ld.test_id);
    }

    function get_test(uint _pat_id, string memory _test_id)public view returns(string memory, uint, string memory){
        Test memory tst = Patient_Tests[_pat_id][_test_id];
        return(tst.test_name,tst.cost,tst.note);
    }
}