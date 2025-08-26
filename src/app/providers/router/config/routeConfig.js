import { pathConstants } from '@/shared/lib/constants/paths';
/*
import { HomePage } from '@/pages/HomePage';
import { RegistrationPage } from '@/pages/RegistrationPage';
import { CardDetailPage } from '@/pages/CardDetailPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { ErrorPage } from '@/pages/ErrorPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
*/
export const routeConfig = [
    {
        path: pathConstants.MAIN
        // element: <HomePage />,
    },
    {
        path: pathConstants.REGISTER
        // element: <RegistrationPage />,
    },
    {
        path: pathConstants.CARD
        // element: <CardDetailPage />,
    },
    {
        path: pathConstants.PROFILE
        // element: <ProfilePage />,
    },
    {
        path: pathConstants.ERROR_PAGE
        // element: <ErrorPage />,
    },
    {
        path: pathConstants.NOT_FOUND
        // element: <NotFoundPage />,
    }
];
