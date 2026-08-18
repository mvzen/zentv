import React from 'react'

export function LiveControls() {

    const handleAction = async (action: string, e: React.SyntheticEvent) => {
        e.preventDefault()
        const buttons = document.getElementsByClassName('buttons')[0]
        buttons.classList.add('is-disabled')
        try {
            await fetch(`/${action}`)
        } catch (err) {
            console.error('Request failed:', err)
        } finally {
            buttons.classList.remove('is-disabled')
        }
    }

    return (
        <fieldset className="live-controls">
            <legend>Broadpeak.io manifest manipulation</legend>
            <div className="buttons">
                <button onClick={(evt) => handleAction('scheduler', evt)}>Schedule slots</button>
                <button onClick={(evt) => handleAction('blackout', evt)}>Blackout stream</button>
            </div>
        </fieldset>
    )
}
