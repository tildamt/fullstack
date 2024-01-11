import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import AddPerson from './components/AddPerson'
import ShowPersons from './components/ShowPersons'
import Notification from './components/Notification'
import Error from './components/Error'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notifMessage, setNotifMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      
      const person = persons.find(p => p.name === newName)
      const changedPerson = { ...person, number: newNumber}

      if (window.confirm(`${changedPerson.name} is already added to the phonebook, replace the old number with the new one?`)) {
        personService
          .update(changedPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
            setNotifMessage(`${returnedPerson.name}'s number was changed`)
            setTimeout(() => {
              setNotifMessage(null)
            }, 5000)
              })
          .catch(() => {
            setErrorMessage(`Couldn't change ${returnedPerson.name}'s number`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          }
            )
        
        setNewName('')
        setNewNumber('')

        return
      }
    }

    const nameObject = {
      name: newName,
      number: newNumber
    }

    personService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setNotifMessage(`${returnedPerson.name} was added`)
        setTimeout(() => {
          setNotifMessage(null)
        }, 5000)
      })
      .catch(() => {
        setErrorMessage(`Couldn't add ${returnedPerson.name}`)
        setTimeout(() => {
          setNotifMessage(null)
        }, 5000)
      })

  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const deleteName = id => {
    const personToDelete = persons.find(p => p.id === id)
    if (window.confirm(`Do you want to delete ${personToDelete.name} ?`)) {
      personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
        setNotifMessage(`${personToDelete.name} was deleted`)
        setTimeout(() => {
          setNotifMessage(null)
        }, 5000)
      })
      .catch(() => {
        setErrorMessage(`Couldn't delete ${returnedPerson.name}`)
        setTimeout(() => {
          setNotifMessage(null)
        }, 5000)
      })
      }
      
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {errorMessage ? <Error message={errorMessage}/> : null}
      {notifMessage ? <Notification message={notifMessage}/> : null}
      <Filter filter={newFilter} changeFilter={handleFilterChange}/>
      <AddPerson addName={addName} newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <ShowPersons persons={persons} newFilter={newFilter} onDelete={deleteName}/>
    </div>
  )

}

export default App