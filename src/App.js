import React, { useState, useEffect } from "react";
import api from './services/api'
import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then((response) => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    let mockData = {
      "title": "Flexbox na prática" + Date.now().toString(),
      "url": "http://github.com/nipodemos/flexbox-na-prática",
      "techs": [
        "CSS Flexbox"
      ],
    }

    api.post('/repositories', mockData).then((response) => {
      const createdRepository = response.data
      setRepositories([...repositories, createdRepository])
    })
  }

  async function handleRemoveRepository(id) {

    api.delete(`/repositories/${id}`).then((response) => {
      console.log('response :>> ', response);
      if (response.status === 204) {

        let newRepositories = repositories.filter((value) => {
          return (value.id !== id)
        })
        console.log('newRepositories :>> ', newRepositories);

        setRepositories(newRepositories)
      }
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => {
          return (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
                </button>
            </li>
          )
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
