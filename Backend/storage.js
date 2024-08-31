const multer=require("multer")
const path=require("path")


const storage=multer.diskStorage({
    destination:"./upload/resumes",
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const fileFilter = (req,file,cb) => {
    
    const allowedFileTypes = /pdf|docx/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    }
};
const upload=multer({
    storage:storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: fileFilter
})


module.exports=upload