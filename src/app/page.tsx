'use client'
import styles from "./page.module.css";
import MainMenu from "./components/main_menu"
import ControlPanel from "./components/control_panel"
import { useEffect, useState, useRef, useCallback } from 'react'
import { fromUrl } from 'geotiff'
import { useFlowmap } from './hooks/flowmap'
import { LandscapeArtist } from "canvas_exploration";

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

const binDem = (dem_data: number[]) => {
  const dem_round = dem_data.map((a) => Math.round(a));
  const min = Math.min(...dem_round);
  return new Uint8Array(dem_round.map((a) => a - min));
};

//eslint-disable-next-line
const calPixelSize = (win_height: number, win_width: number) => {
  return 5
  // const total_pixels = win_height * win_width
  // switch (true) {
  //   case total_pixels > 1000 * 2000: return 10
  //   case total_pixels > 2000 * 1000: return 5
  //   default: return 2
  // }
}


export default function Home() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const flowmap_instance = useFlowmap()
  const [pixel_size, setPixelSize] = useState<number>(10)
  const [width_cells, setWidthCells] = useState<number>(0)
  const [height_cells, setHeightCells] = useState<number>(0)
  const [timer, setTimer] = useState<number | null>(null)
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
    setPixelSize(calPixelSize(window.innerWidth, window.innerHeight))
    setWidthCells(Math.floor(window.innerWidth / pixel_size))
    setHeightCells(Math.floor(window.innerHeight / pixel_size))
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
            pixel_size,
            dem_data
          )
        })
      .then((landscape_artist) => {
        if (!canvas || typeof (canvas) === "undefined") { throw ("Canvas not yet initialised") }
        setBackgroundArtist(landscape_artist)
        landscape_artist.make_stream(74, 45)
        landscape_artist.tick()
        landscape_artist.tick()
        landscape_artist.draw(canvas!.current!.getContext("2d")!)
      })
      .catch((err) => console.warn(err))

  }, [width_cells, height_cells, pixel_size, flowmap_instance])

  const handleTick = useCallback(() => {
    console.log("handling tick")
    console.log(background_artist)
    background_artist?.tick()
    background_artist?.draw(canvas.current?.getContext("2d") as CanvasRenderingContext2D)
  }, [background_artist])

  const pauseCallback = useCallback(() => {
    if (timer) { window.clearInterval(timer) }
  }, [timer])

  const playCallback = useCallback(() => {
    const timer = window.setInterval(handleTick, 100)
    setTimer(timer)
  }, [handleTick])

  const stepCallback = useCallback(() => {
    background_artist?.tick()
    background_artist?.draw(canvas.current?.getContext("2d") as CanvasRenderingContext2D)
  }, [background_artist])

  const resetCallback = useCallback(() => {
    background_artist?.reset()
    const new_spring_x = randomInt(width_cells)
    const new_spring_y = randomInt(height_cells)
    background_artist?.make_stream(new_spring_y, new_spring_x)
    background_artist?.tick()
    background_artist?.draw(canvas.current?.getContext("2d") as CanvasRenderingContext2D)

  }, [background_artist, width_cells, height_cells])

  const newSpringCallback = useCallback(() => {
    const new_spring_x = randomInt(width_cells)
    const new_spring_y = randomInt(height_cells)
    background_artist?.make_stream(new_spring_y, new_spring_x)
  }, [background_artist, width_cells, height_cells])


  {/* <Background width={win_width} height={win_height} tick_mode={tick_mode} tick_interval={tick_interval} tick_func={draw_function} /> */ }
  return (
    <div className={styles.page}>
      <canvas ref={canvas} height={win_height} width={win_width} style={{ position: "absolute", left: "0", top: "0", zIndex: "-1" }}></canvas>
      <main className={styles.main}>
        <MainMenu />
        <ControlPanel pause_callback={pauseCallback} play_callback={playCallback} step_callback={stepCallback} reset_callback={resetCallback} new_spring_callback={newSpringCallback} />

      </main>
      <footer className={styles.footer}></footer>
    </div >
  );
}
