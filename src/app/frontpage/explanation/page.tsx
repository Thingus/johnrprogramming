import Link from "next/link";
import styles from "./page.module.css"

export default function Page() {
  return (
    <div className={styles.explanation}>
      <h1>
        About the backdrop
      </h1>
      <p>This is a simple water-flow simulation written in Rust and compiled to wasm, running client-side on your device. It&apos;s based on a digital elevation model of the Peak District in the UK, and starts with a single infinite spring - you can pause, reset, step and add new random springs with the buttons at the bottom of the screen.</p>
      <h2>Flow algorithm</h2>
      <ul>
        <li>Every cell has a constant land level and a variable standing water level</li>
        <li>
          Every cell can also have water flowing over it if it does not have standing
          water
        </li>
        <li>If a cell is lower than a neighbour with water flowing, that cell now has water flowing.</li>
        <li>If a cells land + water is the lowest of its neighbours, and it has water flowing, it no longer has water flowing - it&apos;s water level increases randomly by 1 or 0.</li>
      </ul>
      <p>The simulation is initialised by setting an arbitrary cell to have water flow - you can add more random springs with the `fountain button`</p>
      <h2>Implementation</h2>
      This is implemented in Rust, using the <Link href="https://github.com/wasm-bindgen/wasm-bindgen/tree/main">wasm-bindgen</Link> crate - see <Link href="https://github.com/thingus/canvas-messing">here</Link> for the full implementation.
      <br />
      <Link href="/frontpage/main_menu">Back to main</Link>
    </div>

  )
}
