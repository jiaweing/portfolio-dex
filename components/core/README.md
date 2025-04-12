# InView Animation Components

This directory contains components for implementing fade-in and other animation effects when elements come into view during scrolling.

## Components

### InViewWrapper

A high-level wrapper component that applies fade-in animations to entire sections.

```jsx
import { InViewWrapper } from "@/components/core/in-view-wrapper";

// In your component:
<InViewWrapper>
  <YourComponent />
</InViewWrapper>
```

#### Props

- `children`: React nodes to be animated
- `variants`: Animation variants object with `hidden` and `visible` states
- `transition`: Animation transition properties
- `viewOptions`: Options for the InView detection

Default variants:
```jsx
{
  hidden: { opacity: 0, y: 100, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
}
```

Default transition:
```jsx
{ duration: 0.5, ease: 'easeInOut' }
```

Default viewOptions:
```jsx
{ margin: '0px 0px -200px 0px', once: true }
```

### InView

A lower-level component for applying animations to individual elements within a component.

```jsx
import { InView } from "@/components/core/in-view";

// In your component:
<InView
  variants={{
    hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
  }}
  transition={{ duration: 0.4, ease: 'easeOut' }}
  viewOptions={{ margin: '0px 0px -100px 0px', once: true }}
>
  <div>Your content here</div>
</InView>
```

## Examples

### Staggered Animation

For creating staggered animations (elements appearing one after another):

```jsx
{items.map((item, index) => (
  <InView
    key={index}
    variants={{
      hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
      visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
    }}
    transition={{ 
      duration: 0.4, 
      ease: 'easeOut', 
      delay: 0.1 * index // Staggered delay based on index
    }}
    viewOptions={{ margin: '0px 0px -100px 0px', once: true }}
  >
    <div>{item.content}</div>
  </InView>
))}
```

### Directional Animation

For animations that come from different directions:

```jsx
// From left
<InView
  variants={{
    hidden: { opacity: 0, x: -50, filter: 'blur(4px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)' }
  }}
>
  <div>Content slides in from left</div>
</InView>

// From right
<InView
  variants={{
    hidden: { opacity: 0, x: 50, filter: 'blur(4px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)' }
  }}
>
  <div>Content slides in from right</div>
</InView>
```
