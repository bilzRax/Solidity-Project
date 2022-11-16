// IMPORT SECTION
import React,{useRef, useState, useEffect} from "react";
import Web3 from 'web3/dist/web3.min.js';
import gsap from "gsap";
import ReceptionistAbi from '../contracts/Receptionist.json';
import PatientAbi from '../contracts/_Patient.json';
import LabAbi from '../contracts/Laboratory.json';
import PharmacyAbi from '../contracts/Pharmacy.json';
import NurseAbi from '../contracts/Nurse.json';
import AttendantAbi from '../contracts/_Attendant.json';
import DoctorAbi from '../contracts/Doctor.json';

import "../style/style.scss"
import Nav from "./Nav";


// JS CODE SECTION

function App() {

  //References
	const NameRef = useRef();
	const AgeRef = useRef();
	const GenderRef = useRef();
	const PhoneRef  = useRef();
	const DateRef = useRef();
	const IdRef = useRef();
 	const AddressRef = useRef();
	const PatIdRef = useRef();
	const AttIdRef = useRef();
	const FormRef = useRef();

  const [selected, setSelected] = useState("None");
	const [currentAccount,setCurrentAccount] = useState("");

  // WEB3 Connection Configuration
	let web3, netID, Receptionist, Nurse, Doctor, Lab, Pharma, Patient, Attendant, ACC;
  let RecepData, NurseData, PatientData, PharmaData, LabData, AttenData, DoctorData;
	useEffect(()=>{
		connect();
	  });

	const connect = async ()=>{
		web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
		netID = await web3.eth.net.getId();
		RecepData =  ReceptionistAbi.networks[netID];
    	NurseData =  NurseAbi.networks[netID];
      	PatientData =  PatientAbi.networks[netID];
        PharmaData =  PharmacyAbi.networks[netID];
    	LabData =  LabAbi.networks[netID];
        AttenData =  AttendantAbi.networks[netID];
        DoctorData =  DoctorAbi.networks[netID];
	ACC = await web3.eth.getAccounts().then((i)=>{ let acc =i; setCurrentAccount(acc[0])});
	Receptionist = new web3.eth.Contract(ReceptionistAbi.abi,RecepData.address);
    Nurse = new web3.eth.Contract(NurseAbi.abi,NurseData.address);
    Patient = new web3.eth.Contract(PatientAbi.abi,PatientData.address);
    Pharma = new web3.eth.Contract(PharmacyAbi.abi,PharmaData.address);
    Attendant = new web3.eth.Contract(AttendantAbi.abi,AttenData.address);
    Lab = new web3.eth.Contract(LabAbi.abi,LabData.address);
    Doctor = new web3.eth.Contract(DoctorAbi.abi,DoctorData.address);

}


// SETTERS 
//SETTING PATIENT INFO
		const Send = async (e)=> {
		e.preventDefault();
		ACC = await web3.eth.getAccounts().then((i)=>{ let acc =i; setCurrentAccount(acc[0])});
    if(RecepData){
			try{
		  		const result = await Receptionist.methods.add_patient(Patient._address,Doctor._address,Attendant._address,AddressRef.current.value,IdRef.current.value,NameRef.current.value,AgeRef.current.value,GenderRef.current.value,PhoneRef.current.value,DateRef.current.value).send({from:currentAccount});
			}catch(err){console.log(err)};
		}else{window.alert("Contract Not Deployed!")};
	}
//SETTING DOCTOR INFO
	const SendDoc = async (e)=>{
		e.preventDefault();
		ACC = await web3.eth.getAccounts().then((i)=>{ let acc =i; setCurrentAccount(acc[0])});
    if(DoctorData){
			try{
		  		const result = await Receptionist.methods.add_doctor(Doctor._address,AddressRef.current.value,IdRef.current.value,NameRef.current.value,AgeRef.current.value,GenderRef.current.value,PhoneRef.current.value,DateRef.current.value).send({from:currentAccount});
			}catch(err){console.log(err)};
		}else{window.alert("Contract Not Deployed!")};
	}
// Assigning Attendant
	const Assign = async (e)=>{
		e.preventDefault();
		ACC = await web3.eth.getAccounts().then((i)=>{ let acc =i; setCurrentAccount(acc[0])});
    if(PatientData){
			try{
		  		const result = await Receptionist.methods.assign_attendant(Patient._address,AddressRef.current.value,PatIdRef.current.value,AttIdRef.current.value,NameRef.current.value,AgeRef.current.value,GenderRef.current.value,PhoneRef.current.value).send({from:currentAccount});
			}catch(err){console.log(err)};
		}else{window.alert("Contract Not Deployed!")};
	}
// REGISTERING Attendant
	const SendAtt = async (e)=>{
		e.preventDefault();
		ACC = await web3.eth.getAccounts().then((i)=>{ let acc =i; setCurrentAccount(acc[0])});
    if(AttenData){
			try{
		  		const result = await Receptionist.methods.add_attendant(Attendant._address,AddressRef.current.value,IdRef.current.value,NameRef.current.value,AgeRef.current.value,GenderRef.current.value,PhoneRef.current.value).send({from:currentAccount});
			}catch(err){console.log(err)};
		}else{window.alert("Contract Not Deployed!")};
	}

// REGISTERING NURSE
	const SendNurse = async (e)=>{
		e.preventDefault();
		ACC = await web3.eth.getAccounts().then((i)=>{ let acc =i; setCurrentAccount(acc[0])});
    if(NurseData){
			try{
		  		const result = await Receptionist.methods.add_nurse(Nurse._address,AddressRef.current.value,IdRef.current.value,NameRef.current.value,AgeRef.current.value,GenderRef.current.value,PhoneRef.current.value,DateRef.current.value).send({from:currentAccount});
			}catch(err){console.log(err)};
		}else{window.alert("Contract Not Deployed!")};
	}

// REGISTER PHARMACY
	const SendPharma = async (e)=>{
		e.preventDefault();
		ACC = await web3.eth.getAccounts().then((i)=>{ let acc =i; setCurrentAccount(acc[0])});
    if(PharmaData){
			try{
		  		const result = await Receptionist.methods.add_pharma(Pharma._address,AddressRef.current.value).send({from:currentAccount});
			}catch(err){console.log(err)};
		}else{window.alert("Contract Not Deployed!")};
	}

// REGISTER LABORATORY
	const SendLab = async (e)=>{
		e.preventDefault();
		ACC = await web3.eth.getAccounts().then((i)=>{ let acc =i; setCurrentAccount(acc[0])});
    if(LabData){
			try{
		  		const result = await Receptionist.methods.add_pharma(Lab._address,AddressRef.current.value).send({from:currentAccount});
			}catch(err){console.log(err)};
		}else{window.alert("Contract Not Deployed!")};
	}








// Div Animation
  function toggleAnim(){
    gsap.to('.nav-bar', 1, {clipPath: 'circle(2500px at 100% -10%)'})
  }

// Selected;
  function selectPatient(e){
    toggleAnim();
    setSelected(e.target.value);
  }



// Conditional Rendering
  let div_content
  if(selected === "patient"){
    // Page 1
    div_content = <section className="sec-contain">
	<div className="heading"><h1 id='doc-head'>PATIENT REGISTRATION</h1></div>
	<div className="container">
		<form ref={FormRef} onSubmit={Send}>
		<section className="set-patient">
      	<div className='input'>
			<label htmlFor="address">Account Address:</label>
			<input ref={AddressRef} type="text" name='address' id='address'/>
			</div>
      	<div className='input'>
			<label htmlFor="name">ID:</label>
			<input ref={IdRef} type="number" name='ID' id='ID'/>
			</div>
			<div className='input'>
			<label htmlFor="name">Name:</label>
			<input ref={NameRef} type="text" name='name' id='name'/>
			</div>
			<div className='input'>
			<label htmlFor="age">Age:</label>
			<input ref={AgeRef} type="number" name='age' id='age'/>
			</div>
			<div className='input'>
			<label htmlFor="gender">Gender:</label>
			<input ref={GenderRef} type="text" name="gender" id='gender'/>
			</div>
			<div className='input'>
			<label htmlFor="phone">Phone No:</label>
			<input ref={PhoneRef} type="number" name="phone" id='phone' />
			</div>
			<div className='input'>
			<label htmlFor="date">DOB:</label>
			<input ref={DateRef} type="text" name="date" />
			</div>
		</section>
		<div id="butt_add">
			<button type="submit" id="set" onSubmit={Send}>ADD PATIENT</button>
		</div>
			</form>
	</div>
	</section>
  }
  // end page
  else if(selected === "doctor"){
    // Page 2
    div_content = <section className="sec-contain">
	<div className="heading"><h1 id='doc-head'>DOCTOR REGISTRATION</h1></div>
	<div className="container">
		<form ref={FormRef}onSubmit={SendDoc}>
		<section className="set-patient">
      	<div className='input'>
			<label htmlFor="address">Account Address:</label>
			<input ref={AddressRef} type="text" name='address' id='address'/>
			</div>
      	<div className='input'>
			<label htmlFor="name">ID:</label>
			<input ref={IdRef} type="number" name='ID' id='ID'/>
			</div>
			<div className='input'>
			<label htmlFor="name">Name:</label>
			<input ref={NameRef} type="text" name='name' id='name'/>
			</div>
			<div className='input'>
			<label htmlFor="age">Age:</label>
			<input ref={AgeRef} type="number" name='age' id='age'/>
			</div>
			<div className='input'>
			<label htmlFor="gender">Gender:</label>
			<input ref={GenderRef} type="text" name="gender" id='gender'/>
			</div>
			<div className='input'>
			<label htmlFor="phone">Phone No:</label>
			<input ref={PhoneRef} type="number" name="phone" id='phone' />
			</div>
			<div className='input'>
			<label htmlFor="date">DOB:</label>
			<input ref={DateRef} type="text" name="date" />
			</div>
		</section>
		<div id="butt_add">
			<button type="submit" id="set" onSubmit={SendDoc}>ADD DOCTOR</button>
		</div>
			</form>
	</div>
	</section>
  }
  // end page 
  else if(selected === "attendant"){
      // Page 3
	  div_content = <section className="sec-contain">
	  <div className="heading"><h1 id='doc-head'>ATTENDANT REGISTRATION</h1></div>
	  <div className="container">
		  <form ref={FormRef}onSubmit={SendAtt}>
		  <section className="set-patient">
			<div className='input'>
			  <label htmlFor="address">Account Address:</label>
			  <input ref={AddressRef} type="text" name='address' id='address'/>
			  </div>
			<div className='input'>
			  <label htmlFor="name">ID:</label>
			  <input ref={IdRef} type="number" name='ID' id='ID'/>
			  </div>
			  <div className='input'>
			  <label htmlFor="name">Name:</label>
			  <input ref={NameRef} type="text" name='name' id='name'/>
			  </div>
			  <div className='input'>
			  <label htmlFor="age">Age:</label>
			  <input ref={AgeRef} type="number" name='age' id='age'/>
			  </div>
			  <div className='input'>
			  <label htmlFor="gender">Gender:</label>
			  <input ref={GenderRef} type="text" name="gender" id='gender'/>
			  </div>
			  <div className='input'>
			  <label htmlFor="phone">Phone No:</label>
			  <input ref={PhoneRef} type="number" name="phone" id='phone' />
			  </div>
		  </section>
		  <div id="butt_add">
			  <button type="submit" id="set" onSubmit={SendAtt}>ADD ATTENDANT</button>
		  </div>
			  </form>
	  </div>
	  </section>
	}
	// end page 

  else if(selected ==="assign"){
    // Page 4
	div_content = <section className="sec-contain">
	   <div className="heading"><h1 id='doc-head'>ATTENDANT ASSIGNMENT</h1></div>
	   <div className="container">
		   <form ref={FormRef}onSubmit={Assign}>
		   <section className="set-patient">
			 <div className='input'>
			   <label htmlFor="address">Account Address:</label>
			   <input ref={AddressRef} type="text" name='address' id='address'/>
			   </div>
			   	<div className='input'>
			   <label htmlFor="_pat_id">Patient ID:</label>
			   <input ref={PatIdRef} type="number" name="_pat_id" />
			   </div>
			 <div className='input'>
			   <label htmlFor="_at_id">Attendant ID:</label>
			   <input ref={AttIdRef} type="number" name='_at_id' id='_at_id'/>
			   </div>
			   <div className='input'>
			   <label htmlFor="name">Name:</label>
			   <input ref={NameRef} type="text" name='name' id='name'/>
			   </div>
			   <div className='input'>
			   <label htmlFor="age">Age:</label>
			   <input ref={AgeRef} type="number" name='age' id='age'/>
			   </div>
			   <div className='input'>
			   <label htmlFor="gender">Gender:</label>
			   <input ref={GenderRef} type="text" name="gender" id='gender'/>
			   </div>
			   <div className='input'>
			   <label htmlFor="phone">Phone No:</label>
			   <input ref={PhoneRef} type="number" name="phone" id='phone' />
			   </div>
		   </section>
		   <div id="butt_add">
			   <button type="submit" id="set" onSubmit={Assign}>ASSIGN</button>
		   </div>
			   </form>
	   </div>
	   </section>
	}
	 // end page 
  else if(selected === "nurse"){
      // Page 5
	  div_content = <section className="sec-contain">
	  <div className="heading"><h1 id='doc-head'>NURSE REGISTRATION</h1></div>
	  <div className="container">
		  <form ref={FormRef}onSubmit={SendNurse}>
		  <section className="set-patient">
			<div className='input'>
			  <label htmlFor="address">Account Address:</label>
			  <input ref={AddressRef} type="text" name='address' id='address'/>
			  </div>
			<div className='input'>
			  <label htmlFor="name">ID:</label>
			  <input ref={IdRef} type="number" name='ID' id='ID'/>
			  </div>
			  <div className='input'>
			  <label htmlFor="name">Name:</label>
			  <input ref={NameRef} type="text" name='name' id='name'/>
			  </div>
			  <div className='input'>
			  <label htmlFor="age">Age:</label>
			  <input ref={AgeRef} type="number" name='age' id='age'/>
			  </div>
			  <div className='input'>
			  <label htmlFor="gender">Gender:</label>
			  <input ref={GenderRef} type="text" name="gender" id='gender'/>
			  </div>
			  <div className='input'>
			  <label htmlFor="phone">Phone No:</label>
			  <input ref={PhoneRef} type="number" name="phone" id='phone' />
			  </div>
			  <div className='input'>
			  <label htmlFor="date">DOB:</label>
			  <input ref={DateRef} type="text" name="date" />
			  </div>
		  </section>
		  <div id="butt_add">
			  <button type="submit" id="set" onSubmit={SendNurse}>ADD NURSE</button>
		  </div>
			  </form>
	  </div>
	  </section>
	}
// end page
  else if(selected === "pharmacy"){
        // Page 6
		div_content = <section className="sec-contain">
		<div className="heading"><h1 id='doc-head'>PHARMACY REGISTRATION</h1></div>
		<div className="container">
			<form ref={FormRef}onSubmit={SendPharma}>
			<section className="set-patient">
			  <div className='input'>
				<label htmlFor="address">Account Address:</label>
				<input ref={AddressRef} type="text" name='address' id='address'/>
				</div>
			</section>
			<div id="butt_add">
				<button type="submit" id="set" onSubmit={SendPharma}>ADD PHARMACY</button>
			</div>
				</form>
		</div>
		</section>
	  }
  // end page
  else if(selected === "laboratory"){
    // Page 7
		div_content = <section className="sec-contain">
		<div className="heading"><h1 id='doc-head'>LABORATORY REGISTRATION</h1></div>
		<div className="container">
			<form ref={FormRef}onSubmit={SendLab}>
			<section className="set-patient">
			  <div className='input'>
				<label htmlFor="address">Account Address:</label>
				<input ref={AddressRef} type="text" name='address' id='address'/>
				</div>
			</section>
			<div id="butt_add">
				<button type="submit" id="set" onSubmit={SendLab}>ADD LABORATORY</button>
			</div>
				</form>
		</div>
		</section>
	  }
  // end page











  // JSX SECTION
  return (
  <>
    <Nav/>

    <div className="nav-bar">
     <button onClick={()=>{
		gsap.to('.nav-bar',0.8,{clipPath: 'circle(50px at 100% -10%)'}); FormRef.current.reset()}} id="_exit">X</button>
     {div_content}
    </div>

     <section className='sec-contain'>
      <div className='heading'>
      <h1 id='doc-head'>RECEPTIONIST TRANSACTION TEST</h1>
      </div>

      <div className="list-access">
        <button onClick={e=>selectPatient(e)} value= "patient" className="recep-buttons"> - Register Patient</button>
        <button onClick={e=>selectPatient(e)} value="attendant" className="recep-buttons"> - Register Attendant</button>
        <button onClick={e=>selectPatient(e)} value="assign" className="recep-buttons"> - Assign Attendant</button>
        <button onClick={e=>selectPatient(e)} value="doctor" className="recep-buttons"> - Register Doctor</button>
        <button onClick={e=>selectPatient(e)} value="nurse" className="recep-buttons"> - Register Nurse</button>
        <button onClick={e=>selectPatient(e)} value="pharmacy" className="recep-buttons"> - Register Pharmacy</button>
        <button onClick={e=>selectPatient(e)} value="laboratory" className="recep-buttons"> - Register Laboratory</button>
      </div>

    <div className="container"></div>

    </section>
  </>
  );
}

export default App;