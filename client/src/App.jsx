import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Pages
const Home = React.lazy(() => import("./pages/Home"));
const About = React.lazy(() => import("./pages/About"));
const SignIn = React.lazy(() => import("./pages/SignIn"));
const SignUp = React.lazy(() => import("./pages/SignUp"));
const Profile = React.lazy(() => import("./pages/Profile"));
const Test = React.lazy(() => import("./pages/test"));
const Search = React.lazy(() => import("./pages/Search"));

const Sell_rent = React.lazy(() => import("./pages/Sell_rent"));
const CreateAblog=React.lazy(() =>import("./pages/createAblog"));
const BlogHome= React.lazy(() => import("./pages/blogHomepage"));
const BlogDetail=React.lazy(() => import("./pages/BlogDetail.jsx"));


//const BlogPage = React.lazy(() => import("./pages/BlogPage"));

const SearchResults=React.lazy(() => import("./pages/SearchResults"));


//Components
const Header = React.lazy(() => import("./components/Header"));
const LandingPageHeader = React.lazy(() => import("./components/LandingPageHeader"));
const PrivateRoute = React.lazy(() => import("./components/PrivateRoute"));

export default function App() {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <BrowserRouter>
      <LandingPageHeader />
        <Routes>
        <Route path="/blogHome/:id" element={<BlogDetail/>} />
          <Route path="/blogHome" element={<BlogHome />} />
          <Route path="/createblog" element={<CreateAblog />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/test" element={<Test />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/search" element={<Search />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/sell_rent" element={<Sell_rent/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.Suspense>
  );
} // Merge test
