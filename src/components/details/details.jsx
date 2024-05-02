import "./details.css"

const Details = () => {
    return (
        <div className='details'>
            <div className="user">
                <img src="./avatar.png" alt="" />
                <h2>John Doe</h2>
                <p>Lorem ipsum dolor sit amet</p>
            </div>
            <div className="info">
                <div className="option">
                    <div className="title">
                        <span>Chat Settings</span>
                        <img src="./arrowUp.png" alt = ""/>
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Privacy</span>
                        <img src="./arrowUp.png" alt = ""/>
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Help</span>
                        <img src="./arrowUp.png" alt = ""/>
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Shared Photos</span>
                        <img src="./arrowDown.png" alt = ""/>
                    </div>
                    <div className="photos">
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_1280.jpg" alt="" />
                                <span>photo_2024_2.png</span>
                            </div>
                            <img src = "./download.png" alt = "" className = "icon"/>
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_1280.jpg" alt="" />
                                <span>photo_2024_2.png</span>
                            </div>
                            <img src = "./download.png" alt = "" className = "icon" />
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_1280.jpg" alt="" />
                                <span>photo_2024_2.png</span>
                            </div>
                            <img src = "./download.png" alt = "" className = "icon" />
                        </div>
                        
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Shared Files</span>
                        <img src="./arrowUp.png" alt = ""/>
                    </div>
                </div>
                <button>Block User</button>
                <button className = "logout">Logout</button>
            </div>
        </div>
    )
}

export default Details