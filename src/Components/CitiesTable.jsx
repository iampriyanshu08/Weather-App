import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

const CitiesTable = () => {
  const [cities, setCities] = useState([]);
  const [searchcity, setsearchcity] = useState("");
  const [filterCities, setfilterCities] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  const [currPage, setcurrPage] = useState(1);

  useEffect(() => {
    getCitiesData();
  }, []);

  const getCitiesData =  () => {
    setTimeout(async() => {
        try {
            const res = await axios(
              `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=10&offset=${
                (currPage - 1) * 10
              }`
            );
            console.log(res.data.results);
            const newCities = res.data.results;
            setCities((prevCities) => [...prevCities, ...newCities]);
            setcurrPage((prevPage) => prevPage + 1);
            if (newCities.length === 0) {
              sethasMore(false);
            }
          } catch (error) {
            console.log("error found ", error);
          }
    }, 1000);
    
  };
  console.log(searchcity);
  useEffect(() => {
    const filterCity = cities.filter((city) =>
      city.name.toLowerCase().includes(searchcity)
    );
    console.log(filterCity);
    setfilterCities(filterCity);
  }, [cities, searchcity]);

  const handleRightClick = (e,cityName) => {
    if(e.button==2){
        window.open(`/weather/${cityName}`, "_blank");
    }
    
  }

  return (
    <>
      <div className="w-[70%] container mx-auto mt-20">
        <h2 className="text-center text-4xl font-bold mb-4">Cities Table</h2>
        <input
          value={searchcity}
          className="border-2 border-black px-3 py-4 rounded-lg w-[50%]"
          type="text"
          placeholder="Search cities..."
          onChange={(e) => {
            setsearchcity(e.target.value);
          }}
        />
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <InfiniteScroll
                  dataLength={cities.length}
                  next={getCitiesData}
                  hasMore={hasMore}
                  loader={<h4 className="text-center font-bold">Loading...</h4>}
                  endMessage={
                    <p style={{ textAlign: "center" }}>
                      <b>oops! No more data to load</b>
                    </p>
                  }
                >
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-lg font-semibold text-gray-500 uppercase"
                        >
                          City
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-lg font-semibold text-gray-500 uppercase"
                        >
                          Country
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-lg font-semibold text-gray-500 uppercase"
                        >
                          Timezone
                        </th>
                      </tr>
                    </thead>
                    {filterCities.map((city, id) => (
                      <tbody className="divide-y divide-gray-200" key={id}>
                        <tr className="hover:bg-gray-100">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 cursor-pointer" onContextMenu={(e)=>handleRightClick(e,city.name)}>
                            <Link to={`/weather/${city.name}`}>
                              {city.name}
                            </Link>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {city.cou_name_en}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                            {city.timezone}
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </InfiniteScroll>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CitiesTable;
