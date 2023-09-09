import 
    React, 
{ 
    HTMLAttributes, 
    PropsWithChildren, 
    ReactNode, 
    useContext, 
    useEffect, 
    useId, 
    useRef, 
    useState 
} from 'react'

import './ContextMenuContainer.css'
import { ContextMenuContext } from './ContextMenuProvider'

type Position = {
    top?: number | string,
    bottom?: number | string,
    left?: number | string,
    right?: number | string,
}

type Props = HTMLAttributes<HTMLDivElement> & {
    menu?: ReactNode
}

//let max_id

export default function ContextMenuContainer( { children, menu, className, style }: PropsWithChildren<Props>) {

    const { setActiveMenu, activeMenu } = useContext(ContextMenuContext)

    const id = useId()

    const [showMenu, setShowMenu] = useState<boolean>(false)
    const [menuPosition, setMenuPosition] = useState<Position>({ top: 0, left: 0 })

    const menuRef = useRef<HTMLDivElement>(null)

    const handleRightClick = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (!menu) {
            console.warn('No menu prop specified for ContextMenuContainer component!')
            return;
        }

        //setShowMenu(true)
        setActiveMenu(id)

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
        if (activeMenu === id) {
            setShowMenu(true)
        } else {
            setShowMenu(false)
        }
    }, [activeMenu])

    return (
        <div
            className={`${className ? ' ' + className : ''}`}
            style={{
                ...style
            }}
            onContextMenu={handleRightClick}
        >
            <div 
                ref={menuRef}
                tabIndex={-1}
                className="MenuWrapper"
                style={{
                    visibility: showMenu ? 'visible' : 'hidden',
                    ...menuPosition,
                }}
            >
                {menu}
            </div>
            {children}
        </div>
    )
}