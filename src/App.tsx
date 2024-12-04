
import MainContent from '@/components/MainContent'
import './App.css'
import { ColorSchemeProvider } from '@/providers/ColorSchemeProvider';

function App() {
  return (
    <ColorSchemeProvider>
      <MainContent />
    </ColorSchemeProvider>
  );
}
export default App
