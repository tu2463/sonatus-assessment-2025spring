import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [sortRule, setSortRule] = useState({item: 'name', direction: 'asc'});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
    setIsLoading(true);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) throw Error(`Error fetching data: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setIsLoading(false);
      })
    }, []);

  if (errorMessage) return <div className="error">{errorMessage}</div>;
  if (isLoading) return <div>Fetching data...</div>;

  let filteredUsers = users
    .filter((user) => 
      user.name.toLowerCase().includes(searchValue.toLowerCase()) || 
      user.email.toLowerCase().includes(searchValue.toLowerCase()));
  filteredUsers.sort((prev, cur) => {
      if (prev[sortRule.item].toLowerCase() < cur[sortRule.item].toLowerCase()) return sortRule.direction === "asc" ? -1 : 1;
      if (prev[sortRule.item].toLowerCase() > cur[sortRule.item].toLowerCase()) return sortRule.direction === "asc" ? 1 : -1;
      return 0;
    });

  return (
    <div className="main">
      <input 
        className="search"
        placeholder="Search by name or email..."
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
      />

      <select className="sort" 
        value={`${sortRule.item}-${sortRule.direction}`} 
        onChange={(e) => {
          const [item, direction] = e.target.value.split('-');
          setSortRule({item, direction});
        }}
      >
        <option value="name-asc">Name ⬆</option>
        <option value="name-desc">Name ⬇</option>
        <option value="email-asc">Email ⬆</option>
        <option value="email-desc">Email ⬇</option>
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
