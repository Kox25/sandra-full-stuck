import React from "react";
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";

//css
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

//pages (routes)
import RootLayout from "./pages/RootLayout/RootLayout";

//auth
import Login from "./pages/login/Login";
import SignUp from "./pages/SignUp/SignUp";

import Home2 from "./pages/Home2/Home2";

import Doctor from "./pages/Doctor/Doctor";

//chats
import Chats from "./pages/Chats/Chats";
import ChatMessages from "./pages/ChatMessages/ChatMessages";

//Articles
import ShowArticles from "./pages/ShowArticles/ShowArticles";
import ArticleContent from "./pages/ArticleContent/ArticleContent";
import AddArticle from "./pages/AddArticle/AddArticle";
import EditArticle from "./pages/editArticle/editArticle";
import EditArticleContent from "./pages/editArticle/editArticleContent";
import PendingArticles from "./pages/pendingArticless/PendingArticles/pendingArticles";
import PArticleContent from "./pages/pendingArticless/ArticleContent/ArticleContent";
import MyArticles from "./pages/pendingArticless/myArticles/myArticles";
import MyArticleContent from "./pages/pendingArticless/myArticleContent/myArticleContent";

import DoctorProfile from "./pages/DoctorProfile/DoctorProfile";

import Settings from "./pages/profileInfo/profileInfo";
import SearchProv from "./Providers/SearchProvider";
import SearchResult from "./pages/SearchResult/SearchResult";

import UploadDocument from "./pages/UploadDocument/UploadDocument";
import AdminDoctors from "./pages/AdminDoctors/AdminDoctors";
import RequestVerfiy from "./pages/RequestVerfiy/RequestVerfiy";
import Chatbot from "./pages/Chatbot/Chatbot";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route index element={<Home2 />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="home" element={<Home2 />} />
            <Route path="doctor" element={<Doctor />} />
            <Route path="SearchResult" element={<SearchResult />} />

            <Route path="articles" element={<ShowArticles />} />
            <Route path="articles/pending" element={<PendingArticles />} />
            <Route path="articles/pending/:id" element={<PArticleContent />} />
            <Route
                path="articles/pending/myPendings"
                element={<MyArticles />}
            />
            <Route
                path="articles/pending/myPendings/:id"
                element={<MyArticleContent />}
            />
            <Route path="articles/:category/:id" element={<ArticleContent />} />
            <Route
                path="articles/:category/:id/update"
                element={<EditArticle />}
            />
            <Route
                path="articles/:category/:id/update/content"
                element={<EditArticleContent />}
            />
            <Route path="articles/AddArticle" element={<AddArticle />} />
            <Route path="chats" element={<Chats />} />
            <Route path="chat/messages" element={<ChatMessages />} />
            <Route path="doctorProile/:id" element={<DoctorProfile />} />
            <Route path="Settings" element={<Settings />} />

            <Route path="verfiy" element={<UploadDocument />} />
            <Route path="control/doctors" element={<AdminDoctors />} />
            <Route path="request/verfiy" element={<RequestVerfiy />} />
            <Route path="Chatbot" element={<Chatbot/>}/>
        </Route>
    )
);
const App = () => {
    return (
        <div className="body">
            <SearchProv>
                <RouterProvider router={router} />
            </SearchProv>
        </div>
    );
};
export default App;