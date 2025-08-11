"use client";

import { useAuth } from '@/contexts/AuthContext';

export default function AboutSection() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to ShopEase
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Sign in to see personalized content and manage your shopping experience.
            </p>
          </div>
        </div>
      </section>
    );
  }

//   return (
//     <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center">
//           <h2 className="text-3xl font-bold text-gray-900 mb-4">
//             Welcome back, {user.firstName}!
//           </h2>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
//             We're glad to see you again, {user.firstName} {user.lastName}. 
//             Your email: {user.email}
//           </p>
//           <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
//             <h3 className="text-xl font-semibold text-gray-900 mb-3">
//               Your Account Details
//             </h3>
//             <div className="space-y-2 text-left">
//               <p className="text-gray-700">
//                 <span className="font-medium">Name:</span> {user.firstName} {user.lastName}
//               </p>
//               <p className="text-gray-700">
//                 <span className="font-medium">Email:</span> {user.email}
//               </p>
//               <p className="text-gray-700">
//                 <span className="font-medium">Account ID:</span> {user._id}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
