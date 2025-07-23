import styles from "./control_panel.module.css"
export default function ControlPanel() {

  return (
    <div className={styles.control_panel}>
      <button>play/pause</button>
      <button>step</button>
    </div>
  )

}


