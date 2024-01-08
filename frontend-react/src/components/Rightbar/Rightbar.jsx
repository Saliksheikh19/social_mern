import "./Rightbar.css"
import { Users } from "../../dummyData.js"
import { School, Home, LocationOn, AccessTime, Add, Remove } from "@mui/icons-material"
import OnlineFriendList from "../Online/OnlineFriendList"
import { useContext, useEffect } from "react";
import axios from "axios"
import { useState } from "react";
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";

export default function Rightbar({ profile }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([])
    const { user: currentUser, dispatch } = useContext(AuthContext)
    const [isFollowing, setIsFollowing] = useState(currentUser?.loggedInUser?.followings?.includes(profile?._id));

    console.log(profile, "==> profile");
    console.log(currentUser, "==> current user");



    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get(`http://localhost:8000/user/friends/${profile?._id}`);
                console.log(friendList.data.message);
                setFriends(friendList.data.message)
            } catch (error) {
                console.log(error);
            }
        }
        getFriends()
    }, [profile])

    useEffect(() => {
        setIsFollowing(currentUser?.loggedInUser?.followings?.includes(profile?._id))
    }, [currentUser?.loggedInUser?.followings, profile?._id])

    async function followHandler() {
        try {
            if (isFollowing) {
                await axios.put(`http://localhost:8000/user/${profile._id}/unfollow`, { userId: currentUser?.loggedInUser?._id })
                dispatch({ type: "UNFOLLOW", payload: profile?._id })
            } else {
                await axios.put(`http://localhost:8000/user/${profile._id}/follow`, { userId: currentUser?.loggedInUser?._id })
                dispatch({ type: "FOLLOW", payload: profile?._id })
            }
        } catch (error) {
            console.log(error);
        }
        setIsFollowing(!isFollowing)
    }

    return (
        <div className="rightbarContainer">
            <div className="rightbarWrapper">
                {
                    !profile ? (
                        <HomeRightBar PF={PF} />
                    ) : (
                        <ProfileRightBar isFollowing={isFollowing} followHandler={followHandler} currentUser={currentUser} user={profile} friends={friends} />
                    )
                }
            </div>
        </div>
    )
}

function HomeRightBar({ PF }) {
    return (
        <>
            <div className="eventConatiner">
                <img src={`${PF}Gift1.png`} alt="" className="giftImage" />
                <span><b>Rizwan</b> and <b>2 other</b> have birthday today</span>
            </div>
            <div className="eventPost">
                <img src="https://img.freepik.com/premium-psd/neon-instagram-post-template-elegant-trendy-dynamic_125755-81.jpg" alt="" className="eventPostImg" />
            </div>
            <div className="onlineFriends">
                <OnlineFriendList onlineFriendsArray={Users} />
            </div>
        </>
    )
}

function ProfileRightBar({ user, friends, currentUser, followHandler, isFollowing }) {
    return (
        <>
            {
                user.userName !== currentUser?.loggedInUser?.userName && (
                    <button className="seeMoreBtn followBtn" onClick={followHandler}>
                        {
                            isFollowing ? "Unfollow" : "Follow"
                        }
                        {
                            isFollowing ? <Remove /> : <Add />
                        }
                    </button>
                )
            }
            <div className="profileRightBar">
                <h3>User information</h3>
                <div className="infoContainer">
                    <School />
                    <span>Education</span>
                </div>
                <div className="infoContainer">
                    <Home />
                    <span>{user.city}</span>
                </div>
                <div className="infoContainer">
                    <LocationOn />
                    <span>{user.city}</span>
                </div>
                <div className="infoContainer">
                    <AccessTime />
                    <span>Joined</span>
                </div>
            </div>
            <div className="profileRightBar">
                <h2>Friends</h2>
                <div className="userFollowings">
                    {
                        friends.map((friend) => (
                            <Link to={`/profile/${friend.userName}`}>
                                <UserFollowing key={friend?._id} friend={friend} />
                            </Link>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

function UserFollowing({ friend }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <>

            <div className="userFollowing">
                <img src={friend?.profilePicture ? PF + friend?.profilePicture : `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`} alt="" className="firendImg" />
                <p style={{ textDecoration: "none", color: "white" }}>{friend.userName}</p>
            </div>

        </>
    )
}

