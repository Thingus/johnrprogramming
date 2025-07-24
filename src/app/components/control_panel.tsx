import styles from "./control_panel.module.css"

interface ControlPanelProps {
  play_callback: () => void
  pause_callback: () => void
  reset_callback: () => void
  step_callback: () => void
}

export default function ControlPanel({ play_callback, pause_callback, reset_callback, step_callback }: ControlPanelProps) {

  return (
    <div className={styles.control_panel}>
      <button onClick={play_callback}>play</button>
      <button onClick={pause_callback}>pause</button>
      <button onClick={step_callback}>step</button>
      <button onClick={reset_callback}>reset</button>
    </div>
  )

}


