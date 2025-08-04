import multer from 'multer'
import {CloudinaryStorage} from 'multer-storage-cloudinary'
import cloudinary from './cloudinary'


const storage=new CloudinaryStorage({
    cloudinary,
    params:async()=>{
        return{
            folder:'ecommerce/products',
            allowed_formats:['jpg','png','jpeg','webp'],
            transformation:[{width:800,height:800,crop:'limit'}],
        }
    }
})

export const upload=multer({storage})


