import cloudinary from 'cloudinary'

cloudinary.config({
    cloud_name:"drxkpjuhc",
    api_key:"538726559737222",
    api_secret:"mLJ7r3g55_dIEQ7BTJJ_loBxLYQ"
})
export const uploadImage = async filePath => {
    return await cloudinary.v2.uploader.upload(filePath, {
        folder:'Gifsito'
    })
}

export const deleteImage = async  id => {
    return await cloudinary.uploader.destroy(id)
}