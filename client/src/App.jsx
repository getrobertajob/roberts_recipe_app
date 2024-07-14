// imports
import React, { useState } from "react";
import Banner from "./components/Banner.jsx";
import TableComponent from "./components/TableComponent.jsx";
import FormComponent from "./components/FormComponent.jsx";

// primary app component to control the rest
function App() {
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [refreshTable, setRefreshTable] = useState(false);
  const [error, setError] = useState({});

  // function to handle when the selected record is chanded
  // triggered when user clicks on title of row in table component
  const handleSelectRecord = (record) => {
    setSelectedRecord(record);
    setError({}); // to clear errors when selecting a new record if errors were previously displayed
  };

  // function to handle refreshing the table component data when after form submission in form component
  const handleFormSubmit = () => {
    setRefreshTable(!refreshTable);
  };

  // function to clear our error messages that are no longer needed
  const clearErrors = () => {
    setError({});
  };

  return (
    <div className="App">
      <Banner />
      <div className="main">
        <TableComponent
          onSelectRecord={handleSelectRecord}
          refreshTable={refreshTable}
          clearErrors={clearErrors} // to pass the clearErrors function
        />
        <FormComponent
          selectedRecord={selectedRecord}
          onFormSubmit={handleFormSubmit}
          error={error}
          setError={setError} // to pass the setError function
        />
      </div>
    </div>
  );
}

export default App;
