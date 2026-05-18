import { AppProviders } from "./AppProviders";
import { AppRouter } from "./AppRouter";

const App = () => {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
};

export default App;
