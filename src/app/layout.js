
import {GlobalProvider} from '@/app/Context/GlobalContext';
import { Inter, Roboto_Mono } from "next/font/google";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});
export const metadata = {
  title: "Task Manager App",
  description: "Created by Israr Husain",
};



export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      
       
   
    <GlobalProvider>
     
      <body cz-shortcut-listen="true">
        
               {children}
     </body>
     
      </GlobalProvider>
     
    </html>
  );
}
