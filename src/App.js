import { h } from 'preact'
import {useRef, useState, useEffect} from 'preact/hooks'

import 'file-drop-element'
import {FloopyIcon} from './components/Icons'
import Footer from './components/Footer'
import GitHub from './components/GitHub'

export default function App () {
  const dropTargetRef = useRef()
  const imgRef = useRef()

  const [withImage, setWithImage] = useState(false)

  function downloadImage () {
    const selector = withImage ? '#result > div' : '#result-bubble'
    const result = document.querySelector(selector)

      Promise.all([
        import('html-to-image'),
        import('downloadjs')
      ]).then(([{toPng}, download]) => {
          toPng(result).then(dataUrl => download(dataUrl, 'komic.png'))
      })
  }

  useEffect(function () {
    document.querySelector('[autofocus]').focus()

    dropTargetRef.current.addEventListener('filedrop', (e) => {
      imgRef.current.removeAttribute('hidden')
      imgRef.current.src = URL.createObjectURL(e.files[0])
      setWithImage(true)
    })
  }, [])

  useEffect(function () {
    const dragItem = document.querySelector("#result-bubble")
    const container = document.querySelector("#result")

    let active = false
    let currentX
    let currentY
    let initialX
    let initialY
    let xOffset = 0
    let yOffset = 0

    function dragStart(event) {
      const from = event.type === 'touchstart'
        ? event.touches[0]
        : event

      initialX = from.clientX - xOffset
      initialY = from.clientY - yOffset

      if (event.target === dragItem) {
        active = true
      }
    }

    function dragEnd() {
      initialX = currentX
      initialY = currentY

      active = false
    }

    function drag(event) {
      if (active) {
        event.preventDefault()
      
        const from = event.type === 'touchmove'
        ? event.touches[0]
        : event

        currentX = from.clientX - initialX
        currentY = from.clientY - initialY

        xOffset = currentX
        yOffset = currentY

        setTranslate(currentX, currentY, dragItem)
      }
    }

    function setTranslate(xPos, yPos, el) {
      el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)"
    }

    container.addEventListener("touchstart", dragStart, false)
    container.addEventListener("touchend", dragEnd, false)
    container.addEventListener("touchmove", drag, false)

    container.addEventListener("mousedown", dragStart, false)
    container.addEventListener("mouseup", dragEnd, false)
    container.addEventListener("mousemove", drag, false)

    return () => {
      container.removeEventListener("touchstart", dragStart, false)
      container.removeEventListener("touchend", dragEnd, false)
      container.removeEventListener("touchmove", drag, false)
  
      container.removeEventListener("mousedown", dragStart, false)
      container.removeEventListener("mouseup", dragEnd, false)
      container.removeEventListener("mousemove", drag, false)
    }
  })

  return (
    <file-drop ref={dropTargetRef} accept='image/*'>
      <section className={withImage ? 'with-image' : ''} id="result">
        <div>
          <img ref={imgRef} hidden src='' />
          <div id="result-bubble">
            <div autoFocus className="bubble" contentEditable>
              <span>HEY! WRITE HERE YOUR CONTENT! ✍️ </span>
            </div>
          </div>
        </div>
      </section>
      <section id="actions">
        <button onClick={downloadImage}>
          <FloopyIcon />
          <span>DOWNLOAD IMG</span>
        </button>
      </section>
      <Footer />
      <GitHub />
    </file-drop>
  )
}