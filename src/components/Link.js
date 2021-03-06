import { h } from 'preact'

export default function ({children, href, external}) {
    const rel = external ? 'noopener nofollow' : undefined
    return <a href={href} rel={rel} target={external ? '_blank' : ''}>{children}</a>
}