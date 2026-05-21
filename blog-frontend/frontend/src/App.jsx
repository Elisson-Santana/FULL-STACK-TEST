import AppRoutes from "./routes/AppRoutes";
import { UserProvider } from "./UserContext";

function App() {
  return (
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  );
}

export default App;