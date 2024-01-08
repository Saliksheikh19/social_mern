

export default function OnlineFriendList({ onlineFriendsArray }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <>
            <h3>Online Friends</h3>
            <ul className="sidebarItmesList">
                {
                    Array.from([...onlineFriendsArray], (user) => (
                        <li key={user.id} className="sidebarItems">
                            <div className="profileImgContainer">
                                <img src={PF+user.profilePicture} alt="" className="profileImage" />
                                <span className="online"></span>
                            </div>
                            <span className="itemText">{user.username}</span>
                        </li>
                    ))
                }
                <button className="seeMoreBtn">See more</button>
            </ul>
        </>

    )
}

