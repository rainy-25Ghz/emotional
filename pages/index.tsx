import Head from "next/head";
import SwipeableEdgeDrawer, { Inputs } from "../components/Drawer";
import { StyledEngineProvider } from "@mui/material/styles";
import Link from "next/link";
import { useForm } from "react-hook-form";
export default function Home() {
  
  return (
    <StyledEngineProvider>
      <Head>
        <link
          rel="preload"
          href="/fonts/laihu/laihu.ttf"
          as="font"
          crossOrigin=""
        ></link>
      </Head>
      <main>
        {/* <div>{text}</div> */}
        <SwipeableEdgeDrawer></SwipeableEdgeDrawer>
      </main>
    </StyledEngineProvider>
  );
}
