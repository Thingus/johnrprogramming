'use client'
import styles from "./page.module.css";
import MainMenu from "./components/main_menu"
import Background from "./components/background";
import { useRef, useEffect, useState } from 'react'

export default function Home() {
  const [win_width, setWinWidth] = useState(100)
  const [win_height, setWinHeight] = useState(100)
  useEffect(() => {
    setWinWidth(window.innerWidth)
    setWinHeight(window.innerHeight)

  }, [])
  return (
    <div className={styles.page}>
      <Background width={win_width} height={win_height} />
      <main className={styles.main}>
        <MainMenu />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
