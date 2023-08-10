# react-context-menu tutorial

In this tutorial I will show you how to use the `react-context-menu` library

## Setup

Before we start, you should have a react project set up. I won't be going into
how to set up a React project, but you can check out 
[create-react-app](https://create-react-app.dev/), which is a popular tool for 
quickly setting up a React project.

Once you have a React app set up, install this library by running 
`npm install @printy/react-context-menu`

This tutorial shows you how to use the library with TypeScript, but the process
is pretty much the same for a JS project.

## Using the library

Using this library is very easy. Let's assume that you have a component called
`HeroSection` which is inside the `App` component.

*HeroSection.tsx*
```
export default function HeroSection() {
    return (
        <section>
            This is my hero section!
        </section>
    )
}
```

*App.tsx*
```
import HeroSection from './HeroSection.tsx'

export default function App() {
    <div>
        <HeroSection />
    </div>
}
```

IMAGE

Currently the hero section is very small in height and not distinguishable 
because there is not much content in it and no styles. Let's apply some styles
to it to make it more distinguishable

*HeroSection.tsx*
```
export default function HeroSection() {
    return (
        <section
            style={{
                display: 'flex',
                height: 120,
                backgroundColor: 'lightgreen',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            This is my hero section!
        </section>
    )
}
```

IMAGE

<sub>**NOTE:** Generally, it is considered bad practice to use inline CSS styles, but 
I've done so here for the sake of simplicity. Usually you would create a separate
CSS file and apply the style on the component using the `className` prop<sub>

Okay, now that we have our hero section, we can create a context menu for it by 
using our library

First, import the ContextMenuContainer and Menu components at the top of *HeroSection.tsx*

*HeroSection.tsx*
```
//Somewhere at the top of the file
import ContextMenuContainer, { Menu } from '@printy/react-context-menu'
/*...*/
```

Next, add the `<ContextMenuContainer/>` component inside the `<section>` element
and move the text inside the newly added component

*HeroSection.tsx*
```
/* ... */
<section
    style={{
        /* ... */
    }}
>
    <ContextMenuContainer>
        This is my hero section!
    </ContextMenuContainer>
</section>
/* ... */
```