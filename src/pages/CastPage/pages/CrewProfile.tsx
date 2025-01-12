// import React from 'react';

// const CrewProfile: React.FC<CrewProps> = ({ crew }) => {
//   const { adult, gender, name, originalName, popularity, profilePath, department, job, knownForDepartment, creditId } = crew;

//   // Gender mapping (assuming 1 is male, 2 is female)
//   const genderString = gender === 1 ? 'Male' : gender === 2 ? 'Female' : 'Unknown';

//   return (
//     <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-xl mx-auto">
//       <div className="flex items-center space-x-6">
//         <div className="w-32 h-32 rounded-full overflow-hidden">
//           <img
//             src={profilePath ? `https://image.tmdb.org/t/p/w500${profilePath}` : '/path/to/default-profile.jpg'}
//             alt={name}
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <div className="flex flex-col">
//           <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
//           <p className="text-gray-600">Known For: {knownForDepartment}</p>
//           <p className="text-gray-600">Original Name: {originalName}</p>
//           <p className="text-gray-600">Department: {department}</p>
//           <p className="text-gray-600">Job: {job}</p>
//           <p className="text-gray-600">Gender: {genderString}</p>
//           <p className="text-gray-600">Popularity: {popularity}</p>
//         </div>
//       </div>

//       <div className="mt-6">
//         <h3 className="text-xl font-semibold text-gray-800">Credit ID</h3>
//         <p className="text-gray-600 mt-2">{creditId}</p>
//       </div>

//       {adult && (
//         <div className="mt-4">
//           <p className="text-red-500">This crew member is an adult content creator.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CrewProfile;
