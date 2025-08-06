import styles from "./mainmenu.module.css";
import Link from "next/link";
export default function MainMenu() {
  return (
    <div className={styles.mainmenu}>
      <h1>John R Programming</h1>
      <ul>
        <li>
          <Link href="/frontpage/cv">CV</Link>
        </li>
        <li>
          <Link href="/frontpage/explanation">backdrop</Link>
        </li>
        <li>
          <Link href="https://github.com/thingus">github</Link>
        </li>

      </ul>
    </div>
  )
}
