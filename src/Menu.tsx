import React, { HTMLAttributes } from 'react'
import './Menu.css'

type Option = {
    key?: string | number,
    label: string,
    onClick?: React.MouseEventHandler<HTMLLIElement>
}

type Props = HTMLAttributes<HTMLUListElement> & {
    itemClassName?: string,
    options: Option[]
}

export default function Menu( { options, className, itemClassName }: Props ) {
    return (
        <ul className={`menu ${className}`}>
            {options.map(option => (
                <li 
                    tabIndex={0}
                    key={ option.key || option.label }
                    className={`menu-item ${itemClassName}`} 
                    onClick={option.onClick}
                >
                    {option.label}
                </li>
            ))}
        </ul>
    )
}