import  * as api from '../api';



export const getPost=(id)=> async (dispatch)=>{

    try {
        dispatch({type:'START_LOADING'});
        const {data}=await api.fetchPost(id);
        dispatch({type:'FETCH_POST',payload:data});
        dispatch({type:'END_LOADING'});
    } catch (err) {
        console.log(err.message);
        
    }
}
export const getPosts=(page)=> async (dispatch)=>{

    try {
        dispatch({type:'START_LOADING'});
        const {data}=await api.fetchPosts(page);
        dispatch({type:'FETCH_ALL',payload:data});
        dispatch({type:'END_LOADING'});
    } catch (err) {
        console.log(err.message);
        
    }
}
export const getPostsBySearch=(searchQuery)=>async (dispatch)=>{
    try {
        dispatch({type:'START_LOADING'});
        const {data:{data}}=await api.fetchPostsBySearch(searchQuery);
        dispatch({type:'FETCH_BY_SEARCH',payload:data});
        dispatch({type:'END_LOADING'});
        
    } catch (err) {
        console.log(err)
        
    }
}

export const createPost=(post,navigate)=>async (dispatch)=>{
    try {
        const {data}= await api.createPost(post);
        navigate(`/posts/${data._id}`);
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

export const commentPost=(value,id)=>async(dispatch)=>{
    try {
        await api.comment(value,id);
        
    } catch (err) {
        console.log(err);
        
    }
}