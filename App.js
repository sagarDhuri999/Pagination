
import { useEffect } from "react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import "./App.css";

function App() {
  const [userName, setUserName] = useState([])
  const [text, setText] = useState("")
  const [pageNumber, setPageNumber] = useState(0)
  const countryPerPage = 15

  const pagesVisited = pageNumber * countryPerPage


  useEffect(() => {
    const fetchData = async () => {
      let date = await fetch("https://disease.sh/v3/covid-19/countries")
      let apiData = await date.json()

      setUserName(apiData);


      console.log(userName);
    }
    fetchData()
  }, [])

  // const displayCountry = userName.slice(pagesVisited, pagesVisited + countryPerPage).map((val, i) => {
  //   return <div key={i} >
  //     <h1>{val.country}</h1>

  //   </div>
  // })
  const pageCount = Math.ceil(userName.length / countryPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  return (
    <>
      <div className="App">

        <input type="text" placeholder="Search..." onChange={(e) => setText(e.target.value)} />

        {userName && userName.filter((val) => {
          if (val.country.toLowerCase().includes(text.toLowerCase())) {
            return val
          } else {
            return "";
          }
        }).slice(pagesVisited, pagesVisited + countryPerPage).map((val, i) => {
          return <div key={i} >
            <h1>{val.country}</h1>

          </div>
        })

        }
        <ReactPaginate
          prevPageRel={"Pre"}
          nextLabel={"next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"ReactPaginate"}//for styling
        />

      </div>
    </>
  );
}

export default App;