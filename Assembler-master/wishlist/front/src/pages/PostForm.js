import{Formik, Form, Field, ErrorMessage} from "formik"
import * as Yup from "yup"
import { usePosts } from "../context/postContext"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import{ IoArrowBackSharp} from 'react-icons/io5'

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
        <div>
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
                    
                    navigate('/');
                }}
                enableReinitialize={true}
                >
                {({ handleSubmit, setFieldValue}) => (
                    <Form className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full" onSubmit={handleSubmit}>
                        <IoArrowBackSharp className="cursor-pointer" onClick={() => navigate(-1)}/>
                    <Field name='title' placeholder="title" className='px-3 py-2 focus:online-none rounded bg-gray-600 text-white w-full' />
                    <ErrorMessage component="p" className="text-red-400 text-sm" name='title' />

                    <Field name='description' placeholder="description" className='px-3 py-2 focus:online-none rounded bg-gray-600 text-white w-full'/>
                    <ErrorMessage component="p" name='description' className="text-red-400 text-sm" />
                    <input type="file" name="image" className="px-3 py-2 focus:outline-one rounded bg-gray-600 text-white w-full" onChange={(e) => setFieldValue('image', e.target.files[0])}/>
                    <button type="sumit" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Save</button>
                    
                </Form>
                )}
            </Formik>
        </div>
    )
}

