# The big picture &middot; V3 &middot; the triangle

The closing figure of the ReLeaf homepage, read one level of abstraction above V2, and built to
stand alone while it is being worked on.

**Live page:** https://timmy97-tw.github.io/big-pic-tri-v3/

V2 lives at [releaf-big-picture-v2](https://github.com/Timmy97-TW/releaf-big-picture-v2) and is on
the homepage today. V1 is at [releaf-big-picture](https://github.com/Timmy97-TW/releaf-big-picture).
Neither is edited to accommodate this one. The three are different readings of the same material and
only one of them ships.

Drawn on the wiki's own design tokens, copied unmodified from
[`releaf-wiki`](https://github.com/Timmy97-TW/releaf-wiki) at `assets/css/tokens.css`, with the same
self-hosted Inter. Nothing here forks the palette.

## What changed

V2 is twenty-nine pieces of work hanging off five steps, and on a 1440 screen it stands 1503px tall.
It is a record of a year. A judge who has ninety seconds does not read a record of a year.

V3 answers one question: **how do the three halves of this project hold on to each other.** Three
corners, three joints, one plant in the middle, and all of it inside one screen.

The trade is real and it is worth writing down. **V3 drops the twenty-nine pieces of work, the
Taiwan farmland map, the dial, the molecular dynamics animation and the outro photograph.** Those
are the evidence, and a figure that fits on a screen cannot hold them. What V3 keeps is the shape of
the system and the honest state of each part of it, with a link out of every corner to the page that
carries the evidence. The last line of the figure points at V2 for the long version.

## What it argues

| | |
|---|---|
| **Optogenetic control** | A green-light switch built into *B. subtilis*. Four Level 1 modules built and sequenced, on 520 and 660 nm LEDs. No induction run exists anywhere. |
| **Bioreactor** | A vessel that grows the cells and holds them: 0.2 µm across 150 cm², 2 132 readings over 336 h. The membrane and the photometer have never run as one machine. |
| **Bioprotectant** | ACC deaminase, LEA14 and BoPep4. Six cassettes ordered with N-terminal tags, nine 30 ns trajectories with no affinity measured. No protectant has been measured leaving a cell, and the blot found none in the prep. |
| **Plant protection** *(centre)* | Our own salt ladder: 75.0, 34.8, 11.0 and 1.8 mm of root at 0 to 150 mM NaCl, four single readings. No protectant has rescued a plant yet. |

**The edges are the argument.** Each pair of corners is joined by one real mechanism, and that is
what makes the shape worth drawing. Each joint is a labelled object in its own right:

- **The switch and the cargo.** The promoter the light drives and the protectant it makes are one
  plasmid, sequenced with no mutations. It has never been induced.
- **The array and the vessel.** Green light on one side, the vessel's own telemetry at 1 Hz on the
  other. The reactor's lamp is not built, and the loop has never closed.
- **Cells stay, protein leaves.** One 0.2 µm pore holds the rods in and is wide enough to pass a
  37.6 kDa enzyme. Shell fluid plated clean on 6 June; nothing has been measured crossing.

The footing says it in words a stranger can read, and it separates the three: one joint is real in
DNA, one is real in hardware, and the third is still on paper, because the reactor has no lamp of
its own. Not one has been measured working. A judge who reads only the footing has the state of the
project.

## One screen, structurally

The requirement was that nobody has to scroll to see all of it. Construction enforces it, so no
media query has to be re-tuned when a browser grows a toolbar.

1. The section is a column that owns the viewport: `height: calc(100svh - var(--bp3-nav))`, with
   head, stage and footing stacked inside it.
2. The stage is `flex: 1 1 auto; min-height: 0; container-type: size`, so it is exactly the box the
   head and the footing left behind, and it can be measured.
3. The drawing is a fixed canvas of **1320 × 600 design pixels**, sized
   `width: min(100cqw, calc(100cqh * 1320 / 600))` with `aspect-ratio` pinning its height. Those two
   container units are the stage's, so the drawing fits itself into the real leftover box.
4. Everything inside the drawing is written as a design pixel times `--k`, where
   `--k: calc(100cqw / 1320)` is one design pixel in the drawing's own container units.

So every number in the stylesheet below the stage is a number you could measure off the drawing, and
**overflow is arithmetically impossible**: add a line of text and the drawing gets smaller. It never
spills, and the section never grows.

**Two properties are load bearing.** `min-height: 0` on the stage and `container-type: size` on it
are what give `100cqh` something to measure. Change either and the drawing renders a few pixels
tall. The `@supports` fallback does not catch that case, because the units are supported; it only
catches a browser with no size containment at all, where an arithmetic estimate takes over.

**Measured on this build, which reserves the wiki's own 68px of nav.** Body type is the facts and
the limits at 14 design pixels; the smallest column is the two things set below them, the link out
of each card and the ladder's caption and numbers, all at 13.5.

| viewport | the drawing | scale | body type | smallest | scrolls |
|---|---|---|---|---|---|
| 1920 × 1080 | 1420 wide | 1.08 | 15.1px | 14.6px | no |
| 1512 × 850 | 1181 | 0.89 | 12.5px | 12.0px | no |
| 1440 × 900 | 1288 | 0.98 | 13.7px | 13.2px | no |
| 1366 × 768 | 1209 | 0.92 | 12.8px | 12.4px | no |
| 1280 × 720 | 1130 | 0.86 | 12.0px | 11.6px | no |
| 1152 × 800 | 1088 | 0.82 | 11.5px | 11.1px | no |
| 1151 × 800 | two columns | - | 13px | 13px | no |
| 1024 × 768 | two columns | - | 13px | 13px | no, with 0px to spare |
| 768 × 1024 | two columns | - | 13px | 13px | no |
| 375 × 812 | one column | - | 13px | 13px | **yes, about 1.5 screens** |

**Three layouts, and the widths are solved by where type stops being readable.**

- **From 1152px** the triangle is drawn, because that is the width at which the fitted drawing still
  keeps its smallest type at 11.5px. Below it the type would go under reading size, which is where a
  figure stops being a figure. V2 turned at 1150 for the same reason.
- **From 768 to 1151** the same markup becomes two columns: each corner on the left, beside it the
  joint that leaves it, and the plant closing the right-hand column. Source order does the pairing.
- **Below 768** it is one column, in the order a reader walks the triangle: corner, joint, corner,
  joint, corner, joint, plant. The last joint closes the loop.

**The phone is the honest exception.** On a 375px phone the content is about 1 100px tall and the
screen is about 740, so it scrolls once. Every way of fixing that costs something the figure should
not pay: hiding the facts behind a disclosure, dropping the limits, or setting the type at 10px. If
a strict one-screen phone view is wanted, the way to get it is to cut copy, and the copy to cut is
the second fact on each corner.

## Reading it

- **Nothing opens.** No panel, no modal, no drawer, no swapping readout. Every word is in the markup
  before the script runs.
- **Point at a corner** and it lights the two joints it sits on, the wires under them, and the
  corners on the far side. The plant lights with every corner, because every corner is for it.
- **Point at a joint** and both of its ends light.
- **Three steps of emphasis.** With only seven objects on the stage a simple on/off dim is almost
  no signal, so the held thing is at full strength, what it reaches sits at 0.72, and the rest
  drops to 0.34.
- **Keyboard reaches all of it**, and the tab order walks the triangle: corner, joint, corner,
  joint, corner, joint, then the plant. That is also the DOM order, which is what the column layout
  stacks, so on a phone the last joint closes the loop.
- **One listener, on the container**, using `pointerover`, which bubbles. V2's note applies here
  unchanged: per-tile `pointerenter` and `pointerleave` fire leave-then-enter when you cross between
  neighbours, and the frame in between has everything un-held, so dragging across the figure
  strobes. If this figure ever flickers, that is the thing that broke.

## The centre

The middle of the triangle carries the one solid number set this project has on plants: experiment
set 6, day 6, 3 August 2026, root length 75.0, 34.8, 11.0 and 1.8 mm at 0, 75, 100 and 150 mM NaCl,
drawn as four bars with the number over each one.

Three things about it are deliberate:

- **Four readings, no error bars.** n is recorded nowhere and there is no replicate. Anything with a
  whisker on it would be an invention. The caption says "four single readings" for that reason.
- **The bars are proportional to the millimetres**, which is why the 150 mM bar is a hairline: at
  1.8 mm there is almost nothing left to draw. That collapse is the argument for the whole project,
  and the number over each bar is what keeps the hairline readable.
- **The centre is the aim, and it says so.** Under the ladder, *no protectant has rescued a plant
  yet*. The assay works; the rescue has not happened.

## Colour

**Leaf is structure.** The cards, the hairlines, the wires, the bullets. The wire colour is
`--leaf-500` because a joint is a meaningful graphic and has to clear 3:1 against white; the paler
green it started as measured 2.2.

**Amber is a lit joint.** V2 gave amber to cross-links and nothing else; here every joint is a
cross-link, so the colour does the same job in the same voice.

**Rust marks a gap this project has not closed**, and never means anything else. Every corner
carries one, in the same size of type as the claims above it. There is no small print in this
figure.

The icons are V2's sprite, reused unchanged: `i-led`, `i-reactor`, `i-peptide` for the corners and
`i-rescue` for the centre, which draws two plants on one soil line, the one that got the protectant
and the one that did not. Every colour in them goes through `var()`.

## Editing the content

Everything readable is in `index.html`. There is no build step and no generator: at seven objects,
one table would be more machinery than the figure is worth. V2's `tools_spine.py` exists because
twenty-nine tiles drift; three corners do not.

- **A corner** is an `<article class="bp3-corner" data-node="…">` holding a head row (icon, name,
  the link out), one line saying what it is, two facts, and one rust line saying what is open.
- **A joint** is a `<div class="bp3-edge" data-edge="…" data-ends="…">` with a name and one
  sentence. The second half of that sentence, the part in `<i>`, is what is still open, and the
  stylesheet colours it rust.
- **The wires** live in `.bp3-wires`, a `<svg viewBox="0 0 1320 600">` whose coordinates are the
  same design pixels as the CSS. The bottom wire is drawn as two segments with a gap, and its label
  sits in the gap, the way a drawing breaks a dimension line around its figure. Move the label and
  the break has to move with it.
- **`data-ends` is the only description of the topology** anywhere in the code. The script reads it
  and works out what lights what; nothing else knows the triangle's shape.

**Every fact has to fit on one line.** The card is a fixed 404 × 196 design pixels and the text
column inside it is 364, which is about 52 characters at the fact size. A fact that wraps costs the
card 18 design pixels it does not have, and the card overflows instead of growing. Check it after
an edit: every `.bp3-corner` should have `scrollHeight === clientHeight`.

**Do not fill a gap with a guess, and do not tidy a rust line away.** Never invent a number, a
quote, a date or a result. This figure is where a judge will check.

## Two things to get right

**The word AI.** The project abstract calls ReLeaf "an AIoT-driven optogenetic bioreactor system".
What exists behind that phrase is an SHT31 reading temperature and a straight line between two
guessed constants, 32 °C and 50 °C, driving a green channel by PWM, demonstrated 20 June. There is
no trained model, no forecast, no weather feed and no training data anywhere in the archive. That is
why this figure says "light array" and "telemetry" and never says AI.

**"Sequence-verified" for the light circuit as a whole.** Four Level 1 modules are built and
sequenced. The joined Level 2 construct is junction-checked by PCR at 375, 632 and 661 bp and has
never been read end to end. The figure says "modules built and sequenced" for that reason, and the
distinction has to survive.

## Merging into the homepage

1. Copy `assets/css/big-picture-v3.css` and `assets/js/big-picture-v3.js` into the wiki's `assets/`.
   There are no images to copy: the figure is type, hairlines and the inlined sprite.
2. Paste the `<section class="band bp3">` element into `index.html`, including the `<svg class="sprite">`
   block at the top of it. The sprite has to travel with the section, because
   `<use href="external.svg#id">` does not resolve reliably.
3. Add the stylesheet link and the script tag, and **bump the `?v=` on the stylesheet** when the CSS
   changes. Without it a cached browser renders new markup against old rules, and the result is hard
   to diagnose.
4. Delete the `<div class="shell">` element, the inline `<style>` block in the head, and the
   `section.bp3 { margin-top: 34px }` rule. All three exist only so the standalone page has a body
   to sit in. `home.css` already supplies `.band`, `.band__inner` and `h2.band__title`.
5. Keep the element selector on `section.bp3`. `home.css` sets `.band { padding: var(--sp-8) 0 }`
   and a bare class loses to it.
6. Point the three corner links and the closing link at relative wiki paths. In this repo they are
   absolute, at `timmy97-tw.github.io/releaf-wiki/…`, because the standalone build has no sub-pages.
7. `--bp3-nav` is 68px, which is the wiki's own `--nav-h`. If the nav's height ever changes, this is
   the one number in the figure that has to change with it.
8. **The section and V2 both answer to `id="bigpicture"`.** If V3 replaces V2, keep the id and drop
   the footing's link to the long version, because there will not be one on that page. If the two
   ship together, rename this one and re-point the nav.

Decide before merging whether V3 replaces V2 or sits above it. They argue at different altitudes and
they can both be true, but they cannot both be the closing band.
