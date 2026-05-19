import type { AppProps } from "next/app";
import "../styles/global.css"
import { Orbitron } from "next/font/google";
import { Exo_2 } from "next/font/google";

const orbitron = Orbitron({
  variable: "--font-titulo",
  weight: ["400", "500", "600","700", "800"],
  subsets: ["latin"],
});

const exo2 = Exo_2({
   variable: "--font-padrao",
   weight: ["400","500","600","700","800"],
   subsets: ["latin"],
})

export default function App({ Component, pageProps }: AppProps) {
  return(
    <main className={`${orbitron.variable} ${exo2.variable}`}>
      <Component {...pageProps} />
    </main>
  )
}
