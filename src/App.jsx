import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed,setNumberAllowed] = useState(false);
  const [charAllowed,setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
   const passwordref=useRef(null)
   const copytext= useCallback(()=>{
    passwordref.current?.select()
   window.navigator.clipboard.writeText(password)
   },[password])

 const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed)  str += "0123456789";
    if (charAllowed)   str += "!@#$%^&*()_+[]{}|;:,.<>?";
    for (let i = 1; i <=length; i++) {
      let char = Math.floor(Math.random()* str.length + 1)
      pass += str.charAt(char)
      console.log(pass);  
    }
    setPassword(pass);
  },[ length,numberAllowed, charAllowed,setPassword]);


  useEffect(()=>{passwordGenerator()}
  ,[length,numberAllowed,charAllowed,passwordGenerator]);

    return (
      <>
        <div className='w-full h-screen  flex  justify-center items-center bg-zinc-600'>
          <div className='w-1/2  h-2/5 text-center items-center justify-center  bg-slate-100  border-8 border-red-500 border-double	'>
            <div className=' w-full h-1/4  flex  text-center '>
              <input
                type='text'
                value={password}
                ref={passwordref}
                className="w-4/5 ml-3 h-1/2  mt-6 border-4 border-cyan-300 rounded-md"
              />
              <button onClick={copytext} className=' text-center w-1/6 h-1/2   mt-6 ml-2 bg-green-600  rounded-md text-white active:bg-blue-700  text-lg'>
                Copy
              </button>
            </div>
            <div className='flex  w-full h-11  space-x-6  items-center justify-center '>
              <input
                type="range"
                max={30}
                min={8}
                value={length}
                onChange={(e)=>{setLength(e.target.value)}}
              />
              <label htmlFor="length" className='font-bold text-blue-700  ml-4  text-2xl'> length{length}</label>
              <input
                type="checkbox"
                defaultValue={numberAllowed}    
                onChange={()=>{setNumberAllowed(e=>!e)}}   />
              <label htmlFor="length" className='font-bold text-blue-700  ml-4  text-2xl'> Number</label>
              <input
                type="checkbox"
                defaultValue={charAllowed}
                 onChange={()=>{setCharAllowed(e=>!e)}}
              />
              <label htmlFor="length" className='font-bold text-blue-700  ml-4  text-2xl'>Character</label>
            </div>
          </div>
        </div>
      </>
    )

  }export default App;