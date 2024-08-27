const cloudinary = require("cloudinary").v2
const deleteFile = (url) => {
    //https://res.cloudinary.com/dcrq27pfp/image/upload/v1723556871/usersDayana/thbxjcsdzx37q9e2arqy.jpg 
    //url del user en mongodb // https://res.cloudinary.com/dflmkl7qe/image/upload/v1724537361/war/gebeqsrpzv0zx1dhzfzh.jpg
    const imgSplit = url.split("/");
    const nameImg = imgSplit[imgSplit.length - 1] //gebeqsrpzv0zx1dhzfzh.jpg
    const nameImgSplit = nameImg.split(".") // [gebeqsrpzv0zx1dhzfzh, jpg]
    const folder = imgSplit[imgSplit.length - 2] //war

    ///--> war/gebeqsrpzv0zx1dhzfzh --> esto es lo que necesita cloudinary 

    const imgToDelete = `${folder}/${nameImgSplit[0]}`
    cloudinary.uploader.destroy(imgToDelete, () => {
        console.log("imagen eliminada")
    })
}

module.exports = { deleteFile }