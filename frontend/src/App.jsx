import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorMessage from "./pages/ErrorMessage";
import ProtectedRoute from "./components/ProtectedRoute";
import Loading from "./components/Loading";
import Profile from "./pages/Profile";

const Signup = lazy(() => import("./pages/Signup"));
const Signin = lazy(() => import("./pages/Signin"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const SendMoney = lazy(() => import("./pages/SendMoney"));

function App() {
  return (
    <>
      <BrowserRouter>
        <ErrorBoundary
          fallbackRender={({ error, resetErrorBoundary }) => (
            <ErrorMessage
              error={error}
              resetErrorBoundary={resetErrorBoundary}
            />
          )}
        >
          <Suspense
            fallback={
              <Loading />
            }
          >
            <Routes>
              <Route exact path="/" element={<Signin />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route element={<ProtectedRoute />}>
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route exact path="/send-money" element={<SendMoney />} />
                <Route exact path="/profile" element={<Profile />} />
              </Route>
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </>
  );
}

export default App;
