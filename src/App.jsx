import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ThemeProvider } from "@/components/theme-provider"

import './App.css'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import LandingPage from './pages/LandingPage'
import Onboarding from './pages/Onboarding'
import JobListing from './pages/JobListing'
import PostJob from './pages/PostJob'
import MyJobs from './pages/MyJobs'
import SaveJobs from './pages/SaveJobs'
import JobPage from './pages/JobPage'
import ProtectedRoutes from './components/ProtectedRoutes'

function App() {

  const router = createBrowserRouter([
    {
      element:<AppLayout />,
      children:[
        {
          path:'/',
          element:<LandingPage />
        },
        {
          path:'/onboarding',
          element:
          <ProtectedRoutes>
            <Onboarding />
          </ProtectedRoutes>
        },
        {
          path:'/jobs',
          element:
          <ProtectedRoutes>
              <JobListing />
          </ProtectedRoutes>
        },
        {
          path:'/job/:id',
          element:
          <ProtectedRoutes>
             <JobPage />
          </ProtectedRoutes>
        },
        {
          path:'/post-job',
          element:
          <ProtectedRoutes>
            <PostJob />
          </ProtectedRoutes>
        },
        {
          path:'/saved-job',
          element:
          <ProtectedRoutes>
            <SaveJobs />
          </ProtectedRoutes>
        },
        {
          path:'/my-jobs',
          element:
          <ProtectedRoutes>
            <MyJobs />
          </ProtectedRoutes>
        }
      ]
    }
  ])
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
