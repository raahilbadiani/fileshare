const express = require('express')
const multer = require('multer')
const serve = require('serve-index')
const app = express()


const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'./views/serve');
    },
    filename: (req,file,cb) =>{
        cb(null,file.originalname);
    }
})

let upload = multer({storage:storage})

app.use('/downloads',express.static('views/serve'),serve('views/serve',{icons:true }))

app.set('view engine','ejs')

app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/uploads',(req,res)=>{
    res.render('uploads')
})

app.post('/uploads', upload.single('upload'),(req,res,next)=>{
    const file = req.file;
    if(!file){
        const error = new Error('[-] Retry!');
        error.httpStatusCode = 400;
        return next(error);
    }
    file.filename=file.originalname;
    res.render('home',{'msg':'[+] successfully uploaded file'})
})

app.listen(3000,()=>{
    console.log('Server listening on port 3000')
})