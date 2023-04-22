import { vars } from "@kalidao/reality";
import { style } from "@vanilla-extract/css";

export const userProfile = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: vars.colors.background,
  paddingRight: vars.space[3],
  paddingLeft: vars.space[3],
  borderRadius: vars.radii["2xLarge"],
  gap: vars.space[2],
})
