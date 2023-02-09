import { ThemeProvider } from './context/theme';
import Todo from './pages/Todo';
function App() {
  return (
    <ThemeProvider>
      <Todo />
    </ThemeProvider>
  );
}

export default App;
