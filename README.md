# Chess React App
This is a chess app created using React.
([View Demo](https://narcissus-yuan.github.io/react-chess-app/))

# Interface Screenshot
![chess_interface](https://user-images.githubusercontent.com/92783418/171095743-bc31a0e9-4f8e-43ef-915b-42ed04a96bb7.png)

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
- Button3 (top right): click to display piece positions (for better visualization when using 'Keyboard Control')
- Button4 (top right): click to switch color mode (light / dark)
- Button5 (top right): click to undo one step
- Button6 (top right): click to open settings
- Button7 (bottom right): click to open keyboard control

## Keyboard Control

![keyboard_control](https://user-images.githubusercontent.com/92783418/171096172-a9bac37b-ba81-434a-b3bb-8fa46d40c7cf.png)

- Enter select piece position and destination position
- Click 'Submit Query'
- If move is invalid, there will be a warning

## Settings

### Appearance (Switches)

![appearance](https://user-images.githubusercontent.com/92783418/171096544-844fa1d3-1eab-4ae8-8e3d-75f334843250.png)

- Controls whether or not to indicate possible chess movement when piece is selected
- Controls whether or not to open piece count table (coordinated with Button1)

---------------------------

### Color Mode (coordinated with Button4)

![color_mode](https://user-images.githubusercontent.com/92783418/171096561-0abbafc8-d5f1-4698-9527-16153ff0070d.png)

- light mode
- dark mode
- system mode (OS default)

---------------------------

### Chess Piece Style

![piece_style](https://user-images.githubusercontent.com/92783418/171096575-1af01013-a058-4d73-a1e6-bbfa578e64c4.png)

- plain chess style (default)
- fancy chess style

---------------------------

### History (Time Travel)

![history](https://user-images.githubusercontent.com/92783418/171096617-1758a1bd-5400-446e-8716-c20416822cdb.png)

- click to open chess history
- click on entry to reverse specific step and succeeding steps
- empty when there's no history

---------------------------

### Time Limit
![time_limit](https://user-images.githubusercontent.com/92783418/171096641-9d2d27bf-5928-49d3-aac9-13720a82263e.png)

- none (no time limit; default)
- other options
- custom option

## Indicators
- Turn indicator (top center): indicates turn (black / white)
- Movement indicator: indicates movement options when piece is selected
- Movement correctness indicator: indicates whether chess move is correct
