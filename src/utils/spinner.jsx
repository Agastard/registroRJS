import { FaSpinner } from 'react-icons/fa';
// Módulo externo instalado para el uso de distinto Fa-icons
import styles from "./spinner.module.css"

export function Spinner() {
  return(
    <div className={styles.spinner}>
      <FaSpinner size={60} className={styles.spinning} />
    </div>
  )
}