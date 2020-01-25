import { h } from 'preact'
import Link from './Link'

// · based on the mythical <Link href='http://wigflip.com/ds/' external>wigflip tool</Link>

export default () => (
  <footer>
    <p>developed by <Link href='https://midu.dev'>@midudev</Link> · <Link external href="https://github.com/midudev/komic.app#todo" external>changelog</Link> · <Link external href="https://github.com/midudev/komic.app/issues/new">feature requests</Link> </p>
  </footer>
)