import Head from "next/head";
import SwipeableEdgeDrawer from "../components/Drawer";
import { StyledEngineProvider } from "@mui/material/styles";
import Link from "next/link";
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
                <SwipeableEdgeDrawer></SwipeableEdgeDrawer>
            </main>
        </StyledEngineProvider>
    );
}
