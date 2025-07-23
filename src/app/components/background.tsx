'use client'
import styles from "./background.module.css";
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Timeout } from 'node.js'
import { TickMode, Milliseconds, DrawFunction } from "./../page"
import init from "canvas_exploration"

interface BackgroundProps {
  width: number
  height: number
  tick_mode: TickMode
  tick_interval: Milliseconds
  tick_func: DrawFunction
  reset_func: Function
}

const Background = ({ width, height, tick_mode, tick_interval, tick_func, reset_func, step_func }: BackgroundProps) => {

  const canvas = useRef<HTMLCanvasElement>(null);

  //
  // Tick
  const handleTick = useCallback(() => {
    console.log("handling tick")
    tick_func(canvas.current?.getContext("2d") as CanvasRenderingContext2D)
  }, [tick_func])

  // Initial load
  useEffect(() => {
    const context: CanvasRenderingContext2D = canvas.current.getContext('2d')
    context.fillStyle = 'dark_green';
    context.fillRect(0, 0, width, height);
    context.fillStyle = 'blue';
    context.fillRect(30, 50, 100, 80);
  }, [height, width])

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

  // I _think_ we need to reinit the wasm for every component it's called in
  // useEffect(() => {
  //   init().then()
  // }, [tick_func, reset_func, step_func])


  return (
    <canvas className={styles.backdrop} ref={canvas} width={width} height={height} />
  )
}

export default Background
