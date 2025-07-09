'use client'
import styles from "./background.module.css";
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Timeout } from 'node.js'
import { RefObject } from 'react';


// function defaultCanvas(context: CanvasRenderingContext2D) {
//   return function() {
//   }
//
// }


function randomInt(max: number) {
  return Math.floor(Math.random() * max)
}

type Vec = {
  x: number
  y: number
}

type Milliseconds = number;
type TimerID = number;

type TickMode = "auto" | "maunal"

interface BackgroundProps {
  width: number
  height: number
}

type DrawFunction = (
  canvas: HTMLCanvasElement,
  width: number,
  height: number
) => void

function randomSquares(canvas: RefObject<HTMLCanvasElement>, width: number, height: number) {
  console.log("drawing square")
  const context: CanvasRenderingContext2D = canvas.current.getContext('2d')
  const tl_corner: Vec = { x: randomInt(width), y: randomInt(height) }
  context.fillRect(tl_corner.x, tl_corner.y, 50, 50)
}

const Background = ({ width, height }: BackgroundProps) => {

  const canvas = useRef<HTMLCanvasElement>(null);
  const [tick_mode, setTickMode] = useState<TickMode>("auto");
  const [tick_interval, setTickInterval] = useState<Milliseconds>(100);
  // If you're using a function as state, you need a function that returns the function you want to use
  const [draw_function, setDrawFunction] = useState<DrawFunction>(() => randomSquares);

  // Tick
  const handleTick = useCallback(() => {
    console.log("handling tick")
    draw_function(canvas, width, height)
  }, [draw_function, canvas, width, height]
  )

  // Initial load
  useEffect(() => {
    const context: CanvasRenderingContext2D = canvas.current.getContext('2d')
    context.fillStyle = 'yellow';
    context.fillRect(0, 0, width, height);
    context.fillStyle = 'blue';
    context.fillRect(30, 50, 100, 80);
  })


  useEffect(() => {
    let timer: Timeout;
    function start_timer() {
      timer = setInterval(handleTick, tick_interval)
    }

    function stop_timer() {
      clearInterval(timer)
    }
    switch (tick_mode) {
      case "auto": start_timer(); break;
      case "maunal": stop_timer(); break;
    }

  }, [tick_mode, handleTick, tick_interval])


  return (
    <canvas className={styles.backdrop} ref={canvas} width={width} height={height} onClick={handleTick} />
  )
}

export default Background
