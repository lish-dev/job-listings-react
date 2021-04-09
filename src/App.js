import React, { useState, useEffect } from "react";
import data from "./assets/data.json";
import JobBoard from "./components/JobBoard";

function App() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState([]);

  useEffect(() => setJobs(data), []);

  //when the user selects a word for the filtering option
  const filterFunc = ({ role, level, tools, languages }) => {
    if (filters.length === 0) {
      return true;
    }

    const tags = [role, level];

    if (languages) {
      tags.push(...languages);
    }
    if (tools) {
      tags.push(...tools);
    }
    //checking array tag within the filter, if no tags are selected then all data should be visible
    return filters.every(filter => tags.includes(filter));
  };

  // this is to preventing the tag to be re-added each time it is clicked
  const handleTagClick = (tag) => {
    if (filters.includes(tag)) return;

    setFilters([...filters, tag]);
  };

  // if the any item is left in the filter bar this can be clicked on by the user to be removed
  const handleFilterClick = (passedFilter) => {
    setFilters(filters.filter((f) => f !== passedFilter));
  };
// when the user clicks the 'x' in the search bar this clears all words that were selected previously for filtering
  const clearFilters = () => {
    setFilters([]);
  }

  const filteredJobs = jobs.filter(filterFunc);

  return (
    <>
      <header className="bg-teal-500 mb-12">
        <img src="/images/bg-header-desktop.svg" alt="bg" />
      </header>
      <div className="container m-auto">
      {filters.length > 0 && (
        
        <div className={"flex bg-white shadow-md -my-20  mb-16 mx-10 p-6 rounded z-10 relative"}>
          {filters.map((filter) => (
            <span
              className="cursor-pointer mr-4 mb-4 rounded font-bold text-teal-500 bg-teal-100 p-2 lg:mb-0"
              onClick={() => handleFilterClick(filter)}
            >
              x {filter}
            </span>
          ))}         
        <button onClick={clearFilters} className="font-bold text-grey-700 ml-auto">Clear</button>
        </div>
        
      )}

      {jobs.length === 0 ? (
        <p>Jobs are fetching..</p>
      ) : (
        filteredJobs.map((job) => (
          <JobBoard job={job} key={job.id} handleTagClick={handleTagClick} />
        ))
      )}
      </div>
    </>
  );
}

export default App;
