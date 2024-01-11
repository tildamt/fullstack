const Filter = ( { filter, changeFilter}) => {

    return (
        <form>
            <div>
                filter shown with <input 
                value={filter}
                onChange={changeFilter}/>
            </div>
        </form>
    )
}

export default Filter