import React,{useState, useRef, useEffect} from "react";
import styled from 'styled-components';
import "../style/style.scss"
import { Navigate, useNavigate } from "react-router";

const Nav = ()=>{
	const navigate = useNavigate();
	const [x,setX] = useState(0);
	const [y,setY] = useState(0);
	const CardHover = useRef();
	const follow = useRef();
	
	const getPosition = () => {
    //const x = follow.current.getBoundingClientRect().x;
	const x = follow.current.offsetLeft;
    setX(x);

    //const y = follow.current.getBoundingClientRect().y;
	const y = follow.current.offsetTop;
    setY(y);
  };

  const handleEvent = ()=>{
	getPosition();
	CardHover.current.classList.add('card-appear');
  }
  const handleEvent2 = ()=>{
	CardHover.current.classList.remove('card-appear');
	CardHover.current.classList.add('card-disappear');
  }
  const handleButton = ()=>{
	navigate("/receptionist");
  }

	return(
		<StyledNav>
			
			<h1><a href="/">HOME</a></h1>
			<ul>
				<li>
					<div className="nav-item" ref={follow} onMouseOver={handleEvent} onMouseOut={handleEvent2}/>
					<div className="card card-disappear" ref={CardHover} onMouseOver={handleEvent} onMouseOut={handleEvent2}>
						<button className="card-button" onClick={handleButton}>RECEPTIONIST</button>
						<button className="card-button" onClick={()=>{navigate("/doctor")}}>DOCTOR</button>
						<button className="card-button" onClick={()=>{navigate("/patient")}}>PATIENT</button>
						<button className="card-button" onClick={()=>{navigate("/attendant")}}>ATTENDANT</button>
						<button className="card-button" onClick={()=>{navigate("/nurse")}}>NURSE</button>
						<button className="card-button" onClick={()=>{navigate("/laboratory")}}>LABORATORY</button>
						<button className="card-button" onClick={()=>{navigate("/pharmacy")}}>PHARMACY</button>
					</div>
					<a href="/_none">Access</a>
				</li>
				<li>
					<a href="/help">Help</a>
				</li>
				<li>
					<a href="/contact">Contact Us</a>
				</li>
			</ul>
		</StyledNav>	
	)
}
const StyledNav = styled.nav`
font-family: 'Abril FatFace';
min-height	: 5vh;
display: flex;
justify-content: space-between;
align-items: center;
padding:0.5rem 0.9rem;
background: inherit;
flex-direction: row;
overflow: hidden;
.card-disappear{
	visibility: hidden;
}
.card-appear{
	visibility: visible;
}

h1{
	font-size: 29px;
}
a{
	color: #e5e5e5;
	color: black;
	text-decoration: none;
}
ul{
	list-style: none;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: row;
}
.label-style{
	color: white;
}
.select{
	background-color: #14213d;
	border: none;
	text-align: center;
	color: #e5e5e5;
	min-width: 100px;
	font-size: 15px;
	border-radius: 10px;
	border-style: none;
}
li{
	padding-left: 9rem;
	font-size: 19px;
}
.nav-item{
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 70px;
	height: 40px;
}

@media (max-width: 800px){
	li{
	padding-left: 3.3rem;
	font-size: 18px;
}}
`

export default Nav;