import { useState, useEffect } from 'react';

function formatErrors(yupErrorsInner = []) {
  return yupErrorsInner.reduce((errorObjectAcc, currentError) => {
    const fieldName = currentError.path;
    const errorMessage = currentError.message;

    return {
      ...errorObjectAcc,
      [fieldName]: errorMessage,
    };
  }, {});
}

export default function useForm({
  initialValues,
  onSubmit,
  validateSchema,
}) {
  const [values, setValues] = useState(initialValues);
  const [isFormDisabled, setIsFormDisabled] = useState(true);
  const [errors, setErrors] = useState({});
  const [touched, setTouchedFields] = useState({});

  async function validateValues(currentValues) {
    try {
      await validateSchema(currentValues);
      setErrors({});
      setIsFormDisabled(false);
    } catch (err) {
      const formatedErrors = formatErrors(err.inner);
      setErrors(formatedErrors);
      setIsFormDisabled(true);
    }
  }

  useEffect(() => {
    validateValues(values)
      .catch((err) => {
        console.log(err);
      });
  }, [values]);

  return {
    values,
    isFormDisabled,
    errors,
    touched,
    setIsFormDisabled,
    handleSubmit(event) {
      event.preventDefault();

      onSubmit(values);
    },
    handleChange(event) {
      const fieldName = event.target.getAttribute('name');
      const { value } = event.target;

      setValues((currentValues) => ({
        ...currentValues,
        [fieldName]: value,
      }));
    },
    handleBlur(event) {
      const fieldName = event.target.getAttribute('name');

      setTouchedFields({
        ...touched,
        [fieldName]: true, // usuario: true, senha: true ...
      });
    },
  };
}
