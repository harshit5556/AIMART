import React from 'react'
import img1 from '../assets/img1.jpg'
import img2 from '../assets/img2.avif'
import img3 from '../assets/img3.jpg'
import img0 from '../assets/img0.png'
import img5 from '../assets/img5.jpg'
const Background = ({heroCount}) => {
    if(heroCount === 0){
return <img src={img0} alt="" className='w-1/2 h-screen object-cover float-right object-top'/>
    } 
    else if(heroCount===1){
        return <img src={img2} alt="" className='w-1/2 h-full object-cover float-right'/>
    }
    else if(heroCount===2){
        return <img src={img3} alt="" className='w-1/2 h-full object-cover float-right overflow-auto'/>
    }
    else if(heroCount===3){
        return <img src={img1} alt="" className='w-1/2 h-full object-cover float-right overflow-auto'/>
    }
    else if(heroCount===4){
        return <img src={img5} alt="" className='w-1/2 h-full object-cover float-right overflow-auto'/>
    }
}

export default Background