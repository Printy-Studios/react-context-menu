# React context menu

![react-context-menu-example](https://github.com/Printy-Studios/react-context-menu/assets/17122123/82c07b0d-16e5-411d-b15a-a7a0fe7b7b47)

This is a small React package that helps you with setting up context menus 
(the ones that appear when you right click).

**Note:** This library currently only works for TypeScript

## Features

* Multiple contexts
* Nested contexts
* Menu doesn't overflow page at borders
* Fully customizable

## Setup

To install this package, simply run `npm i @printy/react-context-menu`

## Usage

To create a context menu area (area in which the context menu will be allowed to
 activate), import and create a `<ContextMenuContainer />` component. If you 
want to apply the context to an already existing element, simply add 
`<ContextMenuContainer />` inside it and it will automatically stretch to the 
size of its container

You must pass a single prop `menu` which specifies the component to render as the context menu.

This package focuses on helping with the functionality and behavior of a context menu, not appearance. As such, you will have to create the menu component yourself. But I have added a basic `<Menu/>` component that you can use as a baseline.

The `<Menu/>` component accepts a single prop `options`, which is an array of objects with properties `label` and `onClick`. `label` is the label that will appear on the menu item, and `onClick` is the event handler for clicking on the item.

You can create multiple `<ContextMenuContainer/>`s each with their own menu component, and you can also nest multiple `<ContextMenuContainer/>`s

For any questions or issues feel free to submit an issue on [the repo](https://github.com/Printy-Studios/react-context-menu)
