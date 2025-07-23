'use client'
import styles from "./page.module.css";
import MainMenu from "./components/main_menu"
import Background from "./components/background";
import ControlPanel from "./components/control_panel"
import { useEffect, useState, useRef, useCallback } from 'react'
import { RefObject } from 'react';
import { fromUrl } from 'geotiff'
import { useFlowmap } from './hooks/flowmap'
import { LandscapeArtist } from "canvas_exploration";
const PIXEL_SIZE = 5;

export type DrawFunction = (
  canvas: CanvasRenderingContext2D,
) => void

export type TickFunction = () => void

export type Milliseconds = number;
export type TimerID = number;

export type TickMode = "auto" | "maunal"

function randomInt(max: number) {
  return Math.floor(Math.random() * max)
}

type Vec = {
  x: number
  y: number
}

function randomSquares(canvas: RefObject<HTMLCanvasElement>, width: number, height: number) {
  console.log("drawing square")
  const context: CanvasRenderingContext2D = canvas.current.getContext('2d')
  const tl_corner: Vec = { x: randomInt(width), y: randomInt(height) }
  context.fillRect(tl_corner.x, tl_corner.y, 50, 50)
}

const binDem = (dem_data: number[]) => {
  const dem_round = dem_data.map((a) => Math.round(a));
  const min = Math.min(...dem_round);
  return new Uint8Array(dem_round.map((a) => a - min));
};


export default function Home() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const flowmap_instance = useFlowmap()
  const [tick_mode, setTickMode] = useState<TickMode>("manual");
  const [tick_interval, setTickInterval] = useState<Milliseconds>(100);
  // If you're using a function as state, you need a function that returns the function you want to use
  // const [draw_function, setDrawFunction] = useState<DrawFunction>(() => { });
  // const [tick_function, setTickFunction] = useState<TickFunction>(() => { });
  const [background_artist, setBackgroundArtist] = useState<LandscapeArtist | null>(null)
  const [win_width, setWinWidth] = useState(1)
  const [win_height, setWinHeight] = useState(1)

  //Initial load; init the wasm module, get the window size and load the DEM, then set up the functions
  // Also by god we go a long way to avoid async calls in the client. I'm not even sure
  // of the difference between 'await' and 'then' under the hood....
  useEffect(() => {
    setWinWidth(window.innerWidth)
    setWinHeight(window.innerHeight)
    const width_cells = Math.floor(window.innerWidth / PIXEL_SIZE)
    const height_cells = Math.floor(window.innerHeight / PIXEL_SIZE)
    const left = 0
    const top = 0
    const right = left + width_cells
    const bottom = top + height_cells
    fromUrl("./peak_district_dem.tif")
      .then((image) => image.readRasters({ window: [left, top, right, bottom] }))
      .then((data) => binDem(data[0] as unknown as Array<number>))
      .then(
        (dem_data) => {
          if ((typeof (flowmap_instance) === "undefined") || (flowmap_instance === null)) throw ("Waiting on flowmap_instance");
          debugger
          return new LandscapeArtist(
            width_cells,
            height_cells,
            PIXEL_SIZE,
            dem_data
          )
        })
      .then((landscape_artist) => {
        setBackgroundArtist(landscape_artist)
        setTickMode("manual")
        landscape_artist.make_stream(74, 45)
        landscape_artist.tick()
        landscape_artist.tick()
        landscape_artist.draw(canvas.current?.getContext("2d"))
      })
      .catch((err) => console.warn(err))

  }, [flowmap_instance])

  const handleTick = useCallback(() => {
    console.log("handling tick")
    console.log(background_artist)
    background_artist?.tick()
    background_artist?.draw(canvas.current?.getContext("2d") as CanvasRenderingContext2D)
  }, [background_artist])

  useEffect(() => {
    let timer: Timeout
    setInterval(handleTick, 100)
  }, [handleTick])

  {/* <Background width={win_width} height={win_height} tick_mode={tick_mode} tick_interval={tick_interval} tick_func={draw_function} /> */ }
  return (
    <div className={styles.page}>
      <canvas ref={canvas} height={win_height} width={win_width} style={{ position: "absolute", left: "0", top: "0", zIndex: "-1" }}></canvas>
      <main className={styles.main}>
        <MainMenu />
        <ControlPanel />
      </main>
      <footer className={styles.footer}></footer>
    </div >
  );
}
