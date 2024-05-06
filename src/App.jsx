import React from 'react'
import CitiesTable from './Components/CitiesTable'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import WeatherPage from './Components/WeatherPage'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<CitiesTable/>}/>
        <Route path='/weather/:cityName' element={<WeatherPage/>}/>
      
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App


//https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20