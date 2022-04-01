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
                <link
                    rel="preload"
                    href="/fonts/1ming/1Ming.ttf"
                    as="font"
                    crossOrigin=""
                ></link>
                <link
                    rel="preload"
                    href="/fonts/genyo/GenYoMinTW.ttf"
                    as="font"
                    crossOrigin=""
                ></link>
                <link
                    rel="preload"
                    href="/fonts/GNU_unifont/unifont.ttf"
                    as="font"
                    crossOrigin=""
                ></link>
                <link
                    rel="preload"
                    href="/fonts/notoserif/NotoSerifSC.otf"
                    as="font"
                    crossOrigin=""
                ></link>
                <link
                    rel="preload"
                    href="/fonts/quanziku/song.ttf"
                    as="font"
                    crossOrigin=""
                ></link>
                <link
                    rel="preload"
                    href="/fonts/taipei/TaipeiSansTCBeta-Regular.ttf"
                    as="font"
                    crossOrigin=""
                ></link>
                {/* public\fonts\taipei\TaipeiSansTCBeta-Regular.ttf public\fonts\quanziku\song.ttf public\fonts\GNU_unifont\unifont.ttf public\fonts\notoserif\NotoSerifSC.otf*/}
            </Head>
            <main>
                {/* <div>{text}</div> */}
                <SwipeableEdgeDrawer></SwipeableEdgeDrawer>
            </main>
        </StyledEngineProvider>
    );
}
