import 
    React, 
{ 
    HTMLAttributes, 
    PropsWithChildren, 
    ReactNode, 
    useEffect, 
    useRef, 
    useState 
} from 'react'

import './ContextMenuContainer.css'

type Position = {
    top?: number | string,
    bottom?: number | string,
    left?: number | string,
    right?: number | string,
}

type Props = HTMLAttributes<HTMLDivElement> & {
    menu?: ReactNode
}

export default function ContextMenuContainer( { children, menu, className }: PropsWithChildren<Props>) {

    const [showMenu, setShowMenu] = useState<boolean>(false)
    const [menuPosition, setMenuPosition] = useState<Position>({ top: 0, left: 0 })

    const menuRef = useRef<HTMLDivElement>(null)

    const handleRightClick = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setShowMenu(true)

        const menu_rect = menuRef.current.getBoundingClientRect();

        const mouse_x = e.pageX
        const mouse_y = e.pageY

        const final_pos: Position = {}

        if (mouse_x + menu_rect.width > window.innerWidth) {
            final_pos.right = window.innerWidth - mouse_x;
        } else {
            final_pos.left = mouse_x + 1;
        }

        if (mouse_y + menu_rect.height > window.innerHeight) {
            final_pos.bottom = window.innerHeight - mouse_y;
        } else {
            final_pos.top = mouse_y + 1;
        }

        setMenuPosition(final_pos)
        
    }

    useEffect(() => {
        if (showMenu) {
            menuRef.current.focus()

        }
    }, [showMenu])

    useEffect(() => {
        menuRef.current.addEventListener('blur', (e: FocusEvent) => {
            setShowMenu(false)
        })
    }, [])

    return (
        <div
            className={`${className ? ' ' + className : ''}`}
            onContextMenu={handleRightClick}
        >
            <div 
                ref={menuRef}
                tabIndex={0}
                className="MenuWrapper"
                style={{
                    visibility: showMenu ? 'visible' : 'hidden',
                    ...menuPosition
                }}
            >
                {menu}
            </div>
            {children}
        </div>
    )
}