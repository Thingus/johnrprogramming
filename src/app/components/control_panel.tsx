import styles from "./control_panel.module.css"
import Image from "next/image"

interface ControlPanelProps {
  play_callback: () => void
  pause_callback: () => void
  reset_callback: () => void
  new_spring_callback: () => void
  step_callback: () => void
}

export default function ControlPanel({ play_callback, pause_callback, reset_callback, new_spring_callback, step_callback }: ControlPanelProps) {

  return (
    <div className={styles.control_panel}>
      <button onClick={play_callback}><Image src="/play-icon.svg" alt="play" width={20} height={20} /></button>
      <button onClick={pause_callback}><Image src="/pause-icon.svg" alt="pause" width={20} height={20} /></button>
      <button onClick={step_callback}><Image src="/step-backward-icon.svg" alt="step" width={20} height={20} /></button>
      <button onClick={new_spring_callback}><Image src="/fountain-icon.svg" alt="new spring" width={20} height={20} /></button>
      <button onClick={reset_callback}><Image src="/undo-arrow-icon.svg" alt="reset" width={20} height={20} /></button>
    </div>
  )

}


