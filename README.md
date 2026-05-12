# SynthTutor - Interactive Synthesizer Learning Tool

SynthTutor is an interactive educational synthesizer designed to help users learn the fundamentals of sound synthesis through hands-on experimentation. Built with React, TypeScript, and the Web Audio API, this application provides a visual and interactive way to explore waveform generation, filtering, and sound manipulation.

## Purpose

SynthTutor aims to make learning synthesis accessible and engaging by:

- Providing real-time audio visualization of different waveforms (sine, square, sawtooth, triangle)
- Offering interactive controls for frequency, filters, and volume
- Including educational tutorials and exercises
- Supporting keyboard input (A-K keys) for playing notes
- Enabling users to experiment with sound parameters and hear immediate results

## Features

- **Waveform Generation**: Create and manipulate sine, square, sawtooth, and triangle waves
- **Real-time Filtering**: Adjust cutoff frequency and resonance with low-pass, high-pass, and band-pass filters
- **Volume Control**: Fine-tune output volume
- **Visual Feedback**: See waveform visualization in real-time
- **Interactive Keyboard**: Play notes using your computer keyboard (A-K keys)
- **Tutorial System**: Learn synthesis concepts through guided tutorials
- **Exercise Mode**: Practice and test your knowledge with interactive exercises
- **Responsive Design**: Works on desktop and mobile devices

## Usage

### Running the Application

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   Navigate to `http://localhost:5173` in your web browser.

### Using the Synthesizer

- **Keyboard Input**: Press keys A-K on your keyboard to play different notes
- **Waveform Selection**: Choose from different waveform types using the dropdown
- **Frequency Control**: Adjust the base frequency of the oscillator
- **Filter Controls**: Enable/disable filters and adjust cutoff and resonance
- **Volume Control**: Set the output volume level

### Production Build

To create a production-ready build:

```bash
npm run build
```

This will generate optimized files in the `dist` directory. You can preview the production build locally with:

```bash
npm run preview
```

## Development

### Project Structure

```
src/
├── components/     # React components (UI controls, visualizer, keyboard)
├── hooks/          # Custom hooks (audio engine, synthesizer logic)
├── store/          # Zustand state management
├── types/          # TypeScript type definitions
├── data/           # Tutorial content and exercise data
├── test/           # Test files
├── App.tsx         # Main application component
├── main.tsx        # Application entry point
└── vite-env.d.ts   # Vite type declarations
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |
| `npm run lint:fix` | Automatically fix linting issues |
| `npm run format` | Format code with Prettier |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run test` | Run tests with Vitest |
| `npm run test:ui` | Run tests with Vitest UI |
| `npm run test:coverage` | Run tests with coverage reporting |

### Technology Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite 8
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Audio**: Web Audio API
- **Testing**: Vitest, React Testing Library
- **Linting**: ESLint
- **Formatting**: Prettier

### Adding New Features

1. **Create a new component** in the `src/components/` directory
2. **Add types** in `src/types/` if needed
3. **Update state** in `src/store/` using Zustand
4. **Add audio logic** in `src/hooks/` for synthesizer functionality
5. **Write tests** in `src/test/`

### Code Quality

Before committing changes, ensure your code passes all checks:

```bash
npm run lint
npm run typecheck
npm run test
npm run format
```

### Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

### License

This project is private and intended for educational purposes.
