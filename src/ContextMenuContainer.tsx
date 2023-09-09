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

export default function ContextMenuContainer( { children, menu, className, style }: PropsWithChildren<Props>) {

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
            console.log('setting menuRef focus')
            console.log(menuRef)
            menuRef.current.focus()
        }
    }, [showMenu])

    useEffect(() => {
        menuRef.current.addEventListener('blur', (e: FocusEvent) => {
            console.log('blurring')
            const target = e.target as HTMLElement
            const related_target = e.relatedTarget as HTMLElement
            console.log(target)
            console.log(related_target)
            if(!target.contains(related_target)) {
                setShowMenu(false)
            }
            
        })
        const tabbable_items = menuRef.current.querySelectorAll('[tabindex]')
        console.log(tabbable_items)
        tabbable_items.forEach(item => {
            item.addEventListener('blur', (e: FocusEvent) => {
                console.log('blurring item')
                const related_target = e.relatedTarget as HTMLElement
                console.log(related_target)
                if (!menuRef.current.contains(related_target)) {
                    console.log('target outside of menu')
                    setShowMenu(false)
                }
            })
            item.addEventListener('focus', () => {
                console.log('focusing on menu item')
                setShowMenu(true)
            })
        })
    }, [])

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