import { useState } from 'react'

export function LiveControls() {
    const [message, setMessage] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const toggleState = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setMessage('')

        try {
            const res = await fetch('/service/toggleState')
            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message || `Error ${res.status}`)
            }

            setMessage(data.state)
        } catch (err: any) {
            console.error('Request failed:', err)
            setMessage(err.message || 'An error occurred')
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <fieldset className="live-controls">
            <legend>Broadpeak.io</legend>
            <div className={`buttons ${isLoading ? 'is-disabled' : ''}`}>
                <button onClick={(evt) => toggleState(evt)}>Toggle service state</button>
                <div className="message">{message}</div>
            </div>
        </fieldset>
    )
}
