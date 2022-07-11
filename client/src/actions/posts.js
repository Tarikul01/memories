import  * as api from '../api';


export const getPosts=()=> async (dispatch)=>{

    try {
        const {data}=await api.fetchPosts();
        dispatch({type:'FETCH_ALL',payload:data});
        
    } catch (err) {
        console.log(err.message);
        
    }
}
export const getPostsBySearch=(searchQuery)=>async (dispatch)=>{
    try {
        const {data:{data}}=await api.fetchPostsBySearch(searchQuery);
        dispatch({type:'FETCH_BY_SEARCH',payload:data});
        
    } catch (err) {
        console.log(err)
        
    }
}

export const createPost=(post)=>async (dispatch)=>{
    try {
        const {data}= await api.createPost(post);
        dispatch({type:'CREATE',payload:data});
       
        
    } catch (err) {
        console.log(err.message);
        
    }
}
export const updatePost=(id,post)=>async(dispatch)=>{
try {
    const {data}= await api.updatePost(id,post);
   console.log(data)
    // dispatch({type:'UPDATE',payload:data})
    
} catch (err) {
    console.log(err.message);
    
}
}
export const deletePost=(id)=>async (dispatch)=>{
  try {
      await api.deletePost(id);
      dispatch({type:"DELETE",payload:id})
  } catch(err) {
      console.log(err.message)
      
  }
}

export const likePost=(id)=>async(dispatch)=>{
    try {
        const {data}=await api.updateLike(id);
        dispatch({type:'LIKE',payload:data})
        
    } catch (err) {
        console.log(err.message)
        
    }
}