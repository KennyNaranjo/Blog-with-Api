import{Router} from 'express'
import { getPosts, createPosts, updatingPosts, deletingPosts, getPost,} from '../controllers/posts.controllers.js' 
const router = Router()

router.get('/posts', getPosts)

router.post('/posts', createPosts)

router.put('/posts/:id', updatingPosts)

router.delete('/posts/:id', deletingPosts)

router.get('/posts/:id', getPost)


export default router