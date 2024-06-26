import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./Pages/Dashboard";
import Reset from "./Pages/Reset";
import Verifyreset from "./Pages/Verifyreset";
import ViewQuiz from "./Pages/ViewQuiz";
import CreateQuiz from "./Pages/CreateQuiz";
import CreateQuestion from "./Pages/CreateQuestion";
import CreateQuestionFillUp from "./Pages/CreateQuestionFillUp";
import DeleteQuestion from "./Pages/DeleteQuestion";
import DeleteQuiz from "./Pages/DeleteQuiz";
import UploadQuiz from "./Pages/UploadQuiz";
import Uploadstudents from "./Pages/Uploadstudents";
import StudentDashboard from "./Pages/StudentDashboard";
import StudentLogin from "./Pages/StudentLogin";
import Instructions from "./Pages/Instructions";
import Exportresult from "./Pages/Exportresult";
import ViewStudents from "./Pages/ViewStudents";
import DeleteStudent from "./Pages/DeleteStudent";
import CreateOneStudent from "./Pages/CreateOneStudent";
import Test from "./Pages/Test";

function App() {
  const isUserSignedIn = !!localStorage.getItem("token");
  return (
    <BrowserRouter className="flex items-center justify-center">
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/test" element={<Test />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/create/quiz" element={<CreateQuiz />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/reset/:id" element={<Verifyreset />} />
          <Route path="/quiz/view/:id" element={<ViewQuiz />} />
          <Route path="/quiz/delete/:id" element={<DeleteQuiz />} />
          <Route path="/quiz/upload/:id" element={<UploadQuiz />} />
          <Route path="/quiz/student/view/:id" element={<ViewStudents />} />
          <Route
            path="/quiz/upload/students/:id"
            element={<Uploadstudents />}
          />
          <Route
            path="/quiz/add/students/:id"
            element={<CreateOneStudent />}
          />
          <Route path="/question/create/:id" element={<CreateQuestion />} />
          <Route
            path="/question/create/fillup/:id"
            element={<CreateQuestionFillUp />}
          />
          <Route path="/question/delete/:id" element={<DeleteQuestion />} />
          <Route path="/student/delete/:id" element={<DeleteStudent />} />
          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/student/instructions" element={<Instructions />} />
          <Route path="/student/quiz" element={<StudentDashboard />} />
          <Route path="/export/result/:id" element={<Exportresult />} />
          {/* {isUserSignedIn && <Route path='/account' element={<Account />} />} */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
