# Snake Game

A classic Snake game implementation using Rust and WebAssembly (WASM) for the game logic, with a TypeScript/HTML5 Canvas frontend.

## Features

- Classic snake gameplay with grid-based movement
- Score tracking system
- Responsive canvas that adjusts to Retina displays
- Game status indicators (Playing, Won, Lost)
- Random snake spawn position for variety
- Wrapping around world boundaries

## Technical Stack

- **Backend**: Rust with WebAssembly
- **Frontend**: TypeScript with HTML5 Canvas
- **Build Tools**: wasm-pack, npm

## Project Structure

```
snake_game/
├── src/
│   └── lib.rs         # Rust/WASM game logic
├── www/
│   ├── index.ts       # TypeScript frontend
│   └── index.html     # Game UI
└── Cargo.toml         # Rust dependencies
```

## Compilation

- Make sure wasm-pack is installed by executing cargo install `wasm-pack`
- Compile rust code to WASM with `wasm-pack build --target web` at project root

## Run

- Go to frontend project under www directory: `cd www && npm run start`

## Game Controls

- Use arrow keys to control snake direction
- Snake cannot make 180-degree turns (can't turn back on itself)
- Game ends when snake collides with itself
- Win condition: snake length equals world size

## Future Improvements

1. **Deployment to Heroku**
   - Set up Heroku deployment pipeline
   - Configure buildpacks for Rust and Node.js
   - Add environment variables for production settings
   - Implement proper error handling for production environment

2. **Game Features**
   - Add pause/resume functionality
   - Implement different difficulty levels
   - Allow user select different world sizes
   - Add sound effects
   - Save high scores
   - Add multiplayer support
   - Implement different game modes (e.g., time attack, obstacle mode)

3. **Technical Enhancements**
   - Add unit tests for Rust and TypeScript code
   - Implement proper error handling and logging
   - Add performance optimizations for mobile devices
   - Improve accessibility features
   - Add keyboard and touch controls support
   - Implement responsive design for different screen sizes

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the LICENSE file for details.
