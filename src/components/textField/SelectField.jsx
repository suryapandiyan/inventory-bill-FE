import { React } from "react";
import { useField, ErrorMessage } from "formik";

const SelectField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const options = [
    { key: "Select a Category", value: "" },
    { key: "Software", value: "Software" },
    { key: "Hardware", value: "Hardware" },
    { key: "Electronics", value: "Electronics" },
    { key: "Electrical", value: "Electrical" },
    { key: "Plumbing", value: "Plumbing" },
    { key: "Masonary", value: "Masonary" },
    { key: "Others", value: "Others" },
  ];
  return (
    <div className='form-group mb-3 mt-3'>
      <label
        htmlFor={field.name}
        className='label__style mb-0'
      >
        {label}
      </label>
      <div>
        <select
          className={`form-control shadow-none ${
            meta.touched && meta.error && "is-invalid"
          }`}
          {...field}
          {...props}
        >
          {options.map((option) => {
            return (
              <option
                key={option.value}
                value={option.value}
              >
                {option.key}
              </option>
            );
          })}
        </select>
      </div>
      <ErrorMessage
        component='p'
        name={field.name}
        className='errorMessage'
      />
    </div>
  );
};

export default SelectField;