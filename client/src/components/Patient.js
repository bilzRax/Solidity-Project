import React,{useEffect,useState,useRef} from 'react'
import Web3 from 'web3/dist/web3.min.js'
import PatientAbi from "../contracts/_Patient.json"
import "../style/style.scss"
import Nav from './Nav'


const Patient = () => {
	//References
	const NameRef = useRef();
	const AgeRef = useRef();
	const GenderRef = useRef();
	const PhoneRef  = useRef();
	const DateRef = useRef();
	const PatientRef = useRef();
	const AddressRef = useRef();
	const IDRef = useRef();

	const [currentAccount,setCurrentAccount] = useState("");
	const [patientInfo, setPatientInfo] = useState();
	let web3, netID, netData, contractInstance, ACC;
	useEffect(()=>{
		connect();
	  });
	  const connect = async ()=>{
		web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
		netID = await web3.eth.net.getId();
		netData =  PatientAbi.networks[netID];
		ACC = await web3.eth.getAccounts().then((i)=>{ let acc =i; setCurrentAccount(acc[0])});
		contractInstance = new web3.eth.Contract(PatientAbi.abi,netData.address);
	}

	//GETTING PATIENT INFO
		const Get = async (e)=> {
		e.preventDefault();
		if(netData){
		  const patient1 = await contractInstance.methods.getPatient(PatientRef.current.value).call();
		  setPatientInfo(patient1)
		}else{window.alert("Contract Not Deployed!")};
	}
  return (
	<>
	<Nav/>
	<section className="sec-contain">
	<div className="heading"><h1 id='doc-head'>PATIENT TRANSACTION</h1></div>
	<div className="container">
		
		<form onSubmit={Get}>
		<section className="get-patient">
			<label id='pat-id' htmlFor="id">PatientID</label>
			<input ref={PatientRef} type="number" name="id" id='input'/>
		</section>
		<div id="butt_get">
			<button type="submit" id="get" onSubmit={Get}>GET PATIENT INFO</button>
		</div>
		</form>
		<section className="output">
        <p>{patientInfo?`NAME: ${patientInfo["0"]}`:""}</p>
		<p>{patientInfo?`AGE: ${patientInfo["1"]}`:""}</p>
		<p>{patientInfo?`GENDER: ${patientInfo["2"]}`:""}</p>
		<p>{patientInfo?`PHONE NO.: ${patientInfo["3"]}`:""}</p>
		<p>{patientInfo?`DATE OF BIRTH: ${patientInfo["4"]}`:""}</p>
		</section>
	</div>
	</section>
	</>
  )
}

export default Patient