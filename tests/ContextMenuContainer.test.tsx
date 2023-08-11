import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ContextMenuContainer, { Menu } from '../src'

const text1 = 'example text'
const text2 = 'another text'

const menu_1 = (
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
)

const menu_2 = (
    <Menu
        options={[
            {
                label: 'Option A',
            },
            {
                label: 'Option B'
            },
            {
                label: 'Option C'
            },
            {
                label: 'Option D'
            }
            
        ]}
    />
)

describe("<ContextMenuContainer/>", () => {

    

    beforeEach(() => {
        render(
            <ContextMenuContainer
                style={{
                    backgroundColor: 'green',
                    width: '100%',
                    height: '100px'
                }}
                menu={menu_1}
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

    it('Should only show menu component when right clicked', async () => {
        const context_cmpt = screen.getByText(text1)

        const menu_cmpt = screen.getByText('Option #1').closest('ul').closest('div')

        expect(menu_cmpt).not.toBeVisible()

        await fireEvent.contextMenu(context_cmpt)

        expect(menu_cmpt).toBeVisible()
    })

    //TODO: fix this test, it's currently not working
    it('Menu should not overflow page', async () => {
        const context_cmpt = screen.getByText(text1)

        const menu_cmpt = screen.getByText('Option #1').closest('ul').closest('div')

        await fireEvent.contextMenu(context_cmpt) //Should set specific position for the event somehow

        expect(menu_cmpt).toBeVisible()

        function overflowsPage(element: HTMLElement) {
            const rect = element.getBoundingClientRect()
            //This console log returns zero values
            //console.log(rect)

            if (
                rect.right > window.innerWidth ||
                rect.left < 0 ||
                rect.bottom > window.innerHeight ||
                rect.top < 0
            ) {
                return true
            }

            return false
        }

        expect(overflowsPage(menu_cmpt)).toBeFalsy()
    })
})

describe('Nested <ContextMenuContainer>s', () => {
    beforeEach(() => {
        render(
            <ContextMenuContainer
                style={{
                    width: '100%',
                    height: '100px'
                }}
                menu={menu_1}
            >
                {text1}
                <ContextMenuContainer
                    style={{
                        width: '40%',
                        height: '50px'
                    }}
                    menu={menu_2}
                >
                    {text2}
                </ContextMenuContainer>
            </ContextMenuContainer>
        )   
    })

    it('Should show a different menu for each context', async () => {
        const context_cmpt_1 = screen.getByText(text1)
        const context_cmpt_2 = screen.getByText(text2)

        const menu_cmpt_1 = screen.getByText('Option #1').closest('ul').closest('div')
        const menu_cmpt_2 = screen.getByText('Option A').closest('ul').closest('div')

        await fireEvent.contextMenu(context_cmpt_1)

        expect(menu_cmpt_1).toBeVisible()
        expect(menu_cmpt_2).not.toBeVisible()

        await fireEvent.contextMenu(context_cmpt_2)

        expect(menu_cmpt_1).not.toBeVisible()
        expect(menu_cmpt_2).toBeVisible()
    })

    
})