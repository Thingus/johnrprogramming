import styles from "./mainmenu.module.css";
export default function MainMenu() {
  return (
    <div className={styles.mainmenu}>
      <h1>John R Programming</h1>
      <ul>
        <li>
          <a href="/cv">CV</a>
        </li>
        <li>
          <a href="/backdrop">backdrop</a>
        </li>
        <li>
          <a href="github.com/thingus">github</a>
        </li>

      </ul>
    </div>
  )
}
