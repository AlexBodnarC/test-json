import React, { useState } from 'react';

function FormGenerator({ formData }) {
  const [formFields, setFormFields] = useState(formData);
  const [submittedData, setSubmittedData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData([...formFields]);
  };
  const handleReset = () => {
    setSubmittedData([]);
  };

  const handleChange = (index, e) => {
    const { type, validation, min_value, max_value } = formFields[index];
    const value = e.target.value;

    if (value === null) {
      alert('Input cannot be null');
      return;
    }
  
    if (type === 'number') {
      if (isNaN(value) || (min_value !== undefined && value < min_value) || (max_value !== undefined && value > max_value)) {
        return;
      }
    } else if (validation && !new RegExp(validation).test(value)) {
      return;
    }
  
    const updatedFormFields = [...formFields];
    updatedFormFields[index].value = value;
    setFormFields(updatedFormFields);
  };

  return (
    <div className='container centered' style={{flexDirection: 'column', width: '20%'}}>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        {formFields.map((field, index) => (
          <div key={index} style={{display: 'flex', flexDirection: 'column', padding: 10, margin: 2}}>
            <label>{field.type} Field:</label>
            {field.type === 'dropdown' ? (
              <select onChange={(e) => handleChange(index, e)} value={field.value || field.default_value}>
                {field.options.map((option, i) => (
                  <option key={i} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                value={field.value}
                onChange={(e) => handleChange(index, e)}
              />
            )}
          </div>
        ))}
        <div className='centered'>
          <button type="submit">Submit</button>
          <button type='reset'>Reset</button>
        </div>
      </form>
      {submittedData && (
        <div style={{ marginTop: '20px' }}>
          <h2>Submitted Data:</h2>
          {submittedData.map((field, index) => (
            <p key={index}>
              {field.value === null ? "Field is null" : (field.value ? field.value.toString() : "Field value is undefined")}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default FormGenerator;



