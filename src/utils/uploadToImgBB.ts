import { fileNameGenerator } from "./fileNameGenerator";

const uploadToImgBB =async(image:any)=>{
  console.log(image)
    let imgUrl = "";
    const formData = new FormData();
    formData.append('image', image);
    const imageHostKey = process.env.NEXT_PUBLIC_Imgbb_Token
    const fileName = fileNameGenerator()

  try{

      // Upload the image to ImgBB
      const imgbbResponse = await fetch(`https://api.imgbb.com/1/upload?expiration=600&key=${imageHostKey}&name=${fileName}`, {
        method: 'POST',
        body: formData,
      });
  
      if (!imgbbResponse.ok) {
        throw new Error('Image upload failed');
      }
  
      const imgbbData = await imgbbResponse.json();
      imgUrl = imgbbData.data?.url
      return imgUrl
  }catch(err){
    console.log(err)
  }
}

export default uploadToImgBB