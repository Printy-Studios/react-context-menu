import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ContextMenuContainer, { Menu } from '../src'

describe("<ContextMenuContainer/>", () => {

    const text1 = 'example text'

    beforeEach(() => {
        render(
            <ContextMenuContainer
                style={{
                    width: '100%',
                    height: '100px'
                }}
                menu={
                    <Menu
                        options={[
                            {
                                label: 'Option #1',
                            },
                            {
                                label: 'Option #2'
                            },
                            {
                                label: 'Option #3'
                            },
                            {
                                label: 'Option #4'
                            }
                            
                        ]}
                    />
                }
            >
                {text1}
            </ContextMenuContainer>
        )
    })

    it('Should render', () => {
        // render(
        //     <ContextMenuContainer>
        //         {text1}
        //     </ContextMenuContainer>
        // )
        const context_cmpt = screen.getByText(text1)
        expect(context_cmpt).toBeInTheDocument()
    })

    it('Should be styleable', () => {
        // render(
        //     <ContextMenuContainer
        //         style={{
        //             backgroundColor: 'green'
        //         }}
        //     >
        //         {text1}
        //     </ContextMenuContainer>
        // )
        
        const context_cmpt = screen.getByText(text1)

        expect(context_cmpt).toHaveStyle('background-color: green')
    })

    it('Should show menu component when right clicked', async () => {
        const context_cmpt = screen.getByText(text1)

        const menu_cmpt = screen.getByText('Option #1').closest('ul')

        await fireEvent.contextMenu(context_cmpt)

        expect(menu_cmpt).not.toBeVisible()


    })
})