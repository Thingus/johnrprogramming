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
      <h2>Optimisations</h2>
      The actual algorithm is mainly dumb loops, nothing too fancy. The tick() functionis <b>far</b> lighter than the draw(), so that&apos;s where I&apos;ve focussed the first pass. <br />
      This library uses Rust&apos;s web-sys crate to call the needed Web API functions; all the ones we care about use the Context2D object that we get from Javascript. The first iteration of draw() looped through every cell of the simulation and called `set_fill_style(color)` followed by `fill_rect(cell_size)`. This revealed unto me a truth; the wasm-JS-webAPI chain is <b>extremely slow</b>, and calls to it should be kept to a minimum.<br />
      Instead, I took the masochistic route. I replaced the calls to set_fill_style() and fill_rect() with an in-memory bitmap that lives in wasm; this gets written to the canvas via `put_image_data()`, replacing [width*length] calls to the webAPI per draw() to just one single call. This seems to work pretty well - there&apos;s still jank appearing in Firefox&apos;s profiler, but it doesn&apos;t kill the UI loop completely. All it took was a day of swearing at Rust indexing errors, then stomping off to bed in a huff and finding that I&apos;d got an x and y arg the wrong way around the next morning, teaching me for the seventh time a valuable lesson about passing those as structs.<br />
      <h2>Further work</h2>
      <ul>
        <li>This shouldn&apos;t be living in the UI thread - ideally this should be farmed off to a webworker and an off-screen canvas that can be blitted in on the clock interrupt in JS.</li>
        <li>If you nav away from the tab or window while the simulation is paused for a while, then nav back to it and start it again, it runs <i>extremely</i> fast. I think this is due to sleeping tab clock behavoir, but I&apos;m not sure.</li>
        <li>I&apos;d like some mouse interaction with this - it&apos;d be lovely if you could leave trails in the water as the mouse moves over, and ripples on click or similar. But that would involve yet more indexing to translate click position to pixel to cell and I don&apos;t wanna right now</li>
        <li>The artist module should be quite easy to make generic; this would mean that there could be a family of backdrops that could live here, all doing fun little celluar automata. I&apos;ve already got a Life implementation from following the wasm-rust tutorial - having a little gallery would be nice.</li>

      </ul>
      <h2>Plea</h2>
      I made this website in a few months to sharpen my React, Rust and deployment tools. If you&apos;ve read this far, I&apos;m currently looking for work as of August 2025 - if you like what you see, please get in touch at &ldquo;john at thiswebsite&rdquo; (obfuscated for spam, crawler and fool avoidance - you can figure it out, though).


      <br />
      <Link href="/frontpage/main_menu">Back to main</Link>
    </div>

  )
}
