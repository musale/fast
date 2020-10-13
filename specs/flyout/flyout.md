# Popover (aka Flyout)
## Overview
Popover is a focusable floating container that shows over a pages content and displays UI related to what the user is doing. Similar to a Dialog, but with positioning controls, not overlay option, and no specific action is required, a Popover can be used to reveal a secondary control or show more detail about an item.

### Background
A Popover can be less intrusive to the user experience than a Dialog and should be used instead of a Dialog when information or input is needed to be displayed, but not in the center of the screen, such as in the case of collection of additional info before an action, displaying information that is only relevant some of the time, or displaying more information.

### Use Cases
- As a popup showing additional info for an item on the page.
- To display a larger image of a thumbnail image in a photo gallery.
- To display an action related to a page item.

### Features
**Placement Logic:** - This component will use *Anchored Region* to be positioned relative to the Popouts anchor element. This way it can be dynamic and adapt to the available space if `responsive` is true for the Popover.

**Soft Dismiss (aka Light Dismiss):** - A way to quickly close the Popover by clicking outside it, or pressing the `esc` key. Av event would be emitted anytime the popover is dismissed. This would default to true/enabled as this is the expected default behavior of a popover/flyout.


### Prior Art/Examples
##### Popover from Evergreen
- triggered by a button
- https://evergreen.segment.com/components/popover/
![Popover](./images/evergreen-popover.png)

##### Microsoft Windows Developer Flyout, Text Only
*Note:* the button is not part of the Popover, but shown for context as an anchor element.
![Text Only](https://docs.microsoft.com/en-us/windows/uwp/design/controls-and-patterns/images/flyout-wrapping-text.png)

##### Microsoft Windows Developer Flyout, Actionable
*Note:* the button is not part of the Popover, but shown for context as an anchor element.
![Actionable More Info](https://docs.microsoft.com/en-us/windows/uwp/design/controls-and-patterns/images/flyout-example2.png)

#### Inline Dialog from ATLAssian
- https://atlassian.design/components/inline-dialog/examples
![Popover](./images/atlassian-popover.png)

#### Callout with actions from Fluent UI
- https://developer.microsoft.com/en-us/fluentui#/controls/web/callout
![Callout](./images/fluent-callout.png)


---

### API
*Component Name*
- `fast-popover`

*Attributes*
- `target` - string, the html id of the HTMLElement that the Popover is attached to, (viewport for anchored region defaults to the parent of the anchor) /
- `soft-dismiss` - boolean, whether or not the popover will soft dismiss with a click/focus outside of it, or pressing the escape key. The popover will always emit an event whether or not this attribute is enabled //
- `visible` - boolean, whether or not the Popover is visible, defaults to undefined, as this is controlled by the author
- `responsive` - boolean, whether or not the positioning is responsive based on available space, defaults to true, uses Anchored Region logic
- `position` - enum, where the tooltip should appear relative to its target, uses Anchored Region logic

    - above-centered, below-centered
    ![X](./images/ab-centered.png)

    - right-centered, left-centered
    ![X](./images/rl-centered.png)

    - top-left-corner, top-right-corner, bottom-right-corner, bottom-left-corner
    ![X](./images/corner-positions.png)

    - above-left-aligned, below-left-aligned
    ![X](./images/ab-left-aligned.png)
    - above-right-aligned, below-right-aligned
    ![X](./images/ab-right-aligned.png)

    - left-top-aligned, right-top-aligned
    ![X](./images/rl-top-aligned.png)

    - left-bottom-aligned, right-bottom-aligned
    ![X](./images/rl-bottom-aligned.png)


        - **ASK (1)**
- `aria-labelledby` - optional based on implementation**
- `aria-describedby` - optional based on implementation**
- `aria-label` - optional, based on implementation**

    ** See the [W3C Specification](https://w3c.github.io/aria-practices/#dialog_roles_states_props) for requirements and details.

*Properties*
- `targetElement` - the reference to the HTMLElement used as an anchor
- `visible` - boolean, whether or not the Popover is visible

*Methods*
- `isNonFocusableContent()` - check if the slotted content is a focusable element or not, could use a filter to check the node type.

*Slots*
- default for content

*Events*
- `dismiss` - event fired when the Popover is dismissed

### Anatomy and Appearance
Parts:
- `overlay` - the overlay.
    - *Note:* the overlay div will always be present, but will have different styles whether or not the overlay is enabled.
- `content` - the region where the content is rendered, has `role=dialog`


*Template:*
**ASK (2)**
```html
${when(
    x => x.visible,
    html<Popover>`
        <div>
            ${when(
                x => x.overlay,
                html<Popover>`
                    <div
                        class="overlay"
                        part="overlay"
                        role="presentation"
                        tabindex="-1"
                        @click="${x => x.dismiss()}"
                    ></div>
                `
            )}
            <fast-anchored-region
                anchor="${x => x.anchorElement}"
                vertical-positioning-mode="${x => x.responsive ? 'dynamic' : 'uncontrolled'}"
                horizontal-positioning-mode="${x => x.responsive ? 'dynamic' : 'uncontrolled'}"
                horizontal-default-position="${x => x.getHorizontalPosition()}"
                vertical-default-position="${x => x.getVerticalPosition()}"
                horizontal-inset="${x => x.getHorizontalInset()}"
                vertical-inset="${x => x.getVerticalInset()}"
                ${ref("anchoredRegion")}
            >
                <div
                    class="content"
                    part="content"
                    role="dialog"
                    tabindex="${x => x.isNonFocusableContent() ? '-1' : '0'}"
                >
                    <slot></slot>
                </div>
            </fast-anchored-region>
        </div>
    `
)}
```

---

## Implementation
```html
<fast-popover visible soft-dismiss responsive>
    <p>This is a popover</p>
    <fast-button>Action</fast-button>
</fast-popover>
```

### States
`visible` - Whether or not Popover is hidden. This state is managed solely by the app author via the visible attribute.
`responsive` - Whether or not the positioning of the Popover moves depending on if it fits where it is located within the viewport of the Anchored Region.

### Accessibility
*Keyboard Navigation and Focus*
Keyboard and navigation will follow the same rules as Dialog per the [W3C Specification](https://w3c.github.io/aria-practices/#dialog_modal), expect when there is no focusable content then the Popover itself will receive focus.

### Globalization
The component visuals should change when in RTL scenarios as the component is positioned relative to it's anchor.

### Dependencies
This component should be positioned using [anchored region](../packages/web-components/fast-foundation/src/anchored-region/anchored-region.spec.md).

## Resources
[W3C Specification](https://w3c.github.io/aria-practices/#dialog_modal)
[Flyout Menus](https://www.w3.org/WAI/tutorials/menus/flyout/#flyoutnavmousefixed)
[Dialogs and Flyouts](https://docs.microsoft.com/en-us/windows/uwp/design/controls-and-patterns/dialogs-and-flyouts/#:~:text=A%20flyout%20is%20a%20lightweight%20contextual%20popup%20that,control%20or%20show%20more%20detail%20about%20an%20item.)