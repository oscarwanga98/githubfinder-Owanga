import { createContext,useReducer } from "react";
import alertReducer from './AlertReducer'

const AlertContext=createContext()


export const AlertProvider=({children})=>{
    const initialState=null

    const[state,dispatch]=useReducer(alertReducer,initialState)

    //set an Alert
    const setAlert=(msg,type)=>{
        dispatch({
            type:'SET_ALERT',
            payload:{msg}
        })
        setTimeout(()=>dispatch({
            type:'REMOVE_ALERT'
        }),3000 )
    }

    return <AlertContext.Provider value={{alert:state,setAlert}}>
                {children}
           </AlertContext.Provider>

}

export default AlertContext