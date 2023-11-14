import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

import UploadFile from 'src/sections/upload/oneUpload';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const DoctorsPage = lazy(() => import('src/pages/doctors'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const RegisterPage = lazy(() => import('src/pages/register'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const PackagePage = lazy(() => import('src/pages/packages'))
export const AddFamilyPage = lazy(() => import('src/pages/addFamily'))

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: "",
      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>} >
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { index: true, element: <IndexPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'doctors', element: <DoctorsPage /> } ,
        { path: 'packages', element: <PackagePage /> },
        {path:'addFamily',element:<AddFamilyPage />}
      ]
    },
    {
      path: 'login',
      element: <LoginPage />
    },
    {
      path: 'register',
      element: <RegisterPage />
    },
    {
      path: '404',
      element: <Page404 />
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />
    }
  ]);

  return routes;
}
