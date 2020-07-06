import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Course from "./views/Course.vue";
import Admin from "./views/Admin/SuperIndex.vue";
import CourseMgmt from "./views/Admin/Super/CourseMgmt.vue";
import UserMgmt from "./views/Admin/Super/UserMgmt.vue";
import EditCourse from "./views/Admin/Super/EditCourse.vue";
import AddCourse from "./views/Admin/Super/AddCourse.vue";
import EditUser from "./views/Admin/Super/EditUser.vue";
import SignUp from "./views/SignUp";
import Article from "./views/Course/Article";
import Registrations from "./views/Students.vue";
import Welcome from "./views/Course/Welcome.vue";

import Quizzer from "./views/Course/Quiz/Quizzer.vue";
import QuestionBank from "./views/Course/Quiz/QuestionBank.vue";
import Quiz from "./views/Course/Quiz/Quiz.vue";
import QuizAttempts from "./views/Course/Quiz/Attempts.vue";

import { getters } from "./utils/store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/course/:course_id",
      component: Course,
      children: [
        {
          path: "/",
          name: "course",
          component: Welcome,
        },
        {
          path: "Article/:page_id",
          component: Article,
        },
        {
          path: "registrations",
          component: Registrations,
        },
        {
          path: "Quiz/:quiz_id",
          component: Quiz,
        },
        {
          path: "attempts/:quiz_id",
          component: QuizAttempts,
        },
        {
          path: "Quizzer/:quiz_id",
          component: Quizzer,
        },
        {
          path: "questions/:group",
          component: QuestionBank,
        },
      ],
    },
    {
      path: "/admin",
      redirect: "/admin/cmgt",
      name: "admin",
      component: Admin,
      children: [
        {
          path: "cmgt",
          component: CourseMgmt,
        },
        { path: "cmgt/add", component: AddCourse },
        { path: "cmgt/:course_id", component: EditCourse },
        {
          path: "umgt",
          component: UserMgmt,
        },
        { path: "umgt/:user_id", component: EditUser },
      ],
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUp,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const user = getters.user();
    if (user.role === "student") {
      next({
        name: "home",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;