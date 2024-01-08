import "./Post.css"
import { ThumbUp } from "@mui/icons-material"
import { useEffect, useState } from "react"
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
    // console.log(post, "==> in comp");
    const [likeCount, setLikeCount] = useState(post.likes.length)
    const [isLikeTrue, setIsLikeTrue] = useState(false)
    const [user, setUser] = useState({})
    const { user: currentUser } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    // console.log(post, "==> post ");

    useEffect(() => {
        setIsLikeTrue(post.likes.includes(currentUser?.loggedInUser?._id))
    }, [currentUser?.loggedInUser?._id, post.likes])

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`http://localhost:8000/user?userId=${post.userId}`);
            const data = res.data.userDeatils
            // console.log(data);
            setUser(data)
        }
        fetchUser()
    }, [post?.userId])

    function likeHandler() {

        try {
            axios.put(`http://localhost:8000/posts/${post._id}/like`, { userId: currentUser?.loggedInUser?._id })
        } catch (error) {
            console.log(error);
        }

        if (!isLikeTrue) {
            setLikeCount((c) => c + 1)
            setIsLikeTrue(true)
        } else if (isLikeTrue) {
            setLikeCount((c) => c - 1)
            setIsLikeTrue(false)
        }
    }

    return (
        <div className="postContainer">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="authDeatil">
                        <Link to={`http://localhost:3000/profile/${user.userName}`} style={{ textDecoration: "none", color: "white", display: "flex", alignItems: "center" }}>
                            <img src={user.profilePicture ? PF + user.profilePicture : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="" className="profileImage" />
                            <span className="userName">{
                                user?.userName
                            }</span>
                        </Link>
                        <span className="timeAgo">{format(post.createdAt)}</span>
                    </div>
                </div>
                <div className="postMid">
                    <div >
                        <p className="postText">{post?.postDescription}</p>
                        <div className="postImgContainer">
                            <img src={post?.postImage || PF + post?.postImage} alt="" className="postImg" />
                        </div>
                    </div>
                </div>
                <div className="postBottom">
                    <div className="likeBtn">
                        <span className="thumbsUp" onClick={() => {
                            likeHandler()
                        }}><ThumbUp style={isLikeTrue ? { color: "#4e79d9" } : { color: "white" }} /></span>
                        {likeCount} people like it
                        <span></span>
                    </div>
                    <div className="commentIndicator">
                        <span>{post.comment} comment</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
