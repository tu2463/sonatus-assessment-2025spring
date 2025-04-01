import { useState, useEffect } from 'react'
import './App.css'
import User from './user.jsx'

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
        <User key={user.id} user={user}/>
      ))}
    </div>
  )
}

export default App
