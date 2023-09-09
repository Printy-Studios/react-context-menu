import React, { createContext, PropsWithChildren, useEffect, useState } from 'react';

export const ContextMenuContext = createContext(null)

type ContextMenuProviderConfig = {
    hide_key_code: string
}

const default_config = {
    hide_key_code: 'Escape'
}

type ContextMenuProviderProps = {
    config?: Partial<ContextMenuProviderConfig>
}

export default function ContextMenuProvider ( { 
    config, 
    children 
}: PropsWithChildren<ContextMenuProviderProps>) {

    const _config: ContextMenuProviderConfig = { ...default_config, ...config}

    const [ activeMenu, setActiveMenu ] = useState<string | null>(null)

    useEffect(() => {
        document.addEventListener('keydown', (e) => {
            if ( e.code === _config.hide_key_code ) {
                setActiveMenu(null)
            }
        })
    }, [])

    return (
        <ContextMenuContext.Provider value={{activeMenu, setActiveMenu}}>
            { children }
        </ContextMenuContext.Provider>
    )
}