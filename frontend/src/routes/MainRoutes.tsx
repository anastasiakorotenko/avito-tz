import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { ROUTES } from "@/constants/config";
import ListPage from "@/pages/list/ListPage";
import { CardDetailsPage } from "@/pages/item/CardDetailsPage";
import { StatsPage } from "@/pages/stats/StatsPage";
import { AnimatePresence } from "framer-motion";

export const MainRoutes = () => {
  return (
    <AnimatePresence mode="wait">
      <Router>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Navigate to={ROUTES.LIST} replace />} />
          <Route path={ROUTES.LIST} element={<ListPage />} />
          <Route
            path={ROUTES.CARD_DETAILS(":id")}
            element={<CardDetailsPage />}
          />
          <Route path={ROUTES.STATS} element={<StatsPage />} />
        </Routes>
      </Router>
    </AnimatePresence>
  );
};
