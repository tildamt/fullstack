import ShowPerson from "./ShowPerson"

const ShowPersons = ( { persons, newFilter, onDelete } ) => {
    return (
        <div>
            <h2>Numbers</h2>
            {persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
                .map(person =>
                    <ShowPerson key={person.name} person={person} onDelete={onDelete} />
                )
            }
        </div>
    )
}


export default ShowPersons