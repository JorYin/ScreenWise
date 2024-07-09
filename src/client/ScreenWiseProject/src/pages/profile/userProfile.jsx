import styles from './userProfile.module.css';
import { Link } from 'react-router-dom';

function UserProfile () {
  return (
      <div>
        <div class={styles.formBackground}>
          <form class={styles.formContainer} action="http://localhost:5173/dashboard" >
            
            <div class={styles.formInputs}>
              <p class={styles.formInputLabel}>Username </p>
              <input class={styles.inputContainerUser} type="text" />
            </div>

            <div class={styles.formInputs}>
            <p class={styles.formInputLabel}>Bio </p>
            <textarea class={styles.formTextArea} rows="4" cols="50" placeholder="Enter text here..." ></textarea>
            </div>
            
            <div>
              <Link class={styles.formBTNStyle} to="/edit-profile" >Edit</Link>
              <button class={styles.formBTNStyle} type="submit" >Done</button>
            </div>
          
          </form>
        </div>
      </div>
  )
}

export default UserProfile;