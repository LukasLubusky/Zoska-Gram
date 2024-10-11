
// /src/app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import SimpleBottomNavigation from "@/components/NavBar";

export const metadata: Metadata = {
  title: "ZoskaGram",
  description: "Created by Lukas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <body>
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          {/* Main content */}
          <main style={{ flex: 1 }}>{children}</main>
          
          {/* Bottom Navigation - Stays at the bottom */}
          <SimpleBottomNavigation />
        </div>
      </body>
    </html>
  );
}


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
