const ShowPerson = ( { person, onDelete }) => {
    return (
        <div>
            <form>
            <p> {person.name} {person.number} <button type="button" onClick={() =>
                onDelete(person.id)}>delete</button></p>
            </form>
        </div>
    )
}

export default ShowPerson