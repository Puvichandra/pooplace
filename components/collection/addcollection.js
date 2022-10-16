import { useForm } from "react-hook-form";
import Button from '../ui/button'
import Image from 'next/image'
// import { ImageUpload } from '../ui/upload-preview'
import { useEffect, useRef, useState } from "react";
import { BallTriangle} from  'react-loader-spinner'
import Router from 'next/router';
import  Axios  from "axios";
import ReCAPTCHA from "react-google-recaptcha";







function ListCoinForm(){

    const [datafiledata, setDatafiledata] = useState([])
    
   // const [imagedata,setimagedata] = useState({file:'', imageblob:''});
    const [imagedata,setimagedata] = useState({file:'', imageblob:''});
    const [imagecloud,setimagecloud] = useState('');
    const [imageurl, setimageurl] =useState('');
    const [imagePreview,setimagePreview] = useState();
    const imgref=useRef(null);
    const [isLoading,setIsLoading]=useState(false);
    const [iscaptcha, setIsCaptcha] = useState(false);
    const [captcha, setCaptcha] = useState('');
    const skey = process.env.NEXT_PUBLIC_REACT_APP_SITE_KEY;
  
   
    const { register,   formState:{errors}, handleSubmit, } = useForm({
    mode:'onTouched',
    defaultValues:{
    websitelink:'https://'
    }
    });

   
   const uploadImage=()=>{
    const formData = new FormData();
    formData.append("file", imagecloud);
    formData.append("upload_preset", "akcblzz9");
     Axios.post("http://api.cloudinary.com/v1_1/dp9yoy7js/image/upload", formData)
    .then((response)=>
   { 
    if(response.statusText="OK"){
    setimageurl(response.data.secure_url);
    
    }
      })
   }

  const onSubmit = dd => {
    dd.captcha=captcha;
    console.log(dd);
    setIsLoading(true)
    const formData = new FormData();
    formData.append("file", imagecloud);
    formData.append("upload_preset", "akcblzz9");
   Axios.post(process.env.NEXT_PUBLIC_CLOUD_URL, formData)
   .then((response)=>
  { dd.coinimage=response.data.secure_url;
  // console.log(dd);
   updateDbase(dd);
 }).catch ((e)=>{
   setIsLoading(false);
   alert("error  loading  picture in cloudinary")
 })
} 

const updateDbase=(dd)=>{
    fetch(process.env.NEXT_PUBLIC_ADD_COLLECTION, {
    method:'POST',
    body:JSON.stringify(dd),
     headers:{
       'Content-Type': 'application/json'
     }
   }).then((res)=>res.json())
  .then((data)=>{//console.log("ddd",data);
  setIsLoading(false);window.location.reload(false);})
  .catch((e)=>{
    console.log("error in updating")
    setIsLoading(false);
   // window.location.reload(false);
  });
}


const getDatajson=()=>{
  fetch('/api/datajson')
  .then((res)=>res.json())
  .then((data)=>{setDatafiledata(data.datafile)})
}
  // if (!image) {
  //   console.log('image is required');
  //   return false;
  //   }
  //   if (!image.name.match(/\.(jpg|jpeg|png|gif)$/)) {
  //     console.log('select valid image.');
  //    return false;
  //   }
  // const onImgLoad = ({ target: img }) => {
  //   const { offsetHeight, offsetWidth } = img;
  //   console.log(img.offsetWidth);
  // };

  const _handleImageChange=(e) =>{
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
        if (!file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
        alert("Choose Correct picture format jpg/jpeg/png/gif")
        setimagedata({file:'', imageblob:''});
        e.target.value=null;
       return false;
      } else {
        reader.onloadend = () => { 
          setimagedata({ file: file,
          imagePreviewUrl: reader.result});
          setimagecloud(file)
          }

       
      }
  
  
    reader.readAsDataURL(file)
 
  }

  const setImageSize = (setImageDimensions, imageUrl) => {
    if(!imageUrl===undefined){
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setImageDimensions({
        height: img.height,
        width: img.width
      });
      //console.log(setImageDimensions.height)
    };
  }
  };


  useEffect(()=>{
    
    if (imagedata) {
      setimagePreview (<img src={imagedata.imagePreviewUrl } onClick={(e)=>{console.log(e.clientX + " - " +e.clientY)}} />);
      
    } else {
      setimagedata({file:'', imageblob:''})
      setimagePreview (<div className="text-txtborderColor font-poppins text-sm">Select Image</div>);
    }
  
   },[imagedata])
  
    


    
    return ( 

 
  
       
    <div className="py-5">
    {/* <ImageUpload/> */}
        {/* <div  className="max-w-4xl rounded-2xl overflow-hidden shadow-md shadow-txtborderColor mx-auto  border-solid border-2 border-txtborderColor bg-lightgrey  py-5"> */}
        <div  className="max-w-4xl rounded-2xl overflow-hidden  mx-auto   bg-lightgrey  py-5" style={{boxShadow:"rgba(0, 0, 0, 0.1) 0px 4px 12px"}}>
        {/* <div  className="w-64  h-64 rounded-2xl overflow-hidden shadow-md shadow-txtborderColor mx-auto  border-solid border-2 border-txtborderColor bg-lightgrey  "> */}
        {/* <ImageUpload /> */}
        {/* <Image src="/img/nftone.png" alt= "No Data" width={250} height={250} />
           </div> */}
           {isLoading ? <div className="relative w-full h-screen    my-28 ">
           <div className='absolute left-1/2 top-1/2 w-28  h-32  m-auto text-center text-txtborderColor text-2xl'><BallTriangle color='#9bbcd1' height="100" width="100" ariaLabel='loading'/> Updating...</div></div>:
<div className='px-10 pt-10 '>

   
        <form onSubmit={handleSubmit(onSubmit)}  >
        <div  className="w-24  h-32 object-contain   rounded-2xl overflow-hidden shadow-md shadow-txtborderColor mx-auto  border-solid border-2 border-txtborderColor bg-lightgrey  "> 
        <input className="text-txtborderColor font-poppins text-sm text-center overflow-hidden" 
              type="file" 
              ref={imgref}
              {...register("coinimage", {required:true}) }
              onChange={(e)=>_handleImageChange(e)}
              // onLoad={(e)=>setChandra()}
               />
            <div className="w-24 h-24  border-2 border-solid border-txtborderColor rounded-lg mx-auto">
            {imagePreview}
           </div>
             
              </div>
              <p className="text-red-400 text-center">
               {errors.coinimage?.type==="required" && "Collection image is Required"}
              </p>
             
              

        <div className='flex flex-row flex-wrap py-2'>
          <div className=' basis-full   md:basis-1/2 block md:inline-block'>
        
            <div className='md:pr-5'>
            <div className='w-full  '>
            <label className='text-txtborderColor pb-10 text-left text-md md:text-xl '>Collection Name</label>
            <div className="w-full">
            <input className="bg-bodygray w-full text-black font-poppins border-2 border-black py-1"
              type="text"
              placeholder="NFT Collection Name"
              {...register("coinname", {required:true}) }   />
              <p className="text-red-400">
               {errors.coinname?.type==="required" && "Collection Name is Required"}
              </p>
               </div>
           </div>
            
            </div>
           </div>

           <div className='basis-full md:basis-1/2  block md:inline-block'>
            <label className='text-txtborderColor pb-10 text-left text-md md:text-xl '>Contract Address</label>
            <div>
            <input className="bg-bodygray w-full  text-black font-poppins border-2 border-black py-1"
              type="text"
              placeholder="Contract Address"
              {...register("coinsymbol", {required:true}) } 
            />
              <p className="text-red-400">
               {errors.coinsymbol?.type==="required" && "Contract Address is Required"}
              </p>
            </div>
           </div>
        </div>

        
          <div className='w-full inline-block'>
            <label className='text-txtborderColor pb-10 text-md md:text-xl '>Description</label>
            <div>
            <textarea className="bg-bodygray w-full text-black  font-poppins border-2 border-black"
              placeholder="Description" rows="8" 
              {...register("description", {required:true,maxLength:500}) } 
            />
             <p className="text-red-400">
               {errors.description?.type==="required" && "Description is Required"}
               {errors.description?.type==="maxLength" && "Maximum 500 characters"}
              </p>
            </div>
           </div>

           <div className='flex flex-row flex-wrap py-2'>
          <div className='basis-full md:basis-3/6 md:inline-block block'>
            <label className='text-txtborderColor pb-10 text-left text-md md:text-xl'>Website Link</label>
            <div className='md:pr-5'>
            <input className="bg-bodygray text-black  w-full font-poppins border-2 border-black py-1"
              type="text"
              placeholder="Website Link"
             
              {...register("websitelink",{ required:{ value:false,}})}
                   />
            </div>
           </div>

           <div className='basis-full md:basis-3/6 md:inline-block block '>
            <label className='text-txtborderColor pb-10 text-left text-md md:text-xl '>Twitter Link</label>
            <div >
            <input className="bg-bodygray w-full text-black font-poppins border-2 border-black py-1"
              type="text"
              placeholder="Twitter Link"
              {...register("twitterlink", {required:false}) } 
              
            />
            </div>
           </div>

        </div>

        <div className='flex flex-row flex-wrap py-2'>
   

           <div className='basis-full md:basis-3/6 md:inline-block block '>
            <label className='text-txtborderColor pb-10 text-left text-md md:text-xl '>Discord Link</label>
            <div className='md:pr-5'>
            <input className="bg-bodygray w-full text-black font-poppins border-2 border-black py-1"
              type="text"
              placeholder="Discord Link"
              {...register("discordlink", {required:false}) } 
            />
            </div>
           </div>

           <div className='basis-full md:basis-3/6 md:inline-block block'>
            <label className='text-txtborderColor pb-10 text-left text-md md:text-xl'>Telegram Link</label>
            <div>
            <input className="bg-bodygray w-full text-black font-poppins border-2 border-black py-1"
              type="text"
              placeholder="Telegram Link"
              {...register("telegramlink", {required:false}) } 
            />
            </div>
           </div>
        </div>  



           

        
       
          <div className='text-center w-3/6 md:w-1/3 pt-4 md:mx-auto'>
          <div className="mx-auto">
          <ReCAPTCHA
       
        sitekey= {skey}
        onChange={(e)=>{setIsCaptcha(true);setCaptcha(e); }}
      />
      </div>
       <div className="py-4">
       {iscaptcha ?<button type="submit"  >
              Submit
            </button>:null }
            </div>
             </div>
          </form> 
   
    </div>}
            
          </div>
          
        </div>  )
  

}

export default ListCoinForm;