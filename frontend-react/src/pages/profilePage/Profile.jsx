import "./profile.css"
import Feed from "../../components/Feed/Feed";
import Rightbar from "../../components/Rightbar/Rightbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

export default function Profile() {
    const [user, setUser] = useState({})
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const username = useParams().username
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`http://localhost:8000/user?userName=${username}`);
            const data = res.data.userDeatils
            console.log(data, "==>user details");
            setUser(data)
        }
        fetchUser()
    }, [username])

    console.log(user, "==> user in profile");

    return (
        <>
            <Topbar />
            <div className="profile">
                <div className="profileCardContainer">
                    <div className="profileCardWrapper">
                        <div className="profileImgs">
                            <img src={user?.coverPic || `${PF}post/3.jpg`} alt="" className="profileCoverImg" />
                            <img src={`${PF}${user.profilePicture}`} alt="" className="profileUserImg" />
                        </div>
                        <div className="profileInfo">
                            <h2>{user.userName}</h2>
                            <p>{user.description}</p>
                        </div>
                    </div>
                </div>
                <div className="profileBottomContainer">
                    <div className="profileBottomLeft">
                        <Sidebar />
                    </div>
                    <div className="profileBottomMid">
                        <Feed username={username} />
                    </div>
                    <div className="profileBottomRight">
                        <Rightbar profile={user} />
                    </div>
                </div>
            </div>
        </>
    )
}
