  
import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';

import Table from './Table';
import Form from './Form';

function App() {
  const [ characters, setCharacters] = useState([]);

  const removePerson = (id) => {
    axios.delete('http://localhost:5000/users/${id}')
      .then(res => {
        // 204 status code means the action was successfully enacted
        if (res.status === 204) {
          setCharacters(
            characters.filter((character, _) => {
              return character.id !== id;
            }),
          );
        }
      });
  }

  const handleSubmit = (character) => {
    axios.post('http://localhost:5000/users', character)
      .then(res => {
        if (res.status === 201) {
          setCharacters([...characters, res.data])
        }
      }).catch(err => {
        console.log(err);
        return false;
      });
  }

  const fetchUsers = () => {
    axios.get('http://localhost:5000/users')
      .then(res => {
        const characters = res.data.users_list;
        setCharacters(characters);
      }).catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container">
      <Table peopleData={characters} removePerson={removePerson} />
      <Form handleSubmit={handleSubmit}/>
      {}
    </div>
  );
};

export default App