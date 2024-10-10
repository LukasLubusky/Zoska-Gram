<<<<<<< HEAD

// /src/app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import SimpleBottomNavigation from "@/components/NavBar";

export const metadata: Metadata = {
  title: "RobertWeb",
  description: "Created by Robert",
=======
import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "ZoskaGram",
  description: "Created by @LukasLubusky",
>>>>>>> 47ee7fa02edbbbaaba3d852fc65bdabe57973b00
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <body>
<<<<<<< HEAD
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          {/* Main content */}
          <main style={{ flex: 1 }}>{children}</main>
          
          {/* Bottom Navigation - Stays at the bottom */}
          <SimpleBottomNavigation />
        </div>
=======
        {children}
>>>>>>> 47ee7fa02edbbbaaba3d852fc65bdabe57973b00
      </body>
    </html>
  );
}
<<<<<<< HEAD


// import type { Metadata } from "next";
// import "./globals.css";



// export const metadata: Metadata = {
//   title: "RobertWeb",
//   description: "Created by Robert",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="sk">
//       <body>
//         {children}
//       </body>
//     </html>
//   );
// }
=======
>>>>>>> 47ee7fa02edbbbaaba3d852fc65bdabe57973b00
