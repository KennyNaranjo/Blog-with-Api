import { useState, createContext, useContext, useEffect } from "react"
import { getPostRequests, createPostRequest, deletePostRequest, getPostRequest, updatePostRequest } from "../api/post"


const postContext = createContext()

export const usePosts = () =>{
    const context = useContext(postContext)
    return context
}
export const PostProvider = ({children}) => {

    const [posts, setPosts] = useState([])
    
    const getPosts = async () =>{
        const res = await getPostRequests()
        setPosts(res.data)
    }

    const createPost = async (post) => {
        try {
            const res = await createPostRequest(post)
        
            setPosts([...posts, res.data])
        } catch (error) {
            
        }
        
    }

const deletePost = async (id) => {
    const res = await deletePostRequest(id)
    if (res.status === 204) {
        setPosts (posts.filter((post) => post._id !== id))
    }
};

const getPost = async (id) => {
    const res = await getPostRequest(id);
    return res.data
};
    const updatePost = async (id, newPost) => {
        const res = await updatePostRequest(id, newPost);
        setPosts(posts.map((post) => (post._id === id ? newPost : post)));
    };


    useEffect(() => {
        getPosts()
    }, [])

    return <postContext.Provider value= {{
        posts,
        getPosts,
        createPost,
        deletePost,
        getPost,
        updatePost,
    }}>
        {children}
    </postContext.Provider>

}