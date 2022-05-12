# Chess React App
This is a chess app created using React.

# Interface Screenshot
![chess_interface](https://user-images.githubusercontent.com/92783418/168020446-6fdfb408-ee3a-4c94-bcf4-e0f522fe2150.png)

# Usage

## Basics (Rather Intuitive)
- To select piece, click on the specific piece
- To unselect piece, click on the specific piece
- To unselect current piece and select another, you can
    1. unselect and select manually, or
    2. double-click on the piece you want to select
- To select destination, click on the specific piece

## Buttons
- Button1 (top left): click to open piece count table
- Button2 near turn indicator: click to reset game / start new game
- Button3 (top right): click to switch color mode (light / dark)
- Button4 (top right): click to undo one step
- Button5 (top right): click to open settings

## Settings

### Appearance (Switches)
- Controls whether or not to indicate possible chess movement when piece is selected
- Controls whether or not to open piece count table (coordinated with Button1)

### Color Mode (coordinated with Button3)
- light mode
- dark mode
- system mode (OS default)

### Chess Piece Style
- plain chess style (default)
- fancy chess style

### History (Time Travel)
- click to open chess history
- click on entry to reverse specific step and succeeding steps
- empty when there's no history

### Time Limit
- none (no time limit; default)
- other options
- custom option

## Indicators
- Turn indicator (top center): indicates turn (black / white)
- Movement indicator: indicates movement options when piece is selected
- Movement correctness indicator: indicates whether chess move is correct
