import React, { useState, useEffect } from 'react'
// useState: Contains the data retrieved from the backend & renders the data on the page
// useEffect: Fetchs the backend Api on the first render

function App() {

  const [data, setData] = useState([{}])
  // data: Actual data
  // setData: Function to manipulate data variable

  useEffect(() => {
    fetch("ruta de flask")
    .then(res => res.json())
    .then(data => {
      setData(data)
      console.log(data)
    })
  }, [])
  // empty array at end to run just one time
  return (
    <div>
      {(typeof data.members === 'undefined') ? (
        <p>Loading...</p>): (
          data.members.map((member, i) => (
            <p key={i}>{member}</p>
          ))
        )
      }
    </div>
  )
}

export default App
