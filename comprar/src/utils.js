export const onlyNumbers = (host, event) => {
  if (event.which === 32) {
    event.preventDefault();
  }
  const addedInput = String.fromCharCode(event.which);
  const currentValue = (event.target.value);
  const fullValue = `${currentValue}${addedInput}`;
  if (!Number(fullValue)) {
    event.preventDefault();
  }
};
