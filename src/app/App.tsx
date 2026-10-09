import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";

const Valley = lazy(() => import("./pages/Valley"));

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/vadi" element={<Suspense fallback={<div className="min-h-screen bg-[#050608]" />}><Valley /></Suspense>} />
    </Routes>
  );
}
