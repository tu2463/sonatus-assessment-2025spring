import { useState } from 'react';

export default function User({ user }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div id={user.id} className="user">
            <h1 className="name" onClick={() => setIsExpanded(!!!isExpanded)}>{user.name}</h1>
            <div className="email"><b>Email</b>: {user.email}</div>
            {isExpanded && <div className="details">
                <div className="username"><b>Username</b>: {user.username}</div>
                <div className="address">
                    <b>Address</b>:
                    <ul>
                        <li><b>Street</b>: {user.address.street}</li>
                        <li><b>Suite</b>: {user.address.suite}</li>
                        <li><b>City</b>: {user.address.city}</li>
                        <li><b>Zipcode</b>: {user.address.zipcode}</li>
                        <li>
                            <b>Geo</b>:
                            <ul>
                                <li><b>Latitude</b>: {user.address.geo.lat}</li>
                                <li><b>Longitude</b>: {user.address.geo.lng}</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className="phone"><b>Phone</b>: {user.phone}</div>
                <div className="website"><b>Website</b>: {user.website}</div>
                <div className="company">
                    <b>Company</b>:
                    <ul>
                        <li><b>Name</b>: {user.company.name}</li>
                        <li><b>Catch phrase</b>: {user.company.catchPhrase}</li>
                        <li><b>BS</b>: {user.company.bs}</li>
                    </ul>
                </div>
            </div>}
            <hr />
        </div>
    )
};