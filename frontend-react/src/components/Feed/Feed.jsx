import Post from "../Post/Post"
import Share from "../Shared/Share"
import "./Feed.css"
import { useContext, useEffect, useState } from "react"
import axios from 'axios'
import { AuthContext } from "../../context/AuthContext"

export default function Feed({ username }) {
    // console.log(username, "==> username");

    const [posts, setPosts] = useState([]);
    const [checkNewPost, setCheckNewPost] = useState(false)
    const { user } = useContext(AuthContext);
    // console.log(user);

    useEffect(() => {
        const fetchPost = async () => {
            const res = username ? await axios.get(`http://localhost:8000/posts/profile/${username}`) : await axios.get(`http://localhost:8000/posts/timeline/${user?.loggedInUser?._id}`);
            const data = res.data.data
            // console.log(data);
            setPosts(data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt)
            }))
        }
        fetchPost()
    }, [username, user?.loggedInUser?._id, checkNewPost])
    return (
        <div className="feedContainer">
            <div className="feedWrapper">
                {username === user?.loggedInUser?.userName ? <Share setCheckNewPost={setCheckNewPost} /> : !username ? <Share setCheckNewPost={setCheckNewPost} /> : ""}
                {
                    posts.map((post) => (
                        <Post key={post._id} post={post} />
                    ))
                }
            </div>
        </div>
    )
}
