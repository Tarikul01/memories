// import {FETCH_ALL,CREATE,UPDATE,DELETE,LIKE} from '../constants/actionTypes';
// import * as api from '../api/index.js';
export const signin=(formData,navigate)=>async(dispatch)=>{
    try {

        navigate('/')
        
    } catch (err) {
        console.log(err)
        
    }

}
export const signup=(formData,navigate)=>async(dispatch)=>{
    try {
        navigate("/")
    } catch (err) {
        console.log(err)
        
    }
    
}