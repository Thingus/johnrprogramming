import styles from "./control_panel.module.css"

interface ControlPanelProps {
  play_callback: Function
  pause_callback: Function
  reset_callback: Function
  step_callback: Function
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


