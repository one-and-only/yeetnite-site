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
               <li>Season 0 &amp; 1: <strong>1.X</strong></li>
               <li>Season 6: <strong>6.21</strong>, <strong>6.30</strong> Officially tested (all should work)</li>
               <li>Season 7: <strong>None</strong> officially tested (all should work)</li>
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
