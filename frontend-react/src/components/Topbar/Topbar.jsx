import "./Topbar.css"
import { Search, Person, Message, Notifications } from '@mui/icons-material';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {

    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    // console.log(user, "===>>> topbars");

    return (
        <div className="topbarContainer">
            <div className="left">
                <Link to={"/"} style={{ textDecoration: "none", color: "white" }}>
                    <h3>SocialMedia</h3>
                </Link>
            </div>
            <div className="middle">
                <Search style={{ color: "#FDFB00" }} />
                <input className="searchInput" type="text" placeholder="Search for friends, post or videos" />
            </div>
            <div className="right">
                <div style={{ display: "flex" }}>
                    <p>Home</p>
                    <p>Timeline</p>
                </div>
                <div className="iconsContainer">
                    <div className="topbarIcons">
                        <Person style={{ color: "#FDFB00" }} />
                        <span className="iconsBadge">1</span>
                    </div>
                    <div className="topbarIcons">
                        <Message style={{ color: "#FDFB00" }} />
                        <span className="iconsBadge">1</span>
                    </div>
                    <div className="topbarIcons">
                        <Notifications style={{ color: "#FDFB00" }} />
                        <span className="iconsBadge">1</span>
                    </div>
                </div>
                <Link to={`/profile/${user?.loggedInUser?.userName}`}>
                    <img src={user?.loggedInUser?.profilePicture ? PF + user?.loggedInUser?.profilePicture : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="" className="profileImg" />
                </Link>
            </div>
        </div>
    )
}
