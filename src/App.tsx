import AppProvider from "@components/app/AppProvider";
import AppRoutes from "@components/app/AppRoutes";

const App = () => {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
};

export default App;
