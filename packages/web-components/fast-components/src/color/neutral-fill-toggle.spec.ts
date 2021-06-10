import { parseColorHexRGB } from "@microsoft/fast-colors";
import { expect } from "chai";
import { PaletteRGB } from "../color-vNext/palette";
import { neutralFillToggle as neutralFillToggleNew } from "../color-vNext/recipes/neutral-fill-toggle";
import { SwatchRGB } from "../color-vNext/swatch";
import { fastDesignSystemDefaults } from "../fast-design-system";
import { neutralBaseColor } from "./color-constants";
import { neutralFillToggle_DEPRECATED } from "./neutral-fill-toggle";

describe("ensure parity between old and new recipe implementation", () => {
    const color = (parseColorHexRGB(neutralBaseColor)!)
    const palette = PaletteRGB.create(SwatchRGB.create(color.r, color.g, color.b));
    palette.swatches.forEach(( newSwatch, index ) => {
        const { neutralFillToggleHoverDelta, neutralFillToggleActiveDelta, neutralFillToggleFocusDelta} = fastDesignSystemDefaults;
        const oldValues = neutralFillToggle_DEPRECATED({...fastDesignSystemDefaults, backgroundColor: fastDesignSystemDefaults.neutralPalette[index]});
        const newValues = neutralFillToggleNew(
            palette,
            newSwatch,
            0,
            neutralFillToggleHoverDelta,
            neutralFillToggleActiveDelta,
            neutralFillToggleFocusDelta,
        );
            it(`should be the same for ${newSwatch}`, () => {
                for (let key in oldValues) {
                    expect(oldValues[key]).to.equal(newValues[key].toColorString().toUpperCase())
                }
        });
    })
})