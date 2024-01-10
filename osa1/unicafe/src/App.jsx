import { useState } from 'react'

const StatisticLine = (props) => {
  return(
    <div>
      <p>{props.text} {props.value}</p>
    </div>
  )
}

const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
        <tr>
          <td>good</td>
          <td>{props.good}</td>
        </tr>
        <tr>
          <td>neutral</td>
          <td>{props.neutral}</td>
        </tr>
        <tr>
          <td>bad</td>
          <td>{props.bad}</td>
        </tr>
        <tr>
          <td>all</td>
          <td>{props.total}</td>
        </tr>
        <tr>
          <td>average</td>
          <td>{(props.average).toFixed(1)}</td>
        </tr>
        <tr>
          <td>positive</td>
          <td>{(props.positive * 100).toFixed(1)}%</td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}

const Button = ({label, onClick}) => {
  return (
    <button onClick={onClick}>{label}</button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    const updatedGood = good + 1
    setTotal(updatedGood + neutral + bad)
    const updatedTotal = updatedGood + neutral + bad
    const updatedAverage =  (updatedGood - bad) / updatedTotal
    setAverage(updatedAverage)
    setPositive(updatedGood / updatedTotal)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    const updatedNeutral = neutral + 1
    setTotal(good + updatedNeutral + bad)
    const updatedTotal = good + updatedNeutral + bad
    const updatedAverage = (good - bad) / updatedTotal
    setAverage(updatedAverage)
    setPositive(good / updatedTotal)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    const updatedBad = bad + 1
    setTotal(good + neutral + updatedBad)
    const updatedTotal = good + neutral + updatedBad
    const updatedAverage = (good - updatedBad) / updatedTotal
    setAverage(updatedAverage)
    setPositive(good / updatedTotal)
  }

  return (
    <div>
      <h1>give feedback</h1>
        <Button label="good" onClick={handleGoodClick}/>
        <Button label="neutral" onClick={handleNeutralClick}/>
        <Button label="bad" onClick={handleBadClick}/>
      <Statistics good={good} neutral={neutral} bad={bad}
        total={total} average={average} positive={positive} />
    </div>
  )
}
export default App