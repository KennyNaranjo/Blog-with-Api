import{Formik, Form, Field, ErrorMessage} from "formik"
import * as Yup from "yup"
import { usePosts } from "../context/postContext"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import{ IoArrowBackSharp} from 'react-icons/io5'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export function PostForm() {

    const {createPost, getPost, updatePost} = usePosts()
    const navigate = useNavigate()
    const params = useParams()
    const [post, setPost] = useState({
        title:'',
        description:'',
        image:null
    })
    
    useEffect(() => {
        (async() => {
            if (params.id) {
                const post = await getPost (params.id);
                setPost(post);
            }
        })();
    }, [params.id]);

    return (
        <div className="flex items-center justify-center">
            <div className="bg-zinc-800 p-10 shadow-md shadow-black">
            <header className="text-xl">
            <IoArrowBackSharp className="cursor-pointer text-white text-xl " onClick={() => navigate(-1)}/>
            <h3 className=" text-white text-xl" >New post</h3>
            </header>
            <Formik
                initialValues={post}
                validationSchema={Yup.object({
                    title:Yup.string().required("Title is required"),
                    description: Yup.string().required("Description required")
                    
                })}
                onSubmit={async (values, actions) => {

                    if (params.id) {
                        await updatePost(params.id, values);
                    } else {
                        await createPost(values);
                    }
                    actions.setSubmitting(false);

                    navigate('/');
                }}
                enableReinitialize={true}
                >
                {({ handleSubmit, setFieldValue, isSubmitting}) => (
                    <Form onSubmit={handleSubmit} className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full">
                    
                    <label htmlFor="title" className="text-sm block font-bold text-gray-400">Title</label>
                    
                    <Field name='title' placeholder="title" className='px-3 py-2 focus:online-none rounded bg-gray-600 text-white w-full mb-4' />
                    <ErrorMessage component="p" className="text-red-400 text-sm" name='title' />

                    <label htmlFor="description" className="text-sm block font-bold text-gray-400">Description</label>

                    <Field  component="textarea" name='description' placeholder="description" className='px-3 py-2 focus:online-none rounded bg-gray-600 text-white w-full' rows={3} />
                    <ErrorMessage component="p" name='description' className="text-red-400 text-sm" />

                    <label htmlFor="description" className="text-sm block font-bold text-gray-400">Description</label>
                    
                    <input type="file" name="image" className="px-3 py-2 focus:outline-one rounded bg-gray-600 text-white w-full" onChange={(e) => setFieldValue('image', e.target.files[0])}/>
                    <button type="sumit" className="bg-indigo-600 hover:indigo-500 px-4 py-2 rounded mt-2 text-white focus:outline-none disabled:bg-indigo-400"
                    disabled={isSubmitting}
                    >{isSubmitting ? (<AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />) : 'Save'}</button>
                    
                </Form>
                )}
            </Formik>
            </div>
        </div>
    )
}

