import { h } from 'preact'
import {useRef, useState} from 'preact/hooks'

import Link from './Link'

export default function App () {
    const ref = useRef()
    const [text, setText] = useState("HEY! 🙋‍♀️ MAKE YOUR OWN SPEECH BUBBLE!")
    
    function downloadImage () {
        Promise.all([
            import('html-to-image'),
            import('downloadjs')
        ]).then(([{toPng}, download]) => {
            toPng(ref.current).then(dataUrl => download(dataUrl, 'komic.png'))
        })
    }

    return (
      <main>
        <section>
          <div ref={ref}>
            <div className="bubble" contentEditable>
              <span>WRITE HERE YOUR MESSAGE</span>
              <span id="cursor">|</span>
            </div>
          </div>
        </section>
        <section>
          <button onClick={downloadImage}><span>Save Img!</span></button>
        </section>
        <footer>
          <p>based on the mythical <Link href='http://wigflip.com/ds/' external>wigflip tool</Link></p>
        </footer>
      </main>
    )
}