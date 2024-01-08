import "./Sidebar.css"
import {
    RssFeed, Chat, PlayCircle, Groups, Bookmark, Work, Event
} from '@mui/icons-material';
import { Users } from "../../dummyData.js";

export default function Sidebar() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const sidebarItmesArray = [
        {
            icon: <RssFeed className="itemIcon" />,
            text: "Feed"
        },
        {
            icon: <Chat className="itemIcon" />,
            text: "Chat"
        },
        {
            icon: <PlayCircle className="itemIcon" />,
            text: "Video"
        },
        {
            icon: <Groups className="itemIcon" />,
            text: "Gropus"
        },
        {
            icon: <Bookmark className="itemIcon" />,
            text: "Bookmarks"
        },
        {
            icon: <Work className="itemIcon" />,
            text: "Jobs"
        },
        {
            icon: <Event className="itemIcon" />,
            text: "Events"
        },
    ]

    return (
        <div className="sidebarContainer">
            <div className="sidebarWrapper">
                <SidebarItemList sidebarItmesArray={sidebarItmesArray} />
                <SidebarFriendsList friendsArray={Users} PF={PF} />
            </div>
        </div>
    )
}


//------------------------Item list-------------------------------//

function SidebarItemList({ sidebarItmesArray }) {
    return (
        <ul className="sidebarItmesList">
            {
                Array.from([...sidebarItmesArray], (item, index) => (
                    <li key={index} className="sidebarItems">
                        {item.icon}
                        <span className="itemText">{item.text}</span>
                    </li>
                ))
            }
            <button className="seeMoreBtn">See more</button>
        </ul>
    )
}

//------------------------Firends list-------------------------------//

export function SidebarFriendsList({ friendsArray, PF }) {
    return (
        <ul className="sidebarItmesList">
            {
                Array.from([...friendsArray], (user) => (
                    <li key={user?.id} className="sidebarItems">
                        <img src={PF + user?.profilePicture} alt="" className="profileImage" />
                        <span className="itemText">{user?.username}</span>
                    </li>
                ))
            }
            <button className="seeMoreBtn">See more</button>
        </ul>
    )
}