import "./Share.css"
import { PermMedia, LocationOn, Tag, TagFaces, Cancel } from "@mui/icons-material"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext.js"
import { useRef } from "react"
import { useState } from "react"
import axios from "axios"
import { storage, ref, uploadBytesResumable, getDownloadURL } from "../../firebaseConfig.js"

export default function Share({ setCheckNewPost }) {
    const { user } = useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const description = useRef();
    const [file, setFile] = useState(null);
    // const [imgUrl, setImgUrl] = useState("")
    // console.log(user, "==> user");

    async function postHandler(e) {
        e.preventDefault();
        if (!description.current.value && !file) {
            alert('There is nothing to upload')
        } else if (file) {
            /** @type {any} */
            const metadata = {
                contentType: 'image/jpg'
            };

            const storageRef = ref(storage, 'postImages/' + file.name);
            const uploadTask = uploadBytesResumable(storageRef, file, metadata);

            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    switch (error.code) {
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;
                        case 'storage/canceled':
                            // User canceled the upload
                            break;
                        case 'storage/unknown':
                            break;
                    }
                },
                () => {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        console.log('File available at', downloadURL);
                        const newPost = {
                            userId: user?.loggedInUser?._id,
                            postDescription: description.current.value,
                            postImage: downloadURL || ""
                        }
                        try {
                            await axios.post('http://localhost:8000/posts/', newPost)
                            setCheckNewPost(true)
                        } catch (error) {
                            console.error(error)
                        }
                        description.current.value = ""
                        setFile(null)
                    });
                }
            );
        } else {
            const newPost = {
                userId: user?.loggedInUser?._id,
                postDescription: description.current.value,
            }
            try {
                await axios.post('http://localhost:8000/posts/', newPost)
                setCheckNewPost(true)
            } catch (error) {
                console.error(error)
            }
            description.current.value = ""
        }
    }

    // console.log(user);
    return (
        <div className="shareBox">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img src={user?.loggedInUser?.profilePicture ? PF + user?.loggedInUser?.profilePicture : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="" className="shareProfileImage" />
                    <input type="text" className="postInputText" ref={description} placeholder="What's in your mind?" />
                </div>
                {
                    file && (
                        <div className="shareImgPreview">
                            <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
                            <Cancel className="cancelBtn" onClick={() => setFile(null)} />
                        </div>
                    )
                }
                <form className="shareBottom" onSubmit={postHandler}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <span className="shareOtionBtn"><PermMedia className="shareIcons" />Photo/Video</span>
                            <input style={{ display: "none" }} type="file" id="file" accept=".png, .jpeg, .jpg" onChange={(e) => setFile(e.target.files[0])} />
                        </label>
                        <div className="shareOption">
                            <span className="shareOtionBtn"><Tag className="shareIcons" />Tag</span>
                        </div>
                        <div className="shareOption">
                            <span className="shareOtionBtn"><LocationOn className="shareIcons" />Location</span>
                        </div>
                        <div className="shareOption">
                            <span className="shareOtionBtn"><TagFaces className="shareIcons" />Feelings</span>
                        </div>
                        <button className="postBtn" type="submit">Post</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
