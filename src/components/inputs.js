import React, { useState } from 'react'
import { UilSearch,UilLocationPoint } from '@iconscout/react-unicons'

const Inputs = ({setQuery,units,setUnits}) =>{

const [city, setCity] = useState('')

const searchHandler = () =>{
    if(city !== ''){
        setQuery({q:city})
    }
}

const LocationHandler = () => {
    if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition((pos)=>{
     let lat = pos.coords.latitude
     let lon = pos.coords.longitude
     setQuery({lat,lon})
    }) 
}}

const unitsHandler = (e) =>{
const selectedUnit = e.currentTarget.name
if(units!==selectedUnit){
    setUnits(selectedUnit)
}
}

    return (
        <div className='flex flex-row justify-center my-6'>
            <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
                <input type='text' placeholder='Search City...' onChange={e=>setCity(e.target.value)}
                 className='text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase'/>
            <UilSearch onClick={searchHandler} size={25} className='text-white cursor-pointer transition ease-out hover:scale-125'/>
            <UilLocationPoint onClick={LocationHandler} size={25} className='text-white cursor-pointer transition ease-out hover:scale-125'/>
            </div>
            <div className='flex flex-row w-1/4 items-center justify-center'>
            <button onClick={unitsHandler} name='metric' className='text-xl text-white font-light hover:scale-125 transition ease-out'>°C</button>
            <p className='text-xl text-white mx-1'>|</p>
            <button onClick={unitsHandler} name='imperial'  className='text-xl text-white font-light hover:scale-125 transition ease-out'>°F</button>
            </div>
        </div> 
)}

export default Inputs