import React from 'react';
import FormGenerator from './components/FormGenerator'; 
import formData from './data/data.json';

function App() {
  return (
    <div className="App">
      <FormGenerator formData={formData} />
    </div>
  );
}

export default App;
