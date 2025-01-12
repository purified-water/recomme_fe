export const NormalizeGender = (genderNum: number) => {
  return genderNum === 1 ? "Female" : genderNum === 2 ? "Male" : "Unknown";
};
