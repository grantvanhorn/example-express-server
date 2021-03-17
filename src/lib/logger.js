const {
  ENV,
} = process.env;

const logger = (output) => {
  if (ENV === 'test') {
    return null;
  }

  // Small date library to format as needed
  const now = new Date();
  const {
    controller,
    method,
    result,
    message,
  } = output;

  console.log(`${now} | ${controller} | ${method} | ${result} | ${message}`);
};

export default logger;
