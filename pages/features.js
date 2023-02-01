import Header from "./header";
// styles
import styles from '../styles/features.module.scss'

/**
 * Component for the Features Page
 */
export default function Features() {
   return (
      <div className={styles.body}>
         <Header title="Features | Yeetnite" />
         <div className={styles.mainText}>
            <h2 id="supported-clients">Supported Clients</h2>
            <hr width="40%" />
            <ul>
               <li>Seasons <strong>0-9</strong>: Officially tested (all should work)</li>
               <li>Seasons 10 through Chapter 2 Season 8: Untested (all should work)</li>
            </ul>
            <br />
            <h2 id="supported-features">Supported Features</h2>
            <hr width="40%" />
            <ul>
               <li>Login + Fortnite Lobby</li>
               <li>Emotes</li>
               <li>Locker Customization</li>
               <li>XMPP (Friend Requests + Block/Unblock Users, Partying, Whisper, Live Presence Updates, etc.)</li>
               <li>Persistent Per-Player Saves</li>
               <li>Save The World Lobby</li>
            </ul>
            <br />
            <h2 id="unsupported-features">Caveats</h2>
            <hr width="40%" />
            <ul>
               <li>No Multiplayer (Planned for Future)</li>
               <li>Friend Requests Require a Client Restart To Appear</li>
            </ul>
         </div>
      </div>
   );
}
