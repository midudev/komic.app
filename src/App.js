import { h } from 'preact'
import {useState} from 'preact/hooks'

export default function App () {
    const [text, setText] = useState("HEY! 🙋‍♀️ MAKE YOUR OWN SPEECH BUBBLE!")
    return (
        <section>
            <div>
                <div class="bubble" contenteditable>{text}</div>
            </div>
            <br /><br />
            <button onClick={() => {}}><span>Save!</span></button>
        </section>
    )
}