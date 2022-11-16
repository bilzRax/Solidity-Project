import React,{useEffect,useState,useRef} from 'react'
import Nav from './Nav'
import Web3 from 'web3/dist/web3.min.js'
import DoctorAbi from "../contracts/Doctor.json"
import "../style/style.scss"

const Doctor = () => {
  const [presInfo, setPresInfo] = useState();
  const [currentAccount, setCurrentAccount] = useState("");
  const PatientIDRef = useRef();
  const DoctorIDRef = useRef();
  const DateRef = useRef();
  const PresRef = useRef();
  const PresIDRef = useRef();
  let web3,netID, netData, contractInstance, ACC;
  useEffect(()=>{
    connect();
  })
  const connect = async ()=>{
    web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    netID = await web3.eth.net.getId();
    netData = DoctorAbi.networks[netID];
    ACC = await web3.eth.getAccounts().then((i)=>{ let acc =i; setCurrentAccount(acc[0])});
    contractInstance = new web3.eth.Contract(DoctorAbi.abi,netData.address);
  }
  // Set Prescription
  const setPres = async (e)=>{
    e.preventDefault();
    ACC = await web3.eth.getAccounts().then((i)=>{ let acc =i; setCurrentAccount(acc[0])});
    if(netData){
      try{
          const Pres = await contractInstance.methods.setPrescription(PatientIDRef.current.value,DateRef.current.value,PresRef.current.value,DoctorIDRef.current.value).send({from:currentAccount});
      }catch(err){}
    }else{window.alert("Contract Not Deployed!")};
  }
  // Get Prescription
  const getPres = async(e)=>{
    e.preventDefault();
    if(netData){
      const Pres = await contractInstance.methods.getPrescription(PresIDRef.current.value).call();
      setPresInfo(Pres);
    }else{window.alert("Contract Not Deployed!")};
  }

  return (
    <>
    <Nav/>


      <section className='sec-contain'>
      <div className='heading'>
      <h1 id='doc-head'>DOCTOR TRANSACTION TEST</h1>
      </div>
      <div className="container">
      <form onSubmit={setPres}>
		<section className="set-patient">
			<div className='input'>
			<label htmlFor="pat-id">PatientID:</label>
			<input ref={PatientIDRef} type="number" name='pat-id' id='name'/>
			</div>
			<div className='input'>
			<label htmlFor="doc-id">DoctorID:</label>
			<input ref={DoctorIDRef} type="number" name='doc-id' id='age'/>
			</div>
			<div className='input'>
			<label htmlFor="date">Date:</label>
			<input ref={DateRef} type="text" name="date" id='date'/>
			</div>
			<div className='input'>
			<label htmlFor="pres">Prescription:</label>
			<input ref={PresRef} type="text" name="pres" id='pres'/>
			</div>
		</section>
		<div id="butt_add">
			<button type="submit" id="set" onSubmit={setPres}>PRESCRIBE</button>
		</div>
			</form>
    </div>
    </section>
    </>
  )
}

export default Doctor