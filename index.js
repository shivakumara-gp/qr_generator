/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.*/
import inquirer from "inquirer";
import qrImage from "qr-image";
import fs from "fs";
inquirer
.prompt([
    {
        type:"input",
        name:"url",
        message:"enter the url to generate a qrcode:"

    },
])
.then((answers)=>{
    const qr=answers.url;
    const qr_svg=qrImage.image(qr,{type:"png"});
    qr_svg.pipe(fs.WriteStream("qrcode.png"));
    fs.writeFile("url.txt",qr,(err)=>{
    if(err) throw err;
    console.log("url is stored");
});
    

})
.catch((error)=>{
if(error.isTtyError){
    console.log("your console environment is not supported");
}
else{
    console.log(error);
}
});


