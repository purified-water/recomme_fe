export const formatResponse = (responseString: string) => {
  try {
    // Remove the leading and trailing backslashes and quotes
    let formattedString = responseString
      .replace(/\\"/g, '"') // Replace escaped double quotes with actual quotes
      .replace(/\\n/g, "\n") // Replace escaped newlines with actual newlines
      .trim(); // Trim any excess whitespace

    return formattedString;
  } catch (error) {
    console.error("Error formatting response:", error);
    return "Invalid response format.";
  }
};
