import { useState, useEffect } from 'react'

export function LiveControls(video: { src: string }) {
    const [message, setMessage] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [srcState, setSrcState] = useState<string>('')


    const MSG_SERVICE_RUNNING = 'Service is running'
    const MSG_SERVICE_PAUSED = 'Service is paused. Toggle to resume the service.'

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

            setMessage(data.message)
            setSrcState('')
        } catch (err: any) {
            console.error('Request failed:', err)
            setMessage(err.message || 'An error occurred')
            setSrcState('')
        } finally {
            setIsLoading(false)
        }
    }

    const checkServiceState = async () => {
        try {
            const res = await fetch(video.src)

            if (!res.ok) {
                setMessage(MSG_SERVICE_PAUSED)
                setSrcState('is-paused')
            } else {
                setMessage(MSG_SERVICE_RUNNING)
                setSrcState('is-running')
            }
        } catch (err: any) {
            setMessage(MSG_SERVICE_PAUSED)
            setSrcState('is-paused')
        }
    }

    useEffect(() => {
        checkServiceState()
    }, [])

    return (
        <fieldset className="live-controls">
            <legend>Broadpeak.io</legend>
            <div className={`buttons ${isLoading ? 'is-disabled' : ''}`}>
                <button onClick={(evt) => toggleState(evt)}>Toggle service state</button>
                <div className={`message ${srcState}`}>{message}</div>
            </div>
        </fieldset>
    )
}
