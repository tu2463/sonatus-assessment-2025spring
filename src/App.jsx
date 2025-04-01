import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [sortRule, setSortRule] = useState({item: 'name', direction: 'asc'});
  
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
    }, []);

  const filteredUsers = users
    .filter((user) => 
      user.name.toLowerCase().includes(searchValue.toLowerCase()) || 
      user.email.toLowerCase().includes(searchValue.toLowerCase()))
    .sort((prev, cur) => {
      if (prev[sortRule.item].toLowerCase() < cur[sortRule.item].toLowerCase()) return sortRule.direction ? -1 : 1;
    });

  return (
    <div className="main">
      <input 
        className="search"
        placeholder="Search by name or email..."
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
      />

      <select className="sort">
        <option className="name-asc">Name ⬆</option>
        <option className="name-des">Name ⬇</option>
        <option className="email-asc">Email ⬆</option>
        <option className="email-des">Email ⬇</option>
      </select>

      {filteredUsers.map((user) => (
        <div key={user.id} className="user">
          <h1 className="name">{user.name}</h1>
          <div className="username"><b>Username</b>: {user.username}</div>
          <div className="email"><b>Email</b>: {user.email}</div>
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
          <hr />
        </div>
      ))}
    </div>
  )
}

export default App
