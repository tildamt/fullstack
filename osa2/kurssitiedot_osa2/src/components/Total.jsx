const Total = ({ parts }) => {
    const total = parts.map(part =>
        part.exercises).reduce( (s, p) => s + p)
    return (
        <div>
            <p>total of {total} exercises</p>
        </div>
    )
}

export default Total