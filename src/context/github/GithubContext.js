import { createContext,useReducer} from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext()
const GITHUB_URL=process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN=process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({children})=>{

    const initialState={
        users:[],
        loading:false,
        user:{},
        repos:[],
    }

    const [state,dispatch]=useReducer(githubReducer,initialState)

    //Get search results
    const searchUsers=async(text)=>{
        setLoading()
        const params=new URLSearchParams({
            q:text
        })
        const response=await fetch(`${GITHUB_URL}/search/users?${params}`,{
            headers:{
                Authorization: `token ${GITHUB_TOKEN}`
            }
        })
        const {items}= await response.json()

        dispatch({
            type:'GET_USERS',
            payload:items,
        })
    }

 //Get single user
 const getUser=async(login)=>{
    setLoading()
   //https://api.github.com/search/users?q=will
    const response=await fetch(`${GITHUB_URL}/users/${login}`,{
        headers:{
            Authorization: `token ${GITHUB_TOKEN}`
        }
    })

    if(response.status===404){
        window.location='/notfound'        
    }else{
        const data= await response.json()
        
        
        dispatch({
            type:'GET_USER',
            payload:data,
        })
    }
    
}
        //Get initial users (testing purposes)  
    // const fetchUsers=async()=>{
    //     setLoading()
    //     const response=await fetch(`${GITHUB_URL}/users`,{
    //         headers:{
    //             Authorization: `token ${GITHUB_TOKEN}`
    //         }
    //     })
    //     const data= await response.json()

    //     dispatch({
    //         type:'GET_USERS',
    //         payload:data,
    //     })
    // }

//clear users from state 

const clearUsers=()=>dispatch({type:'CLEAR_USERS'})
//Setting loading 
    const setLoading=()=>dispatch({type:'SET_LOADING'

    } )
    //get user repos
    const getRepos=async(login)=>{
        setLoading()
       
        const response=await fetch(`${GITHUB_URL}/users/${login}/repos`,{
            headers:{
                Authorization: `token ${GITHUB_TOKEN}`
            }
        })
    
        if(response.status===404){
            window.location='/notfound'        
        }else{
            const repos= await response.json()
            
            
            dispatch({
                type:'GET_USER_REPOS',
                payload:repos,
            })
        }
    }
    return<GithubContext.Provider value={{
        ...state,
        dispatch,       
        searchUsers,
        clearUsers,
        getUser,
        getRepos,
    }}> 
            {children}
        </GithubContext.Provider>
}

export default GithubContext




