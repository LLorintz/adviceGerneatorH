import dividerDesktop from '../../images/pattern-divider-desktop.svg'
import dividerMobile from '../../images/pattern-divider-mobile.svg'
import dice from '../../images/icon-dice.svg'
import { useEffect, useState } from 'react';

type AdviceType = {
  id:number;
  advice:string;
}

const ADvice = () => {
  
  const [advice,setAdvice] = useState<AdviceType|null>(null)

  const fetchQuestion = async ()=>{
    try {
      const response = await fetch('https://api.adviceslip.com/advice')
        if (!response.ok) {
          throw new Error
        }
      const data = await response.json();
      console.log(data.slip);
      setAdvice(data.slip)
        
    } catch (error) {
        console.error('error:', error)      
    }
  }

  useEffect(()=>{
    fetchQuestion()
  },[])

  return (
    <div className="card">
        {advice ? (
          <>
            <p>advice #{advice.id}</p>
            <h2>{advice.advice}</h2>
          </>
          ) : (
            <p>Loading...</p>
          )}
        
        <img src={dividerDesktop} alt="desktop" className='dividerDesktop'/>
        <img src={dividerMobile} alt="mobile" className='dividerMobile' />
        <div className='dice' onClick={fetchQuestion}>
            <img src={dice} alt="dice" />
        </div>
    </div>
  )
}

export default ADvice